
let wasm;


let cachegetFloat32Memory = null;
function getFloat32Memory() {
    if (cachegetFloat32Memory === null || cachegetFloat32Memory.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory;
}

let WASM_VECTOR_LEN = 0;

function passArrayF32ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 4);
    getFloat32Memory().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function freeRGB(ptr) {

    wasm.__wbg_rgb_free(ptr);
}
/**
*/
export class RGB {

    static __wrap(ptr) {
        const obj = Object.create(RGB.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeRGB(ptr);
    }

    /**
    * @param {number} arg0
    * @param {number} arg1
    * @param {number} arg2
    * @returns {RGB}
    */
    static new(arg0, arg1, arg2) {
        return RGB.__wrap(wasm.rgb_new(arg0, arg1, arg2));
    }
}

function freeCanvasImageData(ptr) {

    wasm.__wbg_canvasimagedata_free(ptr);
}
/**
*/
export class CanvasImageData {

    static __wrap(ptr) {
        const obj = Object.create(CanvasImageData.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeCanvasImageData(ptr);
    }

    /**
    * @param {number} arg0
    * @param {number} arg1
    * @param {Float32Array} arg2
    * @returns {CanvasImageData}
    */
    static new(arg0, arg1, arg2) {
        const ptr2 = passArrayF32ToWasm(arg2);
        const len2 = WASM_VECTOR_LEN;
        return CanvasImageData.__wrap(wasm.canvasimagedata_new(arg0, arg1, ptr2, len2));
    }
    /**
    * @param {RGB} arg0
    * @param {number} arg1
    * @returns {void}
    */
    filter_custom_color(arg0, arg1) {
        const ptr0 = arg0.ptr;
        arg0.ptr = 0;
        return wasm.canvasimagedata_filter_custom_color(this.ptr, ptr0, arg1);
    }
    /**
    * @returns {number}
    */
    width() {
        return wasm.canvasimagedata_width(this.ptr);
    }
    /**
    * @returns {number}
    */
    height() {
        return wasm.canvasimagedata_height(this.ptr);
    }
    /**
    * @returns {number}
    */
    data() {
        return wasm.canvasimagedata_data(this.ptr);
    }
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}




export default function load_wasm() {
    const importObject = {
        './wasm_image_filters': {
            __wbindgen_throw,
        },
    };

    return fetch('wasm-image-filters/pkg/wasm_image_filters_bg.wasm')
        .then(response => response.arrayBuffer())
        .then(bytes => WebAssembly.instantiate(bytes, importObject))
        .then(results => results.instance.exports)
        .then(function(_wasm) {
            wasm = _wasm;
            return {
                wasm,
                CanvasImageData,
                RGB,
            };
        });
}
