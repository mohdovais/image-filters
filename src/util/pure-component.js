import { Component } from 'preact';

export function pure(target) {
    const proto = target.prototype;
    if (proto && proto.render) {
        proto.shouldComponentUpdate = shouldComponentUpdate;
    } else {
        return target.__scuWrap || (target.__scuWrap = wrap(target));
    }
}

function wrap(fn) {
    class Wrap extends Wrapper {}
    Wrap.prototype.renderChild = fn;
    return Wrap;
}

class Wrapper extends Component {
    shouldComponentUpdate(props) {
        return shallowDiffers(props, this.props);
    }
    render(props, state, context) {
        return this.renderChild(props, context);
    }
}

export function shouldComponentUpdate(props, state) {
    return (
        shallowDiffers(props, this.props) || shallowDiffers(state, this.state)
    );
}

export function shallowDiffers(a, b) {
    for (let key in a) if (a[key] !== b[key]) return true;
    for (let key in b) if (!(key in a)) return true;
    return false;
}
