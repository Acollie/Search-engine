(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var og={exports:{}},nc={},lg={exports:{}},Xe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ja=Symbol.for("react.element"),hv=Symbol.for("react.portal"),pv=Symbol.for("react.fragment"),mv=Symbol.for("react.strict_mode"),gv=Symbol.for("react.profiler"),_v=Symbol.for("react.provider"),vv=Symbol.for("react.context"),xv=Symbol.for("react.forward_ref"),Sv=Symbol.for("react.suspense"),yv=Symbol.for("react.memo"),Mv=Symbol.for("react.lazy"),Gh=Symbol.iterator;function Ev(t){return t===null||typeof t!="object"?null:(t=Gh&&t[Gh]||t["@@iterator"],typeof t=="function"?t:null)}var cg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ug=Object.assign,fg={};function qs(t,e,n){this.props=t,this.context=e,this.refs=fg,this.updater=n||cg}qs.prototype.isReactComponent={};qs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};qs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function dg(){}dg.prototype=qs.prototype;function Ed(t,e,n){this.props=t,this.context=e,this.refs=fg,this.updater=n||cg}var Td=Ed.prototype=new dg;Td.constructor=Ed;ug(Td,qs.prototype);Td.isPureReactComponent=!0;var Wh=Array.isArray,hg=Object.prototype.hasOwnProperty,wd={current:null},pg={key:!0,ref:!0,__self:!0,__source:!0};function mg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)hg.call(e,i)&&!pg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:Ja,type:t,key:s,ref:a,props:r,_owner:wd.current}}function Tv(t,e){return{$$typeof:Ja,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Ad(t){return typeof t=="object"&&t!==null&&t.$$typeof===Ja}function wv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Xh=/\/+/g;function Ac(t,e){return typeof t=="object"&&t!==null&&t.key!=null?wv(""+t.key):e.toString(36)}function il(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case Ja:case hv:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+Ac(a,0):i,Wh(r)?(n="",t!=null&&(n=t.replace(Xh,"$&/")+"/"),il(r,e,n,"",function(c){return c})):r!=null&&(Ad(r)&&(r=Tv(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Xh,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Wh(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+Ac(s,o);a+=il(s,e,n,l,r)}else if(l=Ev(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+Ac(s,o++),a+=il(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function lo(t,e,n){if(t==null)return t;var i=[],r=0;return il(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Av(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var on={current:null},rl={transition:null},Rv={ReactCurrentDispatcher:on,ReactCurrentBatchConfig:rl,ReactCurrentOwner:wd};function gg(){throw Error("act(...) is not supported in production builds of React.")}Xe.Children={map:lo,forEach:function(t,e,n){lo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return lo(t,function(){e++}),e},toArray:function(t){return lo(t,function(e){return e})||[]},only:function(t){if(!Ad(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Xe.Component=qs;Xe.Fragment=pv;Xe.Profiler=gv;Xe.PureComponent=Ed;Xe.StrictMode=mv;Xe.Suspense=Sv;Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rv;Xe.act=gg;Xe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=ug({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=wd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)hg.call(e,l)&&!pg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:Ja,type:t.type,key:r,ref:s,props:i,_owner:a}};Xe.createContext=function(t){return t={$$typeof:vv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:_v,_context:t},t.Consumer=t};Xe.createElement=mg;Xe.createFactory=function(t){var e=mg.bind(null,t);return e.type=t,e};Xe.createRef=function(){return{current:null}};Xe.forwardRef=function(t){return{$$typeof:xv,render:t}};Xe.isValidElement=Ad;Xe.lazy=function(t){return{$$typeof:Mv,_payload:{_status:-1,_result:t},_init:Av}};Xe.memo=function(t,e){return{$$typeof:yv,type:t,compare:e===void 0?null:e}};Xe.startTransition=function(t){var e=rl.transition;rl.transition={};try{t()}finally{rl.transition=e}};Xe.unstable_act=gg;Xe.useCallback=function(t,e){return on.current.useCallback(t,e)};Xe.useContext=function(t){return on.current.useContext(t)};Xe.useDebugValue=function(){};Xe.useDeferredValue=function(t){return on.current.useDeferredValue(t)};Xe.useEffect=function(t,e){return on.current.useEffect(t,e)};Xe.useId=function(){return on.current.useId()};Xe.useImperativeHandle=function(t,e,n){return on.current.useImperativeHandle(t,e,n)};Xe.useInsertionEffect=function(t,e){return on.current.useInsertionEffect(t,e)};Xe.useLayoutEffect=function(t,e){return on.current.useLayoutEffect(t,e)};Xe.useMemo=function(t,e){return on.current.useMemo(t,e)};Xe.useReducer=function(t,e,n){return on.current.useReducer(t,e,n)};Xe.useRef=function(t){return on.current.useRef(t)};Xe.useState=function(t){return on.current.useState(t)};Xe.useSyncExternalStore=function(t,e,n){return on.current.useSyncExternalStore(t,e,n)};Xe.useTransition=function(){return on.current.useTransition()};Xe.version="18.3.1";lg.exports=Xe;var at=lg.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cv=at,bv=Symbol.for("react.element"),Pv=Symbol.for("react.fragment"),Dv=Object.prototype.hasOwnProperty,Nv=Cv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Lv={key:!0,ref:!0,__self:!0,__source:!0};function _g(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)Dv.call(e,i)&&!Lv.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:bv,type:t,key:s,ref:a,props:r,_owner:Nv.current}}nc.Fragment=Pv;nc.jsx=_g;nc.jsxs=_g;og.exports=nc;var P=og.exports,vg={exports:{}},An={},xg={exports:{}},Sg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(I,W){var q=I.length;I.push(W);e:for(;0<q;){var Y=q-1>>>1,Q=I[Y];if(0<r(Q,W))I[Y]=W,I[q]=Q,q=Y;else break e}}function n(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var W=I[0],q=I.pop();if(q!==W){I[0]=q;e:for(var Y=0,Q=I.length,pe=Q>>>1;Y<pe;){var ue=2*(Y+1)-1,me=I[ue],G=ue+1,ae=I[G];if(0>r(me,q))G<Q&&0>r(ae,me)?(I[Y]=ae,I[G]=q,Y=G):(I[Y]=me,I[ue]=q,Y=ue);else if(G<Q&&0>r(ae,q))I[Y]=ae,I[G]=q,Y=G;else break e}}return W}function r(I,W){var q=I.sortIndex-W.sortIndex;return q!==0?q:I.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],h=1,d=null,f=3,p=!1,_=!1,E=!1,g=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function S(I){for(var W=n(c);W!==null;){if(W.callback===null)i(c);else if(W.startTime<=I)i(c),W.sortIndex=W.expirationTime,e(l,W);else break;W=n(c)}}function M(I){if(E=!1,S(I),!_)if(n(l)!==null)_=!0,j(R);else{var W=n(c);W!==null&&z(M,W.startTime-I)}}function R(I,W){_=!1,E&&(E=!1,u(x),x=-1),p=!0;var q=f;try{for(S(W),d=n(l);d!==null&&(!(d.expirationTime>W)||I&&!b());){var Y=d.callback;if(typeof Y=="function"){d.callback=null,f=d.priorityLevel;var Q=Y(d.expirationTime<=W);W=t.unstable_now(),typeof Q=="function"?d.callback=Q:d===n(l)&&i(l),S(W)}else i(l);d=n(l)}if(d!==null)var pe=!0;else{var ue=n(c);ue!==null&&z(M,ue.startTime-W),pe=!1}return pe}finally{d=null,f=q,p=!1}}var w=!1,A=null,x=-1,C=5,D=-1;function b(){return!(t.unstable_now()-D<C)}function k(){if(A!==null){var I=t.unstable_now();D=I;var W=!0;try{W=A(!0,I)}finally{W?K():(w=!1,A=null)}}else w=!1}var K;if(typeof m=="function")K=function(){m(k)};else if(typeof MessageChannel<"u"){var ee=new MessageChannel,U=ee.port2;ee.port1.onmessage=k,K=function(){U.postMessage(null)}}else K=function(){g(k,0)};function j(I){A=I,w||(w=!0,K())}function z(I,W){x=g(function(){I(t.unstable_now())},W)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(I){I.callback=null},t.unstable_continueExecution=function(){_||p||(_=!0,j(R))},t.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<I?Math.floor(1e3/I):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(I){switch(f){case 1:case 2:case 3:var W=3;break;default:W=f}var q=f;f=W;try{return I()}finally{f=q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(I,W){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var q=f;f=I;try{return W()}finally{f=q}},t.unstable_scheduleCallback=function(I,W,q){var Y=t.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?Y+q:Y):q=Y,I){case 1:var Q=-1;break;case 2:Q=250;break;case 5:Q=1073741823;break;case 4:Q=1e4;break;default:Q=5e3}return Q=q+Q,I={id:h++,callback:W,priorityLevel:I,startTime:q,expirationTime:Q,sortIndex:-1},q>Y?(I.sortIndex=q,e(c,I),n(l)===null&&I===n(c)&&(E?(u(x),x=-1):E=!0,z(M,q-Y))):(I.sortIndex=Q,e(l,I),_||p||(_=!0,j(R))),I},t.unstable_shouldYield=b,t.unstable_wrapCallback=function(I){var W=f;return function(){var q=f;f=W;try{return I.apply(this,arguments)}finally{f=q}}}})(Sg);xg.exports=Sg;var Iv=xg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uv=at,wn=Iv;function se(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var yg=new Set,La={};function jr(t,e){Os(t,e),Os(t+"Capture",e)}function Os(t,e){for(La[t]=e,t=0;t<e.length;t++)yg.add(e[t])}var Di=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Fu=Object.prototype.hasOwnProperty,Fv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,jh={},Yh={};function Ov(t){return Fu.call(Yh,t)?!0:Fu.call(jh,t)?!1:Fv.test(t)?Yh[t]=!0:(jh[t]=!0,!1)}function Bv(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function kv(t,e,n,i){if(e===null||typeof e>"u"||Bv(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ln(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Xt[t]=new ln(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Xt[e]=new ln(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Xt[t]=new ln(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Xt[t]=new ln(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Xt[t]=new ln(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Xt[t]=new ln(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Xt[t]=new ln(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Xt[t]=new ln(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Xt[t]=new ln(t,5,!1,t.toLowerCase(),null,!1,!1)});var Rd=/[\-:]([a-z])/g;function Cd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Rd,Cd);Xt[e]=new ln(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Rd,Cd);Xt[e]=new ln(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Rd,Cd);Xt[e]=new ln(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Xt[t]=new ln(t,1,!1,t.toLowerCase(),null,!1,!1)});Xt.xlinkHref=new ln("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Xt[t]=new ln(t,1,!1,t.toLowerCase(),null,!0,!0)});function bd(t,e,n,i){var r=Xt.hasOwnProperty(e)?Xt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(kv(e,n,r,i)&&(n=null),i||r===null?Ov(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Bi=Uv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,co=Symbol.for("react.element"),ms=Symbol.for("react.portal"),gs=Symbol.for("react.fragment"),Pd=Symbol.for("react.strict_mode"),Ou=Symbol.for("react.profiler"),Mg=Symbol.for("react.provider"),Eg=Symbol.for("react.context"),Dd=Symbol.for("react.forward_ref"),Bu=Symbol.for("react.suspense"),ku=Symbol.for("react.suspense_list"),Nd=Symbol.for("react.memo"),$i=Symbol.for("react.lazy"),Tg=Symbol.for("react.offscreen"),qh=Symbol.iterator;function Js(t){return t===null||typeof t!="object"?null:(t=qh&&t[qh]||t["@@iterator"],typeof t=="function"?t:null)}var yt=Object.assign,Rc;function _a(t){if(Rc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Rc=e&&e[1]||""}return`
`+Rc+t}var Cc=!1;function bc(t,e){if(!t||Cc)return"";Cc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{Cc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?_a(t):""}function zv(t){switch(t.tag){case 5:return _a(t.type);case 16:return _a("Lazy");case 13:return _a("Suspense");case 19:return _a("SuspenseList");case 0:case 2:case 15:return t=bc(t.type,!1),t;case 11:return t=bc(t.type.render,!1),t;case 1:return t=bc(t.type,!0),t;default:return""}}function zu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case gs:return"Fragment";case ms:return"Portal";case Ou:return"Profiler";case Pd:return"StrictMode";case Bu:return"Suspense";case ku:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Eg:return(t.displayName||"Context")+".Consumer";case Mg:return(t._context.displayName||"Context")+".Provider";case Dd:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Nd:return e=t.displayName||null,e!==null?e:zu(t.type)||"Memo";case $i:e=t._payload,t=t._init;try{return zu(t(e))}catch{}}return null}function Hv(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return zu(e);case 8:return e===Pd?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function pr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function wg(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Vv(t){var e=wg(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function uo(t){t._valueTracker||(t._valueTracker=Vv(t))}function Ag(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=wg(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Ml(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Hu(t,e){var n=e.checked;return yt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Kh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=pr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Rg(t,e){e=e.checked,e!=null&&bd(t,"checked",e,!1)}function Vu(t,e){Rg(t,e);var n=pr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Gu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Gu(t,e.type,pr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function $h(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Gu(t,e,n){(e!=="number"||Ml(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var va=Array.isArray;function Cs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+pr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Wu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(se(91));return yt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Zh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(se(92));if(va(n)){if(1<n.length)throw Error(se(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:pr(n)}}function Cg(t,e){var n=pr(e.value),i=pr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Qh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function bg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Xu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?bg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var fo,Pg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(fo=fo||document.createElement("div"),fo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=fo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ia(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Ea={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Gv=["Webkit","ms","Moz","O"];Object.keys(Ea).forEach(function(t){Gv.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Ea[e]=Ea[t]})});function Dg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Ea.hasOwnProperty(t)&&Ea[t]?(""+e).trim():e+"px"}function Ng(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Dg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Wv=yt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function ju(t,e){if(e){if(Wv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(se(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(se(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(se(61))}if(e.style!=null&&typeof e.style!="object")throw Error(se(62))}}function Yu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var qu=null;function Ld(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ku=null,bs=null,Ps=null;function Jh(t){if(t=no(t)){if(typeof Ku!="function")throw Error(se(280));var e=t.stateNode;e&&(e=oc(e),Ku(t.stateNode,t.type,e))}}function Lg(t){bs?Ps?Ps.push(t):Ps=[t]:bs=t}function Ig(){if(bs){var t=bs,e=Ps;if(Ps=bs=null,Jh(t),e)for(t=0;t<e.length;t++)Jh(e[t])}}function Ug(t,e){return t(e)}function Fg(){}var Pc=!1;function Og(t,e,n){if(Pc)return t(e,n);Pc=!0;try{return Ug(t,e,n)}finally{Pc=!1,(bs!==null||Ps!==null)&&(Fg(),Ig())}}function Ua(t,e){var n=t.stateNode;if(n===null)return null;var i=oc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(se(231,e,typeof n));return n}var $u=!1;if(Di)try{var ea={};Object.defineProperty(ea,"passive",{get:function(){$u=!0}}),window.addEventListener("test",ea,ea),window.removeEventListener("test",ea,ea)}catch{$u=!1}function Xv(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var Ta=!1,El=null,Tl=!1,Zu=null,jv={onError:function(t){Ta=!0,El=t}};function Yv(t,e,n,i,r,s,a,o,l){Ta=!1,El=null,Xv.apply(jv,arguments)}function qv(t,e,n,i,r,s,a,o,l){if(Yv.apply(this,arguments),Ta){if(Ta){var c=El;Ta=!1,El=null}else throw Error(se(198));Tl||(Tl=!0,Zu=c)}}function Yr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Bg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function ep(t){if(Yr(t)!==t)throw Error(se(188))}function Kv(t){var e=t.alternate;if(!e){if(e=Yr(t),e===null)throw Error(se(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return ep(r),t;if(s===i)return ep(r),e;s=s.sibling}throw Error(se(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(se(189))}}if(n.alternate!==i)throw Error(se(190))}if(n.tag!==3)throw Error(se(188));return n.stateNode.current===n?t:e}function kg(t){return t=Kv(t),t!==null?zg(t):null}function zg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=zg(t);if(e!==null)return e;t=t.sibling}return null}var Hg=wn.unstable_scheduleCallback,tp=wn.unstable_cancelCallback,$v=wn.unstable_shouldYield,Zv=wn.unstable_requestPaint,bt=wn.unstable_now,Qv=wn.unstable_getCurrentPriorityLevel,Id=wn.unstable_ImmediatePriority,Vg=wn.unstable_UserBlockingPriority,wl=wn.unstable_NormalPriority,Jv=wn.unstable_LowPriority,Gg=wn.unstable_IdlePriority,ic=null,li=null;function ex(t){if(li&&typeof li.onCommitFiberRoot=="function")try{li.onCommitFiberRoot(ic,t,void 0,(t.current.flags&128)===128)}catch{}}var qn=Math.clz32?Math.clz32:ix,tx=Math.log,nx=Math.LN2;function ix(t){return t>>>=0,t===0?32:31-(tx(t)/nx|0)|0}var ho=64,po=4194304;function xa(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Al(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=xa(o):(s&=a,s!==0&&(i=xa(s)))}else a=n&~r,a!==0?i=xa(a):s!==0&&(i=xa(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-qn(e),r=1<<n,i|=t[n],e&=~r;return i}function rx(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function sx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-qn(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=rx(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function Qu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Wg(){var t=ho;return ho<<=1,!(ho&4194240)&&(ho=64),t}function Dc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function eo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-qn(e),t[e]=n}function ax(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-qn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Ud(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-qn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var et=0;function Xg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var jg,Fd,Yg,qg,Kg,Ju=!1,mo=[],sr=null,ar=null,or=null,Fa=new Map,Oa=new Map,Ji=[],ox="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function np(t,e){switch(t){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":ar=null;break;case"mouseover":case"mouseout":or=null;break;case"pointerover":case"pointerout":Fa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Oa.delete(e.pointerId)}}function ta(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=no(e),e!==null&&Fd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function lx(t,e,n,i,r){switch(e){case"focusin":return sr=ta(sr,t,e,n,i,r),!0;case"dragenter":return ar=ta(ar,t,e,n,i,r),!0;case"mouseover":return or=ta(or,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Fa.set(s,ta(Fa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Oa.set(s,ta(Oa.get(s)||null,t,e,n,i,r)),!0}return!1}function $g(t){var e=Dr(t.target);if(e!==null){var n=Yr(e);if(n!==null){if(e=n.tag,e===13){if(e=Bg(n),e!==null){t.blockedOn=e,Kg(t.priority,function(){Yg(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function sl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=ef(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);qu=i,n.target.dispatchEvent(i),qu=null}else return e=no(n),e!==null&&Fd(e),t.blockedOn=n,!1;e.shift()}return!0}function ip(t,e,n){sl(t)&&n.delete(e)}function cx(){Ju=!1,sr!==null&&sl(sr)&&(sr=null),ar!==null&&sl(ar)&&(ar=null),or!==null&&sl(or)&&(or=null),Fa.forEach(ip),Oa.forEach(ip)}function na(t,e){t.blockedOn===e&&(t.blockedOn=null,Ju||(Ju=!0,wn.unstable_scheduleCallback(wn.unstable_NormalPriority,cx)))}function Ba(t){function e(r){return na(r,t)}if(0<mo.length){na(mo[0],t);for(var n=1;n<mo.length;n++){var i=mo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(sr!==null&&na(sr,t),ar!==null&&na(ar,t),or!==null&&na(or,t),Fa.forEach(e),Oa.forEach(e),n=0;n<Ji.length;n++)i=Ji[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ji.length&&(n=Ji[0],n.blockedOn===null);)$g(n),n.blockedOn===null&&Ji.shift()}var Ds=Bi.ReactCurrentBatchConfig,Rl=!0;function ux(t,e,n,i){var r=et,s=Ds.transition;Ds.transition=null;try{et=1,Od(t,e,n,i)}finally{et=r,Ds.transition=s}}function fx(t,e,n,i){var r=et,s=Ds.transition;Ds.transition=null;try{et=4,Od(t,e,n,i)}finally{et=r,Ds.transition=s}}function Od(t,e,n,i){if(Rl){var r=ef(t,e,n,i);if(r===null)Hc(t,e,i,Cl,n),np(t,i);else if(lx(r,t,e,n,i))i.stopPropagation();else if(np(t,i),e&4&&-1<ox.indexOf(t)){for(;r!==null;){var s=no(r);if(s!==null&&jg(s),s=ef(t,e,n,i),s===null&&Hc(t,e,i,Cl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Hc(t,e,i,null,n)}}var Cl=null;function ef(t,e,n,i){if(Cl=null,t=Ld(i),t=Dr(t),t!==null)if(e=Yr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Bg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Cl=t,null}function Zg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Qv()){case Id:return 1;case Vg:return 4;case wl:case Jv:return 16;case Gg:return 536870912;default:return 16}default:return 16}}var nr=null,Bd=null,al=null;function Qg(){if(al)return al;var t,e=Bd,n=e.length,i,r="value"in nr?nr.value:nr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return al=r.slice(t,1<i?1-i:void 0)}function ol(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function go(){return!0}function rp(){return!1}function Rn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?go:rp,this.isPropagationStopped=rp,this}return yt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=go)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=go)},persist:function(){},isPersistent:go}),e}var Ks={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kd=Rn(Ks),to=yt({},Ks,{view:0,detail:0}),dx=Rn(to),Nc,Lc,ia,rc=yt({},to,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ia&&(ia&&t.type==="mousemove"?(Nc=t.screenX-ia.screenX,Lc=t.screenY-ia.screenY):Lc=Nc=0,ia=t),Nc)},movementY:function(t){return"movementY"in t?t.movementY:Lc}}),sp=Rn(rc),hx=yt({},rc,{dataTransfer:0}),px=Rn(hx),mx=yt({},to,{relatedTarget:0}),Ic=Rn(mx),gx=yt({},Ks,{animationName:0,elapsedTime:0,pseudoElement:0}),_x=Rn(gx),vx=yt({},Ks,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),xx=Rn(vx),Sx=yt({},Ks,{data:0}),ap=Rn(Sx),yx={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Mx={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Ex={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Tx(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Ex[t])?!!e[t]:!1}function zd(){return Tx}var wx=yt({},to,{key:function(t){if(t.key){var e=yx[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ol(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Mx[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(t){return t.type==="keypress"?ol(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ol(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Ax=Rn(wx),Rx=yt({},rc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),op=Rn(Rx),Cx=yt({},to,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),bx=Rn(Cx),Px=yt({},Ks,{propertyName:0,elapsedTime:0,pseudoElement:0}),Dx=Rn(Px),Nx=yt({},rc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Lx=Rn(Nx),Ix=[9,13,27,32],Hd=Di&&"CompositionEvent"in window,wa=null;Di&&"documentMode"in document&&(wa=document.documentMode);var Ux=Di&&"TextEvent"in window&&!wa,Jg=Di&&(!Hd||wa&&8<wa&&11>=wa),lp=" ",cp=!1;function e_(t,e){switch(t){case"keyup":return Ix.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function t_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var _s=!1;function Fx(t,e){switch(t){case"compositionend":return t_(e);case"keypress":return e.which!==32?null:(cp=!0,lp);case"textInput":return t=e.data,t===lp&&cp?null:t;default:return null}}function Ox(t,e){if(_s)return t==="compositionend"||!Hd&&e_(t,e)?(t=Qg(),al=Bd=nr=null,_s=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Jg&&e.locale!=="ko"?null:e.data;default:return null}}var Bx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function up(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Bx[t.type]:e==="textarea"}function n_(t,e,n,i){Lg(i),e=bl(e,"onChange"),0<e.length&&(n=new kd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Aa=null,ka=null;function kx(t){h_(t,0)}function sc(t){var e=Ss(t);if(Ag(e))return t}function zx(t,e){if(t==="change")return e}var i_=!1;if(Di){var Uc;if(Di){var Fc="oninput"in document;if(!Fc){var fp=document.createElement("div");fp.setAttribute("oninput","return;"),Fc=typeof fp.oninput=="function"}Uc=Fc}else Uc=!1;i_=Uc&&(!document.documentMode||9<document.documentMode)}function dp(){Aa&&(Aa.detachEvent("onpropertychange",r_),ka=Aa=null)}function r_(t){if(t.propertyName==="value"&&sc(ka)){var e=[];n_(e,ka,t,Ld(t)),Og(kx,e)}}function Hx(t,e,n){t==="focusin"?(dp(),Aa=e,ka=n,Aa.attachEvent("onpropertychange",r_)):t==="focusout"&&dp()}function Vx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return sc(ka)}function Gx(t,e){if(t==="click")return sc(e)}function Wx(t,e){if(t==="input"||t==="change")return sc(e)}function Xx(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var $n=typeof Object.is=="function"?Object.is:Xx;function za(t,e){if($n(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Fu.call(e,r)||!$n(t[r],e[r]))return!1}return!0}function hp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function pp(t,e){var n=hp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=hp(n)}}function s_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?s_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function a_(){for(var t=window,e=Ml();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Ml(t.document)}return e}function Vd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function jx(t){var e=a_(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&s_(n.ownerDocument.documentElement,n)){if(i!==null&&Vd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=pp(n,s);var a=pp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Yx=Di&&"documentMode"in document&&11>=document.documentMode,vs=null,tf=null,Ra=null,nf=!1;function mp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;nf||vs==null||vs!==Ml(i)||(i=vs,"selectionStart"in i&&Vd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ra&&za(Ra,i)||(Ra=i,i=bl(tf,"onSelect"),0<i.length&&(e=new kd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=vs)))}function _o(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var xs={animationend:_o("Animation","AnimationEnd"),animationiteration:_o("Animation","AnimationIteration"),animationstart:_o("Animation","AnimationStart"),transitionend:_o("Transition","TransitionEnd")},Oc={},o_={};Di&&(o_=document.createElement("div").style,"AnimationEvent"in window||(delete xs.animationend.animation,delete xs.animationiteration.animation,delete xs.animationstart.animation),"TransitionEvent"in window||delete xs.transitionend.transition);function ac(t){if(Oc[t])return Oc[t];if(!xs[t])return t;var e=xs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in o_)return Oc[t]=e[n];return t}var l_=ac("animationend"),c_=ac("animationiteration"),u_=ac("animationstart"),f_=ac("transitionend"),d_=new Map,gp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vr(t,e){d_.set(t,e),jr(e,[t])}for(var Bc=0;Bc<gp.length;Bc++){var kc=gp[Bc],qx=kc.toLowerCase(),Kx=kc[0].toUpperCase()+kc.slice(1);vr(qx,"on"+Kx)}vr(l_,"onAnimationEnd");vr(c_,"onAnimationIteration");vr(u_,"onAnimationStart");vr("dblclick","onDoubleClick");vr("focusin","onFocus");vr("focusout","onBlur");vr(f_,"onTransitionEnd");Os("onMouseEnter",["mouseout","mouseover"]);Os("onMouseLeave",["mouseout","mouseover"]);Os("onPointerEnter",["pointerout","pointerover"]);Os("onPointerLeave",["pointerout","pointerover"]);jr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));jr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));jr("onBeforeInput",["compositionend","keypress","textInput","paste"]);jr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));jr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Sa="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),$x=new Set("cancel close invalid load scroll toggle".split(" ").concat(Sa));function _p(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,qv(i,e,void 0,t),t.currentTarget=null}function h_(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;_p(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;_p(r,o,c),s=l}}}if(Tl)throw t=Zu,Tl=!1,Zu=null,t}function pt(t,e){var n=e[lf];n===void 0&&(n=e[lf]=new Set);var i=t+"__bubble";n.has(i)||(p_(e,t,2,!1),n.add(i))}function zc(t,e,n){var i=0;e&&(i|=4),p_(n,t,i,e)}var vo="_reactListening"+Math.random().toString(36).slice(2);function Ha(t){if(!t[vo]){t[vo]=!0,yg.forEach(function(n){n!=="selectionchange"&&($x.has(n)||zc(n,!1,t),zc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[vo]||(e[vo]=!0,zc("selectionchange",!1,e))}}function p_(t,e,n,i){switch(Zg(e)){case 1:var r=ux;break;case 4:r=fx;break;default:r=Od}n=r.bind(null,e,n,t),r=void 0,!$u||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Hc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Dr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Og(function(){var c=s,h=Ld(n),d=[];e:{var f=d_.get(t);if(f!==void 0){var p=kd,_=t;switch(t){case"keypress":if(ol(n)===0)break e;case"keydown":case"keyup":p=Ax;break;case"focusin":_="focus",p=Ic;break;case"focusout":_="blur",p=Ic;break;case"beforeblur":case"afterblur":p=Ic;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=sp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=px;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=bx;break;case l_:case c_:case u_:p=_x;break;case f_:p=Dx;break;case"scroll":p=dx;break;case"wheel":p=Lx;break;case"copy":case"cut":case"paste":p=xx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=op}var E=(e&4)!==0,g=!E&&t==="scroll",u=E?f!==null?f+"Capture":null:f;E=[];for(var m=c,S;m!==null;){S=m;var M=S.stateNode;if(S.tag===5&&M!==null&&(S=M,u!==null&&(M=Ua(m,u),M!=null&&E.push(Va(m,M,S)))),g)break;m=m.return}0<E.length&&(f=new p(f,_,null,n,h),d.push({event:f,listeners:E}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==qu&&(_=n.relatedTarget||n.fromElement)&&(Dr(_)||_[Ni]))break e;if((p||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?Dr(_):null,_!==null&&(g=Yr(_),_!==g||_.tag!==5&&_.tag!==6)&&(_=null)):(p=null,_=c),p!==_)){if(E=sp,M="onMouseLeave",u="onMouseEnter",m="mouse",(t==="pointerout"||t==="pointerover")&&(E=op,M="onPointerLeave",u="onPointerEnter",m="pointer"),g=p==null?f:Ss(p),S=_==null?f:Ss(_),f=new E(M,m+"leave",p,n,h),f.target=g,f.relatedTarget=S,M=null,Dr(h)===c&&(E=new E(u,m+"enter",_,n,h),E.target=S,E.relatedTarget=g,M=E),g=M,p&&_)t:{for(E=p,u=_,m=0,S=E;S;S=$r(S))m++;for(S=0,M=u;M;M=$r(M))S++;for(;0<m-S;)E=$r(E),m--;for(;0<S-m;)u=$r(u),S--;for(;m--;){if(E===u||u!==null&&E===u.alternate)break t;E=$r(E),u=$r(u)}E=null}else E=null;p!==null&&vp(d,f,p,E,!1),_!==null&&g!==null&&vp(d,g,_,E,!0)}}e:{if(f=c?Ss(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var R=zx;else if(up(f))if(i_)R=Wx;else{R=Vx;var w=Hx}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(R=Gx);if(R&&(R=R(t,c))){n_(d,R,n,h);break e}w&&w(t,f,c),t==="focusout"&&(w=f._wrapperState)&&w.controlled&&f.type==="number"&&Gu(f,"number",f.value)}switch(w=c?Ss(c):window,t){case"focusin":(up(w)||w.contentEditable==="true")&&(vs=w,tf=c,Ra=null);break;case"focusout":Ra=tf=vs=null;break;case"mousedown":nf=!0;break;case"contextmenu":case"mouseup":case"dragend":nf=!1,mp(d,n,h);break;case"selectionchange":if(Yx)break;case"keydown":case"keyup":mp(d,n,h)}var A;if(Hd)e:{switch(t){case"compositionstart":var x="onCompositionStart";break e;case"compositionend":x="onCompositionEnd";break e;case"compositionupdate":x="onCompositionUpdate";break e}x=void 0}else _s?e_(t,n)&&(x="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(Jg&&n.locale!=="ko"&&(_s||x!=="onCompositionStart"?x==="onCompositionEnd"&&_s&&(A=Qg()):(nr=h,Bd="value"in nr?nr.value:nr.textContent,_s=!0)),w=bl(c,x),0<w.length&&(x=new ap(x,t,null,n,h),d.push({event:x,listeners:w}),A?x.data=A:(A=t_(n),A!==null&&(x.data=A)))),(A=Ux?Fx(t,n):Ox(t,n))&&(c=bl(c,"onBeforeInput"),0<c.length&&(h=new ap("onBeforeInput","beforeinput",null,n,h),d.push({event:h,listeners:c}),h.data=A))}h_(d,e)})}function Va(t,e,n){return{instance:t,listener:e,currentTarget:n}}function bl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ua(t,n),s!=null&&i.unshift(Va(t,s,r)),s=Ua(t,e),s!=null&&i.push(Va(t,s,r))),t=t.return}return i}function $r(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function vp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Ua(n,s),l!=null&&a.unshift(Va(n,l,o))):r||(l=Ua(n,s),l!=null&&a.push(Va(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var Zx=/\r\n?/g,Qx=/\u0000|\uFFFD/g;function xp(t){return(typeof t=="string"?t:""+t).replace(Zx,`
`).replace(Qx,"")}function xo(t,e,n){if(e=xp(e),xp(t)!==e&&n)throw Error(se(425))}function Pl(){}var rf=null,sf=null;function af(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var of=typeof setTimeout=="function"?setTimeout:void 0,Jx=typeof clearTimeout=="function"?clearTimeout:void 0,Sp=typeof Promise=="function"?Promise:void 0,eS=typeof queueMicrotask=="function"?queueMicrotask:typeof Sp<"u"?function(t){return Sp.resolve(null).then(t).catch(tS)}:of;function tS(t){setTimeout(function(){throw t})}function Vc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ba(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ba(e)}function lr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function yp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var $s=Math.random().toString(36).slice(2),ri="__reactFiber$"+$s,Ga="__reactProps$"+$s,Ni="__reactContainer$"+$s,lf="__reactEvents$"+$s,nS="__reactListeners$"+$s,iS="__reactHandles$"+$s;function Dr(t){var e=t[ri];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ni]||n[ri]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=yp(t);t!==null;){if(n=t[ri])return n;t=yp(t)}return e}t=n,n=t.parentNode}return null}function no(t){return t=t[ri]||t[Ni],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ss(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(se(33))}function oc(t){return t[Ga]||null}var cf=[],ys=-1;function xr(t){return{current:t}}function mt(t){0>ys||(t.current=cf[ys],cf[ys]=null,ys--)}function dt(t,e){ys++,cf[ys]=t.current,t.current=e}var mr={},tn=xr(mr),dn=xr(!1),Br=mr;function Bs(t,e){var n=t.type.contextTypes;if(!n)return mr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function hn(t){return t=t.childContextTypes,t!=null}function Dl(){mt(dn),mt(tn)}function Mp(t,e,n){if(tn.current!==mr)throw Error(se(168));dt(tn,e),dt(dn,n)}function m_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(se(108,Hv(t)||"Unknown",r));return yt({},n,i)}function Nl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||mr,Br=tn.current,dt(tn,t),dt(dn,dn.current),!0}function Ep(t,e,n){var i=t.stateNode;if(!i)throw Error(se(169));n?(t=m_(t,e,Br),i.__reactInternalMemoizedMergedChildContext=t,mt(dn),mt(tn),dt(tn,t)):mt(dn),dt(dn,n)}var Ei=null,lc=!1,Gc=!1;function g_(t){Ei===null?Ei=[t]:Ei.push(t)}function rS(t){lc=!0,g_(t)}function Sr(){if(!Gc&&Ei!==null){Gc=!0;var t=0,e=et;try{var n=Ei;for(et=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ei=null,lc=!1}catch(r){throw Ei!==null&&(Ei=Ei.slice(t+1)),Hg(Id,Sr),r}finally{et=e,Gc=!1}}return null}var Ms=[],Es=0,Ll=null,Il=0,Dn=[],Nn=0,kr=null,wi=1,Ai="";function Rr(t,e){Ms[Es++]=Il,Ms[Es++]=Ll,Ll=t,Il=e}function __(t,e,n){Dn[Nn++]=wi,Dn[Nn++]=Ai,Dn[Nn++]=kr,kr=t;var i=wi;t=Ai;var r=32-qn(i)-1;i&=~(1<<r),n+=1;var s=32-qn(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,wi=1<<32-qn(e)+r|n<<r|i,Ai=s+t}else wi=1<<s|n<<r|i,Ai=t}function Gd(t){t.return!==null&&(Rr(t,1),__(t,1,0))}function Wd(t){for(;t===Ll;)Ll=Ms[--Es],Ms[Es]=null,Il=Ms[--Es],Ms[Es]=null;for(;t===kr;)kr=Dn[--Nn],Dn[Nn]=null,Ai=Dn[--Nn],Dn[Nn]=null,wi=Dn[--Nn],Dn[Nn]=null}var Tn=null,En=null,gt=!1,jn=null;function v_(t,e){var n=In(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Tp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Tn=t,En=lr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Tn=t,En=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=kr!==null?{id:wi,overflow:Ai}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=In(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Tn=t,En=null,!0):!1;default:return!1}}function uf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function ff(t){if(gt){var e=En;if(e){var n=e;if(!Tp(t,e)){if(uf(t))throw Error(se(418));e=lr(n.nextSibling);var i=Tn;e&&Tp(t,e)?v_(i,n):(t.flags=t.flags&-4097|2,gt=!1,Tn=t)}}else{if(uf(t))throw Error(se(418));t.flags=t.flags&-4097|2,gt=!1,Tn=t}}}function wp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Tn=t}function So(t){if(t!==Tn)return!1;if(!gt)return wp(t),gt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!af(t.type,t.memoizedProps)),e&&(e=En)){if(uf(t))throw x_(),Error(se(418));for(;e;)v_(t,e),e=lr(e.nextSibling)}if(wp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(se(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){En=lr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}En=null}}else En=Tn?lr(t.stateNode.nextSibling):null;return!0}function x_(){for(var t=En;t;)t=lr(t.nextSibling)}function ks(){En=Tn=null,gt=!1}function Xd(t){jn===null?jn=[t]:jn.push(t)}var sS=Bi.ReactCurrentBatchConfig;function ra(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(se(309));var i=n.stateNode}if(!i)throw Error(se(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(se(284));if(!n._owner)throw Error(se(290,t))}return t}function yo(t,e){throw t=Object.prototype.toString.call(e),Error(se(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Ap(t){var e=t._init;return e(t._payload)}function S_(t){function e(u,m){if(t){var S=u.deletions;S===null?(u.deletions=[m],u.flags|=16):S.push(m)}}function n(u,m){if(!t)return null;for(;m!==null;)e(u,m),m=m.sibling;return null}function i(u,m){for(u=new Map;m!==null;)m.key!==null?u.set(m.key,m):u.set(m.index,m),m=m.sibling;return u}function r(u,m){return u=dr(u,m),u.index=0,u.sibling=null,u}function s(u,m,S){return u.index=S,t?(S=u.alternate,S!==null?(S=S.index,S<m?(u.flags|=2,m):S):(u.flags|=2,m)):(u.flags|=1048576,m)}function a(u){return t&&u.alternate===null&&(u.flags|=2),u}function o(u,m,S,M){return m===null||m.tag!==6?(m=$c(S,u.mode,M),m.return=u,m):(m=r(m,S),m.return=u,m)}function l(u,m,S,M){var R=S.type;return R===gs?h(u,m,S.props.children,M,S.key):m!==null&&(m.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===$i&&Ap(R)===m.type)?(M=r(m,S.props),M.ref=ra(u,m,S),M.return=u,M):(M=pl(S.type,S.key,S.props,null,u.mode,M),M.ref=ra(u,m,S),M.return=u,M)}function c(u,m,S,M){return m===null||m.tag!==4||m.stateNode.containerInfo!==S.containerInfo||m.stateNode.implementation!==S.implementation?(m=Zc(S,u.mode,M),m.return=u,m):(m=r(m,S.children||[]),m.return=u,m)}function h(u,m,S,M,R){return m===null||m.tag!==7?(m=Or(S,u.mode,M,R),m.return=u,m):(m=r(m,S),m.return=u,m)}function d(u,m,S){if(typeof m=="string"&&m!==""||typeof m=="number")return m=$c(""+m,u.mode,S),m.return=u,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case co:return S=pl(m.type,m.key,m.props,null,u.mode,S),S.ref=ra(u,null,m),S.return=u,S;case ms:return m=Zc(m,u.mode,S),m.return=u,m;case $i:var M=m._init;return d(u,M(m._payload),S)}if(va(m)||Js(m))return m=Or(m,u.mode,S,null),m.return=u,m;yo(u,m)}return null}function f(u,m,S,M){var R=m!==null?m.key:null;if(typeof S=="string"&&S!==""||typeof S=="number")return R!==null?null:o(u,m,""+S,M);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case co:return S.key===R?l(u,m,S,M):null;case ms:return S.key===R?c(u,m,S,M):null;case $i:return R=S._init,f(u,m,R(S._payload),M)}if(va(S)||Js(S))return R!==null?null:h(u,m,S,M,null);yo(u,S)}return null}function p(u,m,S,M,R){if(typeof M=="string"&&M!==""||typeof M=="number")return u=u.get(S)||null,o(m,u,""+M,R);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case co:return u=u.get(M.key===null?S:M.key)||null,l(m,u,M,R);case ms:return u=u.get(M.key===null?S:M.key)||null,c(m,u,M,R);case $i:var w=M._init;return p(u,m,S,w(M._payload),R)}if(va(M)||Js(M))return u=u.get(S)||null,h(m,u,M,R,null);yo(m,M)}return null}function _(u,m,S,M){for(var R=null,w=null,A=m,x=m=0,C=null;A!==null&&x<S.length;x++){A.index>x?(C=A,A=null):C=A.sibling;var D=f(u,A,S[x],M);if(D===null){A===null&&(A=C);break}t&&A&&D.alternate===null&&e(u,A),m=s(D,m,x),w===null?R=D:w.sibling=D,w=D,A=C}if(x===S.length)return n(u,A),gt&&Rr(u,x),R;if(A===null){for(;x<S.length;x++)A=d(u,S[x],M),A!==null&&(m=s(A,m,x),w===null?R=A:w.sibling=A,w=A);return gt&&Rr(u,x),R}for(A=i(u,A);x<S.length;x++)C=p(A,u,x,S[x],M),C!==null&&(t&&C.alternate!==null&&A.delete(C.key===null?x:C.key),m=s(C,m,x),w===null?R=C:w.sibling=C,w=C);return t&&A.forEach(function(b){return e(u,b)}),gt&&Rr(u,x),R}function E(u,m,S,M){var R=Js(S);if(typeof R!="function")throw Error(se(150));if(S=R.call(S),S==null)throw Error(se(151));for(var w=R=null,A=m,x=m=0,C=null,D=S.next();A!==null&&!D.done;x++,D=S.next()){A.index>x?(C=A,A=null):C=A.sibling;var b=f(u,A,D.value,M);if(b===null){A===null&&(A=C);break}t&&A&&b.alternate===null&&e(u,A),m=s(b,m,x),w===null?R=b:w.sibling=b,w=b,A=C}if(D.done)return n(u,A),gt&&Rr(u,x),R;if(A===null){for(;!D.done;x++,D=S.next())D=d(u,D.value,M),D!==null&&(m=s(D,m,x),w===null?R=D:w.sibling=D,w=D);return gt&&Rr(u,x),R}for(A=i(u,A);!D.done;x++,D=S.next())D=p(A,u,x,D.value,M),D!==null&&(t&&D.alternate!==null&&A.delete(D.key===null?x:D.key),m=s(D,m,x),w===null?R=D:w.sibling=D,w=D);return t&&A.forEach(function(k){return e(u,k)}),gt&&Rr(u,x),R}function g(u,m,S,M){if(typeof S=="object"&&S!==null&&S.type===gs&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case co:e:{for(var R=S.key,w=m;w!==null;){if(w.key===R){if(R=S.type,R===gs){if(w.tag===7){n(u,w.sibling),m=r(w,S.props.children),m.return=u,u=m;break e}}else if(w.elementType===R||typeof R=="object"&&R!==null&&R.$$typeof===$i&&Ap(R)===w.type){n(u,w.sibling),m=r(w,S.props),m.ref=ra(u,w,S),m.return=u,u=m;break e}n(u,w);break}else e(u,w);w=w.sibling}S.type===gs?(m=Or(S.props.children,u.mode,M,S.key),m.return=u,u=m):(M=pl(S.type,S.key,S.props,null,u.mode,M),M.ref=ra(u,m,S),M.return=u,u=M)}return a(u);case ms:e:{for(w=S.key;m!==null;){if(m.key===w)if(m.tag===4&&m.stateNode.containerInfo===S.containerInfo&&m.stateNode.implementation===S.implementation){n(u,m.sibling),m=r(m,S.children||[]),m.return=u,u=m;break e}else{n(u,m);break}else e(u,m);m=m.sibling}m=Zc(S,u.mode,M),m.return=u,u=m}return a(u);case $i:return w=S._init,g(u,m,w(S._payload),M)}if(va(S))return _(u,m,S,M);if(Js(S))return E(u,m,S,M);yo(u,S)}return typeof S=="string"&&S!==""||typeof S=="number"?(S=""+S,m!==null&&m.tag===6?(n(u,m.sibling),m=r(m,S),m.return=u,u=m):(n(u,m),m=$c(S,u.mode,M),m.return=u,u=m),a(u)):n(u,m)}return g}var zs=S_(!0),y_=S_(!1),Ul=xr(null),Fl=null,Ts=null,jd=null;function Yd(){jd=Ts=Fl=null}function qd(t){var e=Ul.current;mt(Ul),t._currentValue=e}function df(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Ns(t,e){Fl=t,jd=Ts=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(fn=!0),t.firstContext=null)}function On(t){var e=t._currentValue;if(jd!==t)if(t={context:t,memoizedValue:e,next:null},Ts===null){if(Fl===null)throw Error(se(308));Ts=t,Fl.dependencies={lanes:0,firstContext:t}}else Ts=Ts.next=t;return e}var Nr=null;function Kd(t){Nr===null?Nr=[t]:Nr.push(t)}function M_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Kd(e)):(n.next=r.next,r.next=n),e.interleaved=n,Li(t,i)}function Li(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Zi=!1;function $d(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function E_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ci(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function cr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,$e&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Li(t,n)}return r=i.interleaved,r===null?(e.next=e,Kd(i)):(e.next=r.next,r.next=e),i.interleaved=e,Li(t,n)}function ll(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Ud(t,n)}}function Rp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Ol(t,e,n,i){var r=t.updateQueue;Zi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var h=t.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==a&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;a=0,h=c=l=null,o=s;do{var f=o.lane,p=o.eventTime;if((i&f)===f){h!==null&&(h=h.next={eventTime:p,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var _=t,E=o;switch(f=e,p=n,E.tag){case 1:if(_=E.payload,typeof _=="function"){d=_.call(p,d,f);break e}d=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=E.payload,f=typeof _=="function"?_.call(p,d,f):_,f==null)break e;d=yt({},d,f);break e;case 2:Zi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[o]:f.push(o))}else p={eventTime:p,lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=p,l=d):h=h.next=p,a|=f;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;f=o,o=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(h===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=h,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Hr|=a,t.lanes=a,t.memoizedState=d}}function Cp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(se(191,r));r.call(i)}}}var io={},ci=xr(io),Wa=xr(io),Xa=xr(io);function Lr(t){if(t===io)throw Error(se(174));return t}function Zd(t,e){switch(dt(Xa,e),dt(Wa,t),dt(ci,io),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Xu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Xu(e,t)}mt(ci),dt(ci,e)}function Hs(){mt(ci),mt(Wa),mt(Xa)}function T_(t){Lr(Xa.current);var e=Lr(ci.current),n=Xu(e,t.type);e!==n&&(dt(Wa,t),dt(ci,n))}function Qd(t){Wa.current===t&&(mt(ci),mt(Wa))}var xt=xr(0);function Bl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Wc=[];function Jd(){for(var t=0;t<Wc.length;t++)Wc[t]._workInProgressVersionPrimary=null;Wc.length=0}var cl=Bi.ReactCurrentDispatcher,Xc=Bi.ReactCurrentBatchConfig,zr=0,St=null,Ut=null,zt=null,kl=!1,Ca=!1,ja=0,aS=0;function Yt(){throw Error(se(321))}function eh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!$n(t[n],e[n]))return!1;return!0}function th(t,e,n,i,r,s){if(zr=s,St=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,cl.current=t===null||t.memoizedState===null?uS:fS,t=n(i,r),Ca){s=0;do{if(Ca=!1,ja=0,25<=s)throw Error(se(301));s+=1,zt=Ut=null,e.updateQueue=null,cl.current=dS,t=n(i,r)}while(Ca)}if(cl.current=zl,e=Ut!==null&&Ut.next!==null,zr=0,zt=Ut=St=null,kl=!1,e)throw Error(se(300));return t}function nh(){var t=ja!==0;return ja=0,t}function ni(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return zt===null?St.memoizedState=zt=t:zt=zt.next=t,zt}function Bn(){if(Ut===null){var t=St.alternate;t=t!==null?t.memoizedState:null}else t=Ut.next;var e=zt===null?St.memoizedState:zt.next;if(e!==null)zt=e,Ut=t;else{if(t===null)throw Error(se(310));Ut=t,t={memoizedState:Ut.memoizedState,baseState:Ut.baseState,baseQueue:Ut.baseQueue,queue:Ut.queue,next:null},zt===null?St.memoizedState=zt=t:zt=zt.next=t}return zt}function Ya(t,e){return typeof e=="function"?e(t):e}function jc(t){var e=Bn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=Ut,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var h=c.lane;if((zr&h)===h)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=d,a=i):l=l.next=d,St.lanes|=h,Hr|=h}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,$n(i,e.memoizedState)||(fn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,St.lanes|=s,Hr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Yc(t){var e=Bn(),n=e.queue;if(n===null)throw Error(se(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);$n(s,e.memoizedState)||(fn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function w_(){}function A_(t,e){var n=St,i=Bn(),r=e(),s=!$n(i.memoizedState,r);if(s&&(i.memoizedState=r,fn=!0),i=i.queue,ih(b_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||zt!==null&&zt.memoizedState.tag&1){if(n.flags|=2048,qa(9,C_.bind(null,n,i,r,e),void 0,null),Ht===null)throw Error(se(349));zr&30||R_(n,e,r)}return r}function R_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=St.updateQueue,e===null?(e={lastEffect:null,stores:null},St.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function C_(t,e,n,i){e.value=n,e.getSnapshot=i,P_(e)&&D_(t)}function b_(t,e,n){return n(function(){P_(e)&&D_(t)})}function P_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!$n(t,n)}catch{return!0}}function D_(t){var e=Li(t,1);e!==null&&Kn(e,t,1,-1)}function bp(t){var e=ni();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ya,lastRenderedState:t},e.queue=t,t=t.dispatch=cS.bind(null,St,t),[e.memoizedState,t]}function qa(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=St.updateQueue,e===null?(e={lastEffect:null,stores:null},St.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function N_(){return Bn().memoizedState}function ul(t,e,n,i){var r=ni();St.flags|=t,r.memoizedState=qa(1|e,n,void 0,i===void 0?null:i)}function cc(t,e,n,i){var r=Bn();i=i===void 0?null:i;var s=void 0;if(Ut!==null){var a=Ut.memoizedState;if(s=a.destroy,i!==null&&eh(i,a.deps)){r.memoizedState=qa(e,n,s,i);return}}St.flags|=t,r.memoizedState=qa(1|e,n,s,i)}function Pp(t,e){return ul(8390656,8,t,e)}function ih(t,e){return cc(2048,8,t,e)}function L_(t,e){return cc(4,2,t,e)}function I_(t,e){return cc(4,4,t,e)}function U_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function F_(t,e,n){return n=n!=null?n.concat([t]):null,cc(4,4,U_.bind(null,e,t),n)}function rh(){}function O_(t,e){var n=Bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&eh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function B_(t,e){var n=Bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&eh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function k_(t,e,n){return zr&21?($n(n,e)||(n=Wg(),St.lanes|=n,Hr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,fn=!0),t.memoizedState=n)}function oS(t,e){var n=et;et=n!==0&&4>n?n:4,t(!0);var i=Xc.transition;Xc.transition={};try{t(!1),e()}finally{et=n,Xc.transition=i}}function z_(){return Bn().memoizedState}function lS(t,e,n){var i=fr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},H_(t))V_(e,n);else if(n=M_(t,e,n,i),n!==null){var r=an();Kn(n,t,i,r),G_(n,e,i)}}function cS(t,e,n){var i=fr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(H_(t))V_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,$n(o,a)){var l=e.interleaved;l===null?(r.next=r,Kd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=M_(t,e,r,i),n!==null&&(r=an(),Kn(n,t,i,r),G_(n,e,i))}}function H_(t){var e=t.alternate;return t===St||e!==null&&e===St}function V_(t,e){Ca=kl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function G_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Ud(t,n)}}var zl={readContext:On,useCallback:Yt,useContext:Yt,useEffect:Yt,useImperativeHandle:Yt,useInsertionEffect:Yt,useLayoutEffect:Yt,useMemo:Yt,useReducer:Yt,useRef:Yt,useState:Yt,useDebugValue:Yt,useDeferredValue:Yt,useTransition:Yt,useMutableSource:Yt,useSyncExternalStore:Yt,useId:Yt,unstable_isNewReconciler:!1},uS={readContext:On,useCallback:function(t,e){return ni().memoizedState=[t,e===void 0?null:e],t},useContext:On,useEffect:Pp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ul(4194308,4,U_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ul(4194308,4,t,e)},useInsertionEffect:function(t,e){return ul(4,2,t,e)},useMemo:function(t,e){var n=ni();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ni();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=lS.bind(null,St,t),[i.memoizedState,t]},useRef:function(t){var e=ni();return t={current:t},e.memoizedState=t},useState:bp,useDebugValue:rh,useDeferredValue:function(t){return ni().memoizedState=t},useTransition:function(){var t=bp(!1),e=t[0];return t=oS.bind(null,t[1]),ni().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=St,r=ni();if(gt){if(n===void 0)throw Error(se(407));n=n()}else{if(n=e(),Ht===null)throw Error(se(349));zr&30||R_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Pp(b_.bind(null,i,s,t),[t]),i.flags|=2048,qa(9,C_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ni(),e=Ht.identifierPrefix;if(gt){var n=Ai,i=wi;n=(i&~(1<<32-qn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=ja++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=aS++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},fS={readContext:On,useCallback:O_,useContext:On,useEffect:ih,useImperativeHandle:F_,useInsertionEffect:L_,useLayoutEffect:I_,useMemo:B_,useReducer:jc,useRef:N_,useState:function(){return jc(Ya)},useDebugValue:rh,useDeferredValue:function(t){var e=Bn();return k_(e,Ut.memoizedState,t)},useTransition:function(){var t=jc(Ya)[0],e=Bn().memoizedState;return[t,e]},useMutableSource:w_,useSyncExternalStore:A_,useId:z_,unstable_isNewReconciler:!1},dS={readContext:On,useCallback:O_,useContext:On,useEffect:ih,useImperativeHandle:F_,useInsertionEffect:L_,useLayoutEffect:I_,useMemo:B_,useReducer:Yc,useRef:N_,useState:function(){return Yc(Ya)},useDebugValue:rh,useDeferredValue:function(t){var e=Bn();return Ut===null?e.memoizedState=t:k_(e,Ut.memoizedState,t)},useTransition:function(){var t=Yc(Ya)[0],e=Bn().memoizedState;return[t,e]},useMutableSource:w_,useSyncExternalStore:A_,useId:z_,unstable_isNewReconciler:!1};function Wn(t,e){if(t&&t.defaultProps){e=yt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function hf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:yt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var uc={isMounted:function(t){return(t=t._reactInternals)?Yr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=an(),r=fr(t),s=Ci(i,r);s.payload=e,n!=null&&(s.callback=n),e=cr(t,s,r),e!==null&&(Kn(e,t,r,i),ll(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=an(),r=fr(t),s=Ci(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=cr(t,s,r),e!==null&&(Kn(e,t,r,i),ll(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=an(),i=fr(t),r=Ci(n,i);r.tag=2,e!=null&&(r.callback=e),e=cr(t,r,i),e!==null&&(Kn(e,t,i,n),ll(e,t,i))}};function Dp(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!za(n,i)||!za(r,s):!0}function W_(t,e,n){var i=!1,r=mr,s=e.contextType;return typeof s=="object"&&s!==null?s=On(s):(r=hn(e)?Br:tn.current,i=e.contextTypes,s=(i=i!=null)?Bs(t,r):mr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=uc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Np(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&uc.enqueueReplaceState(e,e.state,null)}function pf(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},$d(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=On(s):(s=hn(e)?Br:tn.current,r.context=Bs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(hf(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&uc.enqueueReplaceState(r,r.state,null),Ol(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Vs(t,e){try{var n="",i=e;do n+=zv(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function qc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function mf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var hS=typeof WeakMap=="function"?WeakMap:Map;function X_(t,e,n){n=Ci(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Vl||(Vl=!0,wf=i),mf(t,e)},n}function j_(t,e,n){n=Ci(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){mf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){mf(t,e),typeof i!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Lp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new hS;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=RS.bind(null,t,e,n),e.then(t,t))}function Ip(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Up(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ci(-1,1),e.tag=2,cr(n,e,1))),n.lanes|=1),t)}var pS=Bi.ReactCurrentOwner,fn=!1;function sn(t,e,n,i){e.child=t===null?y_(e,null,n,i):zs(e,t.child,n,i)}function Fp(t,e,n,i,r){n=n.render;var s=e.ref;return Ns(e,r),i=th(t,e,n,i,s,r),n=nh(),t!==null&&!fn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(gt&&n&&Gd(e),e.flags|=1,sn(t,e,i,r),e.child)}function Op(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!dh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,Y_(t,e,s,i,r)):(t=pl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:za,n(a,i)&&t.ref===e.ref)return Ii(t,e,r)}return e.flags|=1,t=dr(s,i),t.ref=e.ref,t.return=e,e.child=t}function Y_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(za(s,i)&&t.ref===e.ref)if(fn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(fn=!0);else return e.lanes=t.lanes,Ii(t,e,r)}return gf(t,e,n,i,r)}function q_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},dt(As,Sn),Sn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,dt(As,Sn),Sn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,dt(As,Sn),Sn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,dt(As,Sn),Sn|=i;return sn(t,e,r,n),e.child}function K_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function gf(t,e,n,i,r){var s=hn(n)?Br:tn.current;return s=Bs(e,s),Ns(e,r),n=th(t,e,n,i,s,r),i=nh(),t!==null&&!fn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(gt&&i&&Gd(e),e.flags|=1,sn(t,e,n,r),e.child)}function Bp(t,e,n,i,r){if(hn(n)){var s=!0;Nl(e)}else s=!1;if(Ns(e,r),e.stateNode===null)fl(t,e),W_(e,n,i),pf(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=On(c):(c=hn(n)?Br:tn.current,c=Bs(e,c));var h=n.getDerivedStateFromProps,d=typeof h=="function"||typeof a.getSnapshotBeforeUpdate=="function";d||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&Np(e,a,i,c),Zi=!1;var f=e.memoizedState;a.state=f,Ol(e,i,a,r),l=e.memoizedState,o!==i||f!==l||dn.current||Zi?(typeof h=="function"&&(hf(e,n,h,i),l=e.memoizedState),(o=Zi||Dp(e,n,o,i,f,l,c))?(d||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,E_(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:Wn(e.type,o),a.props=c,d=e.pendingProps,f=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=On(l):(l=hn(n)?Br:tn.current,l=Bs(e,l));var p=n.getDerivedStateFromProps;(h=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==d||f!==l)&&Np(e,a,i,l),Zi=!1,f=e.memoizedState,a.state=f,Ol(e,i,a,r);var _=e.memoizedState;o!==d||f!==_||dn.current||Zi?(typeof p=="function"&&(hf(e,n,p,i),_=e.memoizedState),(c=Zi||Dp(e,n,c,i,f,_,l)||!1)?(h||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,_,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,_,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=_),a.props=i,a.state=_,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return _f(t,e,n,i,s,r)}function _f(t,e,n,i,r,s){K_(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&Ep(e,n,!1),Ii(t,e,s);i=e.stateNode,pS.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=zs(e,t.child,null,s),e.child=zs(e,null,o,s)):sn(t,e,o,s),e.memoizedState=i.state,r&&Ep(e,n,!0),e.child}function $_(t){var e=t.stateNode;e.pendingContext?Mp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Mp(t,e.context,!1),Zd(t,e.containerInfo)}function kp(t,e,n,i,r){return ks(),Xd(r),e.flags|=256,sn(t,e,n,i),e.child}var vf={dehydrated:null,treeContext:null,retryLane:0};function xf(t){return{baseLanes:t,cachePool:null,transitions:null}}function Z_(t,e,n){var i=e.pendingProps,r=xt.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),dt(xt,r&1),t===null)return ff(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=hc(a,i,0,null),t=Or(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=xf(n),e.memoizedState=vf,t):sh(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return mS(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=dr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=dr(o,s):(s=Or(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?xf(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=vf,i}return s=t.child,t=s.sibling,i=dr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function sh(t,e){return e=hc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Mo(t,e,n,i){return i!==null&&Xd(i),zs(e,t.child,null,n),t=sh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function mS(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=qc(Error(se(422))),Mo(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=hc({mode:"visible",children:i.children},r,0,null),s=Or(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&zs(e,t.child,null,a),e.child.memoizedState=xf(a),e.memoizedState=vf,s);if(!(e.mode&1))return Mo(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(se(419)),i=qc(s,i,void 0),Mo(t,e,a,i)}if(o=(a&t.childLanes)!==0,fn||o){if(i=Ht,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Li(t,r),Kn(i,t,r,-1))}return fh(),i=qc(Error(se(421))),Mo(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=CS.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,En=lr(r.nextSibling),Tn=e,gt=!0,jn=null,t!==null&&(Dn[Nn++]=wi,Dn[Nn++]=Ai,Dn[Nn++]=kr,wi=t.id,Ai=t.overflow,kr=e),e=sh(e,i.children),e.flags|=4096,e)}function zp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),df(t.return,e,n)}function Kc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function Q_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(sn(t,e,i.children,n),i=xt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&zp(t,n,e);else if(t.tag===19)zp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(dt(xt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Bl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Kc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Bl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Kc(e,!0,n,null,s);break;case"together":Kc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function fl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ii(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Hr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(se(153));if(e.child!==null){for(t=e.child,n=dr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=dr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function gS(t,e,n){switch(e.tag){case 3:$_(e),ks();break;case 5:T_(e);break;case 1:hn(e.type)&&Nl(e);break;case 4:Zd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;dt(Ul,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(dt(xt,xt.current&1),e.flags|=128,null):n&e.child.childLanes?Z_(t,e,n):(dt(xt,xt.current&1),t=Ii(t,e,n),t!==null?t.sibling:null);dt(xt,xt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return Q_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),dt(xt,xt.current),i)break;return null;case 22:case 23:return e.lanes=0,q_(t,e,n)}return Ii(t,e,n)}var J_,Sf,e0,t0;J_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Sf=function(){};e0=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Lr(ci.current);var s=null;switch(n){case"input":r=Hu(t,r),i=Hu(t,i),s=[];break;case"select":r=yt({},r,{value:void 0}),i=yt({},i,{value:void 0}),s=[];break;case"textarea":r=Wu(t,r),i=Wu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Pl)}ju(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(La.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(La.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&pt("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};t0=function(t,e,n,i){n!==i&&(e.flags|=4)};function sa(t,e){if(!gt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function qt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function _S(t,e,n){var i=e.pendingProps;switch(Wd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return qt(e),null;case 1:return hn(e.type)&&Dl(),qt(e),null;case 3:return i=e.stateNode,Hs(),mt(dn),mt(tn),Jd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(So(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,jn!==null&&(Cf(jn),jn=null))),Sf(t,e),qt(e),null;case 5:Qd(e);var r=Lr(Xa.current);if(n=e.type,t!==null&&e.stateNode!=null)e0(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(se(166));return qt(e),null}if(t=Lr(ci.current),So(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ri]=e,i[Ga]=s,t=(e.mode&1)!==0,n){case"dialog":pt("cancel",i),pt("close",i);break;case"iframe":case"object":case"embed":pt("load",i);break;case"video":case"audio":for(r=0;r<Sa.length;r++)pt(Sa[r],i);break;case"source":pt("error",i);break;case"img":case"image":case"link":pt("error",i),pt("load",i);break;case"details":pt("toggle",i);break;case"input":Kh(i,s),pt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},pt("invalid",i);break;case"textarea":Zh(i,s),pt("invalid",i)}ju(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&xo(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&xo(i.textContent,o,t),r=["children",""+o]):La.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&pt("scroll",i)}switch(n){case"input":uo(i),$h(i,s,!0);break;case"textarea":uo(i),Qh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Pl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=bg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[ri]=e,t[Ga]=i,J_(t,e,!1,!1),e.stateNode=t;e:{switch(a=Yu(n,i),n){case"dialog":pt("cancel",t),pt("close",t),r=i;break;case"iframe":case"object":case"embed":pt("load",t),r=i;break;case"video":case"audio":for(r=0;r<Sa.length;r++)pt(Sa[r],t);r=i;break;case"source":pt("error",t),r=i;break;case"img":case"image":case"link":pt("error",t),pt("load",t),r=i;break;case"details":pt("toggle",t),r=i;break;case"input":Kh(t,i),r=Hu(t,i),pt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=yt({},i,{value:void 0}),pt("invalid",t);break;case"textarea":Zh(t,i),r=Wu(t,i),pt("invalid",t);break;default:r=i}ju(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Ng(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Pg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ia(t,l):typeof l=="number"&&Ia(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(La.hasOwnProperty(s)?l!=null&&s==="onScroll"&&pt("scroll",t):l!=null&&bd(t,s,l,a))}switch(n){case"input":uo(t),$h(t,i,!1);break;case"textarea":uo(t),Qh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+pr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?Cs(t,!!i.multiple,s,!1):i.defaultValue!=null&&Cs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Pl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return qt(e),null;case 6:if(t&&e.stateNode!=null)t0(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(se(166));if(n=Lr(Xa.current),Lr(ci.current),So(e)){if(i=e.stateNode,n=e.memoizedProps,i[ri]=e,(s=i.nodeValue!==n)&&(t=Tn,t!==null))switch(t.tag){case 3:xo(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&xo(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ri]=e,e.stateNode=i}return qt(e),null;case 13:if(mt(xt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(gt&&En!==null&&e.mode&1&&!(e.flags&128))x_(),ks(),e.flags|=98560,s=!1;else if(s=So(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(se(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(se(317));s[ri]=e}else ks(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;qt(e),s=!1}else jn!==null&&(Cf(jn),jn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||xt.current&1?Ft===0&&(Ft=3):fh())),e.updateQueue!==null&&(e.flags|=4),qt(e),null);case 4:return Hs(),Sf(t,e),t===null&&Ha(e.stateNode.containerInfo),qt(e),null;case 10:return qd(e.type._context),qt(e),null;case 17:return hn(e.type)&&Dl(),qt(e),null;case 19:if(mt(xt),s=e.memoizedState,s===null)return qt(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)sa(s,!1);else{if(Ft!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=Bl(t),a!==null){for(e.flags|=128,sa(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return dt(xt,xt.current&1|2),e.child}t=t.sibling}s.tail!==null&&bt()>Gs&&(e.flags|=128,i=!0,sa(s,!1),e.lanes=4194304)}else{if(!i)if(t=Bl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),sa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!gt)return qt(e),null}else 2*bt()-s.renderingStartTime>Gs&&n!==1073741824&&(e.flags|=128,i=!0,sa(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=bt(),e.sibling=null,n=xt.current,dt(xt,i?n&1|2:n&1),e):(qt(e),null);case 22:case 23:return uh(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Sn&1073741824&&(qt(e),e.subtreeFlags&6&&(e.flags|=8192)):qt(e),null;case 24:return null;case 25:return null}throw Error(se(156,e.tag))}function vS(t,e){switch(Wd(e),e.tag){case 1:return hn(e.type)&&Dl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Hs(),mt(dn),mt(tn),Jd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Qd(e),null;case 13:if(mt(xt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(se(340));ks()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return mt(xt),null;case 4:return Hs(),null;case 10:return qd(e.type._context),null;case 22:case 23:return uh(),null;case 24:return null;default:return null}}var Eo=!1,Zt=!1,xS=typeof WeakSet=="function"?WeakSet:Set,we=null;function ws(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Tt(t,e,i)}else n.current=null}function yf(t,e,n){try{n()}catch(i){Tt(t,e,i)}}var Hp=!1;function SS(t,e){if(rf=Rl,t=a_(),Vd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,h=0,d=t,f=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(o=a+r),d!==s||i!==0&&d.nodeType!==3||(l=a+i),d.nodeType===3&&(a+=d.nodeValue.length),(p=d.firstChild)!==null;)f=d,d=p;for(;;){if(d===t)break t;if(f===n&&++c===r&&(o=a),f===s&&++h===i&&(l=a),(p=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(sf={focusedElem:t,selectionRange:n},Rl=!1,we=e;we!==null;)if(e=we,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,we=t;else for(;we!==null;){e=we;try{var _=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var E=_.memoizedProps,g=_.memoizedState,u=e.stateNode,m=u.getSnapshotBeforeUpdate(e.elementType===e.type?E:Wn(e.type,E),g);u.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var S=e.stateNode.containerInfo;S.nodeType===1?S.textContent="":S.nodeType===9&&S.documentElement&&S.removeChild(S.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(se(163))}}catch(M){Tt(e,e.return,M)}if(t=e.sibling,t!==null){t.return=e.return,we=t;break}we=e.return}return _=Hp,Hp=!1,_}function ba(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&yf(e,n,s)}r=r.next}while(r!==i)}}function fc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Mf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function n0(t){var e=t.alternate;e!==null&&(t.alternate=null,n0(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ri],delete e[Ga],delete e[lf],delete e[nS],delete e[iS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function i0(t){return t.tag===5||t.tag===3||t.tag===4}function Vp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||i0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Ef(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Pl));else if(i!==4&&(t=t.child,t!==null))for(Ef(t,e,n),t=t.sibling;t!==null;)Ef(t,e,n),t=t.sibling}function Tf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Tf(t,e,n),t=t.sibling;t!==null;)Tf(t,e,n),t=t.sibling}var Vt=null,Xn=!1;function Vi(t,e,n){for(n=n.child;n!==null;)r0(t,e,n),n=n.sibling}function r0(t,e,n){if(li&&typeof li.onCommitFiberUnmount=="function")try{li.onCommitFiberUnmount(ic,n)}catch{}switch(n.tag){case 5:Zt||ws(n,e);case 6:var i=Vt,r=Xn;Vt=null,Vi(t,e,n),Vt=i,Xn=r,Vt!==null&&(Xn?(t=Vt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Vt.removeChild(n.stateNode));break;case 18:Vt!==null&&(Xn?(t=Vt,n=n.stateNode,t.nodeType===8?Vc(t.parentNode,n):t.nodeType===1&&Vc(t,n),Ba(t)):Vc(Vt,n.stateNode));break;case 4:i=Vt,r=Xn,Vt=n.stateNode.containerInfo,Xn=!0,Vi(t,e,n),Vt=i,Xn=r;break;case 0:case 11:case 14:case 15:if(!Zt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&yf(n,e,a),r=r.next}while(r!==i)}Vi(t,e,n);break;case 1:if(!Zt&&(ws(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Tt(n,e,o)}Vi(t,e,n);break;case 21:Vi(t,e,n);break;case 22:n.mode&1?(Zt=(i=Zt)||n.memoizedState!==null,Vi(t,e,n),Zt=i):Vi(t,e,n);break;default:Vi(t,e,n)}}function Gp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new xS),e.forEach(function(i){var r=bS.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function zn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Vt=o.stateNode,Xn=!1;break e;case 3:Vt=o.stateNode.containerInfo,Xn=!0;break e;case 4:Vt=o.stateNode.containerInfo,Xn=!0;break e}o=o.return}if(Vt===null)throw Error(se(160));r0(s,a,r),Vt=null,Xn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Tt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)s0(e,t),e=e.sibling}function s0(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(zn(e,t),Jn(t),i&4){try{ba(3,t,t.return),fc(3,t)}catch(E){Tt(t,t.return,E)}try{ba(5,t,t.return)}catch(E){Tt(t,t.return,E)}}break;case 1:zn(e,t),Jn(t),i&512&&n!==null&&ws(n,n.return);break;case 5:if(zn(e,t),Jn(t),i&512&&n!==null&&ws(n,n.return),t.flags&32){var r=t.stateNode;try{Ia(r,"")}catch(E){Tt(t,t.return,E)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Rg(r,s),Yu(o,a);var c=Yu(o,s);for(a=0;a<l.length;a+=2){var h=l[a],d=l[a+1];h==="style"?Ng(r,d):h==="dangerouslySetInnerHTML"?Pg(r,d):h==="children"?Ia(r,d):bd(r,h,d,c)}switch(o){case"input":Vu(r,s);break;case"textarea":Cg(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?Cs(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?Cs(r,!!s.multiple,s.defaultValue,!0):Cs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ga]=s}catch(E){Tt(t,t.return,E)}}break;case 6:if(zn(e,t),Jn(t),i&4){if(t.stateNode===null)throw Error(se(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(E){Tt(t,t.return,E)}}break;case 3:if(zn(e,t),Jn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ba(e.containerInfo)}catch(E){Tt(t,t.return,E)}break;case 4:zn(e,t),Jn(t);break;case 13:zn(e,t),Jn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(lh=bt())),i&4&&Gp(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(Zt=(c=Zt)||h,zn(e,t),Zt=c):zn(e,t),Jn(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(we=t,h=t.child;h!==null;){for(d=we=h;we!==null;){switch(f=we,p=f.child,f.tag){case 0:case 11:case 14:case 15:ba(4,f,f.return);break;case 1:ws(f,f.return);var _=f.stateNode;if(typeof _.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,_.props=e.memoizedProps,_.state=e.memoizedState,_.componentWillUnmount()}catch(E){Tt(i,n,E)}}break;case 5:ws(f,f.return);break;case 22:if(f.memoizedState!==null){Xp(d);continue}}p!==null?(p.return=f,we=p):Xp(d)}h=h.sibling}e:for(h=null,d=t;;){if(d.tag===5){if(h===null){h=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=d.stateNode,l=d.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Dg("display",a))}catch(E){Tt(t,t.return,E)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(E){Tt(t,t.return,E)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:zn(e,t),Jn(t),i&4&&Gp(t);break;case 21:break;default:zn(e,t),Jn(t)}}function Jn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(i0(n)){var i=n;break e}n=n.return}throw Error(se(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ia(r,""),i.flags&=-33);var s=Vp(t);Tf(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=Vp(t);Ef(t,o,a);break;default:throw Error(se(161))}}catch(l){Tt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function yS(t,e,n){we=t,a0(t)}function a0(t,e,n){for(var i=(t.mode&1)!==0;we!==null;){var r=we,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||Eo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||Zt;o=Eo;var c=Zt;if(Eo=a,(Zt=l)&&!c)for(we=r;we!==null;)a=we,l=a.child,a.tag===22&&a.memoizedState!==null?jp(r):l!==null?(l.return=a,we=l):jp(r);for(;s!==null;)we=s,a0(s),s=s.sibling;we=r,Eo=o,Zt=c}Wp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,we=s):Wp(t)}}function Wp(t){for(;we!==null;){var e=we;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Zt||fc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Zt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Wn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Cp(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Cp(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&Ba(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(se(163))}Zt||e.flags&512&&Mf(e)}catch(f){Tt(e,e.return,f)}}if(e===t){we=null;break}if(n=e.sibling,n!==null){n.return=e.return,we=n;break}we=e.return}}function Xp(t){for(;we!==null;){var e=we;if(e===t){we=null;break}var n=e.sibling;if(n!==null){n.return=e.return,we=n;break}we=e.return}}function jp(t){for(;we!==null;){var e=we;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{fc(4,e)}catch(l){Tt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Tt(e,r,l)}}var s=e.return;try{Mf(e)}catch(l){Tt(e,s,l)}break;case 5:var a=e.return;try{Mf(e)}catch(l){Tt(e,a,l)}}}catch(l){Tt(e,e.return,l)}if(e===t){we=null;break}var o=e.sibling;if(o!==null){o.return=e.return,we=o;break}we=e.return}}var MS=Math.ceil,Hl=Bi.ReactCurrentDispatcher,ah=Bi.ReactCurrentOwner,Un=Bi.ReactCurrentBatchConfig,$e=0,Ht=null,Dt=null,Wt=0,Sn=0,As=xr(0),Ft=0,Ka=null,Hr=0,dc=0,oh=0,Pa=null,un=null,lh=0,Gs=1/0,Mi=null,Vl=!1,wf=null,ur=null,To=!1,ir=null,Gl=0,Da=0,Af=null,dl=-1,hl=0;function an(){return $e&6?bt():dl!==-1?dl:dl=bt()}function fr(t){return t.mode&1?$e&2&&Wt!==0?Wt&-Wt:sS.transition!==null?(hl===0&&(hl=Wg()),hl):(t=et,t!==0||(t=window.event,t=t===void 0?16:Zg(t.type)),t):1}function Kn(t,e,n,i){if(50<Da)throw Da=0,Af=null,Error(se(185));eo(t,n,i),(!($e&2)||t!==Ht)&&(t===Ht&&(!($e&2)&&(dc|=n),Ft===4&&er(t,Wt)),pn(t,i),n===1&&$e===0&&!(e.mode&1)&&(Gs=bt()+500,lc&&Sr()))}function pn(t,e){var n=t.callbackNode;sx(t,e);var i=Al(t,t===Ht?Wt:0);if(i===0)n!==null&&tp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&tp(n),e===1)t.tag===0?rS(Yp.bind(null,t)):g_(Yp.bind(null,t)),eS(function(){!($e&6)&&Sr()}),n=null;else{switch(Xg(i)){case 1:n=Id;break;case 4:n=Vg;break;case 16:n=wl;break;case 536870912:n=Gg;break;default:n=wl}n=p0(n,o0.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function o0(t,e){if(dl=-1,hl=0,$e&6)throw Error(se(327));var n=t.callbackNode;if(Ls()&&t.callbackNode!==n)return null;var i=Al(t,t===Ht?Wt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Wl(t,i);else{e=i;var r=$e;$e|=2;var s=c0();(Ht!==t||Wt!==e)&&(Mi=null,Gs=bt()+500,Fr(t,e));do try{wS();break}catch(o){l0(t,o)}while(!0);Yd(),Hl.current=s,$e=r,Dt!==null?e=0:(Ht=null,Wt=0,e=Ft)}if(e!==0){if(e===2&&(r=Qu(t),r!==0&&(i=r,e=Rf(t,r))),e===1)throw n=Ka,Fr(t,0),er(t,i),pn(t,bt()),n;if(e===6)er(t,i);else{if(r=t.current.alternate,!(i&30)&&!ES(r)&&(e=Wl(t,i),e===2&&(s=Qu(t),s!==0&&(i=s,e=Rf(t,s))),e===1))throw n=Ka,Fr(t,0),er(t,i),pn(t,bt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(se(345));case 2:Cr(t,un,Mi);break;case 3:if(er(t,i),(i&130023424)===i&&(e=lh+500-bt(),10<e)){if(Al(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){an(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=of(Cr.bind(null,t,un,Mi),e);break}Cr(t,un,Mi);break;case 4:if(er(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-qn(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=bt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*MS(i/1960))-i,10<i){t.timeoutHandle=of(Cr.bind(null,t,un,Mi),i);break}Cr(t,un,Mi);break;case 5:Cr(t,un,Mi);break;default:throw Error(se(329))}}}return pn(t,bt()),t.callbackNode===n?o0.bind(null,t):null}function Rf(t,e){var n=Pa;return t.current.memoizedState.isDehydrated&&(Fr(t,e).flags|=256),t=Wl(t,e),t!==2&&(e=un,un=n,e!==null&&Cf(e)),t}function Cf(t){un===null?un=t:un.push.apply(un,t)}function ES(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!$n(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function er(t,e){for(e&=~oh,e&=~dc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-qn(e),i=1<<n;t[n]=-1,e&=~i}}function Yp(t){if($e&6)throw Error(se(327));Ls();var e=Al(t,0);if(!(e&1))return pn(t,bt()),null;var n=Wl(t,e);if(t.tag!==0&&n===2){var i=Qu(t);i!==0&&(e=i,n=Rf(t,i))}if(n===1)throw n=Ka,Fr(t,0),er(t,e),pn(t,bt()),n;if(n===6)throw Error(se(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Cr(t,un,Mi),pn(t,bt()),null}function ch(t,e){var n=$e;$e|=1;try{return t(e)}finally{$e=n,$e===0&&(Gs=bt()+500,lc&&Sr())}}function Vr(t){ir!==null&&ir.tag===0&&!($e&6)&&Ls();var e=$e;$e|=1;var n=Un.transition,i=et;try{if(Un.transition=null,et=1,t)return t()}finally{et=i,Un.transition=n,$e=e,!($e&6)&&Sr()}}function uh(){Sn=As.current,mt(As)}function Fr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,Jx(n)),Dt!==null)for(n=Dt.return;n!==null;){var i=n;switch(Wd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Dl();break;case 3:Hs(),mt(dn),mt(tn),Jd();break;case 5:Qd(i);break;case 4:Hs();break;case 13:mt(xt);break;case 19:mt(xt);break;case 10:qd(i.type._context);break;case 22:case 23:uh()}n=n.return}if(Ht=t,Dt=t=dr(t.current,null),Wt=Sn=e,Ft=0,Ka=null,oh=dc=Hr=0,un=Pa=null,Nr!==null){for(e=0;e<Nr.length;e++)if(n=Nr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Nr=null}return t}function l0(t,e){do{var n=Dt;try{if(Yd(),cl.current=zl,kl){for(var i=St.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}kl=!1}if(zr=0,zt=Ut=St=null,Ca=!1,ja=0,ah.current=null,n===null||n.return===null){Ft=1,Ka=e,Dt=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=Wt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,h=o,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var f=h.alternate;f?(h.updateQueue=f.updateQueue,h.memoizedState=f.memoizedState,h.lanes=f.lanes):(h.updateQueue=null,h.memoizedState=null)}var p=Ip(a);if(p!==null){p.flags&=-257,Up(p,a,o,s,e),p.mode&1&&Lp(s,c,e),e=p,l=c;var _=e.updateQueue;if(_===null){var E=new Set;E.add(l),e.updateQueue=E}else _.add(l);break e}else{if(!(e&1)){Lp(s,c,e),fh();break e}l=Error(se(426))}}else if(gt&&o.mode&1){var g=Ip(a);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Up(g,a,o,s,e),Xd(Vs(l,o));break e}}s=l=Vs(l,o),Ft!==4&&(Ft=2),Pa===null?Pa=[s]:Pa.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=X_(s,l,e);Rp(s,u);break e;case 1:o=l;var m=s.type,S=s.stateNode;if(!(s.flags&128)&&(typeof m.getDerivedStateFromError=="function"||S!==null&&typeof S.componentDidCatch=="function"&&(ur===null||!ur.has(S)))){s.flags|=65536,e&=-e,s.lanes|=e;var M=j_(s,o,e);Rp(s,M);break e}}s=s.return}while(s!==null)}f0(n)}catch(R){e=R,Dt===n&&n!==null&&(Dt=n=n.return);continue}break}while(!0)}function c0(){var t=Hl.current;return Hl.current=zl,t===null?zl:t}function fh(){(Ft===0||Ft===3||Ft===2)&&(Ft=4),Ht===null||!(Hr&268435455)&&!(dc&268435455)||er(Ht,Wt)}function Wl(t,e){var n=$e;$e|=2;var i=c0();(Ht!==t||Wt!==e)&&(Mi=null,Fr(t,e));do try{TS();break}catch(r){l0(t,r)}while(!0);if(Yd(),$e=n,Hl.current=i,Dt!==null)throw Error(se(261));return Ht=null,Wt=0,Ft}function TS(){for(;Dt!==null;)u0(Dt)}function wS(){for(;Dt!==null&&!$v();)u0(Dt)}function u0(t){var e=h0(t.alternate,t,Sn);t.memoizedProps=t.pendingProps,e===null?f0(t):Dt=e,ah.current=null}function f0(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=vS(n,e),n!==null){n.flags&=32767,Dt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ft=6,Dt=null;return}}else if(n=_S(n,e,Sn),n!==null){Dt=n;return}if(e=e.sibling,e!==null){Dt=e;return}Dt=e=t}while(e!==null);Ft===0&&(Ft=5)}function Cr(t,e,n){var i=et,r=Un.transition;try{Un.transition=null,et=1,AS(t,e,n,i)}finally{Un.transition=r,et=i}return null}function AS(t,e,n,i){do Ls();while(ir!==null);if($e&6)throw Error(se(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(se(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(ax(t,s),t===Ht&&(Dt=Ht=null,Wt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||To||(To=!0,p0(wl,function(){return Ls(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Un.transition,Un.transition=null;var a=et;et=1;var o=$e;$e|=4,ah.current=null,SS(t,n),s0(n,t),jx(sf),Rl=!!rf,sf=rf=null,t.current=n,yS(n),Zv(),$e=o,et=a,Un.transition=s}else t.current=n;if(To&&(To=!1,ir=t,Gl=r),s=t.pendingLanes,s===0&&(ur=null),ex(n.stateNode),pn(t,bt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Vl)throw Vl=!1,t=wf,wf=null,t;return Gl&1&&t.tag!==0&&Ls(),s=t.pendingLanes,s&1?t===Af?Da++:(Da=0,Af=t):Da=0,Sr(),null}function Ls(){if(ir!==null){var t=Xg(Gl),e=Un.transition,n=et;try{if(Un.transition=null,et=16>t?16:t,ir===null)var i=!1;else{if(t=ir,ir=null,Gl=0,$e&6)throw Error(se(331));var r=$e;for($e|=4,we=t.current;we!==null;){var s=we,a=s.child;if(we.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(we=c;we!==null;){var h=we;switch(h.tag){case 0:case 11:case 15:ba(8,h,s)}var d=h.child;if(d!==null)d.return=h,we=d;else for(;we!==null;){h=we;var f=h.sibling,p=h.return;if(n0(h),h===c){we=null;break}if(f!==null){f.return=p,we=f;break}we=p}}}var _=s.alternate;if(_!==null){var E=_.child;if(E!==null){_.child=null;do{var g=E.sibling;E.sibling=null,E=g}while(E!==null)}}we=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,we=a;else e:for(;we!==null;){if(s=we,s.flags&2048)switch(s.tag){case 0:case 11:case 15:ba(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,we=u;break e}we=s.return}}var m=t.current;for(we=m;we!==null;){a=we;var S=a.child;if(a.subtreeFlags&2064&&S!==null)S.return=a,we=S;else e:for(a=m;we!==null;){if(o=we,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:fc(9,o)}}catch(R){Tt(o,o.return,R)}if(o===a){we=null;break e}var M=o.sibling;if(M!==null){M.return=o.return,we=M;break e}we=o.return}}if($e=r,Sr(),li&&typeof li.onPostCommitFiberRoot=="function")try{li.onPostCommitFiberRoot(ic,t)}catch{}i=!0}return i}finally{et=n,Un.transition=e}}return!1}function qp(t,e,n){e=Vs(n,e),e=X_(t,e,1),t=cr(t,e,1),e=an(),t!==null&&(eo(t,1,e),pn(t,e))}function Tt(t,e,n){if(t.tag===3)qp(t,t,n);else for(;e!==null;){if(e.tag===3){qp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ur===null||!ur.has(i))){t=Vs(n,t),t=j_(e,t,1),e=cr(e,t,1),t=an(),e!==null&&(eo(e,1,t),pn(e,t));break}}e=e.return}}function RS(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=an(),t.pingedLanes|=t.suspendedLanes&n,Ht===t&&(Wt&n)===n&&(Ft===4||Ft===3&&(Wt&130023424)===Wt&&500>bt()-lh?Fr(t,0):oh|=n),pn(t,e)}function d0(t,e){e===0&&(t.mode&1?(e=po,po<<=1,!(po&130023424)&&(po=4194304)):e=1);var n=an();t=Li(t,e),t!==null&&(eo(t,e,n),pn(t,n))}function CS(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),d0(t,n)}function bS(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(se(314))}i!==null&&i.delete(e),d0(t,n)}var h0;h0=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||dn.current)fn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return fn=!1,gS(t,e,n);fn=!!(t.flags&131072)}else fn=!1,gt&&e.flags&1048576&&__(e,Il,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;fl(t,e),t=e.pendingProps;var r=Bs(e,tn.current);Ns(e,n),r=th(null,e,i,t,r,n);var s=nh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,hn(i)?(s=!0,Nl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,$d(e),r.updater=uc,e.stateNode=r,r._reactInternals=e,pf(e,i,t,n),e=_f(null,e,i,!0,s,n)):(e.tag=0,gt&&s&&Gd(e),sn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(fl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=DS(i),t=Wn(i,t),r){case 0:e=gf(null,e,i,t,n);break e;case 1:e=Bp(null,e,i,t,n);break e;case 11:e=Fp(null,e,i,t,n);break e;case 14:e=Op(null,e,i,Wn(i.type,t),n);break e}throw Error(se(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),gf(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),Bp(t,e,i,r,n);case 3:e:{if($_(e),t===null)throw Error(se(387));i=e.pendingProps,s=e.memoizedState,r=s.element,E_(t,e),Ol(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Vs(Error(se(423)),e),e=kp(t,e,i,n,r);break e}else if(i!==r){r=Vs(Error(se(424)),e),e=kp(t,e,i,n,r);break e}else for(En=lr(e.stateNode.containerInfo.firstChild),Tn=e,gt=!0,jn=null,n=y_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ks(),i===r){e=Ii(t,e,n);break e}sn(t,e,i,n)}e=e.child}return e;case 5:return T_(e),t===null&&ff(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,af(i,r)?a=null:s!==null&&af(i,s)&&(e.flags|=32),K_(t,e),sn(t,e,a,n),e.child;case 6:return t===null&&ff(e),null;case 13:return Z_(t,e,n);case 4:return Zd(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=zs(e,null,i,n):sn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),Fp(t,e,i,r,n);case 7:return sn(t,e,e.pendingProps,n),e.child;case 8:return sn(t,e,e.pendingProps.children,n),e.child;case 12:return sn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,dt(Ul,i._currentValue),i._currentValue=a,s!==null)if($n(s.value,a)){if(s.children===r.children&&!dn.current){e=Ii(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ci(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?l.next=l:(l.next=h.next,h.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),df(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(se(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),df(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}sn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Ns(e,n),r=On(r),i=i(r),e.flags|=1,sn(t,e,i,n),e.child;case 14:return i=e.type,r=Wn(i,e.pendingProps),r=Wn(i.type,r),Op(t,e,i,r,n);case 15:return Y_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Wn(i,r),fl(t,e),e.tag=1,hn(i)?(t=!0,Nl(e)):t=!1,Ns(e,n),W_(e,i,r),pf(e,i,r,n),_f(null,e,i,!0,t,n);case 19:return Q_(t,e,n);case 22:return q_(t,e,n)}throw Error(se(156,e.tag))};function p0(t,e){return Hg(t,e)}function PS(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function In(t,e,n,i){return new PS(t,e,n,i)}function dh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function DS(t){if(typeof t=="function")return dh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Dd)return 11;if(t===Nd)return 14}return 2}function dr(t,e){var n=t.alternate;return n===null?(n=In(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function pl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")dh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case gs:return Or(n.children,r,s,e);case Pd:a=8,r|=8;break;case Ou:return t=In(12,n,e,r|2),t.elementType=Ou,t.lanes=s,t;case Bu:return t=In(13,n,e,r),t.elementType=Bu,t.lanes=s,t;case ku:return t=In(19,n,e,r),t.elementType=ku,t.lanes=s,t;case Tg:return hc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Mg:a=10;break e;case Eg:a=9;break e;case Dd:a=11;break e;case Nd:a=14;break e;case $i:a=16,i=null;break e}throw Error(se(130,t==null?t:typeof t,""))}return e=In(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function Or(t,e,n,i){return t=In(7,t,i,e),t.lanes=n,t}function hc(t,e,n,i){return t=In(22,t,i,e),t.elementType=Tg,t.lanes=n,t.stateNode={isHidden:!1},t}function $c(t,e,n){return t=In(6,t,null,e),t.lanes=n,t}function Zc(t,e,n){return e=In(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function NS(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Dc(0),this.expirationTimes=Dc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Dc(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function hh(t,e,n,i,r,s,a,o,l){return t=new NS(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=In(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},$d(s),t}function LS(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ms,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function m0(t){if(!t)return mr;t=t._reactInternals;e:{if(Yr(t)!==t||t.tag!==1)throw Error(se(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(hn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(se(171))}if(t.tag===1){var n=t.type;if(hn(n))return m_(t,n,e)}return e}function g0(t,e,n,i,r,s,a,o,l){return t=hh(n,i,!0,t,r,s,a,o,l),t.context=m0(null),n=t.current,i=an(),r=fr(n),s=Ci(i,r),s.callback=e??null,cr(n,s,r),t.current.lanes=r,eo(t,r,i),pn(t,i),t}function pc(t,e,n,i){var r=e.current,s=an(),a=fr(r);return n=m0(n),e.context===null?e.context=n:e.pendingContext=n,e=Ci(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=cr(r,e,a),t!==null&&(Kn(t,r,a,s),ll(t,r,a)),a}function Xl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Kp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function ph(t,e){Kp(t,e),(t=t.alternate)&&Kp(t,e)}function IS(){return null}var _0=typeof reportError=="function"?reportError:function(t){console.error(t)};function mh(t){this._internalRoot=t}mc.prototype.render=mh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(se(409));pc(t,e,null,null)};mc.prototype.unmount=mh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Vr(function(){pc(null,t,null,null)}),e[Ni]=null}};function mc(t){this._internalRoot=t}mc.prototype.unstable_scheduleHydration=function(t){if(t){var e=qg();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ji.length&&e!==0&&e<Ji[n].priority;n++);Ji.splice(n,0,t),n===0&&$g(t)}};function gh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function gc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function $p(){}function US(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Xl(a);s.call(c)}}var a=g0(e,i,t,0,null,!1,!1,"",$p);return t._reactRootContainer=a,t[Ni]=a.current,Ha(t.nodeType===8?t.parentNode:t),Vr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=Xl(l);o.call(c)}}var l=hh(t,0,!1,null,null,!1,!1,"",$p);return t._reactRootContainer=l,t[Ni]=l.current,Ha(t.nodeType===8?t.parentNode:t),Vr(function(){pc(e,l,n,i)}),l}function _c(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Xl(a);o.call(l)}}pc(e,a,t,r)}else a=US(n,e,t,r,i);return Xl(a)}jg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=xa(e.pendingLanes);n!==0&&(Ud(e,n|1),pn(e,bt()),!($e&6)&&(Gs=bt()+500,Sr()))}break;case 13:Vr(function(){var i=Li(t,1);if(i!==null){var r=an();Kn(i,t,1,r)}}),ph(t,1)}};Fd=function(t){if(t.tag===13){var e=Li(t,134217728);if(e!==null){var n=an();Kn(e,t,134217728,n)}ph(t,134217728)}};Yg=function(t){if(t.tag===13){var e=fr(t),n=Li(t,e);if(n!==null){var i=an();Kn(n,t,e,i)}ph(t,e)}};qg=function(){return et};Kg=function(t,e){var n=et;try{return et=t,e()}finally{et=n}};Ku=function(t,e,n){switch(e){case"input":if(Vu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=oc(i);if(!r)throw Error(se(90));Ag(i),Vu(i,r)}}}break;case"textarea":Cg(t,n);break;case"select":e=n.value,e!=null&&Cs(t,!!n.multiple,e,!1)}};Ug=ch;Fg=Vr;var FS={usingClientEntryPoint:!1,Events:[no,Ss,oc,Lg,Ig,ch]},aa={findFiberByHostInstance:Dr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},OS={bundleType:aa.bundleType,version:aa.version,rendererPackageName:aa.rendererPackageName,rendererConfig:aa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Bi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=kg(t),t===null?null:t.stateNode},findFiberByHostInstance:aa.findFiberByHostInstance||IS,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var wo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wo.isDisabled&&wo.supportsFiber)try{ic=wo.inject(OS),li=wo}catch{}}An.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=FS;An.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!gh(e))throw Error(se(200));return LS(t,e,null,n)};An.createRoot=function(t,e){if(!gh(t))throw Error(se(299));var n=!1,i="",r=_0;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=hh(t,1,!1,null,null,n,!1,i,r),t[Ni]=e.current,Ha(t.nodeType===8?t.parentNode:t),new mh(e)};An.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(se(188)):(t=Object.keys(t).join(","),Error(se(268,t)));return t=kg(e),t=t===null?null:t.stateNode,t};An.flushSync=function(t){return Vr(t)};An.hydrate=function(t,e,n){if(!gc(e))throw Error(se(200));return _c(null,t,e,!0,n)};An.hydrateRoot=function(t,e,n){if(!gh(t))throw Error(se(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=_0;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=g0(e,null,t,1,n??null,r,!1,s,a),t[Ni]=e.current,Ha(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new mc(e)};An.render=function(t,e,n){if(!gc(e))throw Error(se(200));return _c(null,t,e,!1,n)};An.unmountComponentAtNode=function(t){if(!gc(t))throw Error(se(40));return t._reactRootContainer?(Vr(function(){_c(null,null,t,!1,function(){t._reactRootContainer=null,t[Ni]=null})}),!0):!1};An.unstable_batchedUpdates=ch;An.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!gc(n))throw Error(se(200));if(t==null||t._reactInternals===void 0)throw Error(se(38));return _c(t,e,n,!1,i)};An.version="18.3.1-next-f1338f8080-20240426";function v0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(v0)}catch(t){console.error(t)}}v0(),vg.exports=An;var BS=vg.exports,x0,Zp=BS;x0=Zp.createRoot,Zp.hydrateRoot;const kS=`
 ██████╗ ███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
██╔════╝ ██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
╚█████╗  █████╗  ███████║██████╔╝██║     ███████║
 ╚═══██╗ ██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
██████╔╝ ███████╗██║  ██║██║  ██║╚██████╗██║  ██║
╚═════╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`.trim();function zS(){return new Date().toISOString().replace("T"," ").slice(0,19)+" UTC"}function gi(t){return t>=1e6?(t/1e6).toFixed(1)+"M":t>=1e3?(t/1e3).toFixed(1)+"K":t.toLocaleString()}function HS({onSearch:t,onAbout:e,onGraph:n}){const[i,r]=at.useState(""),[s,a]=at.useState(null);at.useEffect(()=>{fetch("/api/stats").then(l=>l.ok?l.json():Promise.reject()).then(l=>a(l)).catch(()=>{})},[]);const o=l=>{l.preventDefault(),i.trim()&&t(i.trim())};return P.jsxs(P.Fragment,{children:[P.jsxs("header",{className:"site-header",children:[P.jsxs("div",{className:"header-meta",children:[P.jsx("span",{children:"CORP. NETWORK INTERFACE // AUTHORIZED ACCESS ONLY"}),P.jsx("span",{children:zS()})]}),P.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"10px",marginBottom:"6px"},children:[P.jsx("button",{className:"crt-btn",onClick:n,style:{fontSize:"0.78em"},children:"GRAPH"}),P.jsx("button",{className:"crt-btn",onClick:e,style:{fontSize:"0.78em"},children:"ABOUT"})]}),P.jsxs("div",{className:"header-status",children:[P.jsx("span",{className:"status-dot",children:"■"})," MAINFRAME OPERATIONAL ",P.jsx("span",{className:"status-dot",children:"■"})," SEARCH NODE ONLINE ",P.jsx("span",{className:"status-dot",children:"■"})," CRAWLER NET ACTIVE"]})]}),P.jsxs("div",{className:"home-hero",children:[P.jsx("pre",{className:"ascii-logo glow",children:kS}),P.jsx("p",{className:"subtitle",children:"D I S T R I B U T E D   W E B   I N D E X   v 2 . 4"}),P.jsxs("form",{className:"search-form-home",onSubmit:o,children:[P.jsxs("div",{className:"search-row",children:[P.jsx("span",{className:"prompt-label",children:"QUERY>"}),P.jsx("input",{className:"search-input",type:"text",value:i,onChange:l=>r(l.target.value),placeholder:"enter search terms...",autoFocus:!0,spellCheck:!1,autoComplete:"off"}),P.jsx("span",{className:"cursor"})]}),P.jsx("div",{className:"search-submit-row",children:P.jsx("button",{type:"submit",className:"crt-btn",children:"[ EXECUTE SEARCH ]"})})]}),P.jsxs("div",{className:"sys-panel",children:[P.jsx("span",{className:"sys-panel-title",children:"// SUBSYSTEM STATUS"}),P.jsxs("div",{className:"sys-row dim",children:[P.jsx("span",{children:"SUBSYSTEM"}),P.jsx("span",{children:"STATUS"})]}),P.jsx("hr",{className:"divider"}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"FULL-TEXT SEARCH ENGINE"}),P.jsx("span",{className:"sys-ok",children:"■ ONLINE"})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"PAGERANK SCORER"}),P.jsx("span",{className:"sys-ok",children:"■ ONLINE"})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"DISTRIBUTED CRAWLER NET"}),P.jsx("span",{className:"sys-ok",children:"■ ONLINE"})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"MICROSERVICE MESH"}),P.jsx("span",{className:"sys-ok",children:"■ 5 NODES"})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"GRPC TRANSPORT"}),P.jsx("span",{className:"sys-ok",children:"■ READY"})]})]}),s&&P.jsxs("div",{className:"stats-grid",children:[P.jsxs("div",{className:"sys-panel",children:[P.jsx("span",{className:"sys-panel-title",children:"// INDEX STATS"}),P.jsxs("div",{className:"sys-row dim",children:[P.jsx("span",{children:"METRIC"}),P.jsx("span",{children:"VALUE"})]}),P.jsx("hr",{className:"divider"}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"PAGES INDEXED"}),P.jsx("span",{className:"sys-ok",children:gi(s.pagesIndexed)})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"PAGES RANKED"}),P.jsx("span",{className:"sys-ok",children:gi(s.pagesRanked)})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"UNIQUE DOMAINS"}),P.jsx("span",{className:"sys-ok",children:gi(s.uniqueDomains)})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"LINKS MAPPED"}),P.jsx("span",{className:"sys-ok",children:gi(s.totalLinks)})]})]}),P.jsxs("div",{className:"sys-panel",children:[P.jsx("span",{className:"sys-panel-title",children:"// CRAWL & QUERY"}),P.jsxs("div",{className:"sys-row dim",children:[P.jsx("span",{children:"METRIC"}),P.jsx("span",{children:"VALUE"})]}),P.jsx("hr",{className:"divider"}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"CRAWLED LAST 24H"}),P.jsx("span",{className:"sys-ok",children:gi(s.crawledLast24h)})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"PAGES / HOUR"}),P.jsx("span",{className:"sys-ok",children:gi(s.crawlRatePerHr)})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"QUEUE DEPTH"}),P.jsx("span",{className:"sys-ok",children:gi(s.queueDepth)})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"QUERIES LAST HR"}),P.jsx("span",{className:"sys-ok",children:gi(s.searchQueriesLastHr)})]}),P.jsxs("div",{className:"sys-row",children:[P.jsx("span",{children:"QUERIES LAST 24H"}),P.jsx("span",{className:"sys-ok",children:gi(s.searchQueriesLast24h)})]})]})]})]}),P.jsx("footer",{style:{marginTop:"3rem",paddingTop:"2rem",borderTop:"1px solid var(--border)",textAlign:"center",fontSize:"0.72em",color:"var(--p-dim)"},children:P.jsx("a",{href:"https://www.alexcollie.com",target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none",borderBottom:"1px solid var(--border)",paddingBottom:"2px"},children:"by Alex Collie"})})]})}function VS({query:t,onSearch:e,onHome:n,onAbout:i,onGraph:r}){const[s,a]=at.useState(null),[o,l]=at.useState(!0),[c,h]=at.useState(t),[d,f]=at.useState(1);at.useEffect(()=>{l(!0),a(null),fetch(`/api/search?q=${encodeURIComponent(t)}&page=${d}`).then(_=>_.json()).then(_=>{a(_),l(!1)}).catch(()=>{a({results:[],resultCount:0,page:d,nextPage:d+1,prevPage:d-1,hasNext:!1,hasPrev:!1,searchTime:0,error:"CONNECTION TO SEARCH NODE FAILED — RETRY OR CHECK SYSTEM STATUS",query:t}),l(!1)})},[t,d]);const p=_=>{_.preventDefault(),c.trim()&&(f(1),e(c.trim()))};return P.jsxs(P.Fragment,{children:[P.jsx("header",{className:"site-header",children:P.jsxs("div",{className:"header-bar",children:[P.jsx("button",{className:"crt-btn",onClick:n,style:{letterSpacing:"0.22em"},children:"SEARCH//SYS"}),P.jsx("button",{className:"crt-btn",onClick:r,style:{fontSize:"0.82em"},children:"GRAPH"}),P.jsx("button",{className:"crt-btn",onClick:i,style:{fontSize:"0.82em"},children:"ABOUT"}),P.jsx("form",{onSubmit:p,style:{flex:1},children:P.jsxs("div",{className:"search-row",children:[P.jsx("span",{className:"prompt-label",children:"QUERY>"}),P.jsx("input",{className:"search-input",type:"text",value:c,onChange:_=>h(_.target.value),autoFocus:!0,spellCheck:!1,autoComplete:"off"}),P.jsx("button",{type:"submit",className:"crt-btn",children:"EXEC"})]})})]})}),P.jsxs("main",{children:[o&&P.jsx("div",{className:"loading",children:P.jsx("span",{className:"loading-dots",children:"SEARCHING INDEXED DOCUMENTS"})}),!o&&s&&P.jsxs(P.Fragment,{children:[P.jsx("div",{className:"results-meta",children:s.error?P.jsxs("span",{className:"err",children:["!! ",s.error]}):P.jsxs(P.Fragment,{children:[P.jsxs("span",{children:["RECORDS FOUND: ",s.resultCount]})," | ",P.jsxs("span",{children:["QUERY TIME: ",s.searchTime.toFixed(3),"s"]})," | ",P.jsxs("span",{children:["PAGE: ",s.page]})]})}),s.results&&s.results.length>0?P.jsxs(P.Fragment,{children:[s.results.map((_,E)=>P.jsx(GS,{result:_,index:(d-1)*10+E+1},_.url)),P.jsxs("div",{className:"pagination",children:[s.hasPrev&&P.jsx("button",{className:"crt-btn",onClick:()=>f(_=>_-1),children:"◄ PREV"}),P.jsxs("span",{className:"page-info",children:["PAGE ",s.page]}),s.hasNext&&P.jsx("button",{className:"crt-btn",onClick:()=>f(_=>_+1),children:"NEXT ►"})]})]}):!s.error&&P.jsxs("div",{className:"no-results",children:[P.jsxs("div",{children:['NO RECORDS MATCH QUERY: "',t,'"']}),P.jsx("div",{className:"dim",style:{fontSize:"0.82em",marginTop:"8px"},children:"SUGGEST: CHECK SPELLING · BROADEN SEARCH TERMS · TRY SYNONYMS"})]})]})]}),P.jsx("footer",{style:{marginTop:"2rem",paddingTop:"1.5rem",borderTop:"1px solid var(--border)",textAlign:"center",fontSize:"0.72em",color:"var(--p-dim)"},children:P.jsx("a",{href:"https://www.alexcollie.com",target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none",borderBottom:"1px solid var(--border)",paddingBottom:"2px"},children:"by Alex Collie"})})]})}function GS({result:t,index:e}){return P.jsxs("div",{className:"result-record",children:[P.jsxs("span",{className:"record-id",children:["[",String(e).padStart(3,"0"),"] RECORD"]}),P.jsx("div",{className:"record-title",children:P.jsx("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.title||t.url})}),P.jsx("div",{className:"record-url",children:t.url}),t.snippet&&P.jsx("div",{className:"record-snippet",children:t.snippet}),t.lastCrawled&&P.jsxs("div",{className:"record-footer",children:["INDEXED: ",t.lastCrawled]})]})}const Qp="!<>-_\\/[]{}=+*^?#@%アイウエオカキクケコサシスセソ道草水火風0123456789ABCDEF";function Qc(t,e=900,n=80){const[i,r]=at.useState(""),[s,a]=at.useState(0),o=()=>a(l=>l+1);return at.useEffect(()=>{const l=performance.now(),c=[...t].filter(p=>p.trim()).length;let h=l,d;const f=p=>{const _=Math.min((p-l)/e,1);if(p-h>=n){h=p;let g=0;const u=[...t].map(m=>{if(!m.trim())return m;const S=++g/c;return _>=S?m:Qp[Math.floor(Math.random()*Qp.length)]}).join("");r(u)}_<1?d=requestAnimationFrame(f):r(t)};return d=requestAnimationFrame(f),()=>cancelAnimationFrame(d)},[t,e,n,s]),{output:i,replay:o}}function Ao(t){return t>=1e6?(t/1e6).toFixed(1)+"M":t>=1e3?(t/1e3).toFixed(1)+"K":t.toLocaleString()}function WS({onSearch:t,onGraph:e}){const[n,i]=at.useState(""),[r,s]=at.useState(null);at.useEffect(()=>{fetch("/api/stats").then(_=>_.ok?_.json():Promise.reject()).then(_=>s(_)).catch(()=>{})},[]);const{output:a,replay:o}=Qc("MICHICHUSA",900),{output:l,replay:c}=Qc("道草",700),{output:h,replay:d}=Qc("WANDER · DISCOVER · SEARCH",1100),f=()=>{o(),c(),d()},p=_=>{_.preventDefault(),n.trim()&&t(n.trim())};return P.jsxs("div",{className:"about-root",children:[P.jsxs("nav",{className:"about-nav",children:[P.jsx("span",{className:"about-nav-brand",children:"道草"}),P.jsxs("div",{className:"about-nav-links",children:[P.jsx("span",{className:"about-nav-link about-nav-active",children:"ABOUT"}),P.jsx("button",{className:"about-nav-link",onClick:e,children:"GRAPH"})]})]}),P.jsxs("section",{className:"about-hero",children:[P.jsx("div",{className:"about-hero-glow"}),P.jsxs("button",{className:"about-title-wrap",onClick:f,title:"replay animation",children:[P.jsx("h1",{className:"about-title neon-flicker",children:a||" "}),P.jsx("p",{className:"about-kanji  neon-pulse",children:l||" "})]}),P.jsx("p",{className:"about-sub",children:h}),P.jsx("form",{className:"about-search-form",onSubmit:p,children:P.jsxs("div",{className:"about-search-row",children:[P.jsx("span",{className:"about-search-prompt",children:"›"}),P.jsx("input",{className:"about-search-input",type:"text",value:n,onChange:_=>i(_.target.value),placeholder:"search the index...",spellCheck:!1,autoComplete:"off"}),P.jsx("button",{type:"submit",className:"about-search-btn",children:"SEARCH"})]})}),P.jsx("p",{className:"about-scroll-hint",children:"↓ scroll"})]}),P.jsx("section",{className:"about-body",children:P.jsxs("div",{className:"about-grid",children:[P.jsxs("div",{className:"about-card",children:[P.jsx("h2",{className:"about-card-title",children:"// WHAT IS THIS"}),P.jsx("p",{className:"about-card-text",children:"Michichusa is a distributed web search engine built from scratch in Go. Five microservices crawl, index, rank, and serve results — no third-party search API, no shortcuts."}),P.jsxs("p",{className:"about-card-text",children:["道草 ",P.jsx("span",{className:"about-dim",children:"(michikusa)"})," — to dawdle by the roadside, to linger and notice what others walk past. That's how this engine approaches the web: patient, thorough, unhurried."]})]}),P.jsxs("div",{className:"about-card",children:[P.jsx("h2",{className:"about-card-title",children:"// HOW IT WORKS"}),P.jsxs("ul",{className:"about-list",children:[P.jsxs("li",{children:[P.jsx("span",{className:"about-tag",children:"SPIDER"})," crawls URLs, respects robots.txt, guards against SSRF"]}),P.jsxs("li",{children:[P.jsx("span",{className:"about-tag",children:"CONDUCTOR"})," deduplicates and queues pages via PostgreSQL"]}),P.jsxs("li",{children:[P.jsx("span",{className:"about-tag",children:"CARTOGRAPHER"})," computes PageRank across the crawled graph"]}),P.jsxs("li",{children:[P.jsx("span",{className:"about-tag",children:"SEARCHER"})," ranks by full-text (30%) + PageRank (70%)"]}),P.jsxs("li",{children:[P.jsx("span",{className:"about-tag",children:"FRONTEND"})," this terminal you're looking at"]})]})]}),P.jsxs("div",{className:"about-card",children:[P.jsx("h2",{className:"about-card-title",children:"// INDEX"}),P.jsxs("div",{className:"about-stat-grid",children:[P.jsxs("div",{className:"about-stat",children:[P.jsx("span",{className:"about-stat-val",children:r?Ao(r.pagesIndexed):"—"}),P.jsx("span",{className:"about-stat-label",children:"pages indexed"})]}),P.jsxs("div",{className:"about-stat",children:[P.jsx("span",{className:"about-stat-val",children:r?Ao(r.crawledLast24h):"—"}),P.jsx("span",{className:"about-stat-label",children:"crawled last 24h"})]}),P.jsxs("div",{className:"about-stat",children:[P.jsx("span",{className:"about-stat-val",children:r?Ao(r.queueDepth):"—"}),P.jsx("span",{className:"about-stat-label",children:"queued to crawl"})]}),P.jsxs("div",{className:"about-stat",children:[P.jsx("span",{className:"about-stat-val",children:r?Ao(r.crawlRatePerHr):"—"}),P.jsx("span",{className:"about-stat-label",children:"pages / hour"})]})]})]}),P.jsxs("div",{className:"about-card",children:[P.jsx("h2",{className:"about-card-title",children:"// PHILOSOPHY"}),P.jsx("p",{className:"about-card-text about-quote",children:'"The one who wanders is not always lost — sometimes they are the only one paying attention."'}),P.jsx("p",{className:"about-card-text",children:"Search engines shape what we find. Building one by hand is the only way to understand what that means."})]})]})}),P.jsxs("footer",{className:"about-footer",children:[P.jsx("span",{className:"about-dim",children:"MICHICHUSA · 道草 · DISTRIBUTED WEB INDEX"}),P.jsx("br",{style:{marginBottom:"8px"}}),P.jsx("a",{href:"https://www.alexcollie.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--o-dim)",textDecoration:"none",borderBottom:"1px solid var(--o-border)",paddingBottom:"2px"},children:"by Alex Collie"})]})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _h="184",Is={ROTATE:0,DOLLY:1,PAN:2},Rs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},XS=0,Jp=1,jS=2,ml=1,YS=2,ya=3,gr=0,mn=1,Ti=2,bi=0,Us=1,Na=2,em=3,tm=4,qS=5,br=100,KS=101,$S=102,ZS=103,QS=104,JS=200,ey=201,ty=202,ny=203,bf=204,Pf=205,iy=206,ry=207,sy=208,ay=209,oy=210,ly=211,cy=212,uy=213,fy=214,Df=0,Nf=1,Lf=2,Ws=3,If=4,Uf=5,Ff=6,Of=7,S0=0,dy=1,hy=2,ui=0,y0=1,M0=2,E0=3,T0=4,w0=5,A0=6,R0=7,C0=300,Gr=301,Xs=302,Jc=303,eu=304,vc=306,Bf=1e3,Ri=1001,kf=1002,Gt=1003,py=1004,Ro=1005,Qt=1006,tu=1007,Ir=1008,Mn=1009,b0=1010,P0=1011,$a=1012,vh=1013,hi=1014,ai=1015,Ui=1016,xh=1017,Sh=1018,Za=1020,D0=35902,N0=35899,L0=1021,I0=1022,Yn=1023,Fi=1026,Ur=1027,U0=1028,yh=1029,Wr=1030,Mh=1031,Eh=1033,gl=33776,_l=33777,vl=33778,xl=33779,zf=35840,Hf=35841,Vf=35842,Gf=35843,Wf=36196,Xf=37492,jf=37496,Yf=37488,qf=37489,jl=37490,Kf=37491,$f=37808,Zf=37809,Qf=37810,Jf=37811,ed=37812,td=37813,nd=37814,id=37815,rd=37816,sd=37817,ad=37818,od=37819,ld=37820,cd=37821,ud=36492,fd=36494,dd=36495,hd=36283,pd=36284,Yl=36285,md=36286,my=3200,nm=0,gy=1,tr="",Pn="srgb",ql="srgb-linear",Kl="linear",Je="srgb",Zr=7680,im=519,_y=512,vy=513,xy=514,Th=515,Sy=516,yy=517,wh=518,My=519,gd=35044,rm="300 es",oi=2e3,Qa=2001;function Ey(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function $l(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Ty(){const t=$l("canvas");return t.style.display="block",t}const sm={};function Zl(...t){const e="THREE."+t.shift();console.log(e,...t)}function F0(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Le(...t){t=F0(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function Ye(...t){t=F0(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function _d(...t){const e=t.join(" ");e in sm||(sm[e]=!0,Le(...t))}function wy(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const Ay={[Df]:Nf,[Lf]:Ff,[If]:Of,[Ws]:Uf,[Nf]:Df,[Ff]:Lf,[Of]:If,[Uf]:Ws};class yr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sl=Math.PI/180,vd=180/Math.PI;function hr(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[t&255]+Kt[t>>8&255]+Kt[t>>16&255]+Kt[t>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[n&63|128]+Kt[n>>8&255]+"-"+Kt[n>>16&255]+Kt[n>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function We(t,e,n){return Math.max(e,Math.min(n,t))}function Ry(t,e){return(t%e+e)%e}function nu(t,e,n){return(1-n)*t+n*e}function si(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function rt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const Cy={DEG2RAD:Sl},Ph=class Ph{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ph.prototype.isVector2=!0;let Ie=Ph;class _r{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],d=i[r+3],f=s[a+0],p=s[a+1],_=s[a+2],E=s[a+3];if(d!==E||l!==f||c!==p||h!==_){let g=l*f+c*p+h*_+d*E;g<0&&(f=-f,p=-p,_=-_,E=-E,g=-g);let u=1-o;if(g<.9995){const m=Math.acos(g),S=Math.sin(m);u=Math.sin(u*m)/S,o=Math.sin(o*m)/S,l=l*u+f*o,c=c*u+p*o,h=h*u+_*o,d=d*u+E*o}else{l=l*u+f*o,c=c*u+p*o,h=h*u+_*o,d=d*u+E*o;const m=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=m,c*=m,h*=m,d*=m}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],d=s[a],f=s[a+1],p=s[a+2],_=s[a+3];return e[n]=o*_+h*d+l*p-c*f,e[n+1]=l*_+h*f+c*d-o*p,e[n+2]=c*_+h*p+o*f-l*d,e[n+3]=h*_-o*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),d=o(s/2),f=l(i/2),p=l(r/2),_=l(s/2);switch(a){case"XYZ":this._x=f*h*d+c*p*_,this._y=c*p*d-f*h*_,this._z=c*h*_+f*p*d,this._w=c*h*d-f*p*_;break;case"YXZ":this._x=f*h*d+c*p*_,this._y=c*p*d-f*h*_,this._z=c*h*_-f*p*d,this._w=c*h*d+f*p*_;break;case"ZXY":this._x=f*h*d-c*p*_,this._y=c*p*d+f*h*_,this._z=c*h*_+f*p*d,this._w=c*h*d-f*p*_;break;case"ZYX":this._x=f*h*d-c*p*_,this._y=c*p*d+f*h*_,this._z=c*h*_-f*p*d,this._w=c*h*d+f*p*_;break;case"YZX":this._x=f*h*d+c*p*_,this._y=c*p*d+f*h*_,this._z=c*h*_-f*p*d,this._w=c*h*d-f*p*_;break;case"XZY":this._x=f*h*d-c*p*_,this._y=c*p*d-f*h*_,this._z=c*h*_+f*p*d,this._w=c*h*d+f*p*_;break;default:Le("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],h=n[6],d=n[10],f=i+o+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(h-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Dh=class Dh{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(am.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(am.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*n-s*r),d=2*(s*i-a*n);return this.x=n+l*c+a*d-o*h,this.y=i+l*h+o*c-s*d,this.z=r+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this.z=We(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this.z=We(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return iu.copy(this).projectOnVector(e),this.sub(iu)}reflect(e){return this.sub(iu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Dh.prototype.isVector3=!0;let O=Dh;const iu=new O,am=new _r,Nh=class Nh{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],d=i[7],f=i[2],p=i[5],_=i[8],E=r[0],g=r[3],u=r[6],m=r[1],S=r[4],M=r[7],R=r[2],w=r[5],A=r[8];return s[0]=a*E+o*m+l*R,s[3]=a*g+o*S+l*w,s[6]=a*u+o*M+l*A,s[1]=c*E+h*m+d*R,s[4]=c*g+h*S+d*w,s[7]=c*u+h*M+d*A,s[2]=f*E+p*m+_*R,s[5]=f*g+p*S+_*w,s[8]=f*u+p*M+_*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return n*a*h-n*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,f=o*l-h*s,p=c*s-a*l,_=n*d+i*f+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=d*E,e[1]=(r*c-h*i)*E,e[2]=(o*i-r*a)*E,e[3]=f*E,e[4]=(h*n-r*l)*E,e[5]=(r*s-o*n)*E,e[6]=p*E,e[7]=(i*l-c*n)*E,e[8]=(a*n-i*s)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(ru.makeScale(e,n)),this}rotate(e){return this.premultiply(ru.makeRotation(-e)),this}translate(e,n){return this.premultiply(ru.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Nh.prototype.isMatrix3=!0;let Fe=Nh;const ru=new Fe,om=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lm=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function by(){const t={enabled:!0,workingColorSpace:ql,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Je&&(r.r=Pi(r.r),r.g=Pi(r.g),r.b=Pi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Je&&(r.r=Fs(r.r),r.g=Fs(r.g),r.b=Fs(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===tr?Kl:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return _d("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return _d("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[ql]:{primaries:e,whitePoint:i,transfer:Kl,toXYZ:om,fromXYZ:lm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Pn},outputColorSpaceConfig:{drawingBufferColorSpace:Pn}},[Pn]:{primaries:e,whitePoint:i,transfer:Je,toXYZ:om,fromXYZ:lm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Pn}}}),t}const qe=by();function Pi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Fs(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Qr;class Py{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Qr===void 0&&(Qr=$l("canvas")),Qr.width=e.width,Qr.height=e.height;const r=Qr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Qr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=$l("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Pi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Pi(n[i]/255)*255):n[i]=Pi(n[i]);return{data:n,width:e.width,height:e.height}}else return Le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Dy=0;class Ah{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Dy++}),this.uuid=hr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(su(r[a].image)):s.push(su(r[a]))}else s=su(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function su(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Py.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Le("Texture: Unable to serialize Texture."),{})}let Ny=0;const au=new O;class Jt extends yr{constructor(e=Jt.DEFAULT_IMAGE,n=Jt.DEFAULT_MAPPING,i=Ri,r=Ri,s=Qt,a=Ir,o=Yn,l=Mn,c=Jt.DEFAULT_ANISOTROPY,h=tr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=hr(),this.name="",this.source=new Ah(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ie(0,0),this.repeat=new Ie(1,1),this.center=new Ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(au).x}get height(){return this.source.getSize(au).y}get depth(){return this.source.getSize(au).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Le(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Le(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==C0)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bf:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case kf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bf:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case kf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=C0;Jt.DEFAULT_ANISOTROPY=1;const Lh=class Lh{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],p=l[5],_=l[9],E=l[2],g=l[6],u=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-E)<.01&&Math.abs(_-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+E)<.1&&Math.abs(_+g)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(c+1)/2,M=(p+1)/2,R=(u+1)/2,w=(h+f)/4,A=(d+E)/4,x=(_+g)/4;return S>M&&S>R?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=w/i,s=A/i):M>R?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=w/r,s=x/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=A/s,r=x/s),this.set(i,r,s,n),this}let m=Math.sqrt((g-_)*(g-_)+(d-E)*(d-E)+(f-h)*(f-h));return Math.abs(m)<.001&&(m=1),this.x=(g-_)/m,this.y=(d-E)/m,this.z=(f-h)/m,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this.z=We(this.z,e.z,n.z),this.w=We(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this.z=We(this.z,e,n),this.w=We(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Lh.prototype.isVector4=!0;let wt=Lh;class Ly extends yr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new wt(0,0,e,n),this.scissorTest=!1,this.viewport=new wt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new Jt(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Ah(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fi extends Ly{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class O0 extends Jt{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Iy extends Jt{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const tc=class tc{constructor(e,n,i,r,s,a,o,l,c,h,d,f,p,_,E,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,h,d,f,p,_,E,g)}set(e,n,i,r,s,a,o,l,c,h,d,f,p,_,E,g){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=h,u[10]=d,u[14]=f,u[3]=p,u[7]=_,u[11]=E,u[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Jr.setFromMatrixColumn(e,0).length(),s=1/Jr.setFromMatrixColumn(e,1).length(),a=1/Jr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*h,p=a*d,_=o*h,E=o*d;n[0]=l*h,n[4]=-l*d,n[8]=c,n[1]=p+_*c,n[5]=f-E*c,n[9]=-o*l,n[2]=E-f*c,n[6]=_+p*c,n[10]=a*l}else if(e.order==="YXZ"){const f=l*h,p=l*d,_=c*h,E=c*d;n[0]=f+E*o,n[4]=_*o-p,n[8]=a*c,n[1]=a*d,n[5]=a*h,n[9]=-o,n[2]=p*o-_,n[6]=E+f*o,n[10]=a*l}else if(e.order==="ZXY"){const f=l*h,p=l*d,_=c*h,E=c*d;n[0]=f-E*o,n[4]=-a*d,n[8]=_+p*o,n[1]=p+_*o,n[5]=a*h,n[9]=E-f*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const f=a*h,p=a*d,_=o*h,E=o*d;n[0]=l*h,n[4]=_*c-p,n[8]=f*c+E,n[1]=l*d,n[5]=E*c+f,n[9]=p*c-_,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const f=a*l,p=a*c,_=o*l,E=o*c;n[0]=l*h,n[4]=E-f*d,n[8]=_*d+p,n[1]=d,n[5]=a*h,n[9]=-o*h,n[2]=-c*h,n[6]=p*d+_,n[10]=f-E*d}else if(e.order==="XZY"){const f=a*l,p=a*c,_=o*l,E=o*c;n[0]=l*h,n[4]=-d,n[8]=c*h,n[1]=f*d+E,n[5]=a*h,n[9]=p*d-_,n[2]=_*d-p,n[6]=o*h,n[10]=E*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Uy,e,Fy)}lookAt(e,n,i){const r=this.elements;return vn.subVectors(e,n),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Gi.crossVectors(i,vn),Gi.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Gi.crossVectors(i,vn)),Gi.normalize(),Co.crossVectors(vn,Gi),r[0]=Gi.x,r[4]=Co.x,r[8]=vn.x,r[1]=Gi.y,r[5]=Co.y,r[9]=vn.y,r[2]=Gi.z,r[6]=Co.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],d=i[5],f=i[9],p=i[13],_=i[2],E=i[6],g=i[10],u=i[14],m=i[3],S=i[7],M=i[11],R=i[15],w=r[0],A=r[4],x=r[8],C=r[12],D=r[1],b=r[5],k=r[9],K=r[13],ee=r[2],U=r[6],j=r[10],z=r[14],I=r[3],W=r[7],q=r[11],Y=r[15];return s[0]=a*w+o*D+l*ee+c*I,s[4]=a*A+o*b+l*U+c*W,s[8]=a*x+o*k+l*j+c*q,s[12]=a*C+o*K+l*z+c*Y,s[1]=h*w+d*D+f*ee+p*I,s[5]=h*A+d*b+f*U+p*W,s[9]=h*x+d*k+f*j+p*q,s[13]=h*C+d*K+f*z+p*Y,s[2]=_*w+E*D+g*ee+u*I,s[6]=_*A+E*b+g*U+u*W,s[10]=_*x+E*k+g*j+u*q,s[14]=_*C+E*K+g*z+u*Y,s[3]=m*w+S*D+M*ee+R*I,s[7]=m*A+S*b+M*U+R*W,s[11]=m*x+S*k+M*j+R*q,s[15]=m*C+S*K+M*z+R*Y,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],p=e[14],_=e[3],E=e[7],g=e[11],u=e[15],m=l*p-c*f,S=o*p-c*d,M=o*f-l*d,R=a*p-c*h,w=a*f-l*h,A=a*d-o*h;return n*(E*m-g*S+u*M)-i*(_*m-g*R+u*w)+r*(_*S-E*R+u*A)-s*(_*M-E*w+g*A)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],p=e[11],_=e[12],E=e[13],g=e[14],u=e[15],m=n*o-i*a,S=n*l-r*a,M=n*c-s*a,R=i*l-r*o,w=i*c-s*o,A=r*c-s*l,x=h*E-d*_,C=h*g-f*_,D=h*u-p*_,b=d*g-f*E,k=d*u-p*E,K=f*u-p*g,ee=m*K-S*k+M*b+R*D-w*C+A*x;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/ee;return e[0]=(o*K-l*k+c*b)*U,e[1]=(r*k-i*K-s*b)*U,e[2]=(E*A-g*w+u*R)*U,e[3]=(f*w-d*A-p*R)*U,e[4]=(l*D-a*K-c*C)*U,e[5]=(n*K-r*D+s*C)*U,e[6]=(g*M-_*A-u*S)*U,e[7]=(h*A-f*M+p*S)*U,e[8]=(a*k-o*D+c*x)*U,e[9]=(i*D-n*k-s*x)*U,e[10]=(_*w-E*M+u*m)*U,e[11]=(d*M-h*w-p*m)*U,e[12]=(o*C-a*b-l*x)*U,e[13]=(n*b-i*C+r*x)*U,e[14]=(E*S-_*R-g*m)*U,e[15]=(h*R-d*S+f*m)*U,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,h=a+a,d=o+o,f=s*c,p=s*h,_=s*d,E=a*h,g=a*d,u=o*d,m=l*c,S=l*h,M=l*d,R=i.x,w=i.y,A=i.z;return r[0]=(1-(E+u))*R,r[1]=(p+M)*R,r[2]=(_-S)*R,r[3]=0,r[4]=(p-M)*w,r[5]=(1-(f+u))*w,r[6]=(g+m)*w,r[7]=0,r[8]=(_+S)*A,r[9]=(g-m)*A,r[10]=(1-(f+E))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let a=Jr.set(r[0],r[1],r[2]).length();const o=Jr.set(r[4],r[5],r[6]).length(),l=Jr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Hn.copy(this);const c=1/a,h=1/o,d=1/l;return Hn.elements[0]*=c,Hn.elements[1]*=c,Hn.elements[2]*=c,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=d,Hn.elements[9]*=d,Hn.elements[10]*=d,n.setFromRotationMatrix(Hn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=oi,l=!1){const c=this.elements,h=2*s/(n-e),d=2*s/(i-r),f=(n+e)/(n-e),p=(i+r)/(i-r);let _,E;if(l)_=s/(a-s),E=a*s/(a-s);else if(o===oi)_=-(a+s)/(a-s),E=-2*a*s/(a-s);else if(o===Qa)_=-a/(a-s),E=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=oi,l=!1){const c=this.elements,h=2/(n-e),d=2/(i-r),f=-(n+e)/(n-e),p=-(i+r)/(i-r);let _,E;if(l)_=1/(a-s),E=a/(a-s);else if(o===oi)_=-2/(a-s),E=-(a+s)/(a-s);else if(o===Qa)_=-1/(a-s),E=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};tc.prototype.isMatrix4=!0;let _t=tc;const Jr=new O,Hn=new _t,Uy=new O(0,0,0),Fy=new O(1,1,1),Gi=new O,Co=new O,vn=new O,cm=new _t,um=new _r;class Xr{constructor(e=0,n=0,i=0,r=Xr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],d=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-We(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Le("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return cm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return um.setFromEuler(this),this.setFromQuaternion(um,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xr.DEFAULT_ORDER="XYZ";class Rh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Oy=0;const fm=new O,es=new _r,_i=new _t,bo=new O,oa=new O,By=new O,ky=new _r,dm=new O(1,0,0),hm=new O(0,1,0),pm=new O(0,0,1),mm={type:"added"},zy={type:"removed"},ts={type:"childadded",child:null},ou={type:"childremoved",child:null};class en extends yr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=hr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const e=new O,n=new Xr,i=new _r,r=new O(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new _t},normalMatrix:{value:new Fe}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return es.setFromAxisAngle(e,n),this.quaternion.multiply(es),this}rotateOnWorldAxis(e,n){return es.setFromAxisAngle(e,n),this.quaternion.premultiply(es),this}rotateX(e){return this.rotateOnAxis(dm,e)}rotateY(e){return this.rotateOnAxis(hm,e)}rotateZ(e){return this.rotateOnAxis(pm,e)}translateOnAxis(e,n){return fm.copy(e).applyQuaternion(this.quaternion),this.position.add(fm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(dm,e)}translateY(e){return this.translateOnAxis(hm,e)}translateZ(e){return this.translateOnAxis(pm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?bo.copy(e):bo.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),oa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(oa,bo,this.up):_i.lookAt(bo,oa,this.up),this.quaternion.setFromRotationMatrix(_i),r&&(_i.extractRotation(r.matrixWorld),es.setFromRotationMatrix(_i),this.quaternion.premultiply(es.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(mm),ts.child=e,this.dispatchEvent(ts),ts.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(zy),ou.child=e,this.dispatchEvent(ou),ou.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(mm),ts.child=e,this.dispatchEvent(ts),ts.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,e,By),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oa,ky,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}en.DEFAULT_UP=new O(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Po extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hy={type:"move"};class lu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Po,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Po,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Po,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const E of e.hand.values()){const g=n.getJointPose(E,i),u=this._getHandJoint(c,E);g!==null&&(u.matrix.fromArray(g.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=g.radius),u.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hy)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Po;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const B0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},Do={h:0,s:0,l:0};function cu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Pn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,qe.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=qe.workingColorSpace){if(e=Ry(e,1),n=We(n,0,1),i=We(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=cu(a,s,e+1/3),this.g=cu(a,s,e),this.b=cu(a,s,e-1/3)}return qe.colorSpaceToWorking(this,r),this}setStyle(e,n=Pn){function i(s){s!==void 0&&parseFloat(s)<1&&Le("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Le("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Le("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Pn){const i=B0[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Le("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pn){return qe.workingToColorSpace($t.copy(this),e),Math.round(We($t.r*255,0,255))*65536+Math.round(We($t.g*255,0,255))*256+Math.round(We($t.b*255,0,255))}getHexString(e=Pn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=qe.workingColorSpace){qe.workingToColorSpace($t.copy(this),n);const i=$t.r,r=$t.g,s=$t.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=qe.workingColorSpace){return qe.workingToColorSpace($t.copy(this),n),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Pn){qe.workingToColorSpace($t.copy(this),e);const n=$t.r,i=$t.g,r=$t.b;return e!==Pn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+n,Wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Wi),e.getHSL(Do);const i=nu(Wi.h,Do.h,n),r=nu(Wi.s,Do.s,n),s=nu(Wi.l,Do.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new Qe;Qe.NAMES=B0;class Vy extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xr,this.environmentIntensity=1,this.environmentRotation=new Xr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Vn=new O,vi=new O,uu=new O,xi=new O,ns=new O,is=new O,gm=new O,fu=new O,du=new O,hu=new O,pu=new wt,mu=new wt,gu=new wt;class Ln{constructor(e=new O,n=new O,i=new O){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Vn.subVectors(e,n),r.cross(Vn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Vn.subVectors(r,n),vi.subVectors(i,n),uu.subVectors(e,n);const a=Vn.dot(Vn),o=Vn.dot(vi),l=Vn.dot(uu),c=vi.dot(vi),h=vi.dot(uu),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(c*l-o*h)*f,_=(a*h-o*l)*f;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xi.x),l.addScaledVector(a,xi.y),l.addScaledVector(o,xi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return pu.setScalar(0),mu.setScalar(0),gu.setScalar(0),pu.fromBufferAttribute(e,n),mu.fromBufferAttribute(e,i),gu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(pu,s.x),a.addScaledVector(mu,s.y),a.addScaledVector(gu,s.z),a}static isFrontFacing(e,n,i,r){return Vn.subVectors(i,n),vi.subVectors(e,n),Vn.cross(vi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Vn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Ln.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Ln.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;ns.subVectors(r,i),is.subVectors(s,i),fu.subVectors(e,i);const l=ns.dot(fu),c=is.dot(fu);if(l<=0&&c<=0)return n.copy(i);du.subVectors(e,r);const h=ns.dot(du),d=is.dot(du);if(h>=0&&d<=h)return n.copy(r);const f=l*d-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),n.copy(i).addScaledVector(ns,a);hu.subVectors(e,s);const p=ns.dot(hu),_=is.dot(hu);if(_>=0&&p<=_)return n.copy(s);const E=p*c-l*_;if(E<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(is,o);const g=h*_-p*d;if(g<=0&&d-h>=0&&p-_>=0)return gm.subVectors(s,r),o=(d-h)/(d-h+(p-_)),n.copy(r).addScaledVector(gm,o);const u=1/(g+E+f);return a=E*u,o=f*u,n.copy(i).addScaledVector(ns,a).addScaledVector(is,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ro{constructor(e=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Gn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Gn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Gn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Gn):Gn.fromBufferAttribute(s,a),Gn.applyMatrix4(e.matrixWorld),this.expandByPoint(Gn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),No.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),No.copy(i.boundingBox)),No.applyMatrix4(e.matrixWorld),this.union(No)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Gn),Gn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(la),Lo.subVectors(this.max,la),rs.subVectors(e.a,la),ss.subVectors(e.b,la),as.subVectors(e.c,la),Xi.subVectors(ss,rs),ji.subVectors(as,ss),Er.subVectors(rs,as);let n=[0,-Xi.z,Xi.y,0,-ji.z,ji.y,0,-Er.z,Er.y,Xi.z,0,-Xi.x,ji.z,0,-ji.x,Er.z,0,-Er.x,-Xi.y,Xi.x,0,-ji.y,ji.x,0,-Er.y,Er.x,0];return!_u(n,rs,ss,as,Lo)||(n=[1,0,0,0,1,0,0,0,1],!_u(n,rs,ss,as,Lo))?!1:(Io.crossVectors(Xi,ji),n=[Io.x,Io.y,Io.z],_u(n,rs,ss,as,Lo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Gn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Gn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Si),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Si=[new O,new O,new O,new O,new O,new O,new O,new O],Gn=new O,No=new ro,rs=new O,ss=new O,as=new O,Xi=new O,ji=new O,Er=new O,la=new O,Lo=new O,Io=new O,Tr=new O;function _u(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Tr.fromArray(t,s);const o=r.x*Math.abs(Tr.x)+r.y*Math.abs(Tr.y)+r.z*Math.abs(Tr.z),l=e.dot(Tr),c=n.dot(Tr),h=i.dot(Tr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Pt=new O,Uo=new Ie;let Gy=0;class Fn extends yr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Gy++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=gd,this.updateRanges=[],this.gpuType=ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Uo.fromBufferAttribute(this,n),Uo.applyMatrix3(e),this.setXY(n,Uo.x,Uo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix3(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix4(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyNormalMatrix(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.transformDirection(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=si(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=rt(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=si(n,this.array)),n}setX(e,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=si(n,this.array)),n}setY(e,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=si(n,this.array)),n}setZ(e,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=si(n,this.array)),n}setW(e,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array),r=rt(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array),r=rt(r,this.array),s=rt(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gd&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class k0 extends Fn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class z0 extends Fn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class di extends Fn{constructor(e,n,i){super(new Float32Array(e),n,i)}}const Wy=new ro,ca=new O,vu=new O;class xc{constructor(e=new O,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Wy.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ca.subVectors(e,this.center);const n=ca.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ca,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(vu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ca.copy(e.center).add(vu)),this.expandByPoint(ca.copy(e.center).sub(vu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Xy=0;const bn=new _t,xu=new en,os=new O,xn=new ro,ua=new ro,kt=new O;class kn extends yr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=hr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ey(e)?z0:k0)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Fe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,n,i){return bn.makeTranslation(e,n,i),this.applyMatrix4(bn),this}scale(e,n,i){return bn.makeScale(e,n,i),this.applyMatrix4(bn),this}lookAt(e){return xu.lookAt(e),xu.updateMatrix(),this.applyMatrix4(xu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(os).negate(),this.translate(os.x,os.y,os.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new di(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ro);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];ua.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(xn.min,ua.min),xn.expandByPoint(kt),kt.addVectors(xn.max,ua.max),xn.expandByPoint(kt)):(xn.expandByPoint(ua.min),xn.expandByPoint(ua.max))}xn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(kt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)kt.fromBufferAttribute(o,c),l&&(os.fromBufferAttribute(e,c),kt.add(os)),r=Math.max(r,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new O,l[x]=new O;const c=new O,h=new O,d=new O,f=new Ie,p=new Ie,_=new Ie,E=new O,g=new O;function u(x,C,D){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,C),d.fromBufferAttribute(i,D),f.fromBufferAttribute(s,x),p.fromBufferAttribute(s,C),_.fromBufferAttribute(s,D),h.sub(c),d.sub(c),p.sub(f),_.sub(f);const b=1/(p.x*_.y-_.x*p.y);isFinite(b)&&(E.copy(h).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(b),g.copy(d).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(b),o[x].add(E),o[C].add(E),o[D].add(E),l[x].add(g),l[C].add(g),l[D].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:e.count}]);for(let x=0,C=m.length;x<C;++x){const D=m[x],b=D.start,k=D.count;for(let K=b,ee=b+k;K<ee;K+=3)u(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const S=new O,M=new O,R=new O,w=new O;function A(x){R.fromBufferAttribute(r,x),w.copy(R);const C=o[x];S.copy(C),S.sub(R.multiplyScalar(R.dot(C))).normalize(),M.crossVectors(w,C);const b=M.dot(l[x])<0?-1:1;a.setXYZW(x,S.x,S.y,S.z,b)}for(let x=0,C=m.length;x<C;++x){const D=m[x],b=D.start,k=D.count;for(let K=b,ee=b+k;K<ee;K+=3)A(e.getX(K+0)),A(e.getX(K+1)),A(e.getX(K+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Fn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new O,s=new O,a=new O,o=new O,l=new O,c=new O,h=new O,d=new O;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),E=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,E),a.fromBufferAttribute(n,g),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),a.fromBufferAttribute(n,f+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)kt.fromBufferAttribute(e,n),kt.normalize(),e.setXYZ(n,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h);let p=0,_=0;for(let E=0,g=l.length;E<g;E++){o.isInterleavedBufferAttribute?p=l[E]*o.data.stride+o.offset:p=l[E]*h;for(let u=0;u<h;u++)f[_++]=c[p++]}return new Fn(f,h,d)}if(this.index===null)return Le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new kn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){const f=c[h],p=e(f,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],d=s[c];for(let f=0,p=d.length;f<p;f++)h.push(d[f].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class jy{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=gd,this.updateRanges=[],this.version=0,this.uuid=hr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const nn=new O;class Ql{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)nn.fromBufferAttribute(this,n),nn.applyMatrix4(e),this.setXYZ(n,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)nn.fromBufferAttribute(this,n),nn.applyNormalMatrix(e),this.setXYZ(n,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)nn.fromBufferAttribute(this,n),nn.transformDirection(e),this.setXYZ(n,nn.x,nn.y,nn.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=si(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=rt(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=si(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=si(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=si(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=si(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array),r=rt(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=rt(n,this.array),i=rt(i,this.array),r=rt(r,this.array),s=rt(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Zl("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new Fn(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ql(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Zl("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let Yy=0;class Zs extends yr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=hr(),this.name="",this.type="Material",this.blending=Us,this.side=gr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bf,this.blendDst=Pf,this.blendEquation=br,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=im,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zr,this.stencilZFail=Zr,this.stencilZPass=Zr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Le(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Le(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Us&&(i.blending=this.blending),this.side!==gr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==bf&&(i.blendSrc=this.blendSrc),this.blendDst!==Pf&&(i.blendDst=this.blendDst),this.blendEquation!==br&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==im&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class H0 extends Zs{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ls;const fa=new O,cs=new O,us=new O,fs=new Ie,da=new Ie,V0=new _t,Fo=new O,ha=new O,Oo=new O,_m=new Ie,Su=new Ie,vm=new Ie;class qy extends en{constructor(e=new H0){if(super(),this.isSprite=!0,this.type="Sprite",ls===void 0){ls=new kn;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new jy(n,5);ls.setIndex([0,1,2,0,2,3]),ls.setAttribute("position",new Ql(i,3,0,!1)),ls.setAttribute("uv",new Ql(i,2,3,!1))}this.geometry=ls,this.material=e,this.center=new Ie(.5,.5),this.count=1}raycast(e,n){e.camera===null&&Ye('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),cs.setFromMatrixScale(this.matrixWorld),V0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),us.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&cs.multiplyScalar(-us.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;Bo(Fo.set(-.5,-.5,0),us,a,cs,r,s),Bo(ha.set(.5,-.5,0),us,a,cs,r,s),Bo(Oo.set(.5,.5,0),us,a,cs,r,s),_m.set(0,0),Su.set(1,0),vm.set(1,1);let o=e.ray.intersectTriangle(Fo,ha,Oo,!1,fa);if(o===null&&(Bo(ha.set(-.5,.5,0),us,a,cs,r,s),Su.set(0,1),o=e.ray.intersectTriangle(Fo,Oo,ha,!1,fa),o===null))return;const l=e.ray.origin.distanceTo(fa);l<e.near||l>e.far||n.push({distance:l,point:fa.clone(),uv:Ln.getInterpolation(fa,Fo,ha,Oo,_m,Su,vm,new Ie),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Bo(t,e,n,i,r,s){fs.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(da.x=s*fs.x-r*fs.y,da.y=r*fs.x+s*fs.y):da.copy(fs),t.copy(e),t.x+=da.x,t.y+=da.y,t.applyMatrix4(V0)}const yi=new O,yu=new O,ko=new O,Yi=new O,Mu=new O,zo=new O,Eu=new O;class Sc{constructor(e=new O,n=new O(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=yi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(yi.copy(this.origin).addScaledVector(this.direction,n),yi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){yu.copy(e).add(n).multiplyScalar(.5),ko.copy(n).sub(e).normalize(),Yi.copy(this.origin).sub(yu);const s=e.distanceTo(n)*.5,a=-this.direction.dot(ko),o=Yi.dot(this.direction),l=-Yi.dot(ko),c=Yi.lengthSq(),h=Math.abs(1-a*a);let d,f,p,_;if(h>0)if(d=a*l-o,f=a*o-l,_=s*h,d>=0)if(f>=-_)if(f<=_){const E=1/h;d*=E,f*=E,p=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(yu).addScaledVector(ko,f),p}intersectSphere(e,n){yi.subVectors(e.center,this.origin);const i=yi.dot(this.direction),r=yi.dot(yi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,yi)!==null}intersectTriangle(e,n,i,r,s){Mu.subVectors(n,e),zo.subVectors(i,e),Eu.crossVectors(Mu,zo);let a=this.direction.dot(Eu),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yi.subVectors(this.origin,e);const l=o*this.direction.dot(zo.crossVectors(Yi,zo));if(l<0)return null;const c=o*this.direction.dot(Mu.cross(Yi));if(c<0||l+c>a)return null;const h=-o*Yi.dot(Eu);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class G0 extends Zs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xr,this.combine=S0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xm=new _t,wr=new Sc,Ho=new xc,Sm=new O,Vo=new O,Go=new O,Wo=new O,Tu=new O,Xo=new O,ym=new O,jo=new O;class Oi extends en{constructor(e=new kn,n=new G0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Xo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],d=s[l];h!==0&&(Tu.fromBufferAttribute(d,e),a?Xo.addScaledVector(Tu,h):Xo.addScaledVector(Tu.sub(n),h))}n.add(Xo)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ho.copy(i.boundingSphere),Ho.applyMatrix4(s),wr.copy(e.ray).recast(e.near),!(Ho.containsPoint(wr.origin)===!1&&(wr.intersectSphere(Ho,Sm)===null||wr.origin.distanceToSquared(Sm)>(e.far-e.near)**2))&&(xm.copy(s).invert(),wr.copy(e.ray).applyMatrix4(xm),!(i.boundingBox!==null&&wr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,wr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,E=f.length;_<E;_++){const g=f[_],u=a[g.materialIndex],m=Math.max(g.start,p.start),S=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let M=m,R=S;M<R;M+=3){const w=o.getX(M),A=o.getX(M+1),x=o.getX(M+2);r=Yo(this,u,e,i,c,h,d,w,A,x),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),E=Math.min(o.count,p.start+p.count);for(let g=_,u=E;g<u;g+=3){const m=o.getX(g),S=o.getX(g+1),M=o.getX(g+2);r=Yo(this,a,e,i,c,h,d,m,S,M),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,E=f.length;_<E;_++){const g=f[_],u=a[g.materialIndex],m=Math.max(g.start,p.start),S=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let M=m,R=S;M<R;M+=3){const w=M,A=M+1,x=M+2;r=Yo(this,u,e,i,c,h,d,w,A,x),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const _=Math.max(0,p.start),E=Math.min(l.count,p.start+p.count);for(let g=_,u=E;g<u;g+=3){const m=g,S=g+1,M=g+2;r=Yo(this,a,e,i,c,h,d,m,S,M),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function Ky(t,e,n,i,r,s,a,o){let l;if(e.side===mn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===gr,o),l===null)return null;jo.copy(o),jo.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(jo);return c<n.near||c>n.far?null:{distance:c,point:jo.clone(),object:t}}function Yo(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,Vo),t.getVertexPosition(l,Go),t.getVertexPosition(c,Wo);const h=Ky(t,e,n,i,Vo,Go,Wo,ym);if(h){const d=new O;Ln.getBarycoord(ym,Vo,Go,Wo,d),r&&(h.uv=Ln.getInterpolatedAttribute(r,o,l,c,d,new Ie)),s&&(h.uv1=Ln.getInterpolatedAttribute(s,o,l,c,d,new Ie)),a&&(h.normal=Ln.getInterpolatedAttribute(a,o,l,c,d,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new O,materialIndex:0};Ln.getNormal(Vo,Go,Wo,f.normal),h.face=f,h.barycoord=d}return h}class $y extends Jt{constructor(e=null,n=1,i=1,r,s,a,o,l,c=Gt,h=Gt,d,f){super(null,a,o,l,c,h,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const wu=new O,Zy=new O,Qy=new Fe;class Qi{constructor(e=new O(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=wu.subVectors(i,n).cross(Zy.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(wu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||Qy.getNormalMatrix(e),r=this.coplanarPoint(wu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ar=new xc,Jy=new Ie(.5,.5),qo=new O;class Ch{constructor(e=new Qi,n=new Qi,i=new Qi,r=new Qi,s=new Qi,a=new Qi){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=oi,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],f=s[6],p=s[7],_=s[8],E=s[9],g=s[10],u=s[11],m=s[12],S=s[13],M=s[14],R=s[15];if(r[0].setComponents(c-a,p-h,u-_,R-m).normalize(),r[1].setComponents(c+a,p+h,u+_,R+m).normalize(),r[2].setComponents(c+o,p+d,u+E,R+S).normalize(),r[3].setComponents(c-o,p-d,u-E,R-S).normalize(),i)r[4].setComponents(l,f,g,M).normalize(),r[5].setComponents(c-l,p-f,u-g,R-M).normalize();else if(r[4].setComponents(c-l,p-f,u-g,R-M).normalize(),n===oi)r[5].setComponents(c+l,p+f,u+g,R+M).normalize();else if(n===Qa)r[5].setComponents(l,f,g,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ar.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ar)}intersectsSprite(e){Ar.center.set(0,0,0);const n=Jy.distanceTo(e.center);return Ar.radius=.7071067811865476+n,Ar.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ar)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(qo.x=r.normal.x>0?e.max.x:e.min.x,qo.y=r.normal.y>0?e.max.y:e.min.y,qo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(qo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xd extends Zs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Jl=new O,ec=new O,Mm=new _t,pa=new Sc,Ko=new xc,Au=new O,Em=new O;class eM extends en{constructor(e=new kn,n=new xd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Jl.fromBufferAttribute(n,r-1),ec.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Jl.distanceTo(ec);e.setAttribute("lineDistance",new di(i,1))}else Le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ko.copy(i.boundingSphere),Ko.applyMatrix4(r),Ko.radius+=s,e.ray.intersectsSphere(Ko)===!1)return;Mm.copy(r).invert(),pa.copy(e.ray).applyMatrix4(Mm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const p=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let E=p,g=_-1;E<g;E+=c){const u=h.getX(E),m=h.getX(E+1),S=$o(this,e,pa,l,u,m,E);S&&n.push(S)}if(this.isLineLoop){const E=h.getX(_-1),g=h.getX(p),u=$o(this,e,pa,l,E,g,_-1);u&&n.push(u)}}else{const p=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let E=p,g=_-1;E<g;E+=c){const u=$o(this,e,pa,l,E,E+1,E);u&&n.push(u)}if(this.isLineLoop){const E=$o(this,e,pa,l,_-1,p,_-1);E&&n.push(E)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function $o(t,e,n,i,r,s,a){const o=t.geometry.attributes.position;if(Jl.fromBufferAttribute(o,r),ec.fromBufferAttribute(o,s),n.distanceSqToSegment(Jl,ec,Au,Em)>i)return;Au.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Au);if(!(c<e.near||c>e.far))return{distance:c,point:Em.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}class W0 extends Jt{constructor(e=[],n=Gr,i,r,s,a,o,l,c,h){super(e,n,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class tM extends Jt{constructor(e,n,i,r,s,a,o,l,c){super(e,n,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class js extends Jt{constructor(e,n,i=hi,r,s,a,o=Gt,l=Gt,c,h=Fi,d=1){if(h!==Fi&&h!==Ur)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:n,depth:d};super(f,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ah(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class nM extends js{constructor(e,n=hi,i=Gr,r,s,a=Gt,o=Gt,l,c=Fi){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,n,i,r,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class X0 extends Jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class so extends kn{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],d=[];let f=0,p=0;_("z","y","x",-1,-1,i,n,e,a,s,0),_("z","y","x",1,-1,i,n,-e,a,s,1),_("x","z","y",1,1,e,i,n,r,a,2),_("x","z","y",1,-1,e,i,-n,r,a,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new di(c,3)),this.setAttribute("normal",new di(h,3)),this.setAttribute("uv",new di(d,2));function _(E,g,u,m,S,M,R,w,A,x,C){const D=M/A,b=R/x,k=M/2,K=R/2,ee=w/2,U=A+1,j=x+1;let z=0,I=0;const W=new O;for(let q=0;q<j;q++){const Y=q*b-K;for(let Q=0;Q<U;Q++){const pe=Q*D-k;W[E]=pe*m,W[g]=Y*S,W[u]=ee,c.push(W.x,W.y,W.z),W[E]=0,W[g]=0,W[u]=w>0?1:-1,h.push(W.x,W.y,W.z),d.push(Q/A),d.push(1-q/x),z+=1}}for(let q=0;q<x;q++)for(let Y=0;Y<A;Y++){const Q=f+Y+U*q,pe=f+Y+U*(q+1),ue=f+(Y+1)+U*(q+1),me=f+(Y+1)+U*q;l.push(Q,pe,me),l.push(pe,ue,me),I+=6}o.addGroup(p,I,C),p+=I,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new so(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yc extends kn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,d=e/o,f=n/l,p=[],_=[],E=[],g=[];for(let u=0;u<h;u++){const m=u*f-a;for(let S=0;S<c;S++){const M=S*d-s;_.push(M,-m,0),E.push(0,0,1),g.push(S/o),g.push(1-u/l)}}for(let u=0;u<l;u++)for(let m=0;m<o;m++){const S=m+c*u,M=m+c*(u+1),R=m+1+c*(u+1),w=m+1+c*u;p.push(S,M,w),p.push(M,R,w)}this.setIndex(p),this.setAttribute("position",new di(_,3)),this.setAttribute("normal",new di(E,3)),this.setAttribute("uv",new di(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yc(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ys(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Tm(r))r.isRenderTargetTexture?(Le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Tm(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function rn(t){const e={};for(let n=0;n<t.length;n++){const i=Ys(t[n]);for(const r in i)e[r]=i[r]}return e}function Tm(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function iM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function j0(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const rM={clone:Ys,merge:rn};var sM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,aM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pi extends Zs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sM,this.fragmentShader=aM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=iM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class oM extends pi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class lM extends Zs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=my,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cM extends Zs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Y0 extends en{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Ru=new _t,wm=new O,Am=new O;class uM{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ie(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ch,this._frameExtents=new Ie(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;wm.setFromMatrixPosition(e.matrixWorld),n.position.copy(wm),Am.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Am),n.updateMatrixWorld(),Ru.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ru,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===Qa||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ru)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Zo=new O,Qo=new _r,ei=new O;class q0 extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=oi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Zo,Qo,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zo,Qo,ei.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(Zo,Qo,ei),ei.x===1&&ei.y===1&&ei.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Zo,Qo,ei.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qi=new O,Rm=new Ie,Cm=new Ie;class yn extends q0{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=vd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vd*2*Math.atan(Math.tan(Sl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,n){return this.getViewBounds(e,Rm,Cm),n.subVectors(Cm,Rm)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Sl*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class fM extends uM{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0}}class bm extends Y0{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new fM}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class K0 extends q0{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class dM extends Y0{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const ds=-90,hs=1;class hM extends en{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new yn(ds,hs,e,n);r.layers=this.layers,this.add(r);const s=new yn(ds,hs,e,n);s.layers=this.layers,this.add(s);const a=new yn(ds,hs,e,n);a.layers=this.layers,this.add(a);const o=new yn(ds,hs,e,n);o.layers=this.layers,this.add(o);const l=new yn(ds,hs,e,n);l.layers=this.layers,this.add(l);const c=new yn(ds,hs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===oi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Qa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(d,f,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class pM extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Pm=new _t;class mM{constructor(e,n,i=0,r=1/0){this.ray=new Sc(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Rh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):Ye("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return Pm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pm),this}intersectObject(e,n=!0,i=[]){return Sd(e,this,i,n),i.sort(Dm),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Sd(e[r],this,i,n);return i.sort(Dm),i}}function Dm(t,e){return t.distance-e.distance}function Sd(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let a=0,o=s.length;a<o;a++)Sd(s[a],e,n,!0)}}class Nm{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=We(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(We(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Ih=class Ih{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Ih.prototype.isMatrix2=!0;let Lm=Ih;class gM extends yr{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Le("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Im(t,e,n,i){const r=_M(i);switch(n){case L0:return t*e;case U0:return t*e/r.components*r.byteLength;case yh:return t*e/r.components*r.byteLength;case Wr:return t*e*2/r.components*r.byteLength;case Mh:return t*e*2/r.components*r.byteLength;case I0:return t*e*3/r.components*r.byteLength;case Yn:return t*e*4/r.components*r.byteLength;case Eh:return t*e*4/r.components*r.byteLength;case gl:case _l:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case vl:case xl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Hf:case Gf:return Math.max(t,16)*Math.max(e,8)/4;case zf:case Vf:return Math.max(t,8)*Math.max(e,8)/2;case Wf:case Xf:case Yf:case qf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case jf:case jl:case Kf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case $f:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Zf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Qf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Jf:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case ed:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case td:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case nd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case id:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case rd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case sd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case ad:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case od:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case ld:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case cd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case ud:case fd:case dd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case hd:case pd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Yl:case md:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function _M(t){switch(t){case Mn:case b0:return{byteLength:1,components:1};case $a:case P0:case Ui:return{byteLength:2,components:1};case xh:case Sh:return{byteLength:2,components:4};case hi:case vh:case ai:return{byteLength:4,components:1};case D0:case N0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_h}}));typeof window<"u"&&(window.__THREE__?Le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_h);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $0(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function vM(t){const e=new WeakMap;function n(o,l){const c=o.array,h=o.usage,d=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const h=l.array,d=l.updateRanges;if(t.bindBuffer(c,o),d.length===0)t.bufferSubData(c,0,h);else{d.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<d.length;p++){const _=d[f],E=d[p];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++f,d[f]=E)}d.length=f+1;for(let p=0,_=d.length;p<_;p++){const E=d[p];t.bufferSubData(c,E.start*h.BYTES_PER_ELEMENT,h,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var xM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,SM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,MM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,EM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,TM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,AM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,RM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,CM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,PM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,DM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,NM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,LM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,IM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,UM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,FM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,OM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,BM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,zM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,HM=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,VM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,GM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,WM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,XM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,YM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,KM="gl_FragColor = linearToOutputTexel( gl_FragColor );",$M=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ZM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,QM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,JM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,eE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,nE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,iE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,aE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,oE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,fE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,dE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,mE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_E=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,SE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yE=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ME=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,EE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,TE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,AE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,RE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,CE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,PE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,DE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,NE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,LE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,IE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,UE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,FE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,OE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,BE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,HE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,VE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,GE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,WE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,XE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,YE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,KE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$E=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ZE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,QE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,JE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,nT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,iT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,aT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,oT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,cT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,pT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,mT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_T=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ST=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ET=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,TT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,AT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,RT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,CT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,bT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,PT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,NT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,IT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,BT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,zT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,HT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,WT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,qT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,KT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$T=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ZT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,QT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:xM,alphahash_pars_fragment:SM,alphamap_fragment:yM,alphamap_pars_fragment:MM,alphatest_fragment:EM,alphatest_pars_fragment:TM,aomap_fragment:wM,aomap_pars_fragment:AM,batching_pars_vertex:RM,batching_vertex:CM,begin_vertex:bM,beginnormal_vertex:PM,bsdfs:DM,iridescence_fragment:NM,bumpmap_pars_fragment:LM,clipping_planes_fragment:IM,clipping_planes_pars_fragment:UM,clipping_planes_pars_vertex:FM,clipping_planes_vertex:OM,color_fragment:BM,color_pars_fragment:kM,color_pars_vertex:zM,color_vertex:HM,common:VM,cube_uv_reflection_fragment:GM,defaultnormal_vertex:WM,displacementmap_pars_vertex:XM,displacementmap_vertex:jM,emissivemap_fragment:YM,emissivemap_pars_fragment:qM,colorspace_fragment:KM,colorspace_pars_fragment:$M,envmap_fragment:ZM,envmap_common_pars_fragment:QM,envmap_pars_fragment:JM,envmap_pars_vertex:eE,envmap_physical_pars_fragment:fE,envmap_vertex:tE,fog_vertex:nE,fog_pars_vertex:iE,fog_fragment:rE,fog_pars_fragment:sE,gradientmap_pars_fragment:aE,lightmap_pars_fragment:oE,lights_lambert_fragment:lE,lights_lambert_pars_fragment:cE,lights_pars_begin:uE,lights_toon_fragment:dE,lights_toon_pars_fragment:hE,lights_phong_fragment:pE,lights_phong_pars_fragment:mE,lights_physical_fragment:gE,lights_physical_pars_fragment:_E,lights_fragment_begin:vE,lights_fragment_maps:xE,lights_fragment_end:SE,lightprobes_pars_fragment:yE,logdepthbuf_fragment:ME,logdepthbuf_pars_fragment:EE,logdepthbuf_pars_vertex:TE,logdepthbuf_vertex:wE,map_fragment:AE,map_pars_fragment:RE,map_particle_fragment:CE,map_particle_pars_fragment:bE,metalnessmap_fragment:PE,metalnessmap_pars_fragment:DE,morphinstance_vertex:NE,morphcolor_vertex:LE,morphnormal_vertex:IE,morphtarget_pars_vertex:UE,morphtarget_vertex:FE,normal_fragment_begin:OE,normal_fragment_maps:BE,normal_pars_fragment:kE,normal_pars_vertex:zE,normal_vertex:HE,normalmap_pars_fragment:VE,clearcoat_normal_fragment_begin:GE,clearcoat_normal_fragment_maps:WE,clearcoat_pars_fragment:XE,iridescence_pars_fragment:jE,opaque_fragment:YE,packing:qE,premultiplied_alpha_fragment:KE,project_vertex:$E,dithering_fragment:ZE,dithering_pars_fragment:QE,roughnessmap_fragment:JE,roughnessmap_pars_fragment:eT,shadowmap_pars_fragment:tT,shadowmap_pars_vertex:nT,shadowmap_vertex:iT,shadowmask_pars_fragment:rT,skinbase_vertex:sT,skinning_pars_vertex:aT,skinning_vertex:oT,skinnormal_vertex:lT,specularmap_fragment:cT,specularmap_pars_fragment:uT,tonemapping_fragment:fT,tonemapping_pars_fragment:dT,transmission_fragment:hT,transmission_pars_fragment:pT,uv_pars_fragment:mT,uv_pars_vertex:gT,uv_vertex:_T,worldpos_vertex:vT,background_vert:xT,background_frag:ST,backgroundCube_vert:yT,backgroundCube_frag:MT,cube_vert:ET,cube_frag:TT,depth_vert:wT,depth_frag:AT,distance_vert:RT,distance_frag:CT,equirect_vert:bT,equirect_frag:PT,linedashed_vert:DT,linedashed_frag:NT,meshbasic_vert:LT,meshbasic_frag:IT,meshlambert_vert:UT,meshlambert_frag:FT,meshmatcap_vert:OT,meshmatcap_frag:BT,meshnormal_vert:kT,meshnormal_frag:zT,meshphong_vert:HT,meshphong_frag:VT,meshphysical_vert:GT,meshphysical_frag:WT,meshtoon_vert:XT,meshtoon_frag:jT,points_vert:YT,points_frag:qT,shadow_vert:KT,shadow_frag:$T,sprite_vert:ZT,sprite_frag:QT},_e={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new Ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},ii={basic:{uniforms:rn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:rn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:rn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:rn([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:rn([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Qe(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:rn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:rn([_e.points,_e.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:rn([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:rn([_e.common,_e.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:rn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:rn([_e.sprite,_e.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:rn([_e.common,_e.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:rn([_e.lights,_e.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};ii.physical={uniforms:rn([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new Ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new Ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new Ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const Jo={r:0,b:0,g:0},JT=new _t,Z0=new Fe;Z0.set(-1,0,0,0,1,0,0,0,1);function e1(t,e,n,i,r,s){const a=new Qe(0);let o=r===!0?0:1,l,c,h=null,d=0,f=null;function p(m){let S=m.isScene===!0?m.background:null;if(S&&S.isTexture){const M=m.backgroundBlurriness>0;S=e.get(S,M)}return S}function _(m){let S=!1;const M=p(m);M===null?g(a,o):M&&M.isColor&&(g(M,1),S=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function E(m,S){const M=p(S);M&&(M.isCubeTexture||M.mapping===vc)?(c===void 0&&(c=new Oi(new so(1,1,1),new pi({name:"BackgroundCubeMaterial",uniforms:Ys(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=M,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(JT.makeRotationFromEuler(S.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Z0),c.material.toneMapped=qe.getTransfer(M.colorSpace)!==Je,(h!==M||d!==M.version||f!==t.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,f=t.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Oi(new yc(2,2),new pi({name:"BackgroundMaterial",uniforms:Ys(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:gr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=qe.getTransfer(M.colorSpace)!==Je,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||f!==t.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,f=t.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,S){m.getRGB(Jo,j0(t)),n.buffers.color.setClear(Jo.r,Jo.g,Jo.b,S,s)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(m,S=1){a.set(m),o=S,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(m){o=m,g(a,o)},render:_,addToRenderList:E,dispose:u}}function t1(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(b,k,K,ee,U){let j=!1;const z=d(b,ee,K,k);s!==z&&(s=z,c(s.object)),j=p(b,ee,K,U),j&&_(b,ee,K,U),U!==null&&e.update(U,t.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,M(b,k,K,ee),U!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return t.createVertexArray()}function c(b){return t.bindVertexArray(b)}function h(b){return t.deleteVertexArray(b)}function d(b,k,K,ee){const U=ee.wireframe===!0;let j=i[k.id];j===void 0&&(j={},i[k.id]=j);const z=b.isInstancedMesh===!0?b.id:0;let I=j[z];I===void 0&&(I={},j[z]=I);let W=I[K.id];W===void 0&&(W={},I[K.id]=W);let q=W[U];return q===void 0&&(q=f(l()),W[U]=q),q}function f(b){const k=[],K=[],ee=[];for(let U=0;U<n;U++)k[U]=0,K[U]=0,ee[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:K,attributeDivisors:ee,object:b,attributes:{},index:null}}function p(b,k,K,ee){const U=s.attributes,j=k.attributes;let z=0;const I=K.getAttributes();for(const W in I)if(I[W].location>=0){const Y=U[W];let Q=j[W];if(Q===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),Y===void 0||Y.attribute!==Q||Q&&Y.data!==Q.data)return!0;z++}return s.attributesNum!==z||s.index!==ee}function _(b,k,K,ee){const U={},j=k.attributes;let z=0;const I=K.getAttributes();for(const W in I)if(I[W].location>=0){let Y=j[W];Y===void 0&&(W==="instanceMatrix"&&b.instanceMatrix&&(Y=b.instanceMatrix),W==="instanceColor"&&b.instanceColor&&(Y=b.instanceColor));const Q={};Q.attribute=Y,Y&&Y.data&&(Q.data=Y.data),U[W]=Q,z++}s.attributes=U,s.attributesNum=z,s.index=ee}function E(){const b=s.newAttributes;for(let k=0,K=b.length;k<K;k++)b[k]=0}function g(b){u(b,0)}function u(b,k){const K=s.newAttributes,ee=s.enabledAttributes,U=s.attributeDivisors;K[b]=1,ee[b]===0&&(t.enableVertexAttribArray(b),ee[b]=1),U[b]!==k&&(t.vertexAttribDivisor(b,k),U[b]=k)}function m(){const b=s.newAttributes,k=s.enabledAttributes;for(let K=0,ee=k.length;K<ee;K++)k[K]!==b[K]&&(t.disableVertexAttribArray(K),k[K]=0)}function S(b,k,K,ee,U,j,z){z===!0?t.vertexAttribIPointer(b,k,K,U,j):t.vertexAttribPointer(b,k,K,ee,U,j)}function M(b,k,K,ee){E();const U=ee.attributes,j=K.getAttributes(),z=k.defaultAttributeValues;for(const I in j){const W=j[I];if(W.location>=0){let q=U[I];if(q===void 0&&(I==="instanceMatrix"&&b.instanceMatrix&&(q=b.instanceMatrix),I==="instanceColor"&&b.instanceColor&&(q=b.instanceColor)),q!==void 0){const Y=q.normalized,Q=q.itemSize,pe=e.get(q);if(pe===void 0)continue;const ue=pe.buffer,me=pe.type,G=pe.bytesPerElement,ae=me===t.INT||me===t.UNSIGNED_INT||q.gpuType===vh;if(q.isInterleavedBufferAttribute){const re=q.data,Ae=re.stride,Ne=q.offset;if(re.isInstancedInterleavedBuffer){for(let De=0;De<W.locationSize;De++)u(W.location+De,re.meshPerAttribute);b.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let De=0;De<W.locationSize;De++)g(W.location+De);t.bindBuffer(t.ARRAY_BUFFER,ue);for(let De=0;De<W.locationSize;De++)S(W.location+De,Q/W.locationSize,me,Y,Ae*G,(Ne+Q/W.locationSize*De)*G,ae)}else{if(q.isInstancedBufferAttribute){for(let re=0;re<W.locationSize;re++)u(W.location+re,q.meshPerAttribute);b.isInstancedMesh!==!0&&ee._maxInstanceCount===void 0&&(ee._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let re=0;re<W.locationSize;re++)g(W.location+re);t.bindBuffer(t.ARRAY_BUFFER,ue);for(let re=0;re<W.locationSize;re++)S(W.location+re,Q/W.locationSize,me,Y,Q*G,Q/W.locationSize*re*G,ae)}}else if(z!==void 0){const Y=z[I];if(Y!==void 0)switch(Y.length){case 2:t.vertexAttrib2fv(W.location,Y);break;case 3:t.vertexAttrib3fv(W.location,Y);break;case 4:t.vertexAttrib4fv(W.location,Y);break;default:t.vertexAttrib1fv(W.location,Y)}}}}m()}function R(){C();for(const b in i){const k=i[b];for(const K in k){const ee=k[K];for(const U in ee){const j=ee[U];for(const z in j)h(j[z].object),delete j[z];delete ee[U]}}delete i[b]}}function w(b){if(i[b.id]===void 0)return;const k=i[b.id];for(const K in k){const ee=k[K];for(const U in ee){const j=ee[U];for(const z in j)h(j[z].object),delete j[z];delete ee[U]}}delete i[b.id]}function A(b){for(const k in i){const K=i[k];for(const ee in K){const U=K[ee];if(U[b.id]===void 0)continue;const j=U[b.id];for(const z in j)h(j[z].object),delete j[z];delete U[b.id]}}}function x(b){for(const k in i){const K=i[k],ee=b.isInstancedMesh===!0?b.id:0,U=K[ee];if(U!==void 0){for(const j in U){const z=U[j];for(const I in z)h(z[I].object),delete z[I];delete U[j]}delete K[ee],Object.keys(K).length===0&&delete i[k]}}}function C(){D(),a=!0,s!==r&&(s=r,c(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:C,resetDefaultState:D,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:E,enableAttribute:g,disableUnusedAttributes:m}}function n1(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,h){h!==0&&(t.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let f=0;for(let p=0;p<h;p++)f+=c[p];n.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function i1(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==Yn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const x=A===Ui&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Mn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==ai&&!x)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(Le("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&f===!1&&Le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),m=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),R=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:g,maxAttributes:u,maxVertexUniforms:m,maxVaryings:S,maxFragmentUniforms:M,maxSamples:R,samples:w}}function r1(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Qi,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=h(d,f,0)},this.setState=function(d,f,p){const _=d.clippingPlanes,E=d.clipIntersection,g=d.clipShadows,u=t.get(d);if(!r||_===null||_.length===0||s&&!g)s?h(null):c();else{const m=s?0:i,S=m*4;let M=u.clippingState||null;l.value=M,M=h(_,f,S,p);for(let R=0;R!==S;++R)M[R]=n[R];u.clippingState=M,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,f,p,_){const E=d!==null?d.length:0;let g=null;if(E!==0){if(g=l.value,_!==!0||g===null){const u=p+E*4,m=f.matrixWorldInverse;o.getNormalMatrix(m),(g===null||g.length<u)&&(g=new Float32Array(u));for(let S=0,M=p;S!==E;++S,M+=4)a.copy(d[S]).applyMatrix4(m,o),a.normal.toArray(g,M),g[M+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,g}}const rr=4,Um=[.125,.215,.35,.446,.526,.582],Pr=20,s1=256,ma=new K0,Fm=new Qe;let Cu=null,bu=0,Pu=0,Du=!1;const a1=new O;class Om{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=a1}=s;Cu=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Pu=this._renderer.getActiveMipmapLevel(),Du=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=km(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Cu,bu,Pu),this._renderer.xr.enabled=Du,e.scissorTest=!1,ps(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Gr||e.mapping===Xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cu=this._renderer.getRenderTarget(),bu=this._renderer.getActiveCubeFace(),Pu=this._renderer.getActiveMipmapLevel(),Du=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Ui,format:Yn,colorSpace:ql,depthBuffer:!1},r=Bm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bm(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=o1(s)),this._blurMaterial=c1(s,e,n),this._ggxMaterial=l1(s,e,n)}return r}_compileMaterial(e){const n=new Oi(new kn,e);this._renderer.compile(n,ma)}_sceneToCubeUV(e,n,i,r,s){const l=new yn(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Fm),d.toneMapping=ui,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Oi(new so,new G0({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,g=E.material;let u=!1;const m=e.background;m?m.isColor&&(g.color.copy(m),e.background=null,u=!0):(g.color.copy(Fm),u=!0);for(let S=0;S<6;S++){const M=S%3;M===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[S],s.y,s.z)):M===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[S]));const R=this._cubeSize;ps(r,M*R,S>2?R:0,R,R),d.setRenderTarget(r),u&&d.render(E,l),d.render(e,l)}d.toneMapping=p,d.autoClear=f,e.background=m}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Gr||e.mapping===Xs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=zm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=km());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ps(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,ma)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),f=0+c*1.25,p=d*f,{_lodMax:_}=this,E=this._sizeLods[i],g=3*E*(i>_-rr?i-_+rr:0),u=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=_-n,ps(s,g,u,3*E,2*E),r.setRenderTarget(s),r.render(o,ma),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-i,ps(e,g,u,3*E,2*E),r.setRenderTarget(e),r.render(o,ma)}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Ye("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Pr-1),E=s/_,g=isFinite(s)?1+Math.floor(h*E):Pr;g>Pr&&Le(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Pr}`);const u=[];let m=0;for(let A=0;A<Pr;++A){const x=A/E,C=Math.exp(-x*x/2);u.push(C),A===0?m+=C:A<g&&(m+=2*C)}for(let A=0;A<u.length;A++)u[A]=u[A]/m;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=_,f.mipInt.value=S-i;const M=this._sizeLods[r],R=3*M*(r>S-rr?r-S+rr:0),w=4*(this._cubeSize-M);ps(n,R,w,3*M,2*M),l.setRenderTarget(n),l.render(d,ma)}}function o1(t){const e=[],n=[],i=[];let r=t;const s=t-rr+1+Um.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>t-rr?l=Um[a-t+rr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,_=6,E=3,g=2,u=1,m=new Float32Array(E*_*p),S=new Float32Array(g*_*p),M=new Float32Array(u*_*p);for(let w=0;w<p;w++){const A=w%3*2/3-1,x=w>2?0:-1,C=[A,x,0,A+2/3,x,0,A+2/3,x+1,0,A,x,0,A+2/3,x+1,0,A,x+1,0];m.set(C,E*_*w),S.set(f,g*_*w);const D=[w,w,w,w,w,w];M.set(D,u*_*w)}const R=new kn;R.setAttribute("position",new Fn(m,E)),R.setAttribute("uv",new Fn(S,g)),R.setAttribute("faceIndex",new Fn(M,u)),i.push(new Oi(R,null)),r>rr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Bm(t,e,n){const i=new fi(t,e,n);return i.texture.mapping=vc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ps(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function l1(t,e,n){return new pi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:s1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Mc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function c1(t,e,n){const i=new Float32Array(Pr),r=new O(0,1,0);return new pi({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function km(){return new pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function zm(){return new pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Mc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Q0 extends fi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new W0(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new so(5,5,5),s=new pi({name:"CubemapFromEquirect",uniforms:Ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:bi});s.uniforms.tEquirect.value=n;const a=new Oi(r,s),o=n.minFilter;return n.minFilter===Ir&&(n.minFilter=Qt),new hM(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function u1(t){let e=new WeakMap,n=new WeakMap,i=null;function r(f,p=!1){return f==null?null:p?a(f):s(f)}function s(f){if(f&&f.isTexture){const p=f.mapping;if(p===Jc||p===eu)if(e.has(f)){const _=e.get(f).texture;return o(_,f.mapping)}else{const _=f.image;if(_&&_.height>0){const E=new Q0(_.height);return E.fromEquirectangularTexture(t,f),e.set(f,E),f.addEventListener("dispose",c),o(E.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const p=f.mapping,_=p===Jc||p===eu,E=p===Gr||p===Xs;if(_||E){let g=n.get(f);const u=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==u)return i===null&&(i=new Om(t)),g=_?i.fromEquirectangular(f,g):i.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,n.set(f,g),g.texture;if(g!==void 0)return g.texture;{const m=f.image;return _&&m&&m.height>0||E&&m&&l(m)?(i===null&&(i=new Om(t)),g=_?i.fromEquirectangular(f):i.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,n.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function o(f,p){return p===Jc?f.mapping=Gr:p===eu&&(f.mapping=Xs),f}function l(f){let p=0;const _=6;for(let E=0;E<_;E++)f[E]!==void 0&&p++;return p===_}function c(f){const p=f.target;p.removeEventListener("dispose",c);const _=e.get(p);_!==void 0&&(e.delete(p),_.dispose())}function h(f){const p=f.target;p.removeEventListener("dispose",h);const _=n.get(p);_!==void 0&&(n.delete(p),_.dispose())}function d(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function f1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&_d("WebGLRenderer: "+i+" extension not supported."),r}}}function d1(t,e,n,i){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",a),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,n.memory.geometries++),f}function l(d){const f=d.attributes;for(const p in f)e.update(f[p],t.ARRAY_BUFFER)}function c(d){const f=[],p=d.index,_=d.attributes.position;let E=0;if(_===void 0)return;if(p!==null){const m=p.array;E=p.version;for(let S=0,M=m.length;S<M;S+=3){const R=m[S+0],w=m[S+1],A=m[S+2];f.push(R,w,w,A,A,R)}}else{const m=_.array;E=_.version;for(let S=0,M=m.length/3-1;S<M;S+=3){const R=S+0,w=S+1,A=S+2;f.push(R,w,w,A,A,R)}}const g=new(_.count>=65535?z0:k0)(f,1);g.version=E;const u=s.get(d);u&&e.remove(u),s.set(d,g)}function h(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function h1(t,e,n){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){t.drawElements(i,f,s,d*a),n.update(f,i,1)}function c(d,f,p){p!==0&&(t.drawElementsInstanced(i,f,s,d*a,p),n.update(f,i,p))}function h(d,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,p);let E=0;for(let g=0;g<p;g++)E+=f[g];n.update(E,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function p1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:Ye("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function m1(t,e,n){const i=new WeakMap,r=new wt;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let D=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var p=D;f!==void 0&&f.texture.dispose();const _=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let M=0;_===!0&&(M=1),E===!0&&(M=2),g===!0&&(M=3);let R=o.attributes.position.count*M,w=1;R>e.maxTextureSize&&(w=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const A=new Float32Array(R*w*4*d),x=new O0(A,R,w,d);x.type=ai,x.needsUpdate=!0;const C=M*4;for(let b=0;b<d;b++){const k=u[b],K=m[b],ee=S[b],U=R*w*4*b;for(let j=0;j<k.count;j++){const z=j*C;_===!0&&(r.fromBufferAttribute(k,j),A[U+z+0]=r.x,A[U+z+1]=r.y,A[U+z+2]=r.z,A[U+z+3]=0),E===!0&&(r.fromBufferAttribute(K,j),A[U+z+4]=r.x,A[U+z+5]=r.y,A[U+z+6]=r.z,A[U+z+7]=0),g===!0&&(r.fromBufferAttribute(ee,j),A[U+z+8]=r.x,A[U+z+9]=r.y,A[U+z+10]=r.z,A[U+z+11]=ee.itemSize===4?r.w:1)}}f={count:d,texture:x,size:new Ie(R,w)},i.set(o,f),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let _=0;for(let g=0;g<c.length;g++)_+=c[g];const E=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(t,"morphTargetBaseInfluence",E),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function g1(t,e,n,i,r){let s=new WeakMap;function a(c){const h=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==h&&(e.update(f),s.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return f}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:a,dispose:o}}const _1={[y0]:"LINEAR_TONE_MAPPING",[M0]:"REINHARD_TONE_MAPPING",[E0]:"CINEON_TONE_MAPPING",[T0]:"ACES_FILMIC_TONE_MAPPING",[A0]:"AGX_TONE_MAPPING",[R0]:"NEUTRAL_TONE_MAPPING",[w0]:"CUSTOM_TONE_MAPPING"};function v1(t,e,n,i,r){const s=new fi(e,n,{type:t,depthBuffer:i,stencilBuffer:r,depthTexture:i?new js(e,n):void 0}),a=new fi(e,n,{type:Ui,depthBuffer:!1,stencilBuffer:!1}),o=new kn;o.setAttribute("position",new di([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new di([0,2,0,0,2,0],2));const l=new oM({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Oi(o,l),h=new K0(-1,1,1,-1,0,1);let d=null,f=null,p=!1,_,E=null,g=[],u=!1;this.setSize=function(m,S){s.setSize(m,S),a.setSize(m,S);for(let M=0;M<g.length;M++){const R=g[M];R.setSize&&R.setSize(m,S)}},this.setEffects=function(m){g=m,u=g.length>0&&g[0].isRenderPass===!0;const S=s.width,M=s.height;for(let R=0;R<g.length;R++){const w=g[R];w.setSize&&w.setSize(S,M)}},this.begin=function(m,S){if(p||m.toneMapping===ui&&g.length===0)return!1;if(E=S,S!==null){const M=S.width,R=S.height;(s.width!==M||s.height!==R)&&this.setSize(M,R)}return u===!1&&m.setRenderTarget(s),_=m.toneMapping,m.toneMapping=ui,!0},this.hasRenderPass=function(){return u},this.end=function(m,S){m.toneMapping=_,p=!0;let M=s,R=a;for(let w=0;w<g.length;w++){const A=g[w];if(A.enabled!==!1&&(A.render(m,R,M,S),A.needsSwap!==!1)){const x=M;M=R,R=x}}if(d!==m.outputColorSpace||f!==m.toneMapping){d=m.outputColorSpace,f=m.toneMapping,l.defines={},qe.getTransfer(d)===Je&&(l.defines.SRGB_TRANSFER="");const w=_1[f];w&&(l.defines[w]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=M.texture,m.setRenderTarget(E),m.render(c,h),E=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const J0=new Jt,yd=new js(1,1),ev=new O0,tv=new Iy,nv=new W0,Hm=[],Vm=[],Gm=new Float32Array(16),Wm=new Float32Array(9),Xm=new Float32Array(4);function Qs(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Hm[r];if(s===void 0&&(s=new Float32Array(r),Hm[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Ot(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Bt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ec(t,e){let n=Vm[e];n===void 0&&(n=new Int32Array(e),Vm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function x1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function S1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2fv(this.addr,e),Bt(n,e)}}function y1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ot(n,e))return;t.uniform3fv(this.addr,e),Bt(n,e)}}function M1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4fv(this.addr,e),Bt(n,e)}}function E1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;Xm.set(i),t.uniformMatrix2fv(this.addr,!1,Xm),Bt(n,i)}}function T1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;Wm.set(i),t.uniformMatrix3fv(this.addr,!1,Wm),Bt(n,i)}}function w1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ot(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Bt(n,e)}else{if(Ot(n,i))return;Gm.set(i),t.uniformMatrix4fv(this.addr,!1,Gm),Bt(n,i)}}function A1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function R1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2iv(this.addr,e),Bt(n,e)}}function C1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3iv(this.addr,e),Bt(n,e)}}function b1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4iv(this.addr,e),Bt(n,e)}}function P1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function D1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ot(n,e))return;t.uniform2uiv(this.addr,e),Bt(n,e)}}function N1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ot(n,e))return;t.uniform3uiv(this.addr,e),Bt(n,e)}}function L1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ot(n,e))return;t.uniform4uiv(this.addr,e),Bt(n,e)}}function I1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(yd.compareFunction=n.isReversedDepthBuffer()?wh:Th,s=yd):s=J0,n.setTexture2D(e||s,r)}function U1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||tv,r)}function F1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||nv,r)}function O1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||ev,r)}function B1(t){switch(t){case 5126:return x1;case 35664:return S1;case 35665:return y1;case 35666:return M1;case 35674:return E1;case 35675:return T1;case 35676:return w1;case 5124:case 35670:return A1;case 35667:case 35671:return R1;case 35668:case 35672:return C1;case 35669:case 35673:return b1;case 5125:return P1;case 36294:return D1;case 36295:return N1;case 36296:return L1;case 35678:case 36198:case 36298:case 36306:case 35682:return I1;case 35679:case 36299:case 36307:return U1;case 35680:case 36300:case 36308:case 36293:return F1;case 36289:case 36303:case 36311:case 36292:return O1}}function k1(t,e){t.uniform1fv(this.addr,e)}function z1(t,e){const n=Qs(e,this.size,2);t.uniform2fv(this.addr,n)}function H1(t,e){const n=Qs(e,this.size,3);t.uniform3fv(this.addr,n)}function V1(t,e){const n=Qs(e,this.size,4);t.uniform4fv(this.addr,n)}function G1(t,e){const n=Qs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function W1(t,e){const n=Qs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function X1(t,e){const n=Qs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function j1(t,e){t.uniform1iv(this.addr,e)}function Y1(t,e){t.uniform2iv(this.addr,e)}function q1(t,e){t.uniform3iv(this.addr,e)}function K1(t,e){t.uniform4iv(this.addr,e)}function $1(t,e){t.uniform1uiv(this.addr,e)}function Z1(t,e){t.uniform2uiv(this.addr,e)}function Q1(t,e){t.uniform3uiv(this.addr,e)}function J1(t,e){t.uniform4uiv(this.addr,e)}function ew(t,e,n){const i=this.cache,r=e.length,s=Ec(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=yd:a=J0;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function tw(t,e,n){const i=this.cache,r=e.length,s=Ec(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||tv,s[a])}function nw(t,e,n){const i=this.cache,r=e.length,s=Ec(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||nv,s[a])}function iw(t,e,n){const i=this.cache,r=e.length,s=Ec(n,r);Ot(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||ev,s[a])}function rw(t){switch(t){case 5126:return k1;case 35664:return z1;case 35665:return H1;case 35666:return V1;case 35674:return G1;case 35675:return W1;case 35676:return X1;case 5124:case 35670:return j1;case 35667:case 35671:return Y1;case 35668:case 35672:return q1;case 35669:case 35673:return K1;case 5125:return $1;case 36294:return Z1;case 36295:return Q1;case 36296:return J1;case 35678:case 36198:case 36298:case 36306:case 35682:return ew;case 35679:case 36299:case 36307:return tw;case 35680:case 36300:case 36308:case 36293:return nw;case 36289:case 36303:case 36311:case 36292:return iw}}class sw{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=B1(n.type)}}class aw{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=rw(n.type)}}class ow{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Nu=/(\w+)(\])?(\[|\.)?/g;function jm(t,e){t.seq.push(e),t.map[e.id]=e}function lw(t,e,n){const i=t.name,r=i.length;for(Nu.lastIndex=0;;){const s=Nu.exec(i),a=Nu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){jm(n,c===void 0?new sw(o,t,e):new aw(o,t,e));break}else{let d=n.map[o];d===void 0&&(d=new ow(o),jm(n,d)),n=d}}}class yl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);lw(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Ym(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const cw=37297;let uw=0;function fw(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const qm=new Fe;function dw(t){qe._getMatrix(qm,qe.workingColorSpace,t);const e=`mat3( ${qm.elements.map(n=>n.toFixed(4))} )`;switch(qe.getTransfer(t)){case Kl:return[e,"LinearTransferOETF"];case Je:return[e,"sRGBTransferOETF"];default:return Le("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Km(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+fw(t.getShaderSource(e),o)}else return s}function hw(t,e){const n=dw(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const pw={[y0]:"Linear",[M0]:"Reinhard",[E0]:"Cineon",[T0]:"ACESFilmic",[A0]:"AgX",[R0]:"Neutral",[w0]:"Custom"};function mw(t,e){const n=pw[e];return n===void 0?(Le("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const el=new O;function gw(){qe.getLuminanceCoefficients(el);const t=el.x.toFixed(4),e=el.y.toFixed(4),n=el.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _w(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ma).join(`
`)}function vw(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function xw(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ma(t){return t!==""}function $m(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Zm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Sw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Md(t){return t.replace(Sw,Mw)}const yw=new Map;function Mw(t,e){let n=ze[e];if(n===void 0){const i=yw.get(e);if(i!==void 0)n=ze[i],Le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Md(n)}const Ew=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qm(t){return t.replace(Ew,Tw)}function Tw(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Jm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const ww={[ml]:"SHADOWMAP_TYPE_PCF",[ya]:"SHADOWMAP_TYPE_VSM"};function Aw(t){return ww[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Rw={[Gr]:"ENVMAP_TYPE_CUBE",[Xs]:"ENVMAP_TYPE_CUBE",[vc]:"ENVMAP_TYPE_CUBE_UV"};function Cw(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":Rw[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const bw={[Xs]:"ENVMAP_MODE_REFRACTION"};function Pw(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":bw[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Dw={[S0]:"ENVMAP_BLENDING_MULTIPLY",[dy]:"ENVMAP_BLENDING_MIX",[hy]:"ENVMAP_BLENDING_ADD"};function Nw(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":Dw[t.combine]||"ENVMAP_BLENDING_NONE"}function Lw(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Iw(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=Aw(n),c=Cw(n),h=Pw(n),d=Nw(n),f=Lw(n),p=_w(n),_=vw(s),E=r.createProgram();let g,u,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ma).join(`
`),g.length>0&&(g+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ma).join(`
`),u.length>0&&(u+=`
`)):(g=[Jm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ma).join(`
`),u=[Jm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ui?"#define TONE_MAPPING":"",n.toneMapping!==ui?ze.tonemapping_pars_fragment:"",n.toneMapping!==ui?mw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,hw("linearToOutputTexel",n.outputColorSpace),gw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ma).join(`
`)),a=Md(a),a=$m(a,n),a=Zm(a,n),o=Md(o),o=$m(o,n),o=Zm(o,n),a=Qm(a),o=Qm(o),n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,u=["#define varying in",n.glslVersion===rm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===rm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const S=m+g+a,M=m+u+o,R=Ym(r,r.VERTEX_SHADER,S),w=Ym(r,r.FRAGMENT_SHADER,M);r.attachShader(E,R),r.attachShader(E,w),n.index0AttributeName!==void 0?r.bindAttribLocation(E,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function A(b){if(t.debug.checkShaderErrors){const k=r.getProgramInfoLog(E)||"",K=r.getShaderInfoLog(R)||"",ee=r.getShaderInfoLog(w)||"",U=k.trim(),j=K.trim(),z=ee.trim();let I=!0,W=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(I=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,E,R,w);else{const q=Km(r,R,"vertex"),Y=Km(r,w,"fragment");Ye("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+U+`
`+q+`
`+Y)}else U!==""?Le("WebGLProgram: Program Info Log:",U):(j===""||z==="")&&(W=!1);W&&(b.diagnostics={runnable:I,programLog:U,vertexShader:{log:j,prefix:g},fragmentShader:{log:z,prefix:u}})}r.deleteShader(R),r.deleteShader(w),x=new yl(r,E),C=xw(r,E)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let C;this.getAttributes=function(){return C===void 0&&A(this),C};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=r.getProgramParameter(E,cw)),D},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=uw++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=R,this.fragmentShader=w,this}let Uw=0;class Fw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new Ow(e),n.set(e,i)),i}}class Ow{constructor(e){this.id=Uw++,this.code=e,this.usedTimes=0}}function Bw(t){return t===Wr||t===jl||t===Yl}function kw(t,e,n,i,r,s){const a=new Rh,o=new Fw,l=new Set,c=[],h=new Map,d=i.logarithmicDepthBuffer;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function E(x,C,D,b,k,K){const ee=b.fog,U=k.geometry,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?b.environment:null,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,I=e.get(x.envMap||j,z),W=I&&I.mapping===vc?I.image.height:null,q=p[x.type];x.precision!==null&&(f=i.getMaxPrecision(x.precision),f!==x.precision&&Le("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const Y=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,Q=Y!==void 0?Y.length:0;let pe=0;U.morphAttributes.position!==void 0&&(pe=1),U.morphAttributes.normal!==void 0&&(pe=2),U.morphAttributes.color!==void 0&&(pe=3);let ue,me,G,ae;if(q){const Oe=ii[q];ue=Oe.vertexShader,me=Oe.fragmentShader}else ue=x.vertexShader,me=x.fragmentShader,o.update(x),G=o.getVertexShaderID(x),ae=o.getFragmentShaderID(x);const re=t.getRenderTarget(),Ae=t.state.buffers.depth.getReversed(),Ne=k.isInstancedMesh===!0,De=k.isBatchedMesh===!0,ct=!!x.map,He=!!x.matcap,tt=!!I,ht=!!x.aoMap,Ge=!!x.lightMap,Nt=!!x.bumpMap,vt=!!x.normalMap,gn=!!x.displacementMap,L=!!x.emissiveMap,Lt=!!x.metalnessMap,je=!!x.roughnessMap,ut=x.anisotropy>0,ge=x.clearcoat>0,Mt=x.dispersion>0,T=x.iridescence>0,v=x.sheen>0,B=x.transmission>0,J=ut&&!!x.anisotropyMap,ie=ge&&!!x.clearcoatMap,oe=ge&&!!x.clearcoatNormalMap,he=ge&&!!x.clearcoatRoughnessMap,$=T&&!!x.iridescenceMap,te=T&&!!x.iridescenceThicknessMap,Se=v&&!!x.sheenColorMap,Ee=v&&!!x.sheenRoughnessMap,fe=!!x.specularMap,le=!!x.specularColorMap,Ue=!!x.specularIntensityMap,ke=B&&!!x.transmissionMap,Ze=B&&!!x.thicknessMap,N=!!x.gradientMap,ce=!!x.alphaMap,Z=x.alphaTest>0,ye=!!x.alphaHash,de=!!x.extensions;let ne=ui;x.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ne=t.toneMapping);const Ce={shaderID:q,shaderType:x.type,shaderName:x.name,vertexShader:ue,fragmentShader:me,defines:x.defines,customVertexShaderID:G,customFragmentShaderID:ae,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:De,batchingColor:De&&k._colorsTexture!==null,instancing:Ne,instancingColor:Ne&&k.instanceColor!==null,instancingMorph:Ne&&k.morphTexture!==null,outputColorSpace:re===null?t.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ct,matcap:He,envMap:tt,envMapMode:tt&&I.mapping,envMapCubeUVHeight:W,aoMap:ht,lightMap:Ge,bumpMap:Nt,normalMap:vt,displacementMap:gn,emissiveMap:L,normalMapObjectSpace:vt&&x.normalMapType===gy,normalMapTangentSpace:vt&&x.normalMapType===nm,packedNormalMap:vt&&x.normalMapType===nm&&Bw(x.normalMap.format),metalnessMap:Lt,roughnessMap:je,anisotropy:ut,anisotropyMap:J,clearcoat:ge,clearcoatMap:ie,clearcoatNormalMap:oe,clearcoatRoughnessMap:he,dispersion:Mt,iridescence:T,iridescenceMap:$,iridescenceThicknessMap:te,sheen:v,sheenColorMap:Se,sheenRoughnessMap:Ee,specularMap:fe,specularColorMap:le,specularIntensityMap:Ue,transmission:B,transmissionMap:ke,thicknessMap:Ze,gradientMap:N,opaque:x.transparent===!1&&x.blending===Us&&x.alphaToCoverage===!1,alphaMap:ce,alphaTest:Z,alphaHash:ye,combine:x.combine,mapUv:ct&&_(x.map.channel),aoMapUv:ht&&_(x.aoMap.channel),lightMapUv:Ge&&_(x.lightMap.channel),bumpMapUv:Nt&&_(x.bumpMap.channel),normalMapUv:vt&&_(x.normalMap.channel),displacementMapUv:gn&&_(x.displacementMap.channel),emissiveMapUv:L&&_(x.emissiveMap.channel),metalnessMapUv:Lt&&_(x.metalnessMap.channel),roughnessMapUv:je&&_(x.roughnessMap.channel),anisotropyMapUv:J&&_(x.anisotropyMap.channel),clearcoatMapUv:ie&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:oe&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:$&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:te&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&_(x.sheenRoughnessMap.channel),specularMapUv:fe&&_(x.specularMap.channel),specularColorMapUv:le&&_(x.specularColorMap.channel),specularIntensityMapUv:Ue&&_(x.specularIntensityMap.channel),transmissionMapUv:ke&&_(x.transmissionMap.channel),thicknessMapUv:Ze&&_(x.thicknessMap.channel),alphaMapUv:ce&&_(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(vt||ut),vertexNormals:!!U.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!U.attributes.uv&&(ct||ce),fog:!!ee,useFog:x.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||U.attributes.normal===void 0&&vt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Ae,skinning:k.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:pe,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:K.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&D.length>0,shadowMapType:t.shadowMap.type,toneMapping:ne,decodeVideoTexture:ct&&x.map.isVideoTexture===!0&&qe.getTransfer(x.map.colorSpace)===Je,decodeVideoTextureEmissive:L&&x.emissiveMap.isVideoTexture===!0&&qe.getTransfer(x.emissiveMap.colorSpace)===Je,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ti,flipSided:x.side===mn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:de&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(de&&x.extensions.multiDraw===!0||De)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ce.vertexUv1s=l.has(1),Ce.vertexUv2s=l.has(2),Ce.vertexUv3s=l.has(3),l.clear(),Ce}function g(x){const C=[];if(x.shaderID?C.push(x.shaderID):(C.push(x.customVertexShaderID),C.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)C.push(D),C.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(u(C,x),m(C,x),C.push(t.outputColorSpace)),C.push(x.customProgramCacheKey),C.join()}function u(x,C){x.push(C.precision),x.push(C.outputColorSpace),x.push(C.envMapMode),x.push(C.envMapCubeUVHeight),x.push(C.mapUv),x.push(C.alphaMapUv),x.push(C.lightMapUv),x.push(C.aoMapUv),x.push(C.bumpMapUv),x.push(C.normalMapUv),x.push(C.displacementMapUv),x.push(C.emissiveMapUv),x.push(C.metalnessMapUv),x.push(C.roughnessMapUv),x.push(C.anisotropyMapUv),x.push(C.clearcoatMapUv),x.push(C.clearcoatNormalMapUv),x.push(C.clearcoatRoughnessMapUv),x.push(C.iridescenceMapUv),x.push(C.iridescenceThicknessMapUv),x.push(C.sheenColorMapUv),x.push(C.sheenRoughnessMapUv),x.push(C.specularMapUv),x.push(C.specularColorMapUv),x.push(C.specularIntensityMapUv),x.push(C.transmissionMapUv),x.push(C.thicknessMapUv),x.push(C.combine),x.push(C.fogExp2),x.push(C.sizeAttenuation),x.push(C.morphTargetsCount),x.push(C.morphAttributeCount),x.push(C.numDirLights),x.push(C.numPointLights),x.push(C.numSpotLights),x.push(C.numSpotLightMaps),x.push(C.numHemiLights),x.push(C.numRectAreaLights),x.push(C.numDirLightShadows),x.push(C.numPointLightShadows),x.push(C.numSpotLightShadows),x.push(C.numSpotLightShadowsWithMaps),x.push(C.numLightProbes),x.push(C.shadowMapType),x.push(C.toneMapping),x.push(C.numClippingPlanes),x.push(C.numClipIntersection),x.push(C.depthPacking)}function m(x,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),x.push(a.mask)}function S(x){const C=p[x.type];let D;if(C){const b=ii[C];D=rM.clone(b.uniforms)}else D=x.uniforms;return D}function M(x,C){let D=h.get(C);return D!==void 0?++D.usedTimes:(D=new Iw(t,C,x,r),c.push(D),h.set(C,D)),D}function R(x){if(--x.usedTimes===0){const C=c.indexOf(x);c[C]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function w(x){o.remove(x)}function A(){o.dispose()}return{getParameters:E,getProgramCacheKey:g,getUniforms:S,acquireProgram:M,releaseProgram:R,releaseShaderCache:w,programs:c,dispose:A}}function zw(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function Hw(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function eg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function tg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(f){let p=0;return f.isInstancedMesh&&(p+=2),f.isSkinnedMesh&&(p+=1),p}function o(f,p,_,E,g,u){let m=t[e];return m===void 0?(m={id:f.id,object:f,geometry:p,material:_,materialVariant:a(f),groupOrder:E,renderOrder:f.renderOrder,z:g,group:u},t[e]=m):(m.id=f.id,m.object=f,m.geometry=p,m.material=_,m.materialVariant=a(f),m.groupOrder=E,m.renderOrder=f.renderOrder,m.z=g,m.group=u),e++,m}function l(f,p,_,E,g,u){const m=o(f,p,_,E,g,u);_.transmission>0?i.push(m):_.transparent===!0?r.push(m):n.push(m)}function c(f,p,_,E,g,u){const m=o(f,p,_,E,g,u);_.transmission>0?i.unshift(m):_.transparent===!0?r.unshift(m):n.unshift(m)}function h(f,p){n.length>1&&n.sort(f||Hw),i.length>1&&i.sort(p||eg),r.length>1&&r.sort(p||eg)}function d(){for(let f=e,p=t.length;f<p;f++){const _=t[f];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:d,sort:h}}function Vw(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new tg,t.set(i,[a])):r>=s.length?(a=new tg,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function Gw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new O,color:new Qe};break;case"SpotLight":n={position:new O,direction:new O,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":n={color:new Qe,position:new O,halfWidth:new O,halfHeight:new O};break}return t[e.id]=n,n}}}function Ww(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let Xw=0;function jw(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Yw(t){const e=new Gw,n=Ww(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const r=new O,s=new _t,a=new _t;function o(c){let h=0,d=0,f=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,_=0,E=0,g=0,u=0,m=0,S=0,M=0,R=0,w=0,A=0;c.sort(jw);for(let C=0,D=c.length;C<D;C++){const b=c[C],k=b.color,K=b.intensity,ee=b.distance;let U=null;if(b.shadow&&b.shadow.map&&(b.shadow.map.texture.format===Wr?U=b.shadow.map.texture:U=b.shadow.map.depthTexture||b.shadow.map.texture),b.isAmbientLight)h+=k.r*K,d+=k.g*K,f+=k.b*K;else if(b.isLightProbe){for(let j=0;j<9;j++)i.probe[j].addScaledVector(b.sh.coefficients[j],K);A++}else if(b.isDirectionalLight){const j=e.get(b);if(j.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const z=b.shadow,I=n.get(b);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=U,i.directionalShadowMatrix[p]=b.shadow.matrix,m++}i.directional[p]=j,p++}else if(b.isSpotLight){const j=e.get(b);j.position.setFromMatrixPosition(b.matrixWorld),j.color.copy(k).multiplyScalar(K),j.distance=ee,j.coneCos=Math.cos(b.angle),j.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),j.decay=b.decay,i.spot[E]=j;const z=b.shadow;if(b.map&&(i.spotLightMap[R]=b.map,R++,z.updateMatrices(b),b.castShadow&&w++),i.spotLightMatrix[E]=z.matrix,b.castShadow){const I=n.get(b);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,i.spotShadow[E]=I,i.spotShadowMap[E]=U,M++}E++}else if(b.isRectAreaLight){const j=e.get(b);j.color.copy(k).multiplyScalar(K),j.halfWidth.set(b.width*.5,0,0),j.halfHeight.set(0,b.height*.5,0),i.rectArea[g]=j,g++}else if(b.isPointLight){const j=e.get(b);if(j.color.copy(b.color).multiplyScalar(b.intensity),j.distance=b.distance,j.decay=b.decay,b.castShadow){const z=b.shadow,I=n.get(b);I.shadowIntensity=z.intensity,I.shadowBias=z.bias,I.shadowNormalBias=z.normalBias,I.shadowRadius=z.radius,I.shadowMapSize=z.mapSize,I.shadowCameraNear=z.camera.near,I.shadowCameraFar=z.camera.far,i.pointShadow[_]=I,i.pointShadowMap[_]=U,i.pointShadowMatrix[_]=b.shadow.matrix,S++}i.point[_]=j,_++}else if(b.isHemisphereLight){const j=e.get(b);j.skyColor.copy(b.color).multiplyScalar(K),j.groundColor.copy(b.groundColor).multiplyScalar(K),i.hemi[u]=j,u++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=_e.LTC_FLOAT_1,i.rectAreaLTC2=_e.LTC_FLOAT_2):(i.rectAreaLTC1=_e.LTC_HALF_1,i.rectAreaLTC2=_e.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=f;const x=i.hash;(x.directionalLength!==p||x.pointLength!==_||x.spotLength!==E||x.rectAreaLength!==g||x.hemiLength!==u||x.numDirectionalShadows!==m||x.numPointShadows!==S||x.numSpotShadows!==M||x.numSpotMaps!==R||x.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=E,i.rectArea.length=g,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=m,i.directionalShadowMap.length=m,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=m,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=M+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,x.directionalLength=p,x.pointLength=_,x.spotLength=E,x.rectAreaLength=g,x.hemiLength=u,x.numDirectionalShadows=m,x.numPointShadows=S,x.numSpotShadows=M,x.numSpotMaps=R,x.numLightProbes=A,i.version=Xw++)}function l(c,h){let d=0,f=0,p=0,_=0,E=0;const g=h.matrixWorldInverse;for(let u=0,m=c.length;u<m;u++){const S=c[u];if(S.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),d++}else if(S.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(g),p++}else if(S.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),a.identity(),s.copy(S.matrixWorld),s.premultiply(g),a.extractRotation(s),M.halfWidth.set(S.width*.5,0,0),M.halfHeight.set(0,S.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),_++}else if(S.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(S.matrixWorld),M.position.applyMatrix4(g),f++}else if(S.isHemisphereLight){const M=i.hemi[E];M.direction.setFromMatrixPosition(S.matrixWorld),M.direction.transformDirection(g),E++}}}return{setup:o,setupView:l,state:i}}function ng(t){const e=new Yw(t),n=[],i=[],r=[];function s(f){d.camera=f,n.length=0,i.length=0,r.length=0}function a(f){n.push(f)}function o(f){i.push(f)}function l(f){r.push(f)}function c(){e.setup(n)}function h(f){e.setupView(n,f)}const d={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function qw(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new ng(t),e.set(r,[o])):s>=a.length?(o=new ng(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const Kw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$w=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Zw=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],Qw=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],ig=new _t,ga=new O,Lu=new O;function Jw(t,e,n){let i=new Ch;const r=new Ie,s=new Ie,a=new wt,o=new lM,l=new cM,c={},h=n.maxTextureSize,d={[gr]:mn,[mn]:gr,[Ti]:Ti},f=new pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ie},radius:{value:4}},vertexShader:Kw,fragmentShader:$w}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new kn;_.setAttribute("position",new Fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Oi(_,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ml;let u=this.type;this.render=function(w,A,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;this.type===YS&&(Le("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ml);const C=t.getRenderTarget(),D=t.getActiveCubeFace(),b=t.getActiveMipmapLevel(),k=t.state;k.setBlending(bi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const K=u!==this.type;K&&A.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(U=>U.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,U=w.length;ee<U;ee++){const j=w[ee],z=j.shadow;if(z===void 0){Le("WebGLShadowMap:",j,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const I=z.getFrameExtents();r.multiply(I),s.copy(z.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/I.x),r.x=s.x*I.x,z.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/I.y),r.y=s.y*I.y,z.mapSize.y=s.y));const W=t.state.buffers.depth.getReversed();if(z.camera._reversedDepth=W,z.map===null||K===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===ya){if(j.isPointLight){Le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new fi(r.x,r.y,{format:Wr,type:Ui,minFilter:Qt,magFilter:Qt,generateMipmaps:!1}),z.map.texture.name=j.name+".shadowMap",z.map.depthTexture=new js(r.x,r.y,ai),z.map.depthTexture.name=j.name+".shadowMapDepth",z.map.depthTexture.format=Fi,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Gt,z.map.depthTexture.magFilter=Gt}else j.isPointLight?(z.map=new Q0(r.x),z.map.depthTexture=new nM(r.x,hi)):(z.map=new fi(r.x,r.y),z.map.depthTexture=new js(r.x,r.y,hi)),z.map.depthTexture.name=j.name+".shadowMap",z.map.depthTexture.format=Fi,this.type===ml?(z.map.depthTexture.compareFunction=W?wh:Th,z.map.depthTexture.minFilter=Qt,z.map.depthTexture.magFilter=Qt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Gt,z.map.depthTexture.magFilter=Gt);z.camera.updateProjectionMatrix()}const q=z.map.isWebGLCubeRenderTarget?6:1;for(let Y=0;Y<q;Y++){if(z.map.isWebGLCubeRenderTarget)t.setRenderTarget(z.map,Y),t.clear();else{Y===0&&(t.setRenderTarget(z.map),t.clear());const Q=z.getViewport(Y);a.set(s.x*Q.x,s.y*Q.y,s.x*Q.z,s.y*Q.w),k.viewport(a)}if(j.isPointLight){const Q=z.camera,pe=z.matrix,ue=j.distance||Q.far;ue!==Q.far&&(Q.far=ue,Q.updateProjectionMatrix()),ga.setFromMatrixPosition(j.matrixWorld),Q.position.copy(ga),Lu.copy(Q.position),Lu.add(Zw[Y]),Q.up.copy(Qw[Y]),Q.lookAt(Lu),Q.updateMatrixWorld(),pe.makeTranslation(-ga.x,-ga.y,-ga.z),ig.multiplyMatrices(Q.projectionMatrix,Q.matrixWorldInverse),z._frustum.setFromProjectionMatrix(ig,Q.coordinateSystem,Q.reversedDepth)}else z.updateMatrices(j);i=z.getFrustum(),M(A,x,z.camera,j,this.type)}z.isPointLightShadow!==!0&&this.type===ya&&m(z,x),z.needsUpdate=!1}u=this.type,g.needsUpdate=!1,t.setRenderTarget(C,D,b)};function m(w,A){const x=e.update(E);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new fi(r.x,r.y,{format:Wr,type:Ui})),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(A,null,x,f,E,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(A,null,x,p,E,null)}function S(w,A,x,C){let D=null;const b=x.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(b!==void 0)D=b;else if(D=x.isPointLight===!0?l:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const k=D.uuid,K=A.uuid;let ee=c[k];ee===void 0&&(ee={},c[k]=ee);let U=ee[K];U===void 0&&(U=D.clone(),ee[K]=U,A.addEventListener("dispose",R)),D=U}if(D.visible=A.visible,D.wireframe=A.wireframe,C===ya?D.side=A.shadowSide!==null?A.shadowSide:A.side:D.side=A.shadowSide!==null?A.shadowSide:d[A.side],D.alphaMap=A.alphaMap,D.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,D.map=A.map,D.clipShadows=A.clipShadows,D.clippingPlanes=A.clippingPlanes,D.clipIntersection=A.clipIntersection,D.displacementMap=A.displacementMap,D.displacementScale=A.displacementScale,D.displacementBias=A.displacementBias,D.wireframeLinewidth=A.wireframeLinewidth,D.linewidth=A.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const k=t.properties.get(D);k.light=x}return D}function M(w,A,x,C,D){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&D===ya)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,w.matrixWorld);const K=e.update(w),ee=w.material;if(Array.isArray(ee)){const U=K.groups;for(let j=0,z=U.length;j<z;j++){const I=U[j],W=ee[I.materialIndex];if(W&&W.visible){const q=S(w,W,C,D);w.onBeforeShadow(t,w,A,x,K,q,I),t.renderBufferDirect(x,null,K,q,w,I),w.onAfterShadow(t,w,A,x,K,q,I)}}}else if(ee.visible){const U=S(w,ee,C,D);w.onBeforeShadow(t,w,A,x,K,U,null),t.renderBufferDirect(x,null,K,U,w,null),w.onAfterShadow(t,w,A,x,K,U,null)}}const k=w.children;for(let K=0,ee=k.length;K<ee;K++)M(k[K],A,x,C,D)}function R(w){w.target.removeEventListener("dispose",R);for(const x in c){const C=c[x],D=w.target.uuid;D in C&&(C[D].dispose(),delete C[D])}}}function eA(t,e){function n(){let N=!1;const ce=new wt;let Z=null;const ye=new wt(0,0,0,0);return{setMask:function(de){Z!==de&&!N&&(t.colorMask(de,de,de,de),Z=de)},setLocked:function(de){N=de},setClear:function(de,ne,Ce,Oe,At){At===!0&&(de*=Oe,ne*=Oe,Ce*=Oe),ce.set(de,ne,Ce,Oe),ye.equals(ce)===!1&&(t.clearColor(de,ne,Ce,Oe),ye.copy(ce))},reset:function(){N=!1,Z=null,ye.set(-1,0,0,0)}}}function i(){let N=!1,ce=!1,Z=null,ye=null,de=null;return{setReversed:function(ne){if(ce!==ne){const Ce=e.get("EXT_clip_control");ne?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),ce=ne;const Oe=de;de=null,this.setClear(Oe)}},getReversed:function(){return ce},setTest:function(ne){ne?re(t.DEPTH_TEST):Ae(t.DEPTH_TEST)},setMask:function(ne){Z!==ne&&!N&&(t.depthMask(ne),Z=ne)},setFunc:function(ne){if(ce&&(ne=Ay[ne]),ye!==ne){switch(ne){case Df:t.depthFunc(t.NEVER);break;case Nf:t.depthFunc(t.ALWAYS);break;case Lf:t.depthFunc(t.LESS);break;case Ws:t.depthFunc(t.LEQUAL);break;case If:t.depthFunc(t.EQUAL);break;case Uf:t.depthFunc(t.GEQUAL);break;case Ff:t.depthFunc(t.GREATER);break;case Of:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ye=ne}},setLocked:function(ne){N=ne},setClear:function(ne){de!==ne&&(de=ne,ce&&(ne=1-ne),t.clearDepth(ne))},reset:function(){N=!1,Z=null,ye=null,de=null,ce=!1}}}function r(){let N=!1,ce=null,Z=null,ye=null,de=null,ne=null,Ce=null,Oe=null,At=null;return{setTest:function(nt){N||(nt?re(t.STENCIL_TEST):Ae(t.STENCIL_TEST))},setMask:function(nt){ce!==nt&&!N&&(t.stencilMask(nt),ce=nt)},setFunc:function(nt,mi,Zn){(Z!==nt||ye!==mi||de!==Zn)&&(t.stencilFunc(nt,mi,Zn),Z=nt,ye=mi,de=Zn)},setOp:function(nt,mi,Zn){(ne!==nt||Ce!==mi||Oe!==Zn)&&(t.stencilOp(nt,mi,Zn),ne=nt,Ce=mi,Oe=Zn)},setLocked:function(nt){N=nt},setClear:function(nt){At!==nt&&(t.clearStencil(nt),At=nt)},reset:function(){N=!1,ce=null,Z=null,ye=null,de=null,ne=null,Ce=null,Oe=null,At=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let h={},d={},f={},p=new WeakMap,_=[],E=null,g=!1,u=null,m=null,S=null,M=null,R=null,w=null,A=null,x=new Qe(0,0,0),C=0,D=!1,b=null,k=null,K=null,ee=null,U=null;const j=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,I=0;const W=t.getParameter(t.VERSION);W.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(W)[1]),z=I>=1):W.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),z=I>=2);let q=null,Y={};const Q=t.getParameter(t.SCISSOR_BOX),pe=t.getParameter(t.VIEWPORT),ue=new wt().fromArray(Q),me=new wt().fromArray(pe);function G(N,ce,Z,ye){const de=new Uint8Array(4),ne=t.createTexture();t.bindTexture(N,ne),t.texParameteri(N,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(N,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ce=0;Ce<Z;Ce++)N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY?t.texImage3D(ce,0,t.RGBA,1,1,ye,0,t.RGBA,t.UNSIGNED_BYTE,de):t.texImage2D(ce+Ce,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,de);return ne}const ae={};ae[t.TEXTURE_2D]=G(t.TEXTURE_2D,t.TEXTURE_2D,1),ae[t.TEXTURE_CUBE_MAP]=G(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[t.TEXTURE_2D_ARRAY]=G(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ae[t.TEXTURE_3D]=G(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),re(t.DEPTH_TEST),a.setFunc(Ws),Nt(!1),vt(Jp),re(t.CULL_FACE),ht(bi);function re(N){h[N]!==!0&&(t.enable(N),h[N]=!0)}function Ae(N){h[N]!==!1&&(t.disable(N),h[N]=!1)}function Ne(N,ce){return f[N]!==ce?(t.bindFramebuffer(N,ce),f[N]=ce,N===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=ce),N===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=ce),!0):!1}function De(N,ce){let Z=_,ye=!1;if(N){Z=p.get(ce),Z===void 0&&(Z=[],p.set(ce,Z));const de=N.textures;if(Z.length!==de.length||Z[0]!==t.COLOR_ATTACHMENT0){for(let ne=0,Ce=de.length;ne<Ce;ne++)Z[ne]=t.COLOR_ATTACHMENT0+ne;Z.length=de.length,ye=!0}}else Z[0]!==t.BACK&&(Z[0]=t.BACK,ye=!0);ye&&t.drawBuffers(Z)}function ct(N){return E!==N?(t.useProgram(N),E=N,!0):!1}const He={[br]:t.FUNC_ADD,[KS]:t.FUNC_SUBTRACT,[$S]:t.FUNC_REVERSE_SUBTRACT};He[ZS]=t.MIN,He[QS]=t.MAX;const tt={[JS]:t.ZERO,[ey]:t.ONE,[ty]:t.SRC_COLOR,[bf]:t.SRC_ALPHA,[oy]:t.SRC_ALPHA_SATURATE,[sy]:t.DST_COLOR,[iy]:t.DST_ALPHA,[ny]:t.ONE_MINUS_SRC_COLOR,[Pf]:t.ONE_MINUS_SRC_ALPHA,[ay]:t.ONE_MINUS_DST_COLOR,[ry]:t.ONE_MINUS_DST_ALPHA,[ly]:t.CONSTANT_COLOR,[cy]:t.ONE_MINUS_CONSTANT_COLOR,[uy]:t.CONSTANT_ALPHA,[fy]:t.ONE_MINUS_CONSTANT_ALPHA};function ht(N,ce,Z,ye,de,ne,Ce,Oe,At,nt){if(N===bi){g===!0&&(Ae(t.BLEND),g=!1);return}if(g===!1&&(re(t.BLEND),g=!0),N!==qS){if(N!==u||nt!==D){if((m!==br||R!==br)&&(t.blendEquation(t.FUNC_ADD),m=br,R=br),nt)switch(N){case Us:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Na:t.blendFunc(t.ONE,t.ONE);break;case em:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case tm:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Ye("WebGLState: Invalid blending: ",N);break}else switch(N){case Us:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Na:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case em:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case tm:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",N);break}S=null,M=null,w=null,A=null,x.set(0,0,0),C=0,u=N,D=nt}return}de=de||ce,ne=ne||Z,Ce=Ce||ye,(ce!==m||de!==R)&&(t.blendEquationSeparate(He[ce],He[de]),m=ce,R=de),(Z!==S||ye!==M||ne!==w||Ce!==A)&&(t.blendFuncSeparate(tt[Z],tt[ye],tt[ne],tt[Ce]),S=Z,M=ye,w=ne,A=Ce),(Oe.equals(x)===!1||At!==C)&&(t.blendColor(Oe.r,Oe.g,Oe.b,At),x.copy(Oe),C=At),u=N,D=!1}function Ge(N,ce){N.side===Ti?Ae(t.CULL_FACE):re(t.CULL_FACE);let Z=N.side===mn;ce&&(Z=!Z),Nt(Z),N.blending===Us&&N.transparent===!1?ht(bi):ht(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const ye=N.stencilWrite;o.setTest(ye),ye&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),L(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?re(t.SAMPLE_ALPHA_TO_COVERAGE):Ae(t.SAMPLE_ALPHA_TO_COVERAGE)}function Nt(N){b!==N&&(N?t.frontFace(t.CW):t.frontFace(t.CCW),b=N)}function vt(N){N!==XS?(re(t.CULL_FACE),N!==k&&(N===Jp?t.cullFace(t.BACK):N===jS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ae(t.CULL_FACE),k=N}function gn(N){N!==K&&(z&&t.lineWidth(N),K=N)}function L(N,ce,Z){N?(re(t.POLYGON_OFFSET_FILL),(ee!==ce||U!==Z)&&(ee=ce,U=Z,a.getReversed()&&(ce=-ce),t.polygonOffset(ce,Z))):Ae(t.POLYGON_OFFSET_FILL)}function Lt(N){N?re(t.SCISSOR_TEST):Ae(t.SCISSOR_TEST)}function je(N){N===void 0&&(N=t.TEXTURE0+j-1),q!==N&&(t.activeTexture(N),q=N)}function ut(N,ce,Z){Z===void 0&&(q===null?Z=t.TEXTURE0+j-1:Z=q);let ye=Y[Z];ye===void 0&&(ye={type:void 0,texture:void 0},Y[Z]=ye),(ye.type!==N||ye.texture!==ce)&&(q!==Z&&(t.activeTexture(Z),q=Z),t.bindTexture(N,ce||ae[N]),ye.type=N,ye.texture=ce)}function ge(){const N=Y[q];N!==void 0&&N.type!==void 0&&(t.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Mt(){try{t.compressedTexImage2D(...arguments)}catch(N){Ye("WebGLState:",N)}}function T(){try{t.compressedTexImage3D(...arguments)}catch(N){Ye("WebGLState:",N)}}function v(){try{t.texSubImage2D(...arguments)}catch(N){Ye("WebGLState:",N)}}function B(){try{t.texSubImage3D(...arguments)}catch(N){Ye("WebGLState:",N)}}function J(){try{t.compressedTexSubImage2D(...arguments)}catch(N){Ye("WebGLState:",N)}}function ie(){try{t.compressedTexSubImage3D(...arguments)}catch(N){Ye("WebGLState:",N)}}function oe(){try{t.texStorage2D(...arguments)}catch(N){Ye("WebGLState:",N)}}function he(){try{t.texStorage3D(...arguments)}catch(N){Ye("WebGLState:",N)}}function $(){try{t.texImage2D(...arguments)}catch(N){Ye("WebGLState:",N)}}function te(){try{t.texImage3D(...arguments)}catch(N){Ye("WebGLState:",N)}}function Se(N){return d[N]!==void 0?d[N]:t.getParameter(N)}function Ee(N,ce){d[N]!==ce&&(t.pixelStorei(N,ce),d[N]=ce)}function fe(N){ue.equals(N)===!1&&(t.scissor(N.x,N.y,N.z,N.w),ue.copy(N))}function le(N){me.equals(N)===!1&&(t.viewport(N.x,N.y,N.z,N.w),me.copy(N))}function Ue(N,ce){let Z=c.get(ce);Z===void 0&&(Z=new WeakMap,c.set(ce,Z));let ye=Z.get(N);ye===void 0&&(ye=t.getUniformBlockIndex(ce,N.name),Z.set(N,ye))}function ke(N,ce){const ye=c.get(ce).get(N);l.get(ce)!==ye&&(t.uniformBlockBinding(ce,ye,N.__bindingPointIndex),l.set(ce,ye))}function Ze(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),h={},d={},q=null,Y={},f={},p=new WeakMap,_=[],E=null,g=!1,u=null,m=null,S=null,M=null,R=null,w=null,A=null,x=new Qe(0,0,0),C=0,D=!1,b=null,k=null,K=null,ee=null,U=null,ue.set(0,0,t.canvas.width,t.canvas.height),me.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:re,disable:Ae,bindFramebuffer:Ne,drawBuffers:De,useProgram:ct,setBlending:ht,setMaterial:Ge,setFlipSided:Nt,setCullFace:vt,setLineWidth:gn,setPolygonOffset:L,setScissorTest:Lt,activeTexture:je,bindTexture:ut,unbindTexture:ge,compressedTexImage2D:Mt,compressedTexImage3D:T,texImage2D:$,texImage3D:te,pixelStorei:Ee,getParameter:Se,updateUBOMapping:Ue,uniformBlockBinding:ke,texStorage2D:oe,texStorage3D:he,texSubImage2D:v,texSubImage3D:B,compressedTexSubImage2D:J,compressedTexSubImage3D:ie,scissor:fe,viewport:le,reset:Ze}}function tA(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ie,h=new WeakMap,d=new Set;let f;const p=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(T,v){return _?new OffscreenCanvas(T,v):$l("canvas")}function g(T,v,B){let J=1;const ie=Mt(T);if((ie.width>B||ie.height>B)&&(J=B/Math.max(ie.width,ie.height)),J<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const oe=Math.floor(J*ie.width),he=Math.floor(J*ie.height);f===void 0&&(f=E(oe,he));const $=v?E(oe,he):f;return $.width=oe,$.height=he,$.getContext("2d").drawImage(T,0,0,oe,he),Le("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+oe+"x"+he+")."),$}else return"data"in T&&Le("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),T;return T}function u(T){return T.generateMipmaps}function m(T){t.generateMipmap(T)}function S(T){return T.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?t.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function M(T,v,B,J,ie,oe=!1){if(T!==null){if(t[T]!==void 0)return t[T];Le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let he;J&&(he=e.get("EXT_texture_norm16"),he||Le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let $=v;if(v===t.RED&&(B===t.FLOAT&&($=t.R32F),B===t.HALF_FLOAT&&($=t.R16F),B===t.UNSIGNED_BYTE&&($=t.R8),B===t.UNSIGNED_SHORT&&he&&($=he.R16_EXT),B===t.SHORT&&he&&($=he.R16_SNORM_EXT)),v===t.RED_INTEGER&&(B===t.UNSIGNED_BYTE&&($=t.R8UI),B===t.UNSIGNED_SHORT&&($=t.R16UI),B===t.UNSIGNED_INT&&($=t.R32UI),B===t.BYTE&&($=t.R8I),B===t.SHORT&&($=t.R16I),B===t.INT&&($=t.R32I)),v===t.RG&&(B===t.FLOAT&&($=t.RG32F),B===t.HALF_FLOAT&&($=t.RG16F),B===t.UNSIGNED_BYTE&&($=t.RG8),B===t.UNSIGNED_SHORT&&he&&($=he.RG16_EXT),B===t.SHORT&&he&&($=he.RG16_SNORM_EXT)),v===t.RG_INTEGER&&(B===t.UNSIGNED_BYTE&&($=t.RG8UI),B===t.UNSIGNED_SHORT&&($=t.RG16UI),B===t.UNSIGNED_INT&&($=t.RG32UI),B===t.BYTE&&($=t.RG8I),B===t.SHORT&&($=t.RG16I),B===t.INT&&($=t.RG32I)),v===t.RGB_INTEGER&&(B===t.UNSIGNED_BYTE&&($=t.RGB8UI),B===t.UNSIGNED_SHORT&&($=t.RGB16UI),B===t.UNSIGNED_INT&&($=t.RGB32UI),B===t.BYTE&&($=t.RGB8I),B===t.SHORT&&($=t.RGB16I),B===t.INT&&($=t.RGB32I)),v===t.RGBA_INTEGER&&(B===t.UNSIGNED_BYTE&&($=t.RGBA8UI),B===t.UNSIGNED_SHORT&&($=t.RGBA16UI),B===t.UNSIGNED_INT&&($=t.RGBA32UI),B===t.BYTE&&($=t.RGBA8I),B===t.SHORT&&($=t.RGBA16I),B===t.INT&&($=t.RGBA32I)),v===t.RGB&&(B===t.UNSIGNED_SHORT&&he&&($=he.RGB16_EXT),B===t.SHORT&&he&&($=he.RGB16_SNORM_EXT),B===t.UNSIGNED_INT_5_9_9_9_REV&&($=t.RGB9_E5),B===t.UNSIGNED_INT_10F_11F_11F_REV&&($=t.R11F_G11F_B10F)),v===t.RGBA){const te=oe?Kl:qe.getTransfer(ie);B===t.FLOAT&&($=t.RGBA32F),B===t.HALF_FLOAT&&($=t.RGBA16F),B===t.UNSIGNED_BYTE&&($=te===Je?t.SRGB8_ALPHA8:t.RGBA8),B===t.UNSIGNED_SHORT&&he&&($=he.RGBA16_EXT),B===t.SHORT&&he&&($=he.RGBA16_SNORM_EXT),B===t.UNSIGNED_SHORT_4_4_4_4&&($=t.RGBA4),B===t.UNSIGNED_SHORT_5_5_5_1&&($=t.RGB5_A1)}return($===t.R16F||$===t.R32F||$===t.RG16F||$===t.RG32F||$===t.RGBA16F||$===t.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function R(T,v){let B;return T?v===null||v===hi||v===Za?B=t.DEPTH24_STENCIL8:v===ai?B=t.DEPTH32F_STENCIL8:v===$a&&(B=t.DEPTH24_STENCIL8,Le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===hi||v===Za?B=t.DEPTH_COMPONENT24:v===ai?B=t.DEPTH_COMPONENT32F:v===$a&&(B=t.DEPTH_COMPONENT16),B}function w(T,v){return u(T)===!0||T.isFramebufferTexture&&T.minFilter!==Gt&&T.minFilter!==Qt?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function A(T){const v=T.target;v.removeEventListener("dispose",A),C(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&d.delete(v)}function x(T){const v=T.target;v.removeEventListener("dispose",x),b(v)}function C(T){const v=i.get(T);if(v.__webglInit===void 0)return;const B=T.source,J=p.get(B);if(J){const ie=J[v.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&D(T),Object.keys(J).length===0&&p.delete(B)}i.remove(T)}function D(T){const v=i.get(T);t.deleteTexture(v.__webglTexture);const B=T.source,J=p.get(B);delete J[v.__cacheKey],a.memory.textures--}function b(T){const v=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(v.__webglFramebuffer[J]))for(let ie=0;ie<v.__webglFramebuffer[J].length;ie++)t.deleteFramebuffer(v.__webglFramebuffer[J][ie]);else t.deleteFramebuffer(v.__webglFramebuffer[J]);v.__webglDepthbuffer&&t.deleteRenderbuffer(v.__webglDepthbuffer[J])}else{if(Array.isArray(v.__webglFramebuffer))for(let J=0;J<v.__webglFramebuffer.length;J++)t.deleteFramebuffer(v.__webglFramebuffer[J]);else t.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&t.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&t.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let J=0;J<v.__webglColorRenderbuffer.length;J++)v.__webglColorRenderbuffer[J]&&t.deleteRenderbuffer(v.__webglColorRenderbuffer[J]);v.__webglDepthRenderbuffer&&t.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=T.textures;for(let J=0,ie=B.length;J<ie;J++){const oe=i.get(B[J]);oe.__webglTexture&&(t.deleteTexture(oe.__webglTexture),a.memory.textures--),i.remove(B[J])}i.remove(T)}let k=0;function K(){k=0}function ee(){return k}function U(T){k=T}function j(){const T=k;return T>=r.maxTextures&&Le("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),k+=1,T}function z(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function I(T,v){const B=i.get(T);if(T.isVideoTexture&&ut(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){const J=T.image;if(J===null)Le("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Le("WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(B,T,v);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,B.__webglTexture,t.TEXTURE0+v)}function W(T,v){const B=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Ae(B,T,v);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,B.__webglTexture,t.TEXTURE0+v)}function q(T,v){const B=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){Ae(B,T,v);return}n.bindTexture(t.TEXTURE_3D,B.__webglTexture,t.TEXTURE0+v)}function Y(T,v){const B=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&B.__version!==T.version){Ne(B,T,v);return}n.bindTexture(t.TEXTURE_CUBE_MAP,B.__webglTexture,t.TEXTURE0+v)}const Q={[Bf]:t.REPEAT,[Ri]:t.CLAMP_TO_EDGE,[kf]:t.MIRRORED_REPEAT},pe={[Gt]:t.NEAREST,[py]:t.NEAREST_MIPMAP_NEAREST,[Ro]:t.NEAREST_MIPMAP_LINEAR,[Qt]:t.LINEAR,[tu]:t.LINEAR_MIPMAP_NEAREST,[Ir]:t.LINEAR_MIPMAP_LINEAR},ue={[_y]:t.NEVER,[My]:t.ALWAYS,[vy]:t.LESS,[Th]:t.LEQUAL,[xy]:t.EQUAL,[wh]:t.GEQUAL,[Sy]:t.GREATER,[yy]:t.NOTEQUAL};function me(T,v){if(v.type===ai&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Qt||v.magFilter===tu||v.magFilter===Ro||v.magFilter===Ir||v.minFilter===Qt||v.minFilter===tu||v.minFilter===Ro||v.minFilter===Ir)&&Le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(T,t.TEXTURE_WRAP_S,Q[v.wrapS]),t.texParameteri(T,t.TEXTURE_WRAP_T,Q[v.wrapT]),(T===t.TEXTURE_3D||T===t.TEXTURE_2D_ARRAY)&&t.texParameteri(T,t.TEXTURE_WRAP_R,Q[v.wrapR]),t.texParameteri(T,t.TEXTURE_MAG_FILTER,pe[v.magFilter]),t.texParameteri(T,t.TEXTURE_MIN_FILTER,pe[v.minFilter]),v.compareFunction&&(t.texParameteri(T,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(T,t.TEXTURE_COMPARE_FUNC,ue[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Gt||v.minFilter!==Ro&&v.minFilter!==Ir||v.type===ai&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");t.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function G(T,v){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",A));const J=v.source;let ie=p.get(J);ie===void 0&&(ie={},p.set(J,ie));const oe=z(v);if(oe!==T.__cacheKey){ie[oe]===void 0&&(ie[oe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,B=!0),ie[oe].usedTimes++;const he=ie[T.__cacheKey];he!==void 0&&(ie[T.__cacheKey].usedTimes--,he.usedTimes===0&&D(v)),T.__cacheKey=oe,T.__webglTexture=ie[oe].texture}return B}function ae(T,v,B){return Math.floor(Math.floor(T/B)/v)}function re(T,v,B,J){const oe=T.updateRanges;if(oe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,v.width,v.height,B,J,v.data);else{oe.sort((Ee,fe)=>Ee.start-fe.start);let he=0;for(let Ee=1;Ee<oe.length;Ee++){const fe=oe[he],le=oe[Ee],Ue=fe.start+fe.count,ke=ae(le.start,v.width,4),Ze=ae(fe.start,v.width,4);le.start<=Ue+1&&ke===Ze&&ae(le.start+le.count-1,v.width,4)===ke?fe.count=Math.max(fe.count,le.start+le.count-fe.start):(++he,oe[he]=le)}oe.length=he+1;const $=n.getParameter(t.UNPACK_ROW_LENGTH),te=n.getParameter(t.UNPACK_SKIP_PIXELS),Se=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,v.width);for(let Ee=0,fe=oe.length;Ee<fe;Ee++){const le=oe[Ee],Ue=Math.floor(le.start/4),ke=Math.ceil(le.count/4),Ze=Ue%v.width,N=Math.floor(Ue/v.width),ce=ke,Z=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Ze),n.pixelStorei(t.UNPACK_SKIP_ROWS,N),n.texSubImage2D(t.TEXTURE_2D,0,Ze,N,ce,Z,B,J,v.data)}T.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,$),n.pixelStorei(t.UNPACK_SKIP_PIXELS,te),n.pixelStorei(t.UNPACK_SKIP_ROWS,Se)}}function Ae(T,v,B){let J=t.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(J=t.TEXTURE_2D_ARRAY),v.isData3DTexture&&(J=t.TEXTURE_3D);const ie=G(T,v),oe=v.source;n.bindTexture(J,T.__webglTexture,t.TEXTURE0+B);const he=i.get(oe);if(oe.version!==he.__version||ie===!0){if(n.activeTexture(t.TEXTURE0+B),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const Z=qe.getPrimaries(qe.workingColorSpace),ye=v.colorSpace===tr?null:qe.getPrimaries(v.colorSpace),de=v.colorSpace===tr||Z===ye?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,de)}n.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment);let te=g(v.image,!1,r.maxTextureSize);te=ge(v,te);const Se=s.convert(v.format,v.colorSpace),Ee=s.convert(v.type);let fe=M(v.internalFormat,Se,Ee,v.normalized,v.colorSpace,v.isVideoTexture);me(J,v);let le;const Ue=v.mipmaps,ke=v.isVideoTexture!==!0,Ze=he.__version===void 0||ie===!0,N=oe.dataReady,ce=w(v,te);if(v.isDepthTexture)fe=R(v.format===Ur,v.type),Ze&&(ke?n.texStorage2D(t.TEXTURE_2D,1,fe,te.width,te.height):n.texImage2D(t.TEXTURE_2D,0,fe,te.width,te.height,0,Se,Ee,null));else if(v.isDataTexture)if(Ue.length>0){ke&&Ze&&n.texStorage2D(t.TEXTURE_2D,ce,fe,Ue[0].width,Ue[0].height);for(let Z=0,ye=Ue.length;Z<ye;Z++)le=Ue[Z],ke?N&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,le.width,le.height,Se,Ee,le.data):n.texImage2D(t.TEXTURE_2D,Z,fe,le.width,le.height,0,Se,Ee,le.data);v.generateMipmaps=!1}else ke?(Ze&&n.texStorage2D(t.TEXTURE_2D,ce,fe,te.width,te.height),N&&re(v,te,Se,Ee)):n.texImage2D(t.TEXTURE_2D,0,fe,te.width,te.height,0,Se,Ee,te.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ke&&Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ce,fe,Ue[0].width,Ue[0].height,te.depth);for(let Z=0,ye=Ue.length;Z<ye;Z++)if(le=Ue[Z],v.format!==Yn)if(Se!==null)if(ke){if(N)if(v.layerUpdates.size>0){const de=Im(le.width,le.height,v.format,v.type);for(const ne of v.layerUpdates){const Ce=le.data.subarray(ne*de/le.data.BYTES_PER_ELEMENT,(ne+1)*de/le.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,ne,le.width,le.height,1,Se,Ce)}v.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,0,le.width,le.height,te.depth,Se,le.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,Z,fe,le.width,le.height,te.depth,0,le.data,0,0);else Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?N&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,Z,0,0,0,le.width,le.height,te.depth,Se,Ee,le.data):n.texImage3D(t.TEXTURE_2D_ARRAY,Z,fe,le.width,le.height,te.depth,0,Se,Ee,le.data)}else{ke&&Ze&&n.texStorage2D(t.TEXTURE_2D,ce,fe,Ue[0].width,Ue[0].height);for(let Z=0,ye=Ue.length;Z<ye;Z++)le=Ue[Z],v.format!==Yn?Se!==null?ke?N&&n.compressedTexSubImage2D(t.TEXTURE_2D,Z,0,0,le.width,le.height,Se,le.data):n.compressedTexImage2D(t.TEXTURE_2D,Z,fe,le.width,le.height,0,le.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?N&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,le.width,le.height,Se,Ee,le.data):n.texImage2D(t.TEXTURE_2D,Z,fe,le.width,le.height,0,Se,Ee,le.data)}else if(v.isDataArrayTexture)if(ke){if(Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ce,fe,te.width,te.height,te.depth),N)if(v.layerUpdates.size>0){const Z=Im(te.width,te.height,v.format,v.type);for(const ye of v.layerUpdates){const de=te.data.subarray(ye*Z/te.data.BYTES_PER_ELEMENT,(ye+1)*Z/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ye,te.width,te.height,1,Se,Ee,de)}v.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,Se,Ee,te.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,fe,te.width,te.height,te.depth,0,Se,Ee,te.data);else if(v.isData3DTexture)ke?(Ze&&n.texStorage3D(t.TEXTURE_3D,ce,fe,te.width,te.height,te.depth),N&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,Se,Ee,te.data)):n.texImage3D(t.TEXTURE_3D,0,fe,te.width,te.height,te.depth,0,Se,Ee,te.data);else if(v.isFramebufferTexture){if(Ze)if(ke)n.texStorage2D(t.TEXTURE_2D,ce,fe,te.width,te.height);else{let Z=te.width,ye=te.height;for(let de=0;de<ce;de++)n.texImage2D(t.TEXTURE_2D,de,fe,Z,ye,0,Se,Ee,null),Z>>=1,ye>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in t){const Z=t.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),te.parentNode!==Z){Z.appendChild(te),d.add(v),Z.onpaint=Oe=>{const At=Oe.changedElements;for(const nt of d)At.includes(nt.image)&&(nt.needsUpdate=!0)},Z.requestPaint();return}const ye=0,de=t.RGBA,ne=t.RGBA,Ce=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,ye,de,ne,Ce,te),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Ue.length>0){if(ke&&Ze){const Z=Mt(Ue[0]);n.texStorage2D(t.TEXTURE_2D,ce,fe,Z.width,Z.height)}for(let Z=0,ye=Ue.length;Z<ye;Z++)le=Ue[Z],ke?N&&n.texSubImage2D(t.TEXTURE_2D,Z,0,0,Se,Ee,le):n.texImage2D(t.TEXTURE_2D,Z,fe,Se,Ee,le);v.generateMipmaps=!1}else if(ke){if(Ze){const Z=Mt(te);n.texStorage2D(t.TEXTURE_2D,ce,fe,Z.width,Z.height)}N&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Se,Ee,te)}else n.texImage2D(t.TEXTURE_2D,0,fe,Se,Ee,te);u(v)&&m(J),he.__version=oe.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Ne(T,v,B){if(v.image.length!==6)return;const J=G(T,v),ie=v.source;n.bindTexture(t.TEXTURE_CUBE_MAP,T.__webglTexture,t.TEXTURE0+B);const oe=i.get(ie);if(ie.version!==oe.__version||J===!0){n.activeTexture(t.TEXTURE0+B);const he=qe.getPrimaries(qe.workingColorSpace),$=v.colorSpace===tr?null:qe.getPrimaries(v.colorSpace),te=v.colorSpace===tr||he===$?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);const Se=v.isCompressedTexture||v.image[0].isCompressedTexture,Ee=v.image[0]&&v.image[0].isDataTexture,fe=[];for(let ne=0;ne<6;ne++)!Se&&!Ee?fe[ne]=g(v.image[ne],!0,r.maxCubemapSize):fe[ne]=Ee?v.image[ne].image:v.image[ne],fe[ne]=ge(v,fe[ne]);const le=fe[0],Ue=s.convert(v.format,v.colorSpace),ke=s.convert(v.type),Ze=M(v.internalFormat,Ue,ke,v.normalized,v.colorSpace),N=v.isVideoTexture!==!0,ce=oe.__version===void 0||J===!0,Z=ie.dataReady;let ye=w(v,le);me(t.TEXTURE_CUBE_MAP,v);let de;if(Se){N&&ce&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ye,Ze,le.width,le.height);for(let ne=0;ne<6;ne++){de=fe[ne].mipmaps;for(let Ce=0;Ce<de.length;Ce++){const Oe=de[Ce];v.format!==Yn?Ue!==null?N?Z&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,0,0,Oe.width,Oe.height,Ue,Oe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,Ze,Oe.width,Oe.height,0,Oe.data):Le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?Z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,0,0,Oe.width,Oe.height,Ue,ke,Oe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce,Ze,Oe.width,Oe.height,0,Ue,ke,Oe.data)}}}else{if(de=v.mipmaps,N&&ce){de.length>0&&ye++;const ne=Mt(fe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ye,Ze,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(Ee){N?Z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,fe[ne].width,fe[ne].height,Ue,ke,fe[ne].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ze,fe[ne].width,fe[ne].height,0,Ue,ke,fe[ne].data);for(let Ce=0;Ce<de.length;Ce++){const At=de[Ce].image[ne].image;N?Z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,0,0,At.width,At.height,Ue,ke,At.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,Ze,At.width,At.height,0,Ue,ke,At.data)}}else{N?Z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ue,ke,fe[ne]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,Ze,Ue,ke,fe[ne]);for(let Ce=0;Ce<de.length;Ce++){const Oe=de[Ce];N?Z&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,0,0,Ue,ke,Oe.image[ne]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce+1,Ze,Ue,ke,Oe.image[ne])}}}u(v)&&m(t.TEXTURE_CUBE_MAP),oe.__version=ie.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function De(T,v,B,J,ie,oe){const he=s.convert(B.format,B.colorSpace),$=s.convert(B.type),te=M(B.internalFormat,he,$,B.normalized,B.colorSpace),Se=i.get(v),Ee=i.get(B);if(Ee.__renderTarget=v,!Se.__hasExternalTextures){const fe=Math.max(1,v.width>>oe),le=Math.max(1,v.height>>oe);ie===t.TEXTURE_3D||ie===t.TEXTURE_2D_ARRAY?n.texImage3D(ie,oe,te,fe,le,v.depth,0,he,$,null):n.texImage2D(ie,oe,te,fe,le,0,he,$,null)}n.bindFramebuffer(t.FRAMEBUFFER,T),je(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,J,ie,Ee.__webglTexture,0,Lt(v)):(ie===t.TEXTURE_2D||ie>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,J,ie,Ee.__webglTexture,oe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ct(T,v,B){if(t.bindRenderbuffer(t.RENDERBUFFER,T),v.depthBuffer){const J=v.depthTexture,ie=J&&J.isDepthTexture?J.type:null,oe=R(v.stencilBuffer,ie),he=v.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;je(v)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Lt(v),oe,v.width,v.height):B?t.renderbufferStorageMultisample(t.RENDERBUFFER,Lt(v),oe,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,oe,v.width,v.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,he,t.RENDERBUFFER,T)}else{const J=v.textures;for(let ie=0;ie<J.length;ie++){const oe=J[ie],he=s.convert(oe.format,oe.colorSpace),$=s.convert(oe.type),te=M(oe.internalFormat,he,$,oe.normalized,oe.colorSpace);je(v)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Lt(v),te,v.width,v.height):B?t.renderbufferStorageMultisample(t.RENDERBUFFER,Lt(v),te,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,te,v.width,v.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function He(T,v,B){const J=v.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ie=i.get(v.depthTexture);if(ie.__renderTarget=v,(!ie.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),J){if(ie.__webglInit===void 0&&(ie.__webglInit=!0,v.depthTexture.addEventListener("dispose",A)),ie.__webglTexture===void 0){ie.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,ie.__webglTexture),me(t.TEXTURE_CUBE_MAP,v.depthTexture);const Se=s.convert(v.depthTexture.format),Ee=s.convert(v.depthTexture.type);let fe;v.depthTexture.format===Fi?fe=t.DEPTH_COMPONENT24:v.depthTexture.format===Ur&&(fe=t.DEPTH24_STENCIL8);for(let le=0;le<6;le++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,fe,v.width,v.height,0,Se,Ee,null)}}else I(v.depthTexture,0);const oe=ie.__webglTexture,he=Lt(v),$=J?t.TEXTURE_CUBE_MAP_POSITIVE_X+B:t.TEXTURE_2D,te=v.depthTexture.format===Ur?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(v.depthTexture.format===Fi)je(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,$,oe,0,he):t.framebufferTexture2D(t.FRAMEBUFFER,te,$,oe,0);else if(v.depthTexture.format===Ur)je(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,te,$,oe,0,he):t.framebufferTexture2D(t.FRAMEBUFFER,te,$,oe,0);else throw new Error("Unknown depthTexture format")}function tt(T){const v=i.get(T),B=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const J=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),J){const ie=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,J.removeEventListener("dispose",ie)};J.addEventListener("dispose",ie),v.__depthDisposeCallback=ie}v.__boundDepthTexture=J}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(B)for(let J=0;J<6;J++)He(v.__webglFramebuffer[J],T,J);else{const J=T.texture.mipmaps;J&&J.length>0?He(v.__webglFramebuffer[0],T,0):He(v.__webglFramebuffer,T,0)}else if(B){v.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer[J]),v.__webglDepthbuffer[J]===void 0)v.__webglDepthbuffer[J]=t.createRenderbuffer(),ct(v.__webglDepthbuffer[J],T,!1);else{const ie=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=v.__webglDepthbuffer[J];t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,ie,t.RENDERBUFFER,oe)}}else{const J=T.texture.mipmaps;if(J&&J.length>0?n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=t.createRenderbuffer(),ct(v.__webglDepthbuffer,T,!1);else{const ie=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,oe=v.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,oe),t.framebufferRenderbuffer(t.FRAMEBUFFER,ie,t.RENDERBUFFER,oe)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function ht(T,v,B){const J=i.get(T);v!==void 0&&De(J.__webglFramebuffer,T,T.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),B!==void 0&&tt(T)}function Ge(T){const v=T.texture,B=i.get(T),J=i.get(v);T.addEventListener("dispose",x);const ie=T.textures,oe=T.isWebGLCubeRenderTarget===!0,he=ie.length>1;if(he||(J.__webglTexture===void 0&&(J.__webglTexture=t.createTexture()),J.__version=v.version,a.memory.textures++),oe){B.__webglFramebuffer=[];for(let $=0;$<6;$++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[$]=[];for(let te=0;te<v.mipmaps.length;te++)B.__webglFramebuffer[$][te]=t.createFramebuffer()}else B.__webglFramebuffer[$]=t.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let $=0;$<v.mipmaps.length;$++)B.__webglFramebuffer[$]=t.createFramebuffer()}else B.__webglFramebuffer=t.createFramebuffer();if(he)for(let $=0,te=ie.length;$<te;$++){const Se=i.get(ie[$]);Se.__webglTexture===void 0&&(Se.__webglTexture=t.createTexture(),a.memory.textures++)}if(T.samples>0&&je(T)===!1){B.__webglMultisampledFramebuffer=t.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let $=0;$<ie.length;$++){const te=ie[$];B.__webglColorRenderbuffer[$]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,B.__webglColorRenderbuffer[$]);const Se=s.convert(te.format,te.colorSpace),Ee=s.convert(te.type),fe=M(te.internalFormat,Se,Ee,te.normalized,te.colorSpace,T.isXRRenderTarget===!0),le=Lt(T);t.renderbufferStorageMultisample(t.RENDERBUFFER,le,fe,T.width,T.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+$,t.RENDERBUFFER,B.__webglColorRenderbuffer[$])}t.bindRenderbuffer(t.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=t.createRenderbuffer(),ct(B.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(oe){n.bindTexture(t.TEXTURE_CUBE_MAP,J.__webglTexture),me(t.TEXTURE_CUBE_MAP,v);for(let $=0;$<6;$++)if(v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)De(B.__webglFramebuffer[$][te],T,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+$,te);else De(B.__webglFramebuffer[$],T,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+$,0);u(v)&&m(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(he){for(let $=0,te=ie.length;$<te;$++){const Se=ie[$],Ee=i.get(Se);let fe=t.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(fe=T.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(fe,Ee.__webglTexture),me(fe,Se),De(B.__webglFramebuffer,T,Se,t.COLOR_ATTACHMENT0+$,fe,0),u(Se)&&m(fe)}n.unbindTexture()}else{let $=t.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture($,J.__webglTexture),me($,v),v.mipmaps&&v.mipmaps.length>0)for(let te=0;te<v.mipmaps.length;te++)De(B.__webglFramebuffer[te],T,v,t.COLOR_ATTACHMENT0,$,te);else De(B.__webglFramebuffer,T,v,t.COLOR_ATTACHMENT0,$,0);u(v)&&m($),n.unbindTexture()}T.depthBuffer&&tt(T)}function Nt(T){const v=T.textures;for(let B=0,J=v.length;B<J;B++){const ie=v[B];if(u(ie)){const oe=S(T),he=i.get(ie).__webglTexture;n.bindTexture(oe,he),m(oe),n.unbindTexture()}}}const vt=[],gn=[];function L(T){if(T.samples>0){if(je(T)===!1){const v=T.textures,B=T.width,J=T.height;let ie=t.COLOR_BUFFER_BIT;const oe=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,he=i.get(T),$=v.length>1;if($)for(let Se=0;Se<v.length;Se++)n.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const te=T.texture.mipmaps;te&&te.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Se=0;Se<v.length;Se++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ie|=t.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ie|=t.STENCIL_BUFFER_BIT)),$){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,he.__webglColorRenderbuffer[Se]);const Ee=i.get(v[Se]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Ee,0)}t.blitFramebuffer(0,0,B,J,0,0,B,J,ie,t.NEAREST),l===!0&&(vt.length=0,gn.length=0,vt.push(t.COLOR_ATTACHMENT0+Se),T.depthBuffer&&T.resolveDepthBuffer===!1&&(vt.push(oe),gn.push(oe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,gn)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,vt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),$)for(let Se=0;Se<v.length;Se++){n.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.RENDERBUFFER,he.__webglColorRenderbuffer[Se]);const Ee=i.get(v[Se]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Se,t.TEXTURE_2D,Ee,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const v=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[v])}}}function Lt(T){return Math.min(r.maxSamples,T.samples)}function je(T){const v=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ut(T){const v=a.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function ge(T,v){const B=T.colorSpace,J=T.format,ie=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==ql&&B!==tr&&(qe.getTransfer(B)===Je?(J!==Yn||ie!==Mn)&&Le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",B)),v}function Mt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=K,this.getTextureUnits=ee,this.setTextureUnits=U,this.setTexture2D=I,this.setTexture2DArray=W,this.setTexture3D=q,this.setTextureCube=Y,this.rebindTextures=ht,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=Nt,this.updateMultisampleRenderTarget=L,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=De,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function nA(t,e){function n(i,r=tr){let s;const a=qe.getTransfer(r);if(i===Mn)return t.UNSIGNED_BYTE;if(i===xh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Sh)return t.UNSIGNED_SHORT_5_5_5_1;if(i===D0)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===N0)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===b0)return t.BYTE;if(i===P0)return t.SHORT;if(i===$a)return t.UNSIGNED_SHORT;if(i===vh)return t.INT;if(i===hi)return t.UNSIGNED_INT;if(i===ai)return t.FLOAT;if(i===Ui)return t.HALF_FLOAT;if(i===L0)return t.ALPHA;if(i===I0)return t.RGB;if(i===Yn)return t.RGBA;if(i===Fi)return t.DEPTH_COMPONENT;if(i===Ur)return t.DEPTH_STENCIL;if(i===U0)return t.RED;if(i===yh)return t.RED_INTEGER;if(i===Wr)return t.RG;if(i===Mh)return t.RG_INTEGER;if(i===Eh)return t.RGBA_INTEGER;if(i===gl||i===_l||i===vl||i===xl)if(a===Je)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===gl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===_l)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===vl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===gl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===_l)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===vl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===xl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===zf||i===Hf||i===Vf||i===Gf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===zf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Hf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Gf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Wf||i===Xf||i===jf||i===Yf||i===qf||i===jl||i===Kf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Wf||i===Xf)return a===Je?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===jf)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Yf)return s.COMPRESSED_R11_EAC;if(i===qf)return s.COMPRESSED_SIGNED_R11_EAC;if(i===jl)return s.COMPRESSED_RG11_EAC;if(i===Kf)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===$f||i===Zf||i===Qf||i===Jf||i===ed||i===td||i===nd||i===id||i===rd||i===sd||i===ad||i===od||i===ld||i===cd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===$f)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Zf)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Qf)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jf)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ed)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===td)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===nd)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===id)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===rd)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===sd)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ad)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===od)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ld)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===cd)return a===Je?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ud||i===fd||i===dd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===ud)return a===Je?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hd||i===pd||i===Yl||i===md)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===hd)return s.COMPRESSED_RED_RGTC1_EXT;if(i===pd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===md)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Za?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const iA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class sA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new X0(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new pi({vertexShader:iA,fragmentShader:rA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Oi(new yc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class aA extends yr{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,p=null,_=null;const E=typeof XRWebGLBinding<"u",g=new sA,u={},m=n.getContextAttributes();let S=null,M=null;const R=[],w=[],A=new Ie;let x=null;const C=new yn;C.viewport=new wt;const D=new yn;D.viewport=new wt;const b=[C,D],k=new pM;let K=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let ae=R[G];return ae===void 0&&(ae=new lu,R[G]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(G){let ae=R[G];return ae===void 0&&(ae=new lu,R[G]=ae),ae.getGripSpace()},this.getHand=function(G){let ae=R[G];return ae===void 0&&(ae=new lu,R[G]=ae),ae.getHandSpace()};function U(G){const ae=w.indexOf(G.inputSource);if(ae===-1)return;const re=R[ae];re!==void 0&&(re.update(G.inputSource,G.frame,c||a),re.dispatchEvent({type:G.type,data:G.inputSource}))}function j(){r.removeEventListener("select",U),r.removeEventListener("selectstart",U),r.removeEventListener("selectend",U),r.removeEventListener("squeeze",U),r.removeEventListener("squeezestart",U),r.removeEventListener("squeezeend",U),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",z);for(let G=0;G<R.length;G++){const ae=w[G];ae!==null&&(w[G]=null,R[G].disconnect(ae))}K=null,ee=null,g.reset();for(const G in u)delete u[G];e.setRenderTarget(S),p=null,f=null,d=null,r=null,M=null,me.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,i.isPresenting===!0&&Le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&Le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&E&&(d=new XRWebGLBinding(r,n)),d},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(G){if(r=G,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",U),r.addEventListener("selectstart",U),r.addEventListener("selectend",U),r.addEventListener("squeeze",U),r.addEventListener("squeezestart",U),r.addEventListener("squeezeend",U),r.addEventListener("end",j),r.addEventListener("inputsourceschange",z),m.xrCompatible!==!0&&await n.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(A),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Ae=null,Ne=null;m.depth&&(Ne=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,re=m.stencil?Ur:Fi,Ae=m.stencil?Za:hi);const De={colorFormat:n.RGBA8,depthFormat:Ne,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(De),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new fi(f.textureWidth,f.textureHeight,{format:Yn,type:Mn,depthTexture:new js(f.textureWidth,f.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const re={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,re),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new fi(p.framebufferWidth,p.framebufferHeight,{format:Yn,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),me.setContext(r),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(G){for(let ae=0;ae<G.removed.length;ae++){const re=G.removed[ae],Ae=w.indexOf(re);Ae>=0&&(w[Ae]=null,R[Ae].disconnect(re))}for(let ae=0;ae<G.added.length;ae++){const re=G.added[ae];let Ae=w.indexOf(re);if(Ae===-1){for(let De=0;De<R.length;De++)if(De>=w.length){w.push(re),Ae=De;break}else if(w[De]===null){w[De]=re,Ae=De;break}if(Ae===-1)break}const Ne=R[Ae];Ne&&Ne.connect(re)}}const I=new O,W=new O;function q(G,ae,re){I.setFromMatrixPosition(ae.matrixWorld),W.setFromMatrixPosition(re.matrixWorld);const Ae=I.distanceTo(W),Ne=ae.projectionMatrix.elements,De=re.projectionMatrix.elements,ct=Ne[14]/(Ne[10]-1),He=Ne[14]/(Ne[10]+1),tt=(Ne[9]+1)/Ne[5],ht=(Ne[9]-1)/Ne[5],Ge=(Ne[8]-1)/Ne[0],Nt=(De[8]+1)/De[0],vt=ct*Ge,gn=ct*Nt,L=Ae/(-Ge+Nt),Lt=L*-Ge;if(ae.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Lt),G.translateZ(L),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),Ne[10]===-1)G.projectionMatrix.copy(ae.projectionMatrix),G.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{const je=ct+L,ut=He+L,ge=vt-Lt,Mt=gn+(Ae-Lt),T=tt*He/ut*je,v=ht*He/ut*je;G.projectionMatrix.makePerspective(ge,Mt,T,v,je,ut),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Y(G,ae){ae===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(ae.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(r===null)return;let ae=G.near,re=G.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(re=g.depthFar)),k.near=D.near=C.near=ae,k.far=D.far=C.far=re,(K!==k.near||ee!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),K=k.near,ee=k.far),k.layers.mask=G.layers.mask|6,C.layers.mask=k.layers.mask&-5,D.layers.mask=k.layers.mask&-3;const Ae=G.parent,Ne=k.cameras;Y(k,Ae);for(let De=0;De<Ne.length;De++)Y(Ne[De],Ae);Ne.length===2?q(k,C,D):k.projectionMatrix.copy(C.projectionMatrix),Q(G,k,Ae)};function Q(G,ae,re){re===null?G.matrix.copy(ae.matrixWorld):(G.matrix.copy(re.matrixWorld),G.matrix.invert(),G.matrix.multiply(ae.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(ae.projectionMatrix),G.projectionMatrixInverse.copy(ae.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=vd*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(G){return u[G]};let pe=null;function ue(G,ae){if(h=ae.getViewerPose(c||a),_=ae,h!==null){const re=h.views;p!==null&&(e.setRenderTargetFramebuffer(M,p.framebuffer),e.setRenderTarget(M));let Ae=!1;re.length!==k.cameras.length&&(k.cameras.length=0,Ae=!0);for(let He=0;He<re.length;He++){const tt=re[He];let ht=null;if(p!==null)ht=p.getViewport(tt);else{const Nt=d.getViewSubImage(f,tt);ht=Nt.viewport,He===0&&(e.setRenderTargetTextures(M,Nt.colorTexture,Nt.depthStencilTexture),e.setRenderTarget(M))}let Ge=b[He];Ge===void 0&&(Ge=new yn,Ge.layers.enable(He),Ge.viewport=new wt,b[He]=Ge),Ge.matrix.fromArray(tt.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(tt.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(ht.x,ht.y,ht.width,ht.height),He===0&&(k.matrix.copy(Ge.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Ae===!0&&k.cameras.push(Ge)}const Ne=r.enabledFeatures;if(Ne&&Ne.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){d=i.getBinding();const He=d.getDepthInformation(re[0]);He&&He.isValid&&He.texture&&g.init(He,r.renderState)}if(Ne&&Ne.includes("camera-access")&&E){e.state.unbindTexture(),d=i.getBinding();for(let He=0;He<re.length;He++){const tt=re[He].camera;if(tt){let ht=u[tt];ht||(ht=new X0,u[tt]=ht);const Ge=d.getCameraImage(tt);ht.sourceTexture=Ge}}}}for(let re=0;re<R.length;re++){const Ae=w[re],Ne=R[re];Ae!==null&&Ne!==void 0&&Ne.update(Ae,ae,c||a)}pe&&pe(G,ae),ae.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ae}),_=null}const me=new $0;me.setAnimationLoop(ue),this.setAnimationLoop=function(G){pe=G},this.dispose=function(){}}}const oA=new _t,iv=new Fe;iv.set(-1,0,0,0,1,0,0,0,1);function lA(t,e){function n(g,u){g.matrixAutoUpdate===!0&&g.updateMatrix(),u.value.copy(g.matrix)}function i(g,u){u.color.getRGB(g.fogColor.value,j0(t)),u.isFog?(g.fogNear.value=u.near,g.fogFar.value=u.far):u.isFogExp2&&(g.fogDensity.value=u.density)}function r(g,u,m,S,M){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?s(g,u):u.isMeshLambertMaterial?(s(g,u),u.envMap&&(g.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(s(g,u),d(g,u)):u.isMeshPhongMaterial?(s(g,u),h(g,u),u.envMap&&(g.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(s(g,u),f(g,u),u.isMeshPhysicalMaterial&&p(g,u,M)):u.isMeshMatcapMaterial?(s(g,u),_(g,u)):u.isMeshDepthMaterial?s(g,u):u.isMeshDistanceMaterial?(s(g,u),E(g,u)):u.isMeshNormalMaterial?s(g,u):u.isLineBasicMaterial?(a(g,u),u.isLineDashedMaterial&&o(g,u)):u.isPointsMaterial?l(g,u,m,S):u.isSpriteMaterial?c(g,u):u.isShadowMaterial?(g.color.value.copy(u.color),g.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(g,u){g.opacity.value=u.opacity,u.color&&g.diffuse.value.copy(u.color),u.emissive&&g.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(g.map.value=u.map,n(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.bumpMap&&(g.bumpMap.value=u.bumpMap,n(u.bumpMap,g.bumpMapTransform),g.bumpScale.value=u.bumpScale,u.side===mn&&(g.bumpScale.value*=-1)),u.normalMap&&(g.normalMap.value=u.normalMap,n(u.normalMap,g.normalMapTransform),g.normalScale.value.copy(u.normalScale),u.side===mn&&g.normalScale.value.negate()),u.displacementMap&&(g.displacementMap.value=u.displacementMap,n(u.displacementMap,g.displacementMapTransform),g.displacementScale.value=u.displacementScale,g.displacementBias.value=u.displacementBias),u.emissiveMap&&(g.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,g.emissiveMapTransform)),u.specularMap&&(g.specularMap.value=u.specularMap,n(u.specularMap,g.specularMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest);const m=e.get(u),S=m.envMap,M=m.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(oA.makeRotationFromEuler(M)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(iv),g.reflectivity.value=u.reflectivity,g.ior.value=u.ior,g.refractionRatio.value=u.refractionRatio),u.lightMap&&(g.lightMap.value=u.lightMap,g.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,g.lightMapTransform)),u.aoMap&&(g.aoMap.value=u.aoMap,g.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,g.aoMapTransform))}function a(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,u.map&&(g.map.value=u.map,n(u.map,g.mapTransform))}function o(g,u){g.dashSize.value=u.dashSize,g.totalSize.value=u.dashSize+u.gapSize,g.scale.value=u.scale}function l(g,u,m,S){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.size.value=u.size*m,g.scale.value=S*.5,u.map&&(g.map.value=u.map,n(u.map,g.uvTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function c(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.rotation.value=u.rotation,u.map&&(g.map.value=u.map,n(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function h(g,u){g.specular.value.copy(u.specular),g.shininess.value=Math.max(u.shininess,1e-4)}function d(g,u){u.gradientMap&&(g.gradientMap.value=u.gradientMap)}function f(g,u){g.metalness.value=u.metalness,u.metalnessMap&&(g.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,g.metalnessMapTransform)),g.roughness.value=u.roughness,u.roughnessMap&&(g.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,g.roughnessMapTransform)),u.envMap&&(g.envMapIntensity.value=u.envMapIntensity)}function p(g,u,m){g.ior.value=u.ior,u.sheen>0&&(g.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),g.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(g.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,g.sheenColorMapTransform)),u.sheenRoughnessMap&&(g.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,g.sheenRoughnessMapTransform))),u.clearcoat>0&&(g.clearcoat.value=u.clearcoat,g.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(g.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,g.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(g.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===mn&&g.clearcoatNormalScale.value.negate())),u.dispersion>0&&(g.dispersion.value=u.dispersion),u.iridescence>0&&(g.iridescence.value=u.iridescence,g.iridescenceIOR.value=u.iridescenceIOR,g.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(g.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,g.iridescenceMapTransform)),u.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),u.transmission>0&&(g.transmission.value=u.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),u.transmissionMap&&(g.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,g.transmissionMapTransform)),g.thickness.value=u.thickness,u.thicknessMap&&(g.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=u.attenuationDistance,g.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(g.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(g.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=u.specularIntensity,g.specularColor.value.copy(u.specularColor),u.specularColorMap&&(g.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,g.specularColorMapTransform)),u.specularIntensityMap&&(g.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,u){u.matcap&&(g.matcap.value=u.matcap)}function E(g,u){const m=e.get(u).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function cA(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,S){const M=S.program;i.uniformBlockBinding(m,M)}function c(m,S){let M=r[m.id];M===void 0&&(_(m),M=h(m),r[m.id]=M,m.addEventListener("dispose",g));const R=S.program;i.updateUBOMapping(m,R);const w=e.render.frame;s[m.id]!==w&&(f(m),s[m.id]=w)}function h(m){const S=d();m.__bindingPointIndex=S;const M=t.createBuffer(),R=m.__size,w=m.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,R,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,S,M),M}function d(){for(let m=0;m<o;m++)if(a.indexOf(m)===-1)return a.push(m),m;return Ye("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(m){const S=r[m.id],M=m.uniforms,R=m.__cache;t.bindBuffer(t.UNIFORM_BUFFER,S);for(let w=0,A=M.length;w<A;w++){const x=Array.isArray(M[w])?M[w]:[M[w]];for(let C=0,D=x.length;C<D;C++){const b=x[C];if(p(b,w,C,R)===!0){const k=b.__offset,K=Array.isArray(b.value)?b.value:[b.value];let ee=0;for(let U=0;U<K.length;U++){const j=K[U],z=E(j);typeof j=="number"||typeof j=="boolean"?(b.__data[0]=j,t.bufferSubData(t.UNIFORM_BUFFER,k+ee,b.__data)):j.isMatrix3?(b.__data[0]=j.elements[0],b.__data[1]=j.elements[1],b.__data[2]=j.elements[2],b.__data[3]=0,b.__data[4]=j.elements[3],b.__data[5]=j.elements[4],b.__data[6]=j.elements[5],b.__data[7]=0,b.__data[8]=j.elements[6],b.__data[9]=j.elements[7],b.__data[10]=j.elements[8],b.__data[11]=0):ArrayBuffer.isView(j)?b.__data.set(new j.constructor(j.buffer,j.byteOffset,b.__data.length)):(j.toArray(b.__data,ee),ee+=z.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,k,b.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(m,S,M,R){const w=m.value,A=S+"_"+M;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:ArrayBuffer.isView(w)?R[A]=w.slice():R[A]=w.clone(),!0;{const x=R[A];if(typeof w=="number"||typeof w=="boolean"){if(x!==w)return R[A]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(x.equals(w)===!1)return x.copy(w),!0}}return!1}function _(m){const S=m.uniforms;let M=0;const R=16;for(let A=0,x=S.length;A<x;A++){const C=Array.isArray(S[A])?S[A]:[S[A]];for(let D=0,b=C.length;D<b;D++){const k=C[D],K=Array.isArray(k.value)?k.value:[k.value];for(let ee=0,U=K.length;ee<U;ee++){const j=K[ee],z=E(j),I=M%R,W=I%z.boundary,q=I+W;M+=W,q!==0&&R-q<z.storage&&(M+=R-q),k.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=z.storage}}}const w=M%R;return w>0&&(M+=R-w),m.__size=M,m.__cache={},this}function E(m){const S={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(S.boundary=4,S.storage=4):m.isVector2?(S.boundary=8,S.storage=8):m.isVector3||m.isColor?(S.boundary=16,S.storage=12):m.isVector4?(S.boundary=16,S.storage=16):m.isMatrix3?(S.boundary=48,S.storage=48):m.isMatrix4?(S.boundary=64,S.storage=64):m.isTexture?Le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(m)?(S.boundary=16,S.storage=m.byteLength):Le("WebGLRenderer: Unsupported uniform value type.",m),S}function g(m){const S=m.target;S.removeEventListener("dispose",g);const M=a.indexOf(S.__bindingPointIndex);a.splice(M,1),t.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function u(){for(const m in r)t.deleteBuffer(r[m]);a=[],r={},s={}}return{bind:l,update:c,dispose:u}}const uA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ti=null;function fA(){return ti===null&&(ti=new $y(uA,16,16,Wr,Ui),ti.name="DFG_LUT",ti.minFilter=Qt,ti.magFilter=Qt,ti.wrapS=Ri,ti.wrapT=Ri,ti.generateMipmaps=!1,ti.needsUpdate=!0),ti}class dA{constructor(e={}){const{canvas:n=Ty(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Mn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const E=p,g=new Set([Eh,Mh,yh]),u=new Set([Mn,hi,$a,Za,xh,Sh]),m=new Uint32Array(4),S=new Int32Array(4),M=new O;let R=null,w=null;const A=[],x=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let b=!1,k=null;this._outputColorSpace=Pn;let K=0,ee=0,U=null,j=-1,z=null;const I=new wt,W=new wt;let q=null;const Y=new Qe(0);let Q=0,pe=n.width,ue=n.height,me=1,G=null,ae=null;const re=new wt(0,0,pe,ue),Ae=new wt(0,0,pe,ue);let Ne=!1;const De=new Ch;let ct=!1,He=!1;const tt=new _t,ht=new O,Ge=new wt,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let vt=!1;function gn(){return U===null?me:1}let L=i;function Lt(y,F){return n.getContext(y,F)}try{const y={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${_h}`),n.addEventListener("webglcontextlost",ne,!1),n.addEventListener("webglcontextrestored",Ce,!1),n.addEventListener("webglcontextcreationerror",Oe,!1),L===null){const F="webgl2";if(L=Lt(F,y),L===null)throw Lt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw Ye("WebGLRenderer: "+y.message),y}let je,ut,ge,Mt,T,v,B,J,ie,oe,he,$,te,Se,Ee,fe,le,Ue,ke,Ze,N,ce,Z;function ye(){je=new f1(L),je.init(),N=new nA(L,je),ut=new i1(L,je,e,N),ge=new eA(L,je),ut.reversedDepthBuffer&&f&&ge.buffers.depth.setReversed(!0),Mt=new p1(L),T=new zw,v=new tA(L,je,ge,T,ut,N,Mt),B=new u1(D),J=new vM(L),ce=new t1(L,J),ie=new d1(L,J,Mt,ce),oe=new g1(L,ie,J,ce,Mt),Ue=new m1(L,ut,v),Ee=new r1(T),he=new kw(D,B,je,ut,ce,Ee),$=new lA(D,T),te=new Vw,Se=new qw(je),le=new e1(D,B,ge,oe,_,l),fe=new Jw(D,oe,ut),Z=new cA(L,Mt,ut,ge),ke=new n1(L,je,Mt),Ze=new h1(L,je,Mt),Mt.programs=he.programs,D.capabilities=ut,D.extensions=je,D.properties=T,D.renderLists=te,D.shadowMap=fe,D.state=ge,D.info=Mt}ye(),E!==Mn&&(C=new v1(E,n.width,n.height,r,s));const de=new aA(D,L);this.xr=de,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const y=je.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=je.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(y){y!==void 0&&(me=y,this.setSize(pe,ue,!1))},this.getSize=function(y){return y.set(pe,ue)},this.setSize=function(y,F,X=!0){if(de.isPresenting){Le("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=y,ue=F,n.width=Math.floor(y*me),n.height=Math.floor(F*me),X===!0&&(n.style.width=y+"px",n.style.height=F+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,y,F)},this.getDrawingBufferSize=function(y){return y.set(pe*me,ue*me).floor()},this.setDrawingBufferSize=function(y,F,X){pe=y,ue=F,me=X,n.width=Math.floor(y*X),n.height=Math.floor(F*X),this.setViewport(0,0,y,F)},this.setEffects=function(y){if(E===Mn){Ye("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let F=0;F<y.length;F++)if(y[F].isOutputPass===!0){Le("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(I)},this.getViewport=function(y){return y.copy(re)},this.setViewport=function(y,F,X,H){y.isVector4?re.set(y.x,y.y,y.z,y.w):re.set(y,F,X,H),ge.viewport(I.copy(re).multiplyScalar(me).round())},this.getScissor=function(y){return y.copy(Ae)},this.setScissor=function(y,F,X,H){y.isVector4?Ae.set(y.x,y.y,y.z,y.w):Ae.set(y,F,X,H),ge.scissor(W.copy(Ae).multiplyScalar(me).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(y){ge.setScissorTest(Ne=y)},this.setOpaqueSort=function(y){G=y},this.setTransparentSort=function(y){ae=y},this.getClearColor=function(y){return y.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(y=!0,F=!0,X=!0){let H=0;if(y){let V=!1;if(U!==null){const xe=U.texture.format;V=g.has(xe)}if(V){const xe=U.texture.type,Te=u.has(xe),ve=le.getClearColor(),Re=le.getClearAlpha(),be=ve.r,Be=ve.g,Ve=ve.b;Te?(m[0]=be,m[1]=Be,m[2]=Ve,m[3]=Re,L.clearBufferuiv(L.COLOR,0,m)):(S[0]=be,S[1]=Be,S[2]=Ve,S[3]=Re,L.clearBufferiv(L.COLOR,0,S))}else H|=L.COLOR_BUFFER_BIT}F&&(H|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),k=y},this.dispose=function(){n.removeEventListener("webglcontextlost",ne,!1),n.removeEventListener("webglcontextrestored",Ce,!1),n.removeEventListener("webglcontextcreationerror",Oe,!1),le.dispose(),te.dispose(),Se.dispose(),T.dispose(),B.dispose(),oe.dispose(),ce.dispose(),Z.dispose(),he.dispose(),de.dispose(),de.removeEventListener("sessionstart",Uh),de.removeEventListener("sessionend",Fh),Mr.stop()};function ne(y){y.preventDefault(),Zl("WebGLRenderer: Context Lost."),b=!0}function Ce(){Zl("WebGLRenderer: Context Restored."),b=!1;const y=Mt.autoReset,F=fe.enabled,X=fe.autoUpdate,H=fe.needsUpdate,V=fe.type;ye(),Mt.autoReset=y,fe.enabled=F,fe.autoUpdate=X,fe.needsUpdate=H,fe.type=V}function Oe(y){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function At(y){const F=y.target;F.removeEventListener("dispose",At),nt(F)}function nt(y){mi(y),T.remove(y)}function mi(y){const F=T.get(y).programs;F!==void 0&&(F.forEach(function(X){he.releaseProgram(X)}),y.isShaderMaterial&&he.releaseShaderCache(y))}this.renderBufferDirect=function(y,F,X,H,V,xe){F===null&&(F=Nt);const Te=V.isMesh&&V.matrixWorld.determinant()<0,ve=ov(y,F,X,H,V);ge.setMaterial(H,Te);let Re=X.index,be=1;if(H.wireframe===!0){if(Re=ie.getWireframeAttribute(X),Re===void 0)return;be=2}const Be=X.drawRange,Ve=X.attributes.position;let Pe=Be.start*be,it=(Be.start+Be.count)*be;xe!==null&&(Pe=Math.max(Pe,xe.start*be),it=Math.min(it,(xe.start+xe.count)*be)),Re!==null?(Pe=Math.max(Pe,0),it=Math.min(it,Re.count)):Ve!=null&&(Pe=Math.max(Pe,0),it=Math.min(it,Ve.count));const Rt=it-Pe;if(Rt<0||Rt===1/0)return;ce.setup(V,H,ve,X,Re);let Et,ot=ke;if(Re!==null&&(Et=J.get(Re),ot=Ze,ot.setIndex(Et)),V.isMesh)H.wireframe===!0?(ge.setLineWidth(H.wireframeLinewidth*gn()),ot.setMode(L.LINES)):ot.setMode(L.TRIANGLES);else if(V.isLine){let jt=H.linewidth;jt===void 0&&(jt=1),ge.setLineWidth(jt*gn()),V.isLineSegments?ot.setMode(L.LINES):V.isLineLoop?ot.setMode(L.LINE_LOOP):ot.setMode(L.LINE_STRIP)}else V.isPoints?ot.setMode(L.POINTS):V.isSprite&&ot.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(je.get("WEBGL_multi_draw"))ot.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const jt=V._multiDrawStarts,Me=V._multiDrawCounts,_n=V._multiDrawCount,Ke=Re?J.get(Re).bytesPerElement:1,Cn=T.get(H).currentProgram.getUniforms();for(let Qn=0;Qn<_n;Qn++)Cn.setValue(L,"_gl_DrawID",Qn),ot.render(jt[Qn]/Ke,Me[Qn])}else if(V.isInstancedMesh)ot.renderInstances(Pe,Rt,V.count);else if(X.isInstancedBufferGeometry){const jt=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,Me=Math.min(X.instanceCount,jt);ot.renderInstances(Pe,Rt,Me)}else ot.render(Pe,Rt)};function Zn(y,F,X){y.transparent===!0&&y.side===Ti&&y.forceSinglePass===!1?(y.side=mn,y.needsUpdate=!0,oo(y,F,X),y.side=gr,y.needsUpdate=!0,oo(y,F,X),y.side=Ti):oo(y,F,X)}this.compile=function(y,F,X=null){X===null&&(X=y),w=Se.get(X),w.init(F),x.push(w),X.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),y!==X&&y.traverseVisible(function(V){V.isLight&&V.layers.test(F.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights();const H=new Set;return y.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const xe=V.material;if(xe)if(Array.isArray(xe))for(let Te=0;Te<xe.length;Te++){const ve=xe[Te];Zn(ve,X,V),H.add(ve)}else Zn(xe,X,V),H.add(xe)}),w=x.pop(),H},this.compileAsync=function(y,F,X=null){const H=this.compile(y,F,X);return new Promise(V=>{function xe(){if(H.forEach(function(Te){T.get(Te).currentProgram.isReady()&&H.delete(Te)}),H.size===0){V(y);return}setTimeout(xe,10)}je.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Tc=null;function sv(y){Tc&&Tc(y)}function Uh(){Mr.stop()}function Fh(){Mr.start()}const Mr=new $0;Mr.setAnimationLoop(sv),typeof self<"u"&&Mr.setContext(self),this.setAnimationLoop=function(y){Tc=y,de.setAnimationLoop(y),y===null?Mr.stop():Mr.start()},de.addEventListener("sessionstart",Uh),de.addEventListener("sessionend",Fh),this.render=function(y,F){if(F!==void 0&&F.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;k!==null&&k.renderStart(y,F);const X=de.enabled===!0&&de.isPresenting===!0,H=C!==null&&(U===null||X)&&C.begin(D,U);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(de.cameraAutoUpdate===!0&&de.updateCamera(F),F=de.getCamera()),y.isScene===!0&&y.onBeforeRender(D,y,F,U),w=Se.get(y,x.length),w.init(F),w.state.textureUnits=v.getTextureUnits(),x.push(w),tt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),De.setFromProjectionMatrix(tt,oi,F.reversedDepth),He=this.localClippingEnabled,ct=Ee.init(this.clippingPlanes,He),R=te.get(y,A.length),R.init(),A.push(R),de.enabled===!0&&de.isPresenting===!0){const Te=D.xr.getDepthSensingMesh();Te!==null&&wc(Te,F,-1/0,D.sortObjects)}wc(y,F,0,D.sortObjects),R.finish(),D.sortObjects===!0&&R.sort(G,ae),vt=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,vt&&le.addToRenderList(R,y),this.info.render.frame++,ct===!0&&Ee.beginShadows();const V=w.state.shadowsArray;if(fe.render(V,y,F),ct===!0&&Ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&C.hasRenderPass())===!1){const Te=R.opaque,ve=R.transmissive;if(w.setupLights(),F.isArrayCamera){const Re=F.cameras;if(ve.length>0)for(let be=0,Be=Re.length;be<Be;be++){const Ve=Re[be];Bh(Te,ve,y,Ve)}vt&&le.render(y);for(let be=0,Be=Re.length;be<Be;be++){const Ve=Re[be];Oh(R,y,Ve,Ve.viewport)}}else ve.length>0&&Bh(Te,ve,y,F),vt&&le.render(y),Oh(R,y,F)}U!==null&&ee===0&&(v.updateMultisampleRenderTarget(U),v.updateRenderTargetMipmap(U)),H&&C.end(D),y.isScene===!0&&y.onAfterRender(D,y,F),ce.resetDefaultState(),j=-1,z=null,x.pop(),x.length>0?(w=x[x.length-1],v.setTextureUnits(w.state.textureUnits),ct===!0&&Ee.setGlobalState(D.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?R=A[A.length-1]:R=null,k!==null&&k.renderEnd()};function wc(y,F,X,H){if(y.visible===!1)return;if(y.layers.test(F.layers)){if(y.isGroup)X=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(F);else if(y.isLightProbeGrid)w.pushLightProbeGrid(y);else if(y.isLight)w.pushLight(y),y.castShadow&&w.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||De.intersectsSprite(y)){H&&Ge.setFromMatrixPosition(y.matrixWorld).applyMatrix4(tt);const Te=oe.update(y),ve=y.material;ve.visible&&R.push(y,Te,ve,X,Ge.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||De.intersectsObject(y))){const Te=oe.update(y),ve=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ge.copy(y.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),Ge.copy(Te.boundingSphere.center)),Ge.applyMatrix4(y.matrixWorld).applyMatrix4(tt)),Array.isArray(ve)){const Re=Te.groups;for(let be=0,Be=Re.length;be<Be;be++){const Ve=Re[be],Pe=ve[Ve.materialIndex];Pe&&Pe.visible&&R.push(y,Te,Pe,X,Ge.z,Ve)}}else ve.visible&&R.push(y,Te,ve,X,Ge.z,null)}}const xe=y.children;for(let Te=0,ve=xe.length;Te<ve;Te++)wc(xe[Te],F,X,H)}function Oh(y,F,X,H){const{opaque:V,transmissive:xe,transparent:Te}=y;w.setupLightsView(X),ct===!0&&Ee.setGlobalState(D.clippingPlanes,X),H&&ge.viewport(I.copy(H)),V.length>0&&ao(V,F,X),xe.length>0&&ao(xe,F,X),Te.length>0&&ao(Te,F,X),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function Bh(y,F,X,H){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[H.id]===void 0){const Pe=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[H.id]=new fi(1,1,{generateMipmaps:!0,type:Pe?Ui:Mn,minFilter:Ir,samples:Math.max(4,ut.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const xe=w.state.transmissionRenderTarget[H.id],Te=H.viewport||I;xe.setSize(Te.z*D.transmissionResolutionScale,Te.w*D.transmissionResolutionScale);const ve=D.getRenderTarget(),Re=D.getActiveCubeFace(),be=D.getActiveMipmapLevel();D.setRenderTarget(xe),D.getClearColor(Y),Q=D.getClearAlpha(),Q<1&&D.setClearColor(16777215,.5),D.clear(),vt&&le.render(X);const Be=D.toneMapping;D.toneMapping=ui;const Ve=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),w.setupLightsView(H),ct===!0&&Ee.setGlobalState(D.clippingPlanes,H),ao(y,X,H),v.updateMultisampleRenderTarget(xe),v.updateRenderTargetMipmap(xe),je.has("WEBGL_multisampled_render_to_texture")===!1){let Pe=!1;for(let it=0,Rt=F.length;it<Rt;it++){const Et=F[it],{object:ot,geometry:jt,material:Me,group:_n}=Et;if(Me.side===Ti&&ot.layers.test(H.layers)){const Ke=Me.side;Me.side=mn,Me.needsUpdate=!0,kh(ot,X,H,jt,Me,_n),Me.side=Ke,Me.needsUpdate=!0,Pe=!0}}Pe===!0&&(v.updateMultisampleRenderTarget(xe),v.updateRenderTargetMipmap(xe))}D.setRenderTarget(ve,Re,be),D.setClearColor(Y,Q),Ve!==void 0&&(H.viewport=Ve),D.toneMapping=Be}function ao(y,F,X){const H=F.isScene===!0?F.overrideMaterial:null;for(let V=0,xe=y.length;V<xe;V++){const Te=y[V],{object:ve,geometry:Re,group:be}=Te;let Be=Te.material;Be.allowOverride===!0&&H!==null&&(Be=H),ve.layers.test(X.layers)&&kh(ve,F,X,Re,Be,be)}}function kh(y,F,X,H,V,xe){y.onBeforeRender(D,F,X,H,V,xe),y.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),V.onBeforeRender(D,F,X,H,y,xe),V.transparent===!0&&V.side===Ti&&V.forceSinglePass===!1?(V.side=mn,V.needsUpdate=!0,D.renderBufferDirect(X,F,H,V,y,xe),V.side=gr,V.needsUpdate=!0,D.renderBufferDirect(X,F,H,V,y,xe),V.side=Ti):D.renderBufferDirect(X,F,H,V,y,xe),y.onAfterRender(D,F,X,H,V,xe)}function oo(y,F,X){F.isScene!==!0&&(F=Nt);const H=T.get(y),V=w.state.lights,xe=w.state.shadowsArray,Te=V.state.version,ve=he.getParameters(y,V.state,xe,F,X,w.state.lightProbeGridArray),Re=he.getProgramCacheKey(ve);let be=H.programs;H.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?F.environment:null,H.fog=F.fog;const Be=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;H.envMap=B.get(y.envMap||H.environment,Be),H.envMapRotation=H.environment!==null&&y.envMap===null?F.environmentRotation:y.envMapRotation,be===void 0&&(y.addEventListener("dispose",At),be=new Map,H.programs=be);let Ve=be.get(Re);if(Ve!==void 0){if(H.currentProgram===Ve&&H.lightsStateVersion===Te)return Hh(y,ve),Ve}else ve.uniforms=he.getUniforms(y),k!==null&&y.isNodeMaterial&&k.build(y,X,ve),y.onBeforeCompile(ve,D),Ve=he.acquireProgram(ve,Re),be.set(Re,Ve),H.uniforms=ve.uniforms;const Pe=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Pe.clippingPlanes=Ee.uniform),Hh(y,ve),H.needsLights=cv(y),H.lightsStateVersion=Te,H.needsLights&&(Pe.ambientLightColor.value=V.state.ambient,Pe.lightProbe.value=V.state.probe,Pe.directionalLights.value=V.state.directional,Pe.directionalLightShadows.value=V.state.directionalShadow,Pe.spotLights.value=V.state.spot,Pe.spotLightShadows.value=V.state.spotShadow,Pe.rectAreaLights.value=V.state.rectArea,Pe.ltc_1.value=V.state.rectAreaLTC1,Pe.ltc_2.value=V.state.rectAreaLTC2,Pe.pointLights.value=V.state.point,Pe.pointLightShadows.value=V.state.pointShadow,Pe.hemisphereLights.value=V.state.hemi,Pe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Pe.spotLightMatrix.value=V.state.spotLightMatrix,Pe.spotLightMap.value=V.state.spotLightMap,Pe.pointShadowMatrix.value=V.state.pointShadowMatrix),H.lightProbeGrid=w.state.lightProbeGridArray.length>0,H.currentProgram=Ve,H.uniformsList=null,Ve}function zh(y){if(y.uniformsList===null){const F=y.currentProgram.getUniforms();y.uniformsList=yl.seqWithValue(F.seq,y.uniforms)}return y.uniformsList}function Hh(y,F){const X=T.get(y);X.outputColorSpace=F.outputColorSpace,X.batching=F.batching,X.batchingColor=F.batchingColor,X.instancing=F.instancing,X.instancingColor=F.instancingColor,X.instancingMorph=F.instancingMorph,X.skinning=F.skinning,X.morphTargets=F.morphTargets,X.morphNormals=F.morphNormals,X.morphColors=F.morphColors,X.morphTargetsCount=F.morphTargetsCount,X.numClippingPlanes=F.numClippingPlanes,X.numIntersection=F.numClipIntersection,X.vertexAlphas=F.vertexAlphas,X.vertexTangents=F.vertexTangents,X.toneMapping=F.toneMapping}function av(y,F){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;M.setFromMatrixPosition(F.matrixWorld);for(let X=0,H=y.length;X<H;X++){const V=y[X];if(V.texture!==null&&V.boundingBox.containsPoint(M))return V}return null}function ov(y,F,X,H,V){F.isScene!==!0&&(F=Nt),v.resetTextureUnits();const xe=F.fog,Te=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?F.environment:null,ve=U===null?D.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:qe.workingColorSpace,Re=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,be=B.get(H.envMap||Te,Re),Be=H.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ve=!!X.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pe=!!X.morphAttributes.position,it=!!X.morphAttributes.normal,Rt=!!X.morphAttributes.color;let Et=ui;H.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Et=D.toneMapping);const ot=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,jt=ot!==void 0?ot.length:0,Me=T.get(H),_n=w.state.lights;if(ct===!0&&(He===!0||y!==z)){const ft=y===z&&H.id===j;Ee.setState(H,y,ft)}let Ke=!1;H.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==_n.state.version||Me.outputColorSpace!==ve||V.isBatchedMesh&&Me.batching===!1||!V.isBatchedMesh&&Me.batching===!0||V.isBatchedMesh&&Me.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Me.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Me.instancing===!1||!V.isInstancedMesh&&Me.instancing===!0||V.isSkinnedMesh&&Me.skinning===!1||!V.isSkinnedMesh&&Me.skinning===!0||V.isInstancedMesh&&Me.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Me.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Me.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Me.instancingMorph===!1&&V.morphTexture!==null||Me.envMap!==be||H.fog===!0&&Me.fog!==xe||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Ee.numPlanes||Me.numIntersection!==Ee.numIntersection)||Me.vertexAlphas!==Be||Me.vertexTangents!==Ve||Me.morphTargets!==Pe||Me.morphNormals!==it||Me.morphColors!==Rt||Me.toneMapping!==Et||Me.morphTargetsCount!==jt||!!Me.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Ke=!0):(Ke=!0,Me.__version=H.version);let Cn=Me.currentProgram;Ke===!0&&(Cn=oo(H,F,V),k&&H.isNodeMaterial&&k.onUpdateProgram(H,Cn,Me));let Qn=!1,ki=!1,qr=!1;const lt=Cn.getUniforms(),Ct=Me.uniforms;if(ge.useProgram(Cn.program)&&(Qn=!0,ki=!0,qr=!0),H.id!==j&&(j=H.id,ki=!0),Me.needsLights){const ft=av(w.state.lightProbeGridArray,V);Me.lightProbeGrid!==ft&&(Me.lightProbeGrid=ft,ki=!0)}if(Qn||z!==y){ge.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),lt.setValue(L,"projectionMatrix",y.projectionMatrix),lt.setValue(L,"viewMatrix",y.matrixWorldInverse);const Hi=lt.map.cameraPosition;Hi!==void 0&&Hi.setValue(L,ht.setFromMatrixPosition(y.matrixWorld)),ut.logarithmicDepthBuffer&&lt.setValue(L,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&lt.setValue(L,"isOrthographic",y.isOrthographicCamera===!0),z!==y&&(z=y,ki=!0,qr=!0)}if(Me.needsLights&&(_n.state.directionalShadowMap.length>0&&lt.setValue(L,"directionalShadowMap",_n.state.directionalShadowMap,v),_n.state.spotShadowMap.length>0&&lt.setValue(L,"spotShadowMap",_n.state.spotShadowMap,v),_n.state.pointShadowMap.length>0&&lt.setValue(L,"pointShadowMap",_n.state.pointShadowMap,v)),V.isSkinnedMesh){lt.setOptional(L,V,"bindMatrix"),lt.setOptional(L,V,"bindMatrixInverse");const ft=V.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),lt.setValue(L,"boneTexture",ft.boneTexture,v))}V.isBatchedMesh&&(lt.setOptional(L,V,"batchingTexture"),lt.setValue(L,"batchingTexture",V._matricesTexture,v),lt.setOptional(L,V,"batchingIdTexture"),lt.setValue(L,"batchingIdTexture",V._indirectTexture,v),lt.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&lt.setValue(L,"batchingColorTexture",V._colorsTexture,v));const zi=X.morphAttributes;if((zi.position!==void 0||zi.normal!==void 0||zi.color!==void 0)&&Ue.update(V,X,Cn),(ki||Me.receiveShadow!==V.receiveShadow)&&(Me.receiveShadow=V.receiveShadow,lt.setValue(L,"receiveShadow",V.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&F.environment!==null&&(Ct.envMapIntensity.value=F.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=fA()),ki){if(lt.setValue(L,"toneMappingExposure",D.toneMappingExposure),Me.needsLights&&lv(Ct,qr),xe&&H.fog===!0&&$.refreshFogUniforms(Ct,xe),$.refreshMaterialUniforms(Ct,H,me,ue,w.state.transmissionRenderTarget[y.id]),Me.needsLights&&Me.lightProbeGrid){const ft=Me.lightProbeGrid;Ct.probesSH.value=ft.texture,Ct.probesMin.value.copy(ft.boundingBox.min),Ct.probesMax.value.copy(ft.boundingBox.max),Ct.probesResolution.value.copy(ft.resolution)}yl.upload(L,zh(Me),Ct,v)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(yl.upload(L,zh(Me),Ct,v),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&lt.setValue(L,"center",V.center),lt.setValue(L,"modelViewMatrix",V.modelViewMatrix),lt.setValue(L,"normalMatrix",V.normalMatrix),lt.setValue(L,"modelMatrix",V.matrixWorld),H.uniformsGroups!==void 0){const ft=H.uniformsGroups;for(let Hi=0,Kr=ft.length;Hi<Kr;Hi++){const Vh=ft[Hi];Z.update(Vh,Cn),Z.bind(Vh,Cn)}}return Cn}function lv(y,F){y.ambientLightColor.needsUpdate=F,y.lightProbe.needsUpdate=F,y.directionalLights.needsUpdate=F,y.directionalLightShadows.needsUpdate=F,y.pointLights.needsUpdate=F,y.pointLightShadows.needsUpdate=F,y.spotLights.needsUpdate=F,y.spotLightShadows.needsUpdate=F,y.rectAreaLights.needsUpdate=F,y.hemisphereLights.needsUpdate=F}function cv(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(y,F,X){const H=T.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),T.get(y.texture).__webglTexture=F,T.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:X,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,F){const X=T.get(y);X.__webglFramebuffer=F,X.__useDefaultFramebuffer=F===void 0};const uv=L.createFramebuffer();this.setRenderTarget=function(y,F=0,X=0){U=y,K=F,ee=X;let H=null,V=!1,xe=!1;if(y){const ve=T.get(y);if(ve.__useDefaultFramebuffer!==void 0){ge.bindFramebuffer(L.FRAMEBUFFER,ve.__webglFramebuffer),I.copy(y.viewport),W.copy(y.scissor),q=y.scissorTest,ge.viewport(I),ge.scissor(W),ge.setScissorTest(q),j=-1;return}else if(ve.__webglFramebuffer===void 0)v.setupRenderTarget(y);else if(ve.__hasExternalTextures)v.rebindTextures(y,T.get(y.texture).__webglTexture,T.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Be=y.depthTexture;if(ve.__boundDepthTexture!==Be){if(Be!==null&&T.has(Be)&&(y.width!==Be.image.width||y.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(y)}}const Re=y.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(xe=!0);const be=T.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(be[F])?H=be[F][X]:H=be[F],V=!0):y.samples>0&&v.useMultisampledRTT(y)===!1?H=T.get(y).__webglMultisampledFramebuffer:Array.isArray(be)?H=be[X]:H=be,I.copy(y.viewport),W.copy(y.scissor),q=y.scissorTest}else I.copy(re).multiplyScalar(me).floor(),W.copy(Ae).multiplyScalar(me).floor(),q=Ne;if(X!==0&&(H=uv),ge.bindFramebuffer(L.FRAMEBUFFER,H)&&ge.drawBuffers(y,H),ge.viewport(I),ge.scissor(W),ge.setScissorTest(q),V){const ve=T.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,ve.__webglTexture,X)}else if(xe){const ve=F;for(let Re=0;Re<y.textures.length;Re++){const be=T.get(y.textures[Re]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Re,be.__webglTexture,X,ve)}}else if(y!==null&&X!==0){const ve=T.get(y.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ve.__webglTexture,X)}j=-1},this.readRenderTargetPixels=function(y,F,X,H,V,xe,Te,ve=0){if(!(y&&y.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=T.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re){ge.bindFramebuffer(L.FRAMEBUFFER,Re);try{const be=y.textures[ve],Be=be.format,Ve=be.type;if(y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),!ut.textureFormatReadable(Be)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(Ve)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=y.width-H&&X>=0&&X<=y.height-V&&L.readPixels(F,X,H,V,N.convert(Be),N.convert(Ve),xe)}finally{const be=U!==null?T.get(U).__webglFramebuffer:null;ge.bindFramebuffer(L.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(y,F,X,H,V,xe,Te,ve=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=T.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&Te!==void 0&&(Re=Re[Te]),Re)if(F>=0&&F<=y.width-H&&X>=0&&X<=y.height-V){ge.bindFramebuffer(L.FRAMEBUFFER,Re);const be=y.textures[ve],Be=be.format,Ve=be.type;if(y.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ve),!ut.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ut.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Pe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Pe),L.bufferData(L.PIXEL_PACK_BUFFER,xe.byteLength,L.STREAM_READ),L.readPixels(F,X,H,V,N.convert(Be),N.convert(Ve),0);const it=U!==null?T.get(U).__webglFramebuffer:null;ge.bindFramebuffer(L.FRAMEBUFFER,it);const Rt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await wy(L,Rt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Pe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,xe),L.deleteBuffer(Pe),L.deleteSync(Rt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,F=null,X=0){const H=Math.pow(2,-X),V=Math.floor(y.image.width*H),xe=Math.floor(y.image.height*H),Te=F!==null?F.x:0,ve=F!==null?F.y:0;v.setTexture2D(y,0),L.copyTexSubImage2D(L.TEXTURE_2D,X,0,0,Te,ve,V,xe),ge.unbindTexture()};const fv=L.createFramebuffer(),dv=L.createFramebuffer();this.copyTextureToTexture=function(y,F,X=null,H=null,V=0,xe=0){let Te,ve,Re,be,Be,Ve,Pe,it,Rt;const Et=y.isCompressedTexture?y.mipmaps[xe]:y.image;if(X!==null)Te=X.max.x-X.min.x,ve=X.max.y-X.min.y,Re=X.isBox3?X.max.z-X.min.z:1,be=X.min.x,Be=X.min.y,Ve=X.isBox3?X.min.z:0;else{const Ct=Math.pow(2,-V);Te=Math.floor(Et.width*Ct),ve=Math.floor(Et.height*Ct),y.isDataArrayTexture?Re=Et.depth:y.isData3DTexture?Re=Math.floor(Et.depth*Ct):Re=1,be=0,Be=0,Ve=0}H!==null?(Pe=H.x,it=H.y,Rt=H.z):(Pe=0,it=0,Rt=0);const ot=N.convert(F.format),jt=N.convert(F.type);let Me;F.isData3DTexture?(v.setTexture3D(F,0),Me=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(v.setTexture2DArray(F,0),Me=L.TEXTURE_2D_ARRAY):(v.setTexture2D(F,0),Me=L.TEXTURE_2D),ge.activeTexture(L.TEXTURE0),ge.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),ge.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),ge.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const _n=ge.getParameter(L.UNPACK_ROW_LENGTH),Ke=ge.getParameter(L.UNPACK_IMAGE_HEIGHT),Cn=ge.getParameter(L.UNPACK_SKIP_PIXELS),Qn=ge.getParameter(L.UNPACK_SKIP_ROWS),ki=ge.getParameter(L.UNPACK_SKIP_IMAGES);ge.pixelStorei(L.UNPACK_ROW_LENGTH,Et.width),ge.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Et.height),ge.pixelStorei(L.UNPACK_SKIP_PIXELS,be),ge.pixelStorei(L.UNPACK_SKIP_ROWS,Be),ge.pixelStorei(L.UNPACK_SKIP_IMAGES,Ve);const qr=y.isDataArrayTexture||y.isData3DTexture,lt=F.isDataArrayTexture||F.isData3DTexture;if(y.isDepthTexture){const Ct=T.get(y),zi=T.get(F),ft=T.get(Ct.__renderTarget),Hi=T.get(zi.__renderTarget);ge.bindFramebuffer(L.READ_FRAMEBUFFER,ft.__webglFramebuffer),ge.bindFramebuffer(L.DRAW_FRAMEBUFFER,Hi.__webglFramebuffer);for(let Kr=0;Kr<Re;Kr++)qr&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,T.get(y).__webglTexture,V,Ve+Kr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,T.get(F).__webglTexture,xe,Rt+Kr)),L.blitFramebuffer(be,Be,Te,ve,Pe,it,Te,ve,L.DEPTH_BUFFER_BIT,L.NEAREST);ge.bindFramebuffer(L.READ_FRAMEBUFFER,null),ge.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(V!==0||y.isRenderTargetTexture||T.has(y)){const Ct=T.get(y),zi=T.get(F);ge.bindFramebuffer(L.READ_FRAMEBUFFER,fv),ge.bindFramebuffer(L.DRAW_FRAMEBUFFER,dv);for(let ft=0;ft<Re;ft++)qr?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ct.__webglTexture,V,Ve+ft):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ct.__webglTexture,V),lt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,zi.__webglTexture,xe,Rt+ft):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,zi.__webglTexture,xe),V!==0?L.blitFramebuffer(be,Be,Te,ve,Pe,it,Te,ve,L.COLOR_BUFFER_BIT,L.NEAREST):lt?L.copyTexSubImage3D(Me,xe,Pe,it,Rt+ft,be,Be,Te,ve):L.copyTexSubImage2D(Me,xe,Pe,it,be,Be,Te,ve);ge.bindFramebuffer(L.READ_FRAMEBUFFER,null),ge.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else lt?y.isDataTexture||y.isData3DTexture?L.texSubImage3D(Me,xe,Pe,it,Rt,Te,ve,Re,ot,jt,Et.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(Me,xe,Pe,it,Rt,Te,ve,Re,ot,Et.data):L.texSubImage3D(Me,xe,Pe,it,Rt,Te,ve,Re,ot,jt,Et):y.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,xe,Pe,it,Te,ve,ot,jt,Et.data):y.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,xe,Pe,it,Et.width,Et.height,ot,Et.data):L.texSubImage2D(L.TEXTURE_2D,xe,Pe,it,Te,ve,ot,jt,Et);ge.pixelStorei(L.UNPACK_ROW_LENGTH,_n),ge.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ke),ge.pixelStorei(L.UNPACK_SKIP_PIXELS,Cn),ge.pixelStorei(L.UNPACK_SKIP_ROWS,Qn),ge.pixelStorei(L.UNPACK_SKIP_IMAGES,ki),xe===0&&F.generateMipmaps&&L.generateMipmap(Me),ge.unbindTexture()},this.initRenderTarget=function(y){T.get(y).__webglFramebuffer===void 0&&v.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?v.setTextureCube(y,0):y.isData3DTexture?v.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?v.setTexture2DArray(y,0):v.setTexture2D(y,0),ge.unbindTexture()},this.resetState=function(){K=0,ee=0,U=null,ge.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=qe._getUnpackColorSpace()}}const rg={type:"change"},bh={type:"start"},rv={type:"end"},tl=new Sc,sg=new Qi,hA=Math.cos(70*Cy.DEG2RAD),It=new O,cn=2*Math.PI,st={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Iu=1e-6;class pA extends gM{constructor(e,n=null){super(e,n),this.state=st.NONE,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Is.ROTATE,MIDDLE:Is.DOLLY,RIGHT:Is.PAN},this.touches={ONE:Rs.ROTATE,TWO:Rs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new _r,this._lastTargetPosition=new O,this._quat=new _r().setFromUnitVectors(e.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Nm,this._sphericalDelta=new Nm,this._scale=1,this._panOffset=new O,this._rotateStart=new Ie,this._rotateEnd=new Ie,this._rotateDelta=new Ie,this._panStart=new Ie,this._panEnd=new Ie,this._panDelta=new Ie,this._dollyStart=new Ie,this._dollyEnd=new Ie,this._dollyDelta=new Ie,this._dollyDirection=new O,this._mouse=new Ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=gA.bind(this),this._onPointerDown=mA.bind(this),this._onPointerUp=_A.bind(this),this._onContextMenu=TA.bind(this),this._onMouseWheel=SA.bind(this),this._onKeyDown=yA.bind(this),this._onTouchStart=MA.bind(this),this._onTouchMove=EA.bind(this),this._onMouseDown=vA.bind(this),this._onMouseMove=xA.bind(this),this._interceptControlDown=wA.bind(this),this._interceptControlUp=AA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(rg),this.update(),this.state=st.NONE}pan(e,n){this._pan(e,n),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const n=this.object.position;It.copy(n).sub(this.target),It.applyQuaternion(this._quat),this._spherical.setFromVector3(It),this.autoRotate&&this.state===st.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=cn:i>Math.PI&&(i-=cn),r<-Math.PI?r+=cn:r>Math.PI&&(r-=cn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(It.setFromSpherical(this._spherical),It.applyQuaternion(this._quatInverse),n.copy(this.target).add(It),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=It.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new O(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=It.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(tl.origin.copy(this.object.position),tl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(tl.direction))<hA?this.object.lookAt(this.target):(sg.setFromNormalAndCoplanarPoint(this.object.up,this.target),tl.intersectPlane(sg,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Iu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Iu||this._lastTargetPosition.distanceToSquared(this.target)>Iu?(this.dispatchEvent(rg),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?cn/60*this.autoRotateSpeed*e:cn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){It.setFromMatrixColumn(n,0),It.multiplyScalar(-e),this._panOffset.add(It)}_panUp(e,n){this.screenSpacePanning===!0?It.setFromMatrixColumn(n,1):(It.setFromMatrixColumn(n,0),It.crossVectors(this.object.up,It)),It.multiplyScalar(e),this._panOffset.add(It)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;It.copy(r).sub(this.target);let s=It.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/n.clientHeight),this._rotateUp(cn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/n.clientHeight),this._rotateUp(cn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+n.x)*.5,o=(e.pageY+n.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new Ie,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function mA(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function gA(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function _A(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(rv),this.state=st.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function vA(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Is.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=st.DOLLY;break;case Is.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=st.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=st.ROTATE}break;case Is.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=st.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=st.PAN}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(bh)}function xA(t){switch(this.state){case st.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case st.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case st.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function SA(t){this.enabled===!1||this.enableZoom===!1||this.state!==st.NONE||(t.preventDefault(),this.dispatchEvent(bh),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(rv))}function yA(t){this.enabled!==!1&&this._handleKeyDown(t)}function MA(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Rs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=st.TOUCH_ROTATE;break;case Rs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=st.TOUCH_PAN;break;default:this.state=st.NONE}break;case 2:switch(this.touches.TWO){case Rs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=st.TOUCH_DOLLY_PAN;break;case Rs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=st.TOUCH_DOLLY_ROTATE;break;default:this.state=st.NONE}break;default:this.state=st.NONE}this.state!==st.NONE&&this.dispatchEvent(bh)}function EA(t){switch(this._trackPointer(t),this.state){case st.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case st.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case st.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case st.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=st.NONE}}function TA(t){this.enabled!==!1&&t.preventDefault()}function wA(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function AA(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Ki=3407667,nl="#33ff33",Uu="#1a7a1a",RA="#030c03";function ag(t){const n=document.createElement("canvas");n.width=n.height=128;const i=n.getContext("2d"),r=128/2,s=i.createRadialGradient(r,r,0,r,r,r);return s.addColorStop(0,t),s.addColorStop(.3,t),s.addColorStop(.7,"rgba(51,255,51,0.15)"),s.addColorStop(1,"transparent"),i.fillStyle=s,i.fillRect(0,0,128,128),new tM(n)}function CA({onHome:t}){const e=at.useRef(null),[n,i]=at.useState("loading"),[r,s]=at.useState({nodes:0,edges:0}),[a,o]=at.useState(null);return at.useEffect(()=>{const l=e.current;if(!l)return;const c=l.clientWidth,h=l.clientHeight,d=new dA({antialias:!0,alpha:!1});d.setPixelRatio(window.devicePixelRatio),d.setSize(c,h),d.setClearColor(199683,1),l.appendChild(d.domElement);const f=new Vy,p=new yn(60,c/h,.1,2e3);p.position.set(0,0,280);const _=new pA(p,d.domElement);_.enableDamping=!0,_.dampingFactor=.08,_.autoRotate=!0,_.autoRotateSpeed=.4,_.minDistance=80,_.maxDistance=600,f.add(new dM(6656,2));const E=new bm(3407667,1.2,600);f.add(E);const g=ag("rgba(51,255,51,0.9)"),u=ag("rgba(10,60,10,0.7)"),m=new xd({color:Ki,transparent:!0,opacity:.1,blending:Na,depthWrite:!1}),S=new xd({color:Ki,transparent:!0,opacity:.55,blending:Na,depthWrite:!1});let M=[],R=[],w=[],A=null,x=new Set,C=0;fetch("/api/graph?n=100").then(I=>I.json()).then(I=>{const W=Math.max(...I.nodes.map(Y=>Y.score),.001),q=120;M=I.nodes.map((Y,Q)=>{const pe=Math.acos(-1+2*Q/I.nodes.length),ue=Math.sqrt(I.nodes.length*Math.PI)*pe,me=3+Y.score/W*9,G=new O(q*.5*Math.sin(pe)*Math.cos(ue)+(Math.random()-.5)*30,q*.5*Math.sin(pe)*Math.sin(ue)+(Math.random()-.5)*30,q*.5*Math.cos(pe)+(Math.random()-.5)*30),ae=new H0({map:g,color:Ki,transparent:!0,opacity:1,blending:Na,depthWrite:!1}),re=new qy(ae);re.scale.setScalar(me*3.5),re.position.copy(G),f.add(re);const Ae=new bm(Ki,.15,me*12);return Ae.position.copy(G),f.add(Ae),{...Y,x:G.x,y:G.y,z:G.z,vx:0,vy:0,vz:0,r:me,sprite:re,light:Ae}}),R=I.edges||[];for(const Y of R){const Q=M.find(G=>G.id===Y.source),pe=M.find(G=>G.id===Y.target);if(!Q||!pe)continue;const ue=new kn().setFromPoints([new O(Q.x,Q.y,Q.z),new O(pe.x,pe.y,pe.z)]),me=new eM(ue,m.clone());f.add(me),w.push({line:me,src:Y.source,tgt:Y.target})}s({nodes:M.length,edges:R.length}),i("ok")}).catch(()=>i("error"));const D=()=>{for(let Y=0;Y<M.length;Y++){const Q=M[Y];Q.vx-=Q.x*.002,Q.vy-=Q.y*.002,Q.vz-=Q.z*.002;for(let pe=Y+1;pe<M.length;pe++){const ue=M[pe],me=Q.x-ue.x,G=Q.y-ue.y,ae=Q.z-ue.z,re=Math.max(me*me+G*G+ae*ae,100),Ae=Math.sqrt(re),Ne=220/re,De=me/Ae*Ne,ct=G/Ae*Ne,He=ae/Ae*Ne;Q.vx+=De,Q.vy+=ct,Q.vz+=He,ue.vx-=De,ue.vy-=ct,ue.vz-=He}}const I=new Map(M.map(Y=>[Y.id,Y]));for(const Y of R){const Q=I.get(Y.source),pe=I.get(Y.target);if(!Q||!pe)continue;const ue=pe.x-Q.x,me=pe.y-Q.y,G=pe.z-Q.z,ae=Math.sqrt(ue*ue+me*me+G*G)||1,re=(ae-70)*.006,Ae=ue/ae*re,Ne=me/ae*re,De=G/ae*re;Q.vx+=Ae,Q.vy+=Ne,Q.vz+=De,pe.vx-=Ae,pe.vy-=Ne,pe.vz-=De}const W=5;for(const Y of M){Y.vx*=.8,Y.vy*=.8,Y.vz*=.8;const Q=Math.sqrt(Y.vx*Y.vx+Y.vy*Y.vy+Y.vz*Y.vz);Q>W&&(Y.vx=Y.vx/Q*W,Y.vy=Y.vy/Q*W,Y.vz=Y.vz/Q*W),Y.x+=Y.vx,Y.y+=Y.vy,Y.z+=Y.vz,Y.sprite.position.set(Y.x,Y.y,Y.z),Y.light.position.set(Y.x,Y.y,Y.z)}const q=new Float32Array(2*3);for(const{line:Y,src:Q,tgt:pe}of w){const ue=I.get(Q),me=I.get(pe);!ue||!me||(q[0]=ue.x,q[1]=ue.y,q[2]=ue.z,q[3]=me.x,q[4]=me.y,q[5]=me.z,Y.geometry.setAttribute("position",new Fn(q.slice(),3)),Y.geometry.attributes.position.needsUpdate=!0)}},b=new mM;b.params.Sprite={threshold:4};const k=new Ie,K=(I,W)=>{const q=d.domElement.getBoundingClientRect();k.x=(I-q.left)/q.width*2-1,k.y=-((W-q.top)/q.height)*2+1,b.setFromCamera(k,p);const Y=M.map(pe=>pe.sprite),Q=b.intersectObjects(Y);if(Q.length>0){const pe=Q[0].object,ue=M.find(me=>me.sprite===pe)||null;if(ue!==A&&(A=ue,x=new Set,ue))for(const me of R)me.source===ue.id&&x.add(me.target),me.target===ue.id&&x.add(me.source);if(d.domElement.style.cursor="pointer",ue){const me=ue.sprite.position.clone().project(p),G=d.domElement.getBoundingClientRect(),ae=(me.x+1)/2*G.width+G.left,re=-(me.y-1)/2*G.height+G.top;o({title:ue.title.length>50?ue.title.slice(0,50)+"…":ue.title,x:ae,y:re})}}else A&&(A=null,x=new Set),d.domElement.style.cursor="default",o(null);for(const pe of M){const ue=pe.sprite.material;A?pe===A?(ue.map=g,ue.opacity=1,ue.color.set(10092441)):x.has(pe.id)?(ue.map=g,ue.opacity=.9,ue.color.set(5635925)):(ue.map=u,ue.opacity=.25,ue.color.setHex(Ki)):(ue.map=g,ue.opacity=1,ue.color.setHex(Ki)),ue.needsUpdate=!0,pe.light.intensity=A?pe===A?.4:x.has(pe.id)?.2:.02:.15}for(const{line:pe,src:ue,tgt:me}of w){const G=pe.material;A?ue===A.id||me===A.id?(G.opacity=.65,G.color.set(6750054)):(G.opacity=.04,G.color.setHex(Ki)):(G.opacity=.1,G.color.setHex(Ki)),G.needsUpdate=!0}},ee=I=>K(I.clientX,I.clientY),U=I=>{const W=d.domElement.getBoundingClientRect();k.x=(I.clientX-W.left)/W.width*2-1,k.y=-((I.clientY-W.top)/W.height)*2+1,b.setFromCamera(k,p);const q=b.intersectObjects(M.map(Y=>Y.sprite));if(q.length>0){const Y=q[0].object,Q=M.find(pe=>pe.sprite===Y);Q&&window.open(Q.url,"_blank","noopener,noreferrer")}};d.domElement.addEventListener("mousemove",ee),d.domElement.addEventListener("click",U);const j=()=>{const I=l.clientWidth,W=l.clientHeight;p.aspect=I/W,p.updateProjectionMatrix(),d.setSize(I,W)};window.addEventListener("resize",j);const z=()=>{C=requestAnimationFrame(z),D(),_.update(),d.render(f,p)};return C=requestAnimationFrame(z),()=>{cancelAnimationFrame(C),window.removeEventListener("resize",j),d.domElement.removeEventListener("mousemove",ee),d.domElement.removeEventListener("click",U),_.dispose(),d.dispose(),g.dispose(),u.dispose(),m.dispose(),S.dispose(),l.contains(d.domElement)&&l.removeChild(d.domElement)}},[]),P.jsxs("div",{style:{position:"fixed",inset:0,background:RA,overflow:"hidden"},children:[P.jsx("div",{ref:e,style:{width:"100%",height:"100%"}}),P.jsxs("div",{style:{position:"absolute",top:0,left:0,right:0,padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(to bottom, rgba(3,12,3,0.92) 60%, transparent)",pointerEvents:"none"},children:[P.jsxs("div",{style:{color:Uu,fontSize:"0.72em",letterSpacing:"0.2em",textTransform:"uppercase"},children:[P.jsx("span",{style:{color:nl,textShadow:`0 0 6px ${nl}`},children:"■"})," LINK GRAPH 3D // ",r.nodes," NODES ",r.edges," EDGES"]}),P.jsx("button",{className:"crt-btn",onClick:t,style:{pointerEvents:"all",fontSize:"0.72em"},children:"← BACK"})]}),n==="ok"&&P.jsx("div",{style:{position:"absolute",bottom:18,left:"50%",transform:"translateX(-50%)",color:Uu,fontSize:"0.68em",letterSpacing:"0.2em",textTransform:"uppercase",pointerEvents:"none",whiteSpace:"nowrap"},children:"DRAG TO ROTATE  ·  SCROLL TO ZOOM  ·  CLICK NODE TO OPEN"}),a&&P.jsx("div",{style:{position:"fixed",left:a.x,top:a.y-28,transform:"translateX(-50%)",color:nl,textShadow:`0 0 8px ${nl}`,fontSize:"0.72em",letterSpacing:"0.08em",fontFamily:'"Share Tech Mono", "Courier New", monospace',pointerEvents:"none",whiteSpace:"nowrap",background:"rgba(3,12,3,0.7)",padding:"3px 8px",borderRadius:"2px"},children:a.title}),n==="loading"&&P.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:Uu,fontSize:"1em",letterSpacing:"0.25em",textTransform:"uppercase"},children:["LOADING GRAPH",P.jsx("span",{className:"loading-dots"})]}),n==="error"&&P.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"20px"},children:[P.jsx("div",{style:{color:"#ff4444",letterSpacing:"0.15em",textTransform:"uppercase",fontSize:"0.9em"},children:"GRAPH DATA UNAVAILABLE"}),P.jsx("button",{className:"crt-btn",onClick:t,children:"← RETURN TO MAIN"})]})]})}function bA(){const[t,e]=at.useState("about"),[n,i]=at.useState(""),r=at.useCallback(l=>{i(l),e("results")},[]),s=at.useCallback(()=>{e("home"),i("")},[]),a=at.useCallback(()=>e("about"),[]),o=at.useCallback(()=>e("graph"),[]);return t==="about"?P.jsx(WS,{onSearch:r,onGraph:o}):t==="graph"?P.jsx(CA,{onHome:s}):P.jsxs(P.Fragment,{children:[P.jsx("div",{className:"crt-beam"}),P.jsx("div",{className:"screen",children:t==="home"?P.jsx(HS,{onSearch:r,onAbout:a,onGraph:o}):P.jsx(VS,{query:n,onSearch:r,onHome:s,onAbout:a,onGraph:o})})]})}x0(document.getElementById("root")).render(P.jsx(at.StrictMode,{children:P.jsx(bA,{})}));
