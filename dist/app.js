!function(){"use strict";"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){var n=arguments;if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var o=Object(e),r=1;r<arguments.length;r++){var a=n[r];if(null!=a)for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(o[i]=a[i])}return o},writable:!0,configurable:!0});var e=function(){},t={},n=[],o=[];function r(t,r){var a,i,l,s,u=arguments,p=o;for(s=arguments.length;s-- >2;)n.push(u[s]);for(r&&null!=r.children&&(n.length||n.push(r.children),delete r.children);n.length;)if((i=n.pop())&&void 0!==i.pop)for(s=i.length;s--;)n.push(i[s]);else"boolean"==typeof i&&(i=null),(l="function"!=typeof t)&&(null==i?i="":"number"==typeof i?i=String(i):"string"!=typeof i&&(l=!1)),l&&a?p[p.length-1]+=i:p===o?p=[i]:p.push(i),a=l;var c=new e;return c.nodeName=t,c.children=p,c.attributes=null==r?void 0:r,c.key=null==r?void 0:r.key,c}function a(e,t){for(var n in t)e[n]=t[n];return e}function i(e,t){null!=e&&("function"==typeof e?e(t):e.current=t)}var l="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,s=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,u=[];function p(e){!e._dirty&&(e._dirty=!0)&&1==u.push(e)&&l(c)}function c(){for(var e;e=u.pop();)e._dirty&&O(e)}function f(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function h(e){var t=a({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function d(e){var t=e.parentNode;t&&t.removeChild(e)}function v(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)i(n,null),i(o,e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var a in n)a in o||(e.style[a]="");for(var a in o)e.style[a]="number"==typeof o[a]&&!1===s.test(a)?o[a]+"px":o[a]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var l=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,g,l):e.removeEventListener(t,g,l),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e){try{e[t]=null==o?"":o}catch(e){}null!=o&&!1!==o||"spellcheck"==t||e.removeAttribute(t)}else{var u=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?u?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(u?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function g(e){return this._listeners[e.type](e)}var m=[],_=0,y=!1,C=!1;function b(){for(var e;e=m.shift();)e.componentDidMount&&e.componentDidMount()}function w(e,t,n,o,r,a){_++||(y=null!=r&&void 0!==r.ownerSVGElement,C=null!=e&&!("__preactattr_"in e));var i=x(e,t,n,o,a);return r&&i.parentNode!==r&&r.appendChild(i),--_||(C=!1,a||b()),i}function x(e,t,n,o,r){var a=e,i=y;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(a=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(a,e),k(e,!0))),a.__preactattr_=!0,a;var l,s,u=t.nodeName;if("function"==typeof u)return function(e,t,n,o){var r=e&&e._component,a=r,i=e,l=r&&e._componentConstructor===t.nodeName,s=l,u=h(t);for(;r&&!s&&(r=r._parentComponent);)s=r.constructor===t.nodeName;r&&s&&(!o||r._component)?(I(r,u,3,n,o),e=r.base):(a&&!l&&(T(a),e=i=null),r=S(t.nodeName,u,n),e&&!r.nextBase&&(r.nextBase=e,i=null),I(r,u,1,n,o),e=r.base,i&&e!==i&&(i._component=null,k(i,!1)));return e}(e,t,n,o);if(y="svg"===u||"foreignObject"!==u&&y,u=String(u),(!e||!f(e,u))&&(l=u,(s=y?document.createElementNS("http://www.w3.org/2000/svg",l):document.createElement(l)).normalizedNodeName=l,a=s,e)){for(;e.firstChild;)a.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(a,e),k(e,!0)}var p=a.firstChild,c=a.__preactattr_,g=t.children;if(null==c){c=a.__preactattr_={};for(var m=a.attributes,_=m.length;_--;)c[m[_].name]=m[_].value}return!C&&g&&1===g.length&&"string"==typeof g[0]&&null!=p&&void 0!==p.splitText&&null==p.nextSibling?p.nodeValue!=g[0]&&(p.nodeValue=g[0]):(g&&g.length||null!=p)&&function(e,t,n,o,r){var a,i,l,s,u,p=e.childNodes,c=[],h={},v=0,g=0,m=p.length,_=0,y=t?t.length:0;if(0!==m)for(var C=0;C<m;C++){var b=p[C],w=b.__preactattr_,N=y&&w?b._component?b._component.__key:w.key:null;null!=N?(v++,h[N]=b):(w||(void 0!==b.splitText?!r||b.nodeValue.trim():r))&&(c[_++]=b)}if(0!==y)for(var C=0;C<y;C++){s=t[C],u=null;var N=s.key;if(null!=N)v&&void 0!==h[N]&&(u=h[N],h[N]=void 0,v--);else if(g<_)for(a=g;a<_;a++)if(void 0!==c[a]&&(M=i=c[a],U=r,"string"==typeof(S=s)||"number"==typeof S?void 0!==M.splitText:"string"==typeof S.nodeName?!M._componentConstructor&&f(M,S.nodeName):U||M._componentConstructor===S.nodeName)){u=i,c[a]=void 0,a===_-1&&_--,a===g&&g++;break}u=x(u,s,n,o),l=p[C],u&&u!==e&&u!==l&&(null==l?e.appendChild(u):u===l.nextSibling?d(l):e.insertBefore(u,l))}var M,S,U;if(v)for(var C in h)void 0!==h[C]&&k(h[C],!1);for(;g<=_;)void 0!==(u=c[_--])&&k(u,!1)}(a,g,n,o,C||null!=c.dangerouslySetInnerHTML),function(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||v(e,o,n[o],n[o]=void 0,y);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||v(e,o,n[o],n[o]=t[o],y)}(a,t.attributes,c),y=i,a}function k(e,t){var n=e._component;n?T(n):(null!=e.__preactattr_&&i(e.__preactattr_.ref,null),!1!==t&&null!=e.__preactattr_||d(e),N(e))}function N(e){for(e=e.lastChild;e;){var t=e.previousSibling;k(e,!0),e=t}}var M=[];function S(e,t,n){var o,r=M.length;for(e.prototype&&e.prototype.render?(o=new e(t,n),j.call(o,t,n)):((o=new j(t,n)).constructor=e,o.render=U);r--;)if(M[r].constructor===e)return o.nextBase=M[r].nextBase,M.splice(r,1),o;return o}function U(e,t,n){return this.constructor(e,n)}function I(e,n,o,r,a){e._disable||(e._disable=!0,e.__ref=n.ref,e.__key=n.key,delete n.ref,delete n.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||a?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(n,r)),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=n,e._disable=!1,0!==o&&(1!==o&&!1===t.syncComponentUpdates&&e.base?p(e):O(e,1,a)),i(e.__ref,e))}function O(e,t,n,o){if(!e._disable){var r,i,l,s=e.props,u=e.state,p=e.context,c=e.prevProps||s,f=e.prevState||u,d=e.prevContext||p,v=e.base,g=e.nextBase,y=v||g,C=e._component,x=!1,N=d;if(e.constructor.getDerivedStateFromProps&&(u=a(a({},u),e.constructor.getDerivedStateFromProps(s,u)),e.state=u),v&&(e.props=c,e.state=f,e.context=d,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(s,u,p)?x=!0:e.componentWillUpdate&&e.componentWillUpdate(s,u,p),e.props=s,e.state=u,e.context=p),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!x){r=e.render(s,u,p),e.getChildContext&&(p=a(a({},p),e.getChildContext())),v&&e.getSnapshotBeforeUpdate&&(N=e.getSnapshotBeforeUpdate(c,f));var M,U,j=r&&r.nodeName;if("function"==typeof j){var B=h(r);(i=C)&&i.constructor===j&&B.key==i.__key?I(i,B,1,p,!1):(M=i,e._component=i=S(j,B,p),i.nextBase=i.nextBase||g,i._parentComponent=e,I(i,B,0,p,!1),O(i,1,n,!0)),U=i.base}else l=y,(M=C)&&(l=e._component=null),(y||1===t)&&(l&&(l._component=null),U=w(l,r,p,n||!v,y&&y.parentNode,!0));if(y&&U!==y&&i!==C){var L=y.parentNode;L&&U!==L&&(L.replaceChild(U,y),M||(y._component=null,k(y,!1)))}if(M&&T(M),e.base=U,U&&!o){for(var P=e,W=e;W=W._parentComponent;)(P=W).base=U;U._component=P,U._componentConstructor=P.constructor}}for(!v||n?m.push(e):x||e.componentDidUpdate&&e.componentDidUpdate(c,f,N);e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);_||o||b()}}function T(e){var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?T(n):t&&(null!=t.__preactattr_&&i(t.__preactattr_.ref,null),e.nextBase=t,d(t),M.push(e),N(t)),i(e.__ref,null)}function j(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}a(j.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=a(a({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),p(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),O(this,2)},render:function(){}});var B={original:{label:"Original",fn:"original"},invert:{label:"Invert",fn:"invert"},grayscale:{label:"Grayscale",fn:"grayscale"},red:{label:"Red Tone",fn:"red"},red2:{label:"Other Red",fn:"red2"},green:{label:"Green Tone",fn:"green"},green2:{label:"Other Green",fn:"green2"},blue:{label:"Blue Tone",fn:"blue"},blue2:{label:"Other Blue",fn:"blue2"},distance3d:{label:"Custom Colour",fn:"distance3d"},contrast:{label:"Contrast",fn:"contrast"},hue:{label:"Hue",fn:"hue"}};function L(e){if(!e.prototype||!e.prototype.render)return e.__scuWrap||(e.__scuWrap=(t=e,(n=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(P)).prototype.renderChild=t,n));var t,n;e.prototype.shouldComponentUpdate=W}var P=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.shouldComponentUpdate=function(e){return D(e,this.props)},t.prototype.render=function(e,t,n){return this.renderChild(e,n)},t}(j);function W(e,t){return D(e,this.props)||D(t,this.state)}function D(e,t){for(var n in e)if(e[n]!==t[n])return!0;for(var o in t)if(!(o in e))return!0;return!1}var R=L(function(e){return r("select",{value:e.value,onChange:e.onChange},Object.keys(B).map(function(e){return r("option",{value:e,key:e},B[e].label)}))}),F=L(function(e){return r("input",{type:"color",value:e.value,onChange:e.onChange})});var E=L(function(e){return e.min===e.max?null:function(e){return r("label",null,"Threshold: ",r("input",{type:"range",id:"threshold",min:e.min,max:e.max,value:e.value,onChange:e.onChange}),e.value)}(e)});function A(e){return function(t){var n=t.target;e(function(e){var t=document.createElement("canvas"),n=t.getContext("2d"),o=e.width,r=e.height;return t.width=o,t.height=r,n.drawImage(e,0,0),n.getImageData(0,0,o,r)}(n)),URL.revokeObjectURL(n.src)}}function V(e){return function(t){var n=t.target.files[0];n&&(e.src=URL.createObjectURL(n))}}var H=L(function(e){var t=new Image;return t.onload=A(e.onChange),r("input",{type:"file",onChange:V(t)})});function G(e){return void 0===e?"":e.toString(16)}function z(e){return(1===e.length?"0":"")+e}L(function(e){var t=e.count||36,n=360/t;return r("div",null,new Array(t).join("-").split("-").map(function(e,t){var o,a,i,l,s=(o=function(e,t,n){var o,r,a,i=(1-Math.abs(2*n-1))*t,l=i*(1-Math.abs(e/60%2-1)),s=n-i/2;return e>=0&&e<60?(o=i,r=l,a=0):e>=60&&e<120?(o=l,r=i,a=0):e>=120&&e<180?(o=0,r=i,a=l):e>=180&&e<240?(o=0,r=l,a=i):e>=240&&e<300?(o=l,r=0,a=i):e>=300&&e<360?(o=i,r=0,a=l):o=r=a=0,new Uint8Array([255*(o+s),255*(r+s),255*(a+s)])}(t*n,1,.5),"#"+z(G((l="function"==typeof o.forEach?o:[o,a,i])[0]))+z(G(l[1]))+z(G(l[2])));return r("div",{style:{backgroundColor:s}},s)}))});var $=L(function(e){return r("form",{onSubmit:function(e){return e.preventDefault()},style:{display:"flex",flexWrap:"wrap"}},r(H,{onChange:e.onImageChange}),r(R,{value:e.filter,onChange:e.onFilterChange}),(t=e.showColor,n=e.color,o=e.onColorChange,!0===t?r(F,{value:n,onChange:o}):null),r(E,{min:e.thresholdMin,max:e.thresholdMax,value:e.threshold,onChange:e.onThresholdChange}));var t,n,o});var q=function(e){function t(t){e.call(this,t);this.worker=function(e){if(window.Worker){var t=new Worker("dist/web-worker.js");return t.onmessage=e.onmessage,t.onerror=e.onerror,t}}({onmessage:this.onMessage.bind(this),onerror:function(e){return console.log(e)}})}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){return null},t.prototype.componentWillUnmount=function(){this.worker&&this.worker.terminate()},t.prototype.shouldComponentUpdate=function(e){return D(this.props,e)},t.prototype.componentDidUpdate=function(){var e=this.props;this.postMessage(e.image,e.filter,e.color,e.threshold)},t.prototype.postMessage=function(e,t,n,o){null!==e&&this.worker.postMessage([e,t,n,o,this.timestamp=performance.now()])},t.prototype.onMessage=function(e){this.timestamp===e.data[4]&&this.props.onFilterImage(e.data[0])},t}(j),J=L(function(e){return console.log("canvas dom"),r("canvas",{ref:e.getRef,style:{maxWidth:"100%",height:"auto"}})});var K=function(e){function t(t){var n=this;e.call(this,t),this.getRef=function(e){return n.canvas=e}}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.shouldComponentUpdate=function(e){return D(this.props,e)},t.prototype.render=function(){return r(J,{getRef:this.getRef})},t.prototype.componentDidUpdate=function(){var e,t,n;e=this.canvas,t=this.props.image,n=e.getContext("2d"),t&&(e.width!==t.width&&(e.width=t.width),e.height!==t.height&&(e.height=t.height),n.putImageData(t,0,0))},t}(j),Q={image:null,filter:"original",filteredImage:null,color:"#ffff00",showColor:!1,threshold:0,thresholdMin:0,thresholdMax:0};var X,Y,Z,ee=function(e,t){return function(n){return e.setState(function(e){return function(e,t,n){var o={};switch(e){case"filter":o=function(e){var t=e.target.value,n=8,o=255,r=!1;switch(t){case"original":case"invert":case"grayscale":case"red":case"green":case"blue":n=o=0;break;case"distance3d":n=382,o=765,r=!0;break;case"hue":n=30,o=360,r=!0}return{filter:t,threshold:n,thresholdMax:o,showColor:r}}(t);break;case"filteredImage":case"image":o[e]=t;break;default:o[e]=t.target.value}return Object.assign({},n,o)}(t,n,e)})}},te=function(e){function t(t){e.call(this,t);var n=this;n.state=Q,n.onImageChange=ee(n,"image"),n.onFilterChange=ee(n,"filter"),n.onColorChange=ee(n,"color"),n.onThresholdChange=ee(n,"threshold"),n.onFilterImage=ee(n,"filteredImage")}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(e,t){var n=this;return r("div",null,r($,{filter:t.filter,color:t.color,showColor:t.showColor,threshold:t.threshold,thresholdMin:t.thresholdMin,thresholdMax:t.thresholdMax,onFilterChange:n.onFilterChange,onImageChange:n.onImageChange,onColorChange:n.onColorChange,onThresholdChange:n.onThresholdChange}),r(K,{image:t.filteredImage}),r(q,{image:t.image,filter:t.filter,color:t.color,threshold:t.threshold,onFilterImage:n.onFilterImage}))},t}(j);X=r(te,null),Y=document.getElementById("root"),w(Z,X,{},!1,Y,!1)}();
//# sourceMappingURL=app.js.map
