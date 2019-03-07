!function(){"use strict";function e(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})}"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){var n=arguments;if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var r=Object(e),o=1;o<arguments.length;o++){var i=n[o];if(null!=i)for(var l in i)Object.prototype.hasOwnProperty.call(i,l)&&(r[l]=i[l])}return r},writable:!0,configurable:!0});var t=setTimeout;function n(){}function r(e){if(!(this instanceof r))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],c(e,this)}function o(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,r._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(e){return void l(t.promise,e)}i(t.promise,r)}else(1===e._state?i:l)(t.promise,e._value)})):e._deferreds.push(t)}function i(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof r)return e._state=3,e._value=t,void u(e);if("function"==typeof n)return void c((o=n,i=t,function(){o.apply(i,arguments)}),e)}e._state=1,e._value=t,u(e)}catch(t){l(e,t)}var o,i}function l(e,t){e._state=2,e._value=t,u(e)}function u(e){2===e._state&&0===e._deferreds.length&&r._immediateFn(function(){e._handled||r._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)o(e,e._deferreds[t]);e._deferreds=null}function a(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function c(e,t){var n=!1;try{e(function(e){n||(n=!0,i(t,e))},function(e){n||(n=!0,l(t,e))})}catch(e){if(n)return;n=!0,l(t,e)}}r.prototype.catch=function(e){return this.then(null,e)},r.prototype.then=function(e,t){var r=new this.constructor(n);return o(this,new a(e,t,r)),r},r.prototype.finally=e,r.all=function(e){return new r(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);var o=r.length;function i(e,l){try{if(l&&("object"==typeof l||"function"==typeof l)){var u=l.then;if("function"==typeof u)return void u.call(l,function(t){i(e,t)},n)}r[e]=l,0==--o&&t(r)}catch(e){n(e)}}for(var l=0;l<r.length;l++)i(l,r[l])})},r.resolve=function(e){return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.race=function(e){return new r(function(t,n){for(var r=0,o=e.length;r<o;r++)e[r].then(t,n)})},r._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){t(e,0)},r._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)};var f=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if("undefined"!=typeof global)return global;throw new Error("unable to locate global object")}();"Promise"in f?f.Promise.prototype.finally||(f.Promise.prototype.finally=e):f.Promise=r;var s,p,d,h={},y=[],_=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function v(e,t){for(var n in t)e[n]=t[n];return e}function g(e,t,n){var r,o,i,l,u=arguments;if(null==t&&(t={}),arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(u[r]);if(null!=n&&(t.children=n),null!=e&&null!=e.defaultProps)for(o in e.defaultProps)void 0===t[o]&&(t[o]=e.defaultProps[o]);return(i=t.ref)&&delete t.ref,(l=t.key)&&delete t.key,m(e,t,null,l,i)}function m(e,t,n,r,o){var i={type:e,props:t,text:n,key:r,ref:o,__k:null,__e:null,l:null,__c:null};return s.vnode&&s.vnode(i),i}function b(){}function w(e){return null==e||"boolean"==typeof e?null:"string"==typeof e||"number"==typeof e?m(null,null,e,null,null):Array.isArray(e)?g(b,null,e):null!=e.__e?m(e.type,e.props,e.text,e.key,null):e}function E(e,t){this.props=e,this.context=t}function O(e){!e.__d&&(e.__d=!0)&&1===p.push(e)&&(s.debounceRendering||d)(j)}function j(){for(var e;e=p.pop();)e.__d&&e.forceUpdate()}function S(e,t,n,r,o,i,l,u){var a,c,f,s,p,d,_,v,g,m,E=k(t),O=null==n||n==h?y:k(n),j=O.length,S=O.length?O[0]&&O[0].__e:null;if(null!=i)for(c=0;c<i.length;c++)if(null!=i[c]){S=i[c];break}for(c=0;c<E.length;c++){if(a=E[c]=w(E[c]),d=p=null,null!=(s=O[c])&&(null==a.key&&null==s.key?a.type===s.type:a.key===s.key))p=c;else for(f=0;f<j;f++)if(null!=(s=O[f])&&(null==a.key&&null==s.key?a.type===s.type:a.key===s.key)){p=f;break}if(null!=p&&(d=O[p],O[p]=null),v=null!=S&&S.nextSibling,_=R(null==d?null:d.__e,e,a,d,r,o,i,l,u),null!=a&&null!=_){if(m=document.activeElement,null!=a.l)_=a.l;else if(i==d||_!=S||null==_.parentNode)e:if(null==S||S.parentNode!==e)e.appendChild(_);else{for(g=S,f=0;(g=g.nextSibling)&&f++<j/2;)if(g===_)break e;e.insertBefore(_,S)}m!==document.activeElement&&m.focus(),S=null!=_?_.nextSibling:v}}if(null!=i&&t.type!==b)for(c=i.length;c--;)null!=i[c]&&i[c].remove();for(c=O.length;c--;)null!=O[c]&&C(O[c],u)}function k(e){return null==e.__k&&function e(t,n){if(null==n&&(n=[]),null==t||"boolean"==typeof t);else if(Array.isArray(t))for(var r=0;r<t.length;r++)e(t[r],n);else n.push(w(t));return n}(e.props.children,e.__k=[]),e.__k}function x(e,t,n,r,o){var i,l,u,a,c,f;if("class"!==t&&"className"!==t||(t=o?"class":"className"),"style"===t){if(l=e.style,"string"==typeof n)l.cssText=n;else for(u in"string"==typeof r&&(l.cssText=""),r)null!=n&&u in n||l.setProperty(u,"");for(a in n)i=n[a],null!=r&&i===r[a]||l.setProperty(a.replace(/-?(?=[A-Z])/g,"-"),"number"==typeof i&&!1===_.test(a)?i+"px":i)}else"dangerouslySetInnerHTML"===t?n&&r&&n.__html==r.__html||(e.innerHTML=n&&n.__html||""):"o"===t[0]&&"n"===t[1]?(c=t!==(t=t.replace(/Capture$/,"")),f=t.toLowerCase(),t=(f in e?f:t).substring(2),n?r||e.addEventListener(t,I,c):e.removeEventListener(t,I,c),(e.n||(e.n={}))[t]=n):"list"!==t&&!o&&t in e?e[t]=null==n?"":n:null==n||!1===n?e.removeAttribute(t):"function"!=typeof n&&e.setAttribute(t,n)}function I(e){return this.n[e.type](s.event?s.event(e):e)}function R(e,t,n,r,o,i,l,u,a){var c,f,p,d,y,_,g,m,O,j,k,x,I,P;if(null==r||null==n||r.type!==n.type){if(null!=r&&C(r,a),null==n)return null;e=null,r=h}s.diff&&s.diff(n),p=!1,g=n.type;try{e:if(r.type===b||g===b)S(t,n,r,o,i,l,u,c),n.__k.length&&(e=n.__k[0].__e,n.l=n.__k[n.__k.length-1].__e);else if("function"==typeof g){if(j=(O=g.contextType)&&o[O.__c],k=null!=O?j?j.props.value:O.__p:o,r.__c?m=(c=n.__c=r.__c).__p:(p=!0,g.prototype&&g.prototype.render?n.__c=c=new g(n.props,k):(n.__c=c=new E(n.props,k),c.constructor=g,c.render=A),c.__a=a,j&&j.sub(c),c.props=n.props,c.state||(c.state={}),c.context=k,c.__n=o,c.__d=!0,c.__h=[]),c.__v=n,x=c.__s||c.state,null!=g.getDerivedStateFromProps&&(y=v({},c.state),x===c.state&&(x=v({},x)),v(x,g.getDerivedStateFromProps(n.props,x))),p)null==g.getDerivedStateFromProps&&null!=c.componentWillMount&&c.componentWillMount(),null!=c.componentDidMount&&u.push(c);else{if(!c.u&&null!=c.shouldComponentUpdate&&!1===c.shouldComponentUpdate(n.props,x,k)){c.__d=!1;break e}null==g.getDerivedStateFromProps&&null==c.u&&null!=c.componentWillReceiveProps&&c.componentWillReceiveProps(n.props,k),null!=c.componentWillUpdate&&c.componentWillUpdate(n.props,x,k)}d=c.props,y||(y=c.state),_=c.context=k,c.props=n.props,c.state=x,s.render&&s.render(n),I=c.__t,P=c.__t=w(c.render(c.props,c.state,c.context)),c.__d=!1,null!=c.getChildContext&&(o=v(v({},o),c.getChildContext())),p||null==c.getSnapshotBeforeUpdate||(_=c.getSnapshotBeforeUpdate(d,y)),c.base=e=R(e,t,P,I,o,i,l,u,c),null!=P&&(n.l=P.l),c.t=t,n.ref&&N(n.ref,c,a)}else e=T(e,n,r,o,i,l,u,a),n.ref&&r.ref!==n.ref&&N(n.ref,e,a);if(n.__e=e,null!=c){for(;f=c.__h.pop();)f();p||null==d||null==c.componentDidUpdate||c.componentDidUpdate(d,y,_)}m&&(c.__p=null),s.diffed&&s.diffed(n)}catch(e){D(e,a)}return e}function P(e,t){for(var n;n=e.pop();)try{n.componentDidMount()}catch(e){D(e,n.__a)}s.commit&&s.commit(t)}function T(e,t,n,r,o,i,l,u){var a,c,f,s,p=e;if(o=o?"foreignObject"!==t.type:"svg"===t.type,null==e&&null!=i)for(a=0;a<i.length;a++)if(null!=(c=i[a])&&(null===t.type?3===c.nodeType:c.localName===t.type)){e=c,i[a]=null;break}if(null==e&&(e=null===t.type?document.createTextNode(t.text):o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type),i=null),t.__e=e,null===t.type)null!==p&&e!==p||t.text===n.text||(e.data=t.text);else{if(null!=i&&null!=e.childNodes&&(i=y.slice.call(e.childNodes)),t!==n){if(null==(f=n.props)&&(f={},null!=i))for(s=0;s<e.attributes.length;s++)f[e.attributes[s].name]=e.attributes[s].value;!function(e,t,n,r){var o,i;for(o in t)"children"===o||"key"===o||n&&n[o]==t[o]||x(e,o,t[o],n[o],r);for(i in n)"children"===i||"key"===i||t&&i in t||x(e,i,null,n[i],r)}(e,t.props,f,o)}S(e,t,n,r,o,i,l,u)}return e}function N(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){D(e,n)}}function C(e,t){var n,r;if(s.unmount&&s.unmount(e),(n=e.ref)&&N(n,null,t),null!=(n=e.__e)&&n.remove(),e.__e=e.l=null,null!=(n=e.__c)){if(n.componentWillUnmount)try{n.componentWillUnmount()}catch(e){D(e,t)}n.base=n.t=null,(n=n.__t)&&C(n,t)}else if(n=e.__k)for(r=0;r<n.length;r++)C(n[r],t)}function A(e,t,n){return this.constructor(e,n)}function D(e,t){for(;t;t=t.__a)if(!t.__p)try{if(null!=t.constructor.getDerivedStateFromError)t.setState(t.constructor.getDerivedStateFromError(e));else{if(null==t.componentDidCatch)continue;t.componentDidCatch(e)}return O(t.__p=t)}catch(t){e=t}throw e}function U(e){var t,n,r=e.prototype;if(!r||!r.render)return e.__scuWrap||(e.__scuWrap=(t=e,(n=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(L)).prototype.renderChild=t,n));r.shouldComponentUpdate=F}s={},E.prototype.setState=function(e,t){var n=this.__s!==this.state&&this.__s||(this.__s=v({},this.state));this.i=v({},n),("function"!=typeof e||(e=e(n,this.props)))&&v(n,e),null!=e&&(null!=t&&this.__h.push(t),this.u=!1,O(this))},E.prototype.forceUpdate=function(e){var t,n=this.__v,r=this.__v.__e,o=this.t;null!=o&&(null==this.u&&(this.u=!0),null!=(r=R(r,o,n,n,this.__n,void 0!==o.ownerSVGElement,null,t=[],this.__a))&&r.parentNode!==o&&o.appendChild(r),P(t,n),this.u=null),null!=e&&e()},E.prototype.render=b,p=[],d="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;var L=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.shouldComponentUpdate=function(e){return G(e,this.props)},t.prototype.render=function(e,t,n){return this.renderChild(e,n)},t}(E);function F(e,t){return G(e,this.props)||G(t,this.state)}function G(e,t){for(var n in e)if(e[n]!==t[n])return!0;for(var r in t)if(!(r in e))return!0;return!1}function M(e){e.stopPropagation(),e.preventDefault()}function W(e){M(e),e.currentTarget.classList.add("highlight")}function B(e){var t=new FileReader;return t.onloadend=function(){e.src=t.result},function(e){M(e),t.readAsDataURL(e.dataTransfer.files[0])}}function H(e){M(e),e.currentTarget.classList.remove("highlight")}function Y(e){return function(t){var n=t.target.files[0];n&&(e.src=URL.createObjectURL(n))}}var V=U(function(e){var t,n=new Image;return n.onload=(t=e.onChange,function(e){var n=e.target;t(n),URL.revokeObjectURL(n.src),n.src=null}),g("div",{class:"drop-target",onDragEnter:W,onDragOver:W,onDrop:B(n),onDragLeave:H},"Drag & drop or"," ",g("label",null,"click here to select ",g("input",{id:"file",type:"file",onChange:Y(n),accept:"image/*",hidden:!0}))," ","an image")});function K(e,t){var n=e.getContext("2d");t&&(e.width!==t.width&&(e.width=t.width),e.height!==t.height&&(e.height=t.height),n.putImageData(t,0,0))}var $=U(function(e){return g("canvas",{ref:e.getRef,style:{maxWidth:"100%",height:"auto"}})}),z=function(e){function t(t){var n=this;e.call(this,t),this.getRef=function(e){return n.el=e}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.shouldComponentUpdate=function(e){return G(this.props,e)},t.prototype.render=function(){return g($,{getRef:this.getRef})},t.prototype.componentDidMount=function(){K(this.el,this.props.image)},t.prototype.componentDidUpdate=function(){K(this.el,this.props.image)},t}(E);var Z=U(function(e){var t=e.filter;return void 0===t.thumbnail?null:g("button",{class:e.selected&&"selected",onClick:function(){return e.onSelect(t.fn)}},g("span",null,t.label),g(z,{image:t.thumbnail,filter:t.fn}))});var q=U(function(e){return g("div",{class:"filters"},e.filters.map(function(t){return g(Z,{key:t.fn,filter:t,selected:t.fn===e.selected,onSelect:e.onSelect})}))}),J=U(function(e){var t=e.filters;return 0===t.length?null:g(q,{filters:t,selected:e.selected,onSelect:e.onSelect})}),Q=U(function(e){return!0===e.show?g("div",{class:"mask"},g("span",null,g("img",{src:"dist/assets/loader.svg",width:"100"}))):null}),X=U(function(e){return g("div",{class:"loader"},e.children,g(Q,{show:e.loading}))});var ee=function(e){var t,n=e.Symbol;return"function"==typeof n?n.observable?t=n.observable:(t=n("observable"),n.observable=t):t="@@observable",t}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof module?module:Function("return this")()),te=function(){return Math.random().toString(36).substring(7).split("").join(".")},ne={INIT:"@@redux/INIT"+te(),REPLACE:"@@redux/REPLACE"+te(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+te()}};function re(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function oe(e,t,n){var r=document.createElement("canvas"),o=r.getContext("2d"),i=e.width,l=e.height;return t=void 0===t?i:t,n=void 0===n?l:n,r.width=t,r.height=n,o.drawImage(e,0,0,i,l,0,0,t,n),o.getImageData(0,0,t,n)}var ie=100;function le(e){return oe(e,Math.round(e.width*ie/e.height),ie)}var ue=new Worker("dist/web-worker.js"),ae={};function ce(e){var t=e.image,n=e.filter,r=e.color,o=e.threshold;return new Promise(function(e,i){var l=n+"_"+performance.now()+Math.random();ae[l]={resolve:e,reject:i},ue.postMessage([t,n,r,o,l])})}ue.onmessage=function(e){var t=e.data,n=Array.isArray(t)?t[4]:-1,r=ae[n];void 0!==r&&(r.resolve(t[0]),delete ae[n])},ue.onerror=function(e){};var fe="FILTER_CHANGE",se="IMAGE_CHANGE",pe="IMAGE_FILTER_DONE",de="THUMBNAIL_FILTER_DONE";var he={image:null,filteredImage:null,thumbnail:null,filter:"ORIGINAL",applyingFilter:!1,filters:[{label:"Original",fn:"ORIGINAL"},{label:"Invert",fn:"INVERT"},{label:"Grayscale",fn:"GRAYSCALE"},{label:"Red Tone",fn:"RED_TONE"},{label:"Red",fn:"RED"},{label:"Green Tone",fn:"GREEN_TONE"},{label:"Green",fn:"GREEN"},{label:"Blue Tone",fn:"BLUE_TONE"},{label:"Blue",fn:"BLUE"},{label:"Hue",fn:"HUE"},{label:"Saturation",fn:"SATURATION"},{label:"Lightness",fn:"LIGHTNESS"}]},ye=function e(t,n,r){var o;if("function"==typeof n&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function");if("function"==typeof n&&void 0===r&&(r=n,n=void 0),void 0!==r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function.");return r(e)(t,n)}if("function"!=typeof t)throw new Error("Expected the reducer to be a function.");var i=t,l=n,u=[],a=u,c=!1;function f(){a===u&&(a=u.slice())}function s(){if(c)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return l}function p(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(c)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");var t=!0;return f(),a.push(e),function(){if(t){if(c)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");t=!1,f();var n=a.indexOf(e);a.splice(n,1)}}}function d(e){if(!function(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(c)throw new Error("Reducers may not dispatch actions.");try{c=!0,l=i(l,e)}finally{c=!1}for(var t=u=a,n=0;n<t.length;n++)(0,t[n])();return e}return d({type:ne.INIT}),(o={dispatch:d,subscribe:p,getState:s,replaceReducer:function(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");i=e,d({type:ne.REPLACE})}})[ee]=function(){var e,t=p;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function n(){e.next&&e.next(s())}return n(),{unsubscribe:t(n)}}})[ee]=function(){return this},e},o}(function(e,t){void 0===e&&(e=he);var n=t.data;switch(t.type){case fe:return Object.assign({},e,{filter:n,applyingFilter:!0});case se:return function(e,t){var n=oe(t),r=le(t);return Object.assign({},e,{image:n,thumbnail:r,filter:"ORIGINAL",filters:e.filters.map(function(e){return Object.assign({},e,{thumbnail:r})}),filteredImage:n})}(e,n);case pe:return Object.assign({},e,{filteredImage:n,applyingFilter:!1});case de:return Object.assign({},e,{filters:n})}return e},function(){for(var e=arguments,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=e[r];return function(e){return function(){var t=e.apply(void 0,arguments),r=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},o={getState:t.getState,dispatch:function(){return r.apply(void 0,arguments)}},i=n.map(function(e){return e(o)});return function(e){for(var t=arguments,n=1;n<arguments.length;n++){var r=null!=t[n]?t[n]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),o.forEach(function(t){re(e,t,r[t])})}return e}({},t,{dispatch:r=function(){for(var e=arguments,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=e[r];return 0===n.length?function(e){return e}:1===n.length?n[0]:n.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}.apply(void 0,i)(t.dispatch)})}}}(function(e){return function(t){return function(n){var r,o=e.getState(),i=n.data;switch(n.type){case se:r=le(i),Promise.all(o.filters.map(function(e){return ce({filter:e.fn,image:r})})).then(function(e){t({type:de,data:o.filters.map(function(t,n){return Object.assign({},t,{thumbnail:e[n]})})})});break;case fe:setTimeout(function(){ce({filter:i,image:o.image}).then(function(e){return t({type:pe,data:e})})})}t(n)}}})),_e=function(e){function t(t){e.call(this,t),this.state=ye.getState()}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.componentDidMount=function(){var e=this;ye.subscribe(function(){return e.setState(ye.getState())})},t.prototype.onImageChange=function(e){ye.dispatch({type:se,data:e})},t.prototype.onFilterChange=function(e){e!==ye.getState().filter&&ye.dispatch({type:fe,data:e})},t.prototype.render=function(e,t){return g("main",null,g(V,{onChange:this.onImageChange}),g(X,{loading:t.applyingFilter},g(z,{image:t.filteredImage})),g(J,{filters:t.filters,selected:t.filter,onSelect:this.onFilterChange}))},t}(E);!function(e,t){var n,r=t.__t;e=g(b,null,[e]),n=[],S(t,t.__t=e,r,h,void 0!==t.ownerSVGElement,r?null:y.slice.call(t.childNodes),n,e),P(n,e)}(g(_e,null),document.getElementById("root"))}();
//# sourceMappingURL=app.js.map
