!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define("lape",["React"],t):"object"==typeof exports?exports.lape=t(require("react")):e.lape=t(e.React)}(window,function(e){return function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/dist/",r(r.s=1)}([function(t,r){t.exports=e},function(e,t,r){"use strict";r.r(t);var s=new class{constructor(){this.listenersGet=[],this.listenersSet=[],this.addGet=(e=>{this.listenersGet.push(e)}),this.removeGet=(e=>{this.listenersGet=this.listenersGet.filter(t=>t!==e)}),this.triggerGet=((e,t)=>{this.listenersGet.length&&(0,this.listenersGet[this.listenersGet.length-1])(e,t)}),this.addSet=(e=>{this.listenersSet.push(e)}),this.removeSet=(e=>{this.listenersSet=this.listenersSet.filter(t=>t!==e)}),this.timeout=null,this.dataChanged=new Map,this.triggerSet=((e,t,r,s,n)=>{if(this.dataChanged.has(e)){const r=this.dataChanged.get(e);r.props.push(t),r.next=n}else this.dataChanged.set(e,{props:[t],receiver:r,previous:s,next:n});this.timeout||(this.timeout=setTimeout(()=>{this.listenersSet.forEach(e=>e(this.dataChanged)),this.timeout=null,this.dataChanged=new Map},0))})}},n=r(0);const i=({bestHackEver:e})=>(e(),null),o=e=>{return class extends n.PureComponent{constructor(e){super(e),this.trackProp=new WeakMap,this.trackAll=new WeakSet,this.startTracking=(()=>{s.addGet(this.trackGet),this.sideEffectPhase=!0,this.trackProp=new WeakMap}),this.trackGet=((e,t)=>{if(this.sideEffectPhase){if(void 0===t)return void this.trackAll.add(e);const r=this.trackProp.get(e);if(r){if(r.includes(t))return;return void r.push(t)}this.trackProp.set(e,[t])}}),this.trackSet=(e=>{if(this.sideEffectPhase)throw new Error("SET cannot be called while resolving a side effect as it might trigger an infinite loop");e.forEach(({props:e},t)=>{const r=this.trackProp.get(t);(this.trackAll.has(t)||r&&r.some(t=>e.includes(t)))&&this.forceUpdate()})}),this.stopTracking=(()=>{s.removeGet(this.trackGet),this.sideEffectPhase=!1}),s.addSet(this.trackSet)}componentWillUnmount(){s.removeSet(this.trackSet)}render(){return this.startTracking(),n.createElement(n.Fragment,null,n.createElement(e,Object.assign({},this.props)),n.createElement(i,{bestHackEver:this.stopTracking}))}}},a=new WeakSet,c=new WeakMap,l={get:(e,t)=>{if(0===s.listenersGet.length)return Reflect.get(e,t);const r=typeof e;if("object"===r&&null!==e){return Array.isArray(e)&&("symbol"==typeof t||isNaN(t))?(s.triggerGet(e),Reflect.get(e,t)):(s.triggerGet(e,t),Reflect.get(e,t))}return"string"===r||"number"===r||"boolean"===r?Reflect.get(e,t):void 0},ownKeys:e=>0===s.listenersGet.length?Reflect.ownKeys(e):(s.triggerGet(e),Reflect.ownKeys(e)),set:(e,t,r,n)=>{"object"!=typeof r||null===r||a.has(r)||(r=u(r));const i=Array.isArray(e)?e.slice():Object.assign({},e);Reflect.set(e,t,r);const o=Array.isArray(e)?e.slice():Object.assign({},e);return s.triggerSet(e,t,n,i,o),!0},deleteProperty(e,t){const r=Array.isArray(e)?e.slice():Object.assign({},e);Reflect.deleteProperty(e,t);const n=Array.isArray(e)?e.slice():Object.assign({},e);return s.triggerSet(e,t,c.get(e),r,n),!0}},u=e=>{if(Object.keys(e).forEach(t=>{a.has(e)||"object"==typeof e[t]&&null!==e[t]&&(e[t]=u(e[t]))}),a.has(e))return e;const t=new Proxy(e,l);return a.add(t),c.set(e,t),t};r.d(t,"Emitter",function(){return s}),r.d(t,"connect",function(){return o}),r.d(t,"proxify",function(){return u})}])});