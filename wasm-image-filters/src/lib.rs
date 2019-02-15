extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_f32(a: f32);
}

struct XYZ {
    x: f32,
    y: f32,
    z: f32,
}

#[derive(Copy, Clone)]
struct Lab {
    l: f32,
    a: f32,
    b: f32,
}

#[wasm_bindgen]
pub struct RGB {
    r: f32,
    g: f32,
    b: f32,
}

#[wasm_bindgen]
impl RGB {
    pub fn new(r: f32, g: f32, b: f32) -> RGB {
        RGB { r, g, b }
    }
}

#[wasm_bindgen]
pub struct CanvasImageData {
    width: u32,
    height: u32,
    data: Vec<f32>,
}

#[wasm_bindgen]
impl CanvasImageData {
    pub fn new(width: u32, height: u32, data: Vec<f32>) -> CanvasImageData {
        //utils::set_panic_hook();
        CanvasImageData {
            width,
            height,
            data,
        }
    }

    pub fn filter_custom_color(&mut self, color: RGB, threshold: f32) {
        //let mut next = self.data.clone();
        let target_lab = rgb_to_lab(color);
        let length = self.width * self.height * 4;

        for i in (0..length).step_by(4) {
            let idx_r = i as usize;
            let idx_g = idx_r + 1;
            let idx_b = idx_r + 2;
            let r = self.data[idx_r];
            let g = self.data[idx_g];
            let b = self.data[idx_b];
            //log_f32(diff);

            if cie_76_lab(target_lab, rgb_to_lab(RGB { r, g, b })) > threshold {
                //log("here");
                let gray = ((r + g + b) / 3.0).round();
                self.data[idx_r] = gray;
                self.data[idx_g] = gray;
                self.data[idx_b] = gray;
            }
        }

        //self.data = next;

        //log("done");
    }

    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }

    pub fn data(&self) -> *const f32 {
        self.data.as_ptr()
    }
}

fn cie_76_lab(lab1: Lab, lab2: Lab) -> f32 {
    let sqr = 2.0;
    ((lab1.l - lab2.l).powf(sqr) + (lab1.a - lab2.a).powf(sqr) + (lab1.b - lab2.b).powf(sqr)).sqrt()
}

fn rgb_to_lab(rgb: RGB) -> Lab {
    xyz_to_lab(rgb_to_xyz(rgb))
}

fn r_to_x(r: f32) -> f32 {
    let x = r / 255.0;

    if x > 0.04045 {
        ((x + 0.055) / 1.055).powf(2.4) * 100.0
    } else {
        (x / 12.92) * 100.0
    }
}

fn rgb_to_xyz(rgb: RGB) -> XYZ {
    let x = r_to_x(rgb.r);
    let y = r_to_x(rgb.g);
    let z = r_to_x(rgb.b);

    XYZ {
        x: x * 0.4124 + y * 0.3576 + z * 0.1805,
        y: x * 0.2126 + y * 0.7152 + z * 0.0722,
        z: x * 0.0193 + y * 0.1192 + z * 0.9505,
    }
}

fn x_to_x(x: f32) -> f32 {
    if x > 0.008856 {
        x.powf(0.333333) // 1/3
    } else {
        // (7.787037037037036 * x) + 0.13793103448275862
        (7.787037 * x) + 0.137931 // 16.0 / 116.0
    }
}

// Illuminant D65
fn xyz_to_lab(xyz: XYZ) -> Lab {
    let x = x_to_x(xyz.x / 96.6797); // 95.047
    let y = x_to_x(xyz.y / 100.0);
    let z = x_to_x(xyz.z / 82.5188); // 108.883

    Lab {
        l: 116.0 * y - 16.0,
        a: 500.0 * (x - y),
        b: 200.0 * (y - z),
    }
}
