(function () {
	'use strict';

	var VNode = function VNode() {};

	var options = {};

	var stack = [];

	var EMPTY_CHILDREN = [];

	function h(nodeName, attributes) {
		var arguments$1 = arguments;

		var children = EMPTY_CHILDREN,
		    lastSimple,
		    child,
		    simple,
		    i;
		for (i = arguments.length; i-- > 2;) {
			stack.push(arguments$1[i]);
		}
		if (attributes && attributes.children != null) {
			if (!stack.length) { stack.push(attributes.children); }
			delete attributes.children;
		}
		while (stack.length) {
			if ((child = stack.pop()) && child.pop !== undefined) {
				for (i = child.length; i--;) {
					stack.push(child[i]);
				}
			} else {
				if (typeof child === 'boolean') { child = null; }

				if (simple = typeof nodeName !== 'function') {
					if (child == null) { child = ''; }else if (typeof child === 'number') { child = String(child); }else if (typeof child !== 'string') { simple = false; }
				}

				if (simple && lastSimple) {
					children[children.length - 1] += child;
				} else if (children === EMPTY_CHILDREN) {
					children = [child];
				} else {
					children.push(child);
				}

				lastSimple = simple;
			}
		}

		var p = new VNode();
		p.nodeName = nodeName;
		p.children = children;
		p.attributes = attributes == null ? undefined : attributes;
		p.key = attributes == null ? undefined : attributes.key;

		return p;
	}

	function extend(obj, props) {
	  for (var i in props) {
	    obj[i] = props[i];
	  }return obj;
	}

	function applyRef(ref, value) {
	  if (ref != null) {
	    if (typeof ref == 'function') { ref(value); }else { ref.current = value; }
	  }
	}

	var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

	var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

	var items = [];

	function enqueueRender(component) {
		if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
			(defer)(rerender);
		}
	}

	function rerender() {
		var p;
		while (p = items.pop()) {
			if (p._dirty) { renderComponent(p); }
		}
	}

	function isSameNodeType(node, vnode, hydrating) {
		if (typeof vnode === 'string' || typeof vnode === 'number') {
			return node.splitText !== undefined;
		}
		if (typeof vnode.nodeName === 'string') {
			return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
		}
		return hydrating || node._componentConstructor === vnode.nodeName;
	}

	function isNamedNode(node, nodeName) {
		return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
	}

	function getNodeProps(vnode) {
		var props = extend({}, vnode.attributes);
		props.children = vnode.children;

		var defaultProps = vnode.nodeName.defaultProps;
		if (defaultProps !== undefined) {
			for (var i in defaultProps) {
				if (props[i] === undefined) {
					props[i] = defaultProps[i];
				}
			}
		}

		return props;
	}

	function createNode(nodeName, isSvg) {
		var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
		node.normalizedNodeName = nodeName;
		return node;
	}

	function removeNode(node) {
		var parentNode = node.parentNode;
		if (parentNode) { parentNode.removeChild(node); }
	}

	function setAccessor(node, name, old, value, isSvg) {
		if (name === 'className') { name = 'class'; }

		if (name === 'key') ; else if (name === 'ref') {
			applyRef(old, null);
			applyRef(value, node);
		} else if (name === 'class' && !isSvg) {
			node.className = value || '';
		} else if (name === 'style') {
			if (!value || typeof value === 'string' || typeof old === 'string') {
				node.style.cssText = value || '';
			}
			if (value && typeof value === 'object') {
				if (typeof old !== 'string') {
					for (var i in old) {
						if (!(i in value)) { node.style[i] = ''; }
					}
				}
				for (var i in value) {
					node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
				}
			}
		} else if (name === 'dangerouslySetInnerHTML') {
			if (value) { node.innerHTML = value.__html || ''; }
		} else if (name[0] == 'o' && name[1] == 'n') {
			var useCapture = name !== (name = name.replace(/Capture$/, ''));
			name = name.toLowerCase().substring(2);
			if (value) {
				if (!old) { node.addEventListener(name, eventProxy, useCapture); }
			} else {
				node.removeEventListener(name, eventProxy, useCapture);
			}
			(node._listeners || (node._listeners = {}))[name] = value;
		} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
			try {
				node[name] = value == null ? '' : value;
			} catch (e) {}
			if ((value == null || value === false) && name != 'spellcheck') { node.removeAttribute(name); }
		} else {
			var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

			if (value == null || value === false) {
				if (ns) { node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase()); }else { node.removeAttribute(name); }
			} else if (typeof value !== 'function') {
				if (ns) { node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value); }else { node.setAttribute(name, value); }
			}
		}
	}

	function eventProxy(e) {
		return this._listeners[e.type](e);
	}

	var mounts = [];

	var diffLevel = 0;

	var isSvgMode = false;

	var hydrating = false;

	function flushMounts() {
		var c;
		while (c = mounts.shift()) {
			if (c.componentDidMount) { c.componentDidMount(); }
		}
	}

	function diff(dom, vnode, context, mountAll, parent, componentRoot) {
		if (!diffLevel++) {
			isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

			hydrating = dom != null && !('__preactattr_' in dom);
		}

		var ret = idiff(dom, vnode, context, mountAll, componentRoot);

		if (parent && ret.parentNode !== parent) { parent.appendChild(ret); }

		if (! --diffLevel) {
			hydrating = false;

			if (!componentRoot) { flushMounts(); }
		}

		return ret;
	}

	function idiff(dom, vnode, context, mountAll, componentRoot) {
		var out = dom,
		    prevSvgMode = isSvgMode;

		if (vnode == null || typeof vnode === 'boolean') { vnode = ''; }

		if (typeof vnode === 'string' || typeof vnode === 'number') {
			if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
				if (dom.nodeValue != vnode) {
					dom.nodeValue = vnode;
				}
			} else {
				out = document.createTextNode(vnode);
				if (dom) {
					if (dom.parentNode) { dom.parentNode.replaceChild(out, dom); }
					recollectNodeTree(dom, true);
				}
			}

			out['__preactattr_'] = true;

			return out;
		}

		var vnodeName = vnode.nodeName;
		if (typeof vnodeName === 'function') {
			return buildComponentFromVNode(dom, vnode, context, mountAll);
		}

		isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

		vnodeName = String(vnodeName);
		if (!dom || !isNamedNode(dom, vnodeName)) {
			out = createNode(vnodeName, isSvgMode);

			if (dom) {
				while (dom.firstChild) {
					out.appendChild(dom.firstChild);
				}
				if (dom.parentNode) { dom.parentNode.replaceChild(out, dom); }

				recollectNodeTree(dom, true);
			}
		}

		var fc = out.firstChild,
		    props = out['__preactattr_'],
		    vchildren = vnode.children;

		if (props == null) {
			props = out['__preactattr_'] = {};
			for (var a = out.attributes, i = a.length; i--;) {
				props[a[i].name] = a[i].value;
			}
		}

		if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
			if (fc.nodeValue != vchildren[0]) {
				fc.nodeValue = vchildren[0];
			}
		} else if (vchildren && vchildren.length || fc != null) {
				innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
			}

		diffAttributes(out, vnode.attributes, props);

		isSvgMode = prevSvgMode;

		return out;
	}

	function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
		var originalChildren = dom.childNodes,
		    children = [],
		    keyed = {},
		    keyedLen = 0,
		    min = 0,
		    len = originalChildren.length,
		    childrenLen = 0,
		    vlen = vchildren ? vchildren.length : 0,
		    j,
		    c,
		    f,
		    vchild,
		    child;

		if (len !== 0) {
			for (var i = 0; i < len; i++) {
				var _child = originalChildren[i],
				    props = _child['__preactattr_'],
				    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
				if (key != null) {
					keyedLen++;
					keyed[key] = _child;
				} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
					children[childrenLen++] = _child;
				}
			}
		}

		if (vlen !== 0) {
			for (var i = 0; i < vlen; i++) {
				vchild = vchildren[i];
				child = null;

				var key = vchild.key;
				if (key != null) {
					if (keyedLen && keyed[key] !== undefined) {
						child = keyed[key];
						keyed[key] = undefined;
						keyedLen--;
					}
				} else if (min < childrenLen) {
						for (j = min; j < childrenLen; j++) {
							if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
								child = c;
								children[j] = undefined;
								if (j === childrenLen - 1) { childrenLen--; }
								if (j === min) { min++; }
								break;
							}
						}
					}

				child = idiff(child, vchild, context, mountAll);

				f = originalChildren[i];
				if (child && child !== dom && child !== f) {
					if (f == null) {
						dom.appendChild(child);
					} else if (child === f.nextSibling) {
						removeNode(f);
					} else {
						dom.insertBefore(child, f);
					}
				}
			}
		}

		if (keyedLen) {
			for (var i in keyed) {
				if (keyed[i] !== undefined) { recollectNodeTree(keyed[i], false); }
			}
		}

		while (min <= childrenLen) {
			if ((child = children[childrenLen--]) !== undefined) { recollectNodeTree(child, false); }
		}
	}

	function recollectNodeTree(node, unmountOnly) {
		var component = node._component;
		if (component) {
			unmountComponent(component);
		} else {
			if (node['__preactattr_'] != null) { applyRef(node['__preactattr_'].ref, null); }

			if (unmountOnly === false || node['__preactattr_'] == null) {
				removeNode(node);
			}

			removeChildren(node);
		}
	}

	function removeChildren(node) {
		node = node.lastChild;
		while (node) {
			var next = node.previousSibling;
			recollectNodeTree(node, true);
			node = next;
		}
	}

	function diffAttributes(dom, attrs, old) {
		var name;

		for (name in old) {
			if (!(attrs && attrs[name] != null) && old[name] != null) {
				setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
			}
		}

		for (name in attrs) {
			if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
				setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
			}
		}
	}

	var recyclerComponents = [];

	function createComponent(Ctor, props, context) {
		var inst,
		    i = recyclerComponents.length;

		if (Ctor.prototype && Ctor.prototype.render) {
			inst = new Ctor(props, context);
			Component.call(inst, props, context);
		} else {
			inst = new Component(props, context);
			inst.constructor = Ctor;
			inst.render = doRender;
		}

		while (i--) {
			if (recyclerComponents[i].constructor === Ctor) {
				inst.nextBase = recyclerComponents[i].nextBase;
				recyclerComponents.splice(i, 1);
				return inst;
			}
		}

		return inst;
	}

	function doRender(props, state, context) {
		return this.constructor(props, context);
	}

	function setComponentProps(component, props, renderMode, context, mountAll) {
		if (component._disable) { return; }
		component._disable = true;

		component.__ref = props.ref;
		component.__key = props.key;
		delete props.ref;
		delete props.key;

		if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
			if (!component.base || mountAll) {
				if (component.componentWillMount) { component.componentWillMount(); }
			} else if (component.componentWillReceiveProps) {
				component.componentWillReceiveProps(props, context);
			}
		}

		if (context && context !== component.context) {
			if (!component.prevContext) { component.prevContext = component.context; }
			component.context = context;
		}

		if (!component.prevProps) { component.prevProps = component.props; }
		component.props = props;

		component._disable = false;

		if (renderMode !== 0) {
			if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
				renderComponent(component, 1, mountAll);
			} else {
				enqueueRender(component);
			}
		}

		applyRef(component.__ref, component);
	}

	function renderComponent(component, renderMode, mountAll, isChild) {
		if (component._disable) { return; }

		var props = component.props,
		    state = component.state,
		    context = component.context,
		    previousProps = component.prevProps || props,
		    previousState = component.prevState || state,
		    previousContext = component.prevContext || context,
		    isUpdate = component.base,
		    nextBase = component.nextBase,
		    initialBase = isUpdate || nextBase,
		    initialChildComponent = component._component,
		    skip = false,
		    snapshot = previousContext,
		    rendered,
		    inst,
		    cbase;

		if (component.constructor.getDerivedStateFromProps) {
			state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
			component.state = state;
		}

		if (isUpdate) {
			component.props = previousProps;
			component.state = previousState;
			component.context = previousContext;
			if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
				skip = true;
			} else if (component.componentWillUpdate) {
				component.componentWillUpdate(props, state, context);
			}
			component.props = props;
			component.state = state;
			component.context = context;
		}

		component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
		component._dirty = false;

		if (!skip) {
			rendered = component.render(props, state, context);

			if (component.getChildContext) {
				context = extend(extend({}, context), component.getChildContext());
			}

			if (isUpdate && component.getSnapshotBeforeUpdate) {
				snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
			}

			var childComponent = rendered && rendered.nodeName,
			    toUnmount,
			    base;

			if (typeof childComponent === 'function') {

				var childProps = getNodeProps(rendered);
				inst = initialChildComponent;

				if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
					setComponentProps(inst, childProps, 1, context, false);
				} else {
					toUnmount = inst;

					component._component = inst = createComponent(childComponent, childProps, context);
					inst.nextBase = inst.nextBase || nextBase;
					inst._parentComponent = component;
					setComponentProps(inst, childProps, 0, context, false);
					renderComponent(inst, 1, mountAll, true);
				}

				base = inst.base;
			} else {
				cbase = initialBase;

				toUnmount = initialChildComponent;
				if (toUnmount) {
					cbase = component._component = null;
				}

				if (initialBase || renderMode === 1) {
					if (cbase) { cbase._component = null; }
					base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
				}
			}

			if (initialBase && base !== initialBase && inst !== initialChildComponent) {
				var baseParent = initialBase.parentNode;
				if (baseParent && base !== baseParent) {
					baseParent.replaceChild(base, initialBase);

					if (!toUnmount) {
						initialBase._component = null;
						recollectNodeTree(initialBase, false);
					}
				}
			}

			if (toUnmount) {
				unmountComponent(toUnmount);
			}

			component.base = base;
			if (base && !isChild) {
				var componentRef = component,
				    t = component;
				while (t = t._parentComponent) {
					(componentRef = t).base = base;
				}
				base._component = componentRef;
				base._componentConstructor = componentRef.constructor;
			}
		}

		if (!isUpdate || mountAll) {
			mounts.push(component);
		} else if (!skip) {

			if (component.componentDidUpdate) {
				component.componentDidUpdate(previousProps, previousState, snapshot);
			}
		}

		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}if (!diffLevel && !isChild) { flushMounts(); }
	}

	function buildComponentFromVNode(dom, vnode, context, mountAll) {
		var c = dom && dom._component,
		    originalComponent = c,
		    oldDom = dom,
		    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
		    isOwner = isDirectOwner,
		    props = getNodeProps(vnode);
		while (c && !isOwner && (c = c._parentComponent)) {
			isOwner = c.constructor === vnode.nodeName;
		}

		if (c && isOwner && (!mountAll || c._component)) {
			setComponentProps(c, props, 3, context, mountAll);
			dom = c.base;
		} else {
			if (originalComponent && !isDirectOwner) {
				unmountComponent(originalComponent);
				dom = oldDom = null;
			}

			c = createComponent(vnode.nodeName, props, context);
			if (dom && !c.nextBase) {
				c.nextBase = dom;

				oldDom = null;
			}
			setComponentProps(c, props, 1, context, mountAll);
			dom = c.base;

			if (oldDom && dom !== oldDom) {
				oldDom._component = null;
				recollectNodeTree(oldDom, false);
			}
		}

		return dom;
	}

	function unmountComponent(component) {

		var base = component.base;

		component._disable = true;

		if (component.componentWillUnmount) { component.componentWillUnmount(); }

		component.base = null;

		var inner = component._component;
		if (inner) {
			unmountComponent(inner);
		} else if (base) {
			if (base['__preactattr_'] != null) { applyRef(base['__preactattr_'].ref, null); }

			component.nextBase = base;

			removeNode(base);
			recyclerComponents.push(component);

			removeChildren(base);
		}

		applyRef(component.__ref, null);
	}

	function Component(props, context) {
		this._dirty = true;

		this.context = context;

		this.props = props;

		this.state = this.state || {};

		this._renderCallbacks = [];
	}

	extend(Component.prototype, {
		setState: function setState(state, callback) {
			if (!this.prevState) { this.prevState = this.state; }
			this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
			if (callback) { this._renderCallbacks.push(callback); }
			enqueueRender(this);
		},
		forceUpdate: function forceUpdate(callback) {
			if (callback) { this._renderCallbacks.push(callback); }
			renderComponent(this, 2);
		},
		render: function render() {}
	});

	function render(vnode, parent, merge) {
	  return diff(merge, vnode, {}, false, parent, false);
	}
	//# sourceMappingURL=preact.mjs.map

	function shallowDiffers(a, b) {
		for (var i in a) { if (!(i in b)) { return true; } }
		for (var i$1 in b) { if (a[i$1]!==b[i$1]) { return true; } }
		return false;
	}

	var FilterSelect = /*@__PURE__*/(function (Component$$1) {
	    function FilterSelect () {
	        Component$$1.apply(this, arguments);
	    }

	    if ( Component$$1 ) FilterSelect.__proto__ = Component$$1;
	    FilterSelect.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    FilterSelect.prototype.constructor = FilterSelect;

	    FilterSelect.prototype.shouldComponentUpdate = function shouldComponentUpdate (props, state) {
	        return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
	    };

	    FilterSelect.prototype.render = function render$$1 (props) {
	        return (
	            h( 'select', {
	                value: props.selectedFilter, onChange: function (event) { return props.onFilterChange(event.target.value); } },
	                Object.keys(props.filters).map(function (filter) {
	                    return (
	                        h( 'option', { value: filter, key: filter },
	                            props.filters[filter].label
	                        )
	                    );
	                })
	            )
	        );
	    };

	    return FilterSelect;
	}(Component));

	function onFileChange(image) {
	    return function (event) {
	        var file = event.target.files[0];
	        if (file) {
	            image.src = URL.createObjectURL(file);
	        }
	    };
	}

	function onImageLoad(callback) {
	    return function (event) {
	        var img = event.target;
	        callback(img);
	        URL.revokeObjectURL(img.src);
	    };
	}

	var Form = /*@__PURE__*/(function (Component$$1) {
	    function Form(props) {
	        Component$$1.call(this, props);
	        this.state = {
	            image: new Image(),
	        };
	    }

	    if ( Component$$1 ) Form.__proto__ = Component$$1;
	    Form.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Form.prototype.constructor = Form;

	    Form.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
	        //return false; //
	    };

	    Form.prototype.render = function render$$1 (props, state) {
	        console.log('render form');

	        state.image.onload = onImageLoad(props.onImageChange);

	        return (
	            h( 'form', { onSubmit: function (event) { return event.preventDefault(); } },
	                h( 'input', { type: "file", onChange: onFileChange(state.image) }),
	                h( FilterSelect, {
	                    filters: props.filters, selectedFilter: props.selectedFilter, onFilterChange: props.onFilterChange }),
	                h( 'input', { type: "color" }),
	                h( 'input', { type: "range", min: "0", max: "765" })
	            )
	        );
	    };

	    return Form;
	}(Component));

	var CanvasDom = /*@__PURE__*/(function (Component$$1) {
	    function CanvasDom () {
	        Component$$1.apply(this, arguments);
	    }

	    if ( Component$$1 ) CanvasDom.__proto__ = Component$$1;
	    CanvasDom.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    CanvasDom.prototype.constructor = CanvasDom;

	    CanvasDom.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
	        return false;
	    };

	    CanvasDom.prototype.render = function render$$1 (props) {
	        return (
	            h( 'canvas', {
	                ref: props.getRef, style: {
	                    maxWidth: '100%',
	                    height: 'auto',
	                } })
	        );
	    };

	    return CanvasDom;
	}(Component));

	var wasm;


	var cachegetFloat32Memory = null;
	function getFloat32Memory() {
	    if (cachegetFloat32Memory === null || cachegetFloat32Memory.buffer !== wasm.memory.buffer) {
	        cachegetFloat32Memory = new Float32Array(wasm.memory.buffer);
	    }
	    return cachegetFloat32Memory;
	}

	var WASM_VECTOR_LEN = 0;

	function passArrayF32ToWasm(arg) {
	    var ptr = wasm.__wbindgen_malloc(arg.length * 4);
	    getFloat32Memory().set(arg, ptr / 4);
	    WASM_VECTOR_LEN = arg.length;
	    return ptr;
	}

	function freeRGB(ptr) {

	    wasm.__wbg_rgb_free(ptr);
	}
	/**
	*/
	var RGB = function RGB () {};

	RGB.__wrap = function __wrap (ptr) {
	    var obj = Object.create(RGB.prototype);
	    obj.ptr = ptr;

	    return obj;
	};

	RGB.prototype.free = function free () {
	    var ptr = this.ptr;
	    this.ptr = 0;
	    freeRGB(ptr);
	};

	/**
	* @param {number} arg0
	* @param {number} arg1
	* @param {number} arg2
	* @returns {RGB}
	*/
	RGB.new = function new$1 (arg0, arg1, arg2) {
	    return RGB.__wrap(wasm.rgb_new(arg0, arg1, arg2));
	};

	function freeCanvasImageData(ptr) {

	    wasm.__wbg_canvasimagedata_free(ptr);
	}
	/**
	*/
	var CanvasImageData = function CanvasImageData () {};

	CanvasImageData.__wrap = function __wrap (ptr) {
	    var obj = Object.create(CanvasImageData.prototype);
	    obj.ptr = ptr;

	    return obj;
	};

	CanvasImageData.prototype.free = function free () {
	    var ptr = this.ptr;
	    this.ptr = 0;
	    freeCanvasImageData(ptr);
	};

	/**
	* @param {number} arg0
	* @param {number} arg1
	* @param {Float32Array} arg2
	* @returns {CanvasImageData}
	*/
	CanvasImageData.new = function new$2 (arg0, arg1, arg2) {
	    var ptr2 = passArrayF32ToWasm(arg2);
	    var len2 = WASM_VECTOR_LEN;
	    return CanvasImageData.__wrap(wasm.canvasimagedata_new(arg0, arg1, ptr2, len2));
	};
	/**
	* @param {RGB} arg0
	* @param {number} arg1
	* @returns {void}
	*/
	CanvasImageData.prototype.filter_custom_color = function filter_custom_color (arg0, arg1) {
	    var ptr0 = arg0.ptr;
	    arg0.ptr = 0;
	    return wasm.canvasimagedata_filter_custom_color(this.ptr, ptr0, arg1);
	};
	/**
	* @returns {number}
	*/
	CanvasImageData.prototype.width = function width () {
	    return wasm.canvasimagedata_width(this.ptr);
	};
	/**
	* @returns {number}
	*/
	CanvasImageData.prototype.height = function height () {
	    return wasm.canvasimagedata_height(this.ptr);
	};
	/**
	* @returns {number}
	*/
	CanvasImageData.prototype.data = function data () {
	    return wasm.canvasimagedata_data(this.ptr);
	};

	var cachedTextDecoder = new TextDecoder('utf-8');

	var cachegetUint8Memory = null;
	function getUint8Memory() {
	    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
	        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
	    }
	    return cachegetUint8Memory;
	}

	function getStringFromWasm(ptr, len) {
	    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
	}

	function __wbindgen_throw(ptr, len) {
	    throw new Error(getStringFromWasm(ptr, len));
	}




	function load_wasm() {
	    var importObject = {
	        './wasm_image_filters': {
	            __wbindgen_throw: __wbindgen_throw,
	        },
	    };

	    return fetch('wasm-image-filters/pkg/wasm_image_filters_bg.wasm')
	        .then(function (response) { return response.arrayBuffer(); })
	        .then(function (bytes) { return WebAssembly.instantiate(bytes, importObject); })
	        .then(function (results) { return results.instance.exports; })
	        .then(function(_wasm) {
	            wasm = _wasm;
	            return {
	                wasm: wasm,
	                CanvasImageData: CanvasImageData,
	                RGB: RGB,
	            };
	        });
	}

	//import load_wasm from '../../wasm-image-filters/pkg/wasm_image_filters';

	function createWebWorker(config) {
	    if (window.Worker) {
	        var myWorker = new Worker('dist/web-worker.js');
	        myWorker.onmessage = config.onmessage;
	        myWorker.onerror = config.onerror;
	        return myWorker;
	    }
	}

	function setContext(component) {
	    return function (canvas) {
	        component.canvas = canvas;
	    };
	}

	var WASM;
	function get_wasm() {
	    return WASM === undefined
	        ? load_wasm().then(function (exports) { return (WASM = exports); })
	        : Promise.resolve(WASM);
	}

	function getImageData(image) {
	    var canvas = document.createElement('canvas');
	    var context = canvas.getContext('2d');
	    var width = image.width;
	    var height = image.height;

	    canvas.width = width;
	    canvas.height = height;
	    context.drawImage(image, 0, 0);

	    return context.getImageData(0, 0, width, height);
	}

	var Canvas = /*@__PURE__*/(function (Component$$1) {
	    function Canvas(props) {
	        Component$$1.call(this, props);
	        this.worker = createWebWorker({
	            onmessage: this.onMessage.bind(this),
	            onerror: function (event) { return console.log; },
	        });
	    }

	    if ( Component$$1 ) Canvas.__proto__ = Component$$1;
	    Canvas.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Canvas.prototype.constructor = Canvas;

	    Canvas.prototype.render = function render$$1 (props) {
	        return h( CanvasDom, { getRef: setContext(this) });
	    };

	    Canvas.prototype.componentDidMount = function componentDidMount () {
	        var this$1 = this;

	        requestAnimationFrame(function () {
	            this$1.postMessage(this$1.props.filterFn, this$1.canvas);
	        });
	    };

	    Canvas.prototype.componentDidUpdate = function componentDidUpdate () {
	        var this$1 = this;

	        requestAnimationFrame(function () {
	            this$1.postMessage(this$1.props.filterFn, this$1.canvas);
	        });
	    };

	    Canvas.prototype.componentWillUnmount = function componentWillUnmount () {
	        this.worker && this.worker.terminate();
	    };

	    Canvas.prototype.postMessage = function postMessage (filter) {
	        var this$1 = this;

	        var image = this.props.image;
	        if (image !== null && filter !== 'wasm') {
	            this.worker.postMessage([
	                filter,
	                getImageData(image),
	                (this.timestamp = performance.now()) ]);
	        }

	        if (image !== null && filter === 'wasm') {
	            console.time('wasm');
	            get_wasm().then(function (exports) {
	                console.time('getContext');
	                var ctx = this$1.canvas.getContext('2d');
	                console.timeEnd('getContext');
	                console.time('getImageData');
	                var imageData = getImageData(image);
	                console.timeEnd('getImageData');
	                console.time('exports.RGB.new');
	                var color = exports.RGB.new(255, 255, 0);
	                console.timeEnd('exports.RGB.new');
	                console.time('exports.CanvasImageData.new');
	                var wasmImageData = exports.CanvasImageData.new(
	                    imageData.width,
	                    imageData.height,
	                    imageData.data
	                );
	                console.timeEnd('exports.CanvasImageData.new');
	                console.time('filter_custom_color');
	                wasmImageData.filter_custom_color(color, 90);
	                console.timeEnd('filter_custom_color');
	                console.time('imageData.data.set');
	                imageData.data.set(
	                    new Uint8ClampedArray(
	                        new Float32Array(
	                            exports.wasm.memory.buffer,
	                            wasmImageData.data(),
	                            wasmImageData.width() * wasmImageData.height() * 4
	                        )
	                    )
	                );
	                console.timeEnd('imageData.data.set');
	                console.time('putImageData');
	                ctx.putImageData(imageData, 0, 0);
	                console.timeEnd('putImageData');
	                console.timeEnd('wasm');
	            });
	        }
	    };

	    Canvas.prototype.onMessage = function onMessage (event) {
	        if (this.timestamp === event.data[2]) {
	            var imageData = event.data[1];
	            var canvas = this.canvas;

	            if (canvas.width !== imageData.width) {
	                canvas.width = imageData.width;
	            }
	            if (canvas.height !== imageData.height) {
	                canvas.height = imageData.height; // this flash canvas
	            }

	            canvas.getContext('2d').putImageData(imageData, 0, 0);

	            console.log("complete", performance.now() - this.timestamp);
	        }
	    };

	    return Canvas;
	}(Component));

	//Observer. = 2°, Illuminant = D65

	var filters = {
	    invert: {
	        label: 'Invert',
	        fn: 'invert',
	    },
	    grayscale: {
	        label: 'Grayscale',
	        fn: 'grayscale',
	    },
	    red: {
	        label: 'Red',
	        fn: 'red',
	    },
	    red2: {
	        label: 'Other Red',
	        fn: 'red2',
	    },
	    green: {
	        label: 'Green',
	        fn: 'green',
	    },
	    green2: {
	        label: 'Other Green',
	        fn: 'green2',
	    },
	    blue: {
	        label: 'Blue',
	        fn: 'blue',
	    },
	    blue2: {
	        label: 'Other Blue',
	        fn: 'blue2',
	    },
	    distance: {
	        label: '3D distance',
	        fn: 'distance'
	    },
	    customColor: {
	        label: 'Custom Colour',
	        fn: 'customColor'
	    },
	    wasm: {
	        label: 'WebAssembly',
	        fn: 'wasm'
	    }
	};

	var Application = /*@__PURE__*/(function (Component$$1) {
	    function Application(props) {
	        Component$$1.call(this, props);
	        this.state = {
	            image: null,
	            selectedFilter: null,
	            filters: filters,
	        };
	        this.onImageChange = this.onImageChange.bind(this);
	        this.onFilterChange = this.onFilterChange.bind(this);
	    }

	    if ( Component$$1 ) Application.__proto__ = Component$$1;
	    Application.prototype = Object.create( Component$$1 && Component$$1.prototype );
	    Application.prototype.constructor = Application;

	    Application.prototype.onImageChange = function onImageChange (image) {
	        this.setState(function(state) {
	            return Object.assign({}, state, {
	                image: image,
	            });
	        });
	    };

	    Application.prototype.onFilterChange = function onFilterChange (filter) {
	        this.setState(function(state) {
	            return Object.assign({}, state, {
	                selectedFilter: filter,
	            });
	        });
	    };

	    Application.prototype.render = function render$$1 (props, state) {
	        //const selectedFilter = state.filters[state.selectedFilter];
	        var selectedFilter = state.selectedFilter;
	        return (
	            h( 'div', null,
	                h( Form, {
	                    filters: state.filters, selectedFilter: selectedFilter, onFilterChange: this.onFilterChange, onImageChange: this.onImageChange }),
	                h( Canvas, {
	                    image: state.image, filterFn: selectedFilter })
	            )
	        );
	    };

	    return Application;
	}(Component));

	render(h( Application, null ), document.getElementById('root'));

}());
//# sourceMappingURL=app.js.map
