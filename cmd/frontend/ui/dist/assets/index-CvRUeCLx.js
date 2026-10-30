(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var _g={exports:{}},sc={},vg={exports:{}},tt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var eo=Symbol.for("react.element"),Av=Symbol.for("react.portal"),Rv=Symbol.for("react.fragment"),Cv=Symbol.for("react.strict_mode"),bv=Symbol.for("react.profiler"),Pv=Symbol.for("react.provider"),Nv=Symbol.for("react.context"),Dv=Symbol.for("react.forward_ref"),Lv=Symbol.for("react.suspense"),Iv=Symbol.for("react.memo"),Uv=Symbol.for("react.lazy"),$h=Symbol.iterator;function Fv(t){return t===null||typeof t!="object"?null:(t=$h&&t[$h]||t["@@iterator"],typeof t=="function"?t:null)}var xg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},yg=Object.assign,Sg={};function $s(t,e,n){this.props=t,this.context=e,this.refs=Sg,this.updater=n||xg}$s.prototype.isReactComponent={};$s.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};$s.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Mg(){}Mg.prototype=$s.prototype;function Rd(t,e,n){this.props=t,this.context=e,this.refs=Sg,this.updater=n||xg}var Cd=Rd.prototype=new Mg;Cd.constructor=Rd;yg(Cd,$s.prototype);Cd.isPureReactComponent=!0;var Kh=Array.isArray,Eg=Object.prototype.hasOwnProperty,bd={current:null},Tg={key:!0,ref:!0,__self:!0,__source:!0};function wg(t,e,n){var i,r={},s=null,a=null;if(e!=null)for(i in e.ref!==void 0&&(a=e.ref),e.key!==void 0&&(s=""+e.key),e)Eg.call(e,i)&&!Tg.hasOwnProperty(i)&&(r[i]=e[i]);var o=arguments.length-2;if(o===1)r.children=n;else if(1<o){for(var l=Array(o),c=0;c<o;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in o=t.defaultProps,o)r[i]===void 0&&(r[i]=o[i]);return{$$typeof:eo,type:t,key:s,ref:a,props:r,_owner:bd.current}}function Ov(t,e){return{$$typeof:eo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Pd(t){return typeof t=="object"&&t!==null&&t.$$typeof===eo}function kv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Zh=/\/+/g;function bc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?kv(""+t.key):e.toString(36)}function sl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var a=!1;if(t===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(t.$$typeof){case eo:case Av:a=!0}}if(a)return a=t,r=r(a),t=i===""?"."+bc(a,0):i,Kh(r)?(n="",t!=null&&(n=t.replace(Zh,"$&/")+"/"),sl(r,e,n,"",function(c){return c})):r!=null&&(Pd(r)&&(r=Ov(r,n+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(Zh,"$&/")+"/")+t)),e.push(r)),1;if(a=0,i=i===""?".":i+":",Kh(t))for(var o=0;o<t.length;o++){s=t[o];var l=i+bc(s,o);a+=sl(s,e,n,l,r)}else if(l=Fv(t),typeof l=="function")for(t=l.call(t),o=0;!(s=t.next()).done;)s=s.value,l=i+bc(s,o++),a+=sl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return a}function uo(t,e,n){if(t==null)return t;var i=[],r=0;return sl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Bv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var ln={current:null},al={transition:null},zv={ReactCurrentDispatcher:ln,ReactCurrentBatchConfig:al,ReactCurrentOwner:bd};function Ag(){throw Error("act(...) is not supported in production builds of React.")}tt.Children={map:uo,forEach:function(t,e,n){uo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return uo(t,function(){e++}),e},toArray:function(t){return uo(t,function(e){return e})||[]},only:function(t){if(!Pd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};tt.Component=$s;tt.Fragment=Rv;tt.Profiler=bv;tt.PureComponent=Rd;tt.StrictMode=Cv;tt.Suspense=Lv;tt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=zv;tt.act=Ag;tt.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=yg({},t.props),r=t.key,s=t.ref,a=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,a=bd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var o=t.type.defaultProps;for(l in e)Eg.call(e,l)&&!Tg.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&o!==void 0?o[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){o=Array(l);for(var c=0;c<l;c++)o[c]=arguments[c+2];i.children=o}return{$$typeof:eo,type:t.type,key:r,ref:s,props:i,_owner:a}};tt.createContext=function(t){return t={$$typeof:Nv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Pv,_context:t},t.Consumer=t};tt.createElement=wg;tt.createFactory=function(t){var e=wg.bind(null,t);return e.type=t,e};tt.createRef=function(){return{current:null}};tt.forwardRef=function(t){return{$$typeof:Dv,render:t}};tt.isValidElement=Pd;tt.lazy=function(t){return{$$typeof:Uv,_payload:{_status:-1,_result:t},_init:Bv}};tt.memo=function(t,e){return{$$typeof:Iv,type:t,compare:e===void 0?null:e}};tt.startTransition=function(t){var e=al.transition;al.transition={};try{t()}finally{al.transition=e}};tt.unstable_act=Ag;tt.useCallback=function(t,e){return ln.current.useCallback(t,e)};tt.useContext=function(t){return ln.current.useContext(t)};tt.useDebugValue=function(){};tt.useDeferredValue=function(t){return ln.current.useDeferredValue(t)};tt.useEffect=function(t,e){return ln.current.useEffect(t,e)};tt.useId=function(){return ln.current.useId()};tt.useImperativeHandle=function(t,e,n){return ln.current.useImperativeHandle(t,e,n)};tt.useInsertionEffect=function(t,e){return ln.current.useInsertionEffect(t,e)};tt.useLayoutEffect=function(t,e){return ln.current.useLayoutEffect(t,e)};tt.useMemo=function(t,e){return ln.current.useMemo(t,e)};tt.useReducer=function(t,e,n){return ln.current.useReducer(t,e,n)};tt.useRef=function(t){return ln.current.useRef(t)};tt.useState=function(t){return ln.current.useState(t)};tt.useSyncExternalStore=function(t,e,n){return ln.current.useSyncExternalStore(t,e,n)};tt.useTransition=function(){return ln.current.useTransition()};tt.version="18.3.1";vg.exports=tt;var We=vg.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hv=We,Vv=Symbol.for("react.element"),Gv=Symbol.for("react.fragment"),Wv=Object.prototype.hasOwnProperty,jv=Hv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Xv={key:!0,ref:!0,__self:!0,__source:!0};function Rg(t,e,n){var i,r={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(i in e)Wv.call(e,i)&&!Xv.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Vv,type:t,key:s,ref:a,props:r,_owner:jv.current}}sc.Fragment=Gv;sc.jsx=Rg;sc.jsxs=Rg;_g.exports=sc;var b=_g.exports,Cg={exports:{}},An={},bg={exports:{}},Pg={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(F,G){var $=F.length;F.push(G);e:for(;0<$;){var V=$-1>>>1,te=F[V];if(0<r(te,G))F[V]=G,F[$]=te,$=V;else break e}}function n(F){return F.length===0?null:F[0]}function i(F){if(F.length===0)return null;var G=F[0],$=F.pop();if($!==G){F[0]=$;e:for(var V=0,te=F.length,re=te>>>1;V<re;){var Ee=2*(V+1)-1,ue=F[Ee],U=Ee+1,K=F[U];if(0>r(ue,$))U<te&&0>r(K,ue)?(F[V]=K,F[U]=$,V=U):(F[V]=ue,F[Ee]=$,V=Ee);else if(U<te&&0>r(K,$))F[V]=K,F[U]=$,V=U;else break e}}return G}function r(F,G){var $=F.sortIndex-G.sortIndex;return $!==0?$:F.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var a=Date,o=a.now();t.unstable_now=function(){return a.now()-o}}var l=[],c=[],d=1,h=null,f=3,g=!1,v=!1,E=!1,m=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function _(F){for(var G=n(c);G!==null;){if(G.callback===null)i(c);else if(G.startTime<=F)i(c),G.sortIndex=G.expirationTime,e(l,G);else break;G=n(c)}}function S(F){if(E=!1,_(F),!v)if(n(l)!==null)v=!0,W(w);else{var G=n(c);G!==null&&I(S,G.startTime-F)}}function w(F,G){v=!1,E&&(E=!1,u(y),y=-1),g=!0;var $=f;try{for(_(G),h=n(l);h!==null&&(!(h.expirationTime>G)||F&&!P());){var V=h.callback;if(typeof V=="function"){h.callback=null,f=h.priorityLevel;var te=V(h.expirationTime<=G);G=t.unstable_now(),typeof te=="function"?h.callback=te:h===n(l)&&i(l),_(G)}else i(l);h=n(l)}if(h!==null)var re=!0;else{var Ee=n(c);Ee!==null&&I(S,Ee.startTime-G),re=!1}return re}finally{h=null,f=$,g=!1}}var M=!1,R=null,y=-1,C=5,N=-1;function P(){return!(t.unstable_now()-N<C)}function B(){if(R!==null){var F=t.unstable_now();N=F;var G=!0;try{G=R(!0,F)}finally{G?Y():(M=!1,R=null)}}else M=!1}var Y;if(typeof p=="function")Y=function(){p(B)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,O=J.port2;J.port1.onmessage=B,Y=function(){O.postMessage(null)}}else Y=function(){m(B,0)};function W(F){R=F,M||(M=!0,Y())}function I(F,G){y=m(function(){F(t.unstable_now())},G)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(F){F.callback=null},t.unstable_continueExecution=function(){v||g||(v=!0,W(w))},t.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):C=0<F?Math.floor(1e3/F):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(F){switch(f){case 1:case 2:case 3:var G=3;break;default:G=f}var $=f;f=G;try{return F()}finally{f=$}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(F,G){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var $=f;f=F;try{return G()}finally{f=$}},t.unstable_scheduleCallback=function(F,G,$){var V=t.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?V+$:V):$=V,F){case 1:var te=-1;break;case 2:te=250;break;case 5:te=1073741823;break;case 4:te=1e4;break;default:te=5e3}return te=$+te,F={id:d++,callback:G,priorityLevel:F,startTime:$,expirationTime:te,sortIndex:-1},$>V?(F.sortIndex=$,e(c,F),n(l)===null&&F===n(c)&&(E?(u(y),y=-1):E=!0,I(S,$-V))):(F.sortIndex=te,e(l,F),v||g||(v=!0,W(w))),F},t.unstable_shouldYield=P,t.unstable_wrapCallback=function(F){var G=f;return function(){var $=f;f=G;try{return F.apply(this,arguments)}finally{f=$}}}})(Pg);bg.exports=Pg;var Yv=bg.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qv=We,wn=Yv;function ce(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ng=new Set,Ia={};function Yr(t,e){ks(t,e),ks(t+"Capture",e)}function ks(t,e){for(Ia[t]=e,t=0;t<e.length;t++)Ng.add(e[t])}var Ni=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zu=Object.prototype.hasOwnProperty,$v=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Qh={},Jh={};function Kv(t){return zu.call(Jh,t)?!0:zu.call(Qh,t)?!1:$v.test(t)?Jh[t]=!0:(Qh[t]=!0,!1)}function Zv(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Qv(t,e,n,i){if(e===null||typeof e>"u"||Zv(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function cn(t,e,n,i,r,s,a){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=a}var Xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Xt[t]=new cn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Xt[e]=new cn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Xt[t]=new cn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Xt[t]=new cn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Xt[t]=new cn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Xt[t]=new cn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Xt[t]=new cn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Xt[t]=new cn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Xt[t]=new cn(t,5,!1,t.toLowerCase(),null,!1,!1)});var Nd=/[\-:]([a-z])/g;function Dd(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Nd,Dd);Xt[e]=new cn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Nd,Dd);Xt[e]=new cn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Nd,Dd);Xt[e]=new cn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Xt[t]=new cn(t,1,!1,t.toLowerCase(),null,!1,!1)});Xt.xlinkHref=new cn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Xt[t]=new cn(t,1,!1,t.toLowerCase(),null,!0,!0)});function Ld(t,e,n,i){var r=Xt.hasOwnProperty(e)?Xt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Qv(e,n,r,i)&&(n=null),i||r===null?Kv(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var ki=qv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,fo=Symbol.for("react.element"),gs=Symbol.for("react.portal"),_s=Symbol.for("react.fragment"),Id=Symbol.for("react.strict_mode"),Hu=Symbol.for("react.profiler"),Dg=Symbol.for("react.provider"),Lg=Symbol.for("react.context"),Ud=Symbol.for("react.forward_ref"),Vu=Symbol.for("react.suspense"),Gu=Symbol.for("react.suspense_list"),Fd=Symbol.for("react.memo"),Zi=Symbol.for("react.lazy"),Ig=Symbol.for("react.offscreen"),ep=Symbol.iterator;function ea(t){return t===null||typeof t!="object"?null:(t=ep&&t[ep]||t["@@iterator"],typeof t=="function"?t:null)}var wt=Object.assign,Pc;function xa(t){if(Pc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Pc=e&&e[1]||""}return`
`+Pc+t}var Nc=!1;function Dc(t,e){if(!t||Nc)return"";Nc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),a=r.length-1,o=s.length-1;1<=a&&0<=o&&r[a]!==s[o];)o--;for(;1<=a&&0<=o;a--,o--)if(r[a]!==s[o]){if(a!==1||o!==1)do if(a--,o--,0>o||r[a]!==s[o]){var l=`
`+r[a].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=a&&0<=o);break}}}finally{Nc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?xa(t):""}function Jv(t){switch(t.tag){case 5:return xa(t.type);case 16:return xa("Lazy");case 13:return xa("Suspense");case 19:return xa("SuspenseList");case 0:case 2:case 15:return t=Dc(t.type,!1),t;case 11:return t=Dc(t.type.render,!1),t;case 1:return t=Dc(t.type,!0),t;default:return""}}function Wu(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case _s:return"Fragment";case gs:return"Portal";case Hu:return"Profiler";case Id:return"StrictMode";case Vu:return"Suspense";case Gu:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Lg:return(t.displayName||"Context")+".Consumer";case Dg:return(t._context.displayName||"Context")+".Provider";case Ud:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Fd:return e=t.displayName||null,e!==null?e:Wu(t.type)||"Memo";case Zi:e=t._payload,t=t._init;try{return Wu(t(e))}catch{}}return null}function ex(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Wu(e);case 8:return e===Id?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function mr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Ug(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function tx(t){var e=Ug(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(a){i=""+a,s.call(this,a)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(a){i=""+a},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ho(t){t._valueTracker||(t._valueTracker=tx(t))}function Fg(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=Ug(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Tl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function ju(t,e){var n=e.checked;return wt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function tp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=mr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Og(t,e){e=e.checked,e!=null&&Ld(t,"checked",e,!1)}function Xu(t,e){Og(t,e);var n=mr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Yu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Yu(t,e.type,mr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function np(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Yu(t,e,n){(e!=="number"||Tl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var ya=Array.isArray;function bs(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+mr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function qu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ce(91));return wt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function ip(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ce(92));if(ya(n)){if(1<n.length)throw Error(ce(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:mr(n)}}function kg(t,e){var n=mr(e.value),i=mr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function rp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Bg(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function $u(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Bg(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var po,zg=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(po=po||document.createElement("div"),po.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=po.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ua(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var wa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},nx=["Webkit","ms","Moz","O"];Object.keys(wa).forEach(function(t){nx.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),wa[e]=wa[t]})});function Hg(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||wa.hasOwnProperty(t)&&wa[t]?(""+e).trim():e+"px"}function Vg(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Hg(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var ix=wt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Ku(t,e){if(e){if(ix[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ce(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ce(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ce(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ce(62))}}function Zu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Qu=null;function Od(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ju=null,Ps=null,Ns=null;function sp(t){if(t=io(t)){if(typeof Ju!="function")throw Error(ce(280));var e=t.stateNode;e&&(e=uc(e),Ju(t.stateNode,t.type,e))}}function Gg(t){Ps?Ns?Ns.push(t):Ns=[t]:Ps=t}function Wg(){if(Ps){var t=Ps,e=Ns;if(Ns=Ps=null,sp(t),e)for(t=0;t<e.length;t++)sp(e[t])}}function jg(t,e){return t(e)}function Xg(){}var Lc=!1;function Yg(t,e,n){if(Lc)return t(e,n);Lc=!0;try{return jg(t,e,n)}finally{Lc=!1,(Ps!==null||Ns!==null)&&(Xg(),Wg())}}function Fa(t,e){var n=t.stateNode;if(n===null)return null;var i=uc(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ce(231,e,typeof n));return n}var ef=!1;if(Ni)try{var ta={};Object.defineProperty(ta,"passive",{get:function(){ef=!0}}),window.addEventListener("test",ta,ta),window.removeEventListener("test",ta,ta)}catch{ef=!1}function rx(t,e,n,i,r,s,a,o,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(d){this.onError(d)}}var Aa=!1,wl=null,Al=!1,tf=null,sx={onError:function(t){Aa=!0,wl=t}};function ax(t,e,n,i,r,s,a,o,l){Aa=!1,wl=null,rx.apply(sx,arguments)}function ox(t,e,n,i,r,s,a,o,l){if(ax.apply(this,arguments),Aa){if(Aa){var c=wl;Aa=!1,wl=null}else throw Error(ce(198));Al||(Al=!0,tf=c)}}function qr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function qg(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function ap(t){if(qr(t)!==t)throw Error(ce(188))}function lx(t){var e=t.alternate;if(!e){if(e=qr(t),e===null)throw Error(ce(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return ap(r),t;if(s===i)return ap(r),e;s=s.sibling}throw Error(ce(188))}if(n.return!==i.return)n=r,i=s;else{for(var a=!1,o=r.child;o;){if(o===n){a=!0,n=r,i=s;break}if(o===i){a=!0,i=r,n=s;break}o=o.sibling}if(!a){for(o=s.child;o;){if(o===n){a=!0,n=s,i=r;break}if(o===i){a=!0,i=s,n=r;break}o=o.sibling}if(!a)throw Error(ce(189))}}if(n.alternate!==i)throw Error(ce(190))}if(n.tag!==3)throw Error(ce(188));return n.stateNode.current===n?t:e}function $g(t){return t=lx(t),t!==null?Kg(t):null}function Kg(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Kg(t);if(e!==null)return e;t=t.sibling}return null}var Zg=wn.unstable_scheduleCallback,op=wn.unstable_cancelCallback,cx=wn.unstable_shouldYield,ux=wn.unstable_requestPaint,Dt=wn.unstable_now,fx=wn.unstable_getCurrentPriorityLevel,kd=wn.unstable_ImmediatePriority,Qg=wn.unstable_UserBlockingPriority,Rl=wn.unstable_NormalPriority,dx=wn.unstable_LowPriority,Jg=wn.unstable_IdlePriority,ac=null,ci=null;function hx(t){if(ci&&typeof ci.onCommitFiberRoot=="function")try{ci.onCommitFiberRoot(ac,t,void 0,(t.current.flags&128)===128)}catch{}}var $n=Math.clz32?Math.clz32:gx,px=Math.log,mx=Math.LN2;function gx(t){return t>>>=0,t===0?32:31-(px(t)/mx|0)|0}var mo=64,go=4194304;function Sa(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Cl(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,a=n&268435455;if(a!==0){var o=a&~r;o!==0?i=Sa(o):(s&=a,s!==0&&(i=Sa(s)))}else a=n&~r,a!==0?i=Sa(a):s!==0&&(i=Sa(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-$n(e),r=1<<n,i|=t[n],e&=~r;return i}function _x(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vx(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var a=31-$n(s),o=1<<a,l=r[a];l===-1?(!(o&n)||o&i)&&(r[a]=_x(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}}function nf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function e0(){var t=mo;return mo<<=1,!(mo&4194240)&&(mo=64),t}function Ic(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function to(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-$n(e),t[e]=n}function xx(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-$n(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Bd(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-$n(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var ut=0;function t0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var n0,zd,i0,r0,s0,rf=!1,_o=[],ar=null,or=null,lr=null,Oa=new Map,ka=new Map,er=[],yx="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function lp(t,e){switch(t){case"focusin":case"focusout":ar=null;break;case"dragenter":case"dragleave":or=null;break;case"mouseover":case"mouseout":lr=null;break;case"pointerover":case"pointerout":Oa.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":ka.delete(e.pointerId)}}function na(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=io(e),e!==null&&zd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Sx(t,e,n,i,r){switch(e){case"focusin":return ar=na(ar,t,e,n,i,r),!0;case"dragenter":return or=na(or,t,e,n,i,r),!0;case"mouseover":return lr=na(lr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Oa.set(s,na(Oa.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,ka.set(s,na(ka.get(s)||null,t,e,n,i,r)),!0}return!1}function a0(t){var e=Dr(t.target);if(e!==null){var n=qr(e);if(n!==null){if(e=n.tag,e===13){if(e=qg(n),e!==null){t.blockedOn=e,s0(t.priority,function(){i0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ol(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=sf(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Qu=i,n.target.dispatchEvent(i),Qu=null}else return e=io(n),e!==null&&zd(e),t.blockedOn=n,!1;e.shift()}return!0}function cp(t,e,n){ol(t)&&n.delete(e)}function Mx(){rf=!1,ar!==null&&ol(ar)&&(ar=null),or!==null&&ol(or)&&(or=null),lr!==null&&ol(lr)&&(lr=null),Oa.forEach(cp),ka.forEach(cp)}function ia(t,e){t.blockedOn===e&&(t.blockedOn=null,rf||(rf=!0,wn.unstable_scheduleCallback(wn.unstable_NormalPriority,Mx)))}function Ba(t){function e(r){return ia(r,t)}if(0<_o.length){ia(_o[0],t);for(var n=1;n<_o.length;n++){var i=_o[n];i.blockedOn===t&&(i.blockedOn=null)}}for(ar!==null&&ia(ar,t),or!==null&&ia(or,t),lr!==null&&ia(lr,t),Oa.forEach(e),ka.forEach(e),n=0;n<er.length;n++)i=er[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<er.length&&(n=er[0],n.blockedOn===null);)a0(n),n.blockedOn===null&&er.shift()}var Ds=ki.ReactCurrentBatchConfig,bl=!0;function Ex(t,e,n,i){var r=ut,s=Ds.transition;Ds.transition=null;try{ut=1,Hd(t,e,n,i)}finally{ut=r,Ds.transition=s}}function Tx(t,e,n,i){var r=ut,s=Ds.transition;Ds.transition=null;try{ut=4,Hd(t,e,n,i)}finally{ut=r,Ds.transition=s}}function Hd(t,e,n,i){if(bl){var r=sf(t,e,n,i);if(r===null)Wc(t,e,i,Pl,n),lp(t,i);else if(Sx(r,t,e,n,i))i.stopPropagation();else if(lp(t,i),e&4&&-1<yx.indexOf(t)){for(;r!==null;){var s=io(r);if(s!==null&&n0(s),s=sf(t,e,n,i),s===null&&Wc(t,e,i,Pl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Wc(t,e,i,null,n)}}var Pl=null;function sf(t,e,n,i){if(Pl=null,t=Od(i),t=Dr(t),t!==null)if(e=qr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=qg(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Pl=t,null}function o0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(fx()){case kd:return 1;case Qg:return 4;case Rl:case dx:return 16;case Jg:return 536870912;default:return 16}default:return 16}}var ir=null,Vd=null,ll=null;function l0(){if(ll)return ll;var t,e=Vd,n=e.length,i,r="value"in ir?ir.value:ir.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var a=n-t;for(i=1;i<=a&&e[n-i]===r[s-i];i++);return ll=r.slice(t,1<i?1-i:void 0)}function cl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function vo(){return!0}function up(){return!1}function Rn(t){function e(n,i,r,s,a){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?vo:up,this.isPropagationStopped=up,this}return wt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=vo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=vo)},persist:function(){},isPersistent:vo}),e}var Ks={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Gd=Rn(Ks),no=wt({},Ks,{view:0,detail:0}),wx=Rn(no),Uc,Fc,ra,oc=wt({},no,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Wd,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ra&&(ra&&t.type==="mousemove"?(Uc=t.screenX-ra.screenX,Fc=t.screenY-ra.screenY):Fc=Uc=0,ra=t),Uc)},movementY:function(t){return"movementY"in t?t.movementY:Fc}}),fp=Rn(oc),Ax=wt({},oc,{dataTransfer:0}),Rx=Rn(Ax),Cx=wt({},no,{relatedTarget:0}),Oc=Rn(Cx),bx=wt({},Ks,{animationName:0,elapsedTime:0,pseudoElement:0}),Px=Rn(bx),Nx=wt({},Ks,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Dx=Rn(Nx),Lx=wt({},Ks,{data:0}),dp=Rn(Lx),Ix={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ux={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ox(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=Fx[t])?!!e[t]:!1}function Wd(){return Ox}var kx=wt({},no,{key:function(t){if(t.key){var e=Ix[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=cl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ux[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Wd,charCode:function(t){return t.type==="keypress"?cl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?cl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Bx=Rn(kx),zx=wt({},oc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),hp=Rn(zx),Hx=wt({},no,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Wd}),Vx=Rn(Hx),Gx=wt({},Ks,{propertyName:0,elapsedTime:0,pseudoElement:0}),Wx=Rn(Gx),jx=wt({},oc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Xx=Rn(jx),Yx=[9,13,27,32],jd=Ni&&"CompositionEvent"in window,Ra=null;Ni&&"documentMode"in document&&(Ra=document.documentMode);var qx=Ni&&"TextEvent"in window&&!Ra,c0=Ni&&(!jd||Ra&&8<Ra&&11>=Ra),pp=" ",mp=!1;function u0(t,e){switch(t){case"keyup":return Yx.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function f0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var vs=!1;function $x(t,e){switch(t){case"compositionend":return f0(e);case"keypress":return e.which!==32?null:(mp=!0,pp);case"textInput":return t=e.data,t===pp&&mp?null:t;default:return null}}function Kx(t,e){if(vs)return t==="compositionend"||!jd&&u0(t,e)?(t=l0(),ll=Vd=ir=null,vs=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return c0&&e.locale!=="ko"?null:e.data;default:return null}}var Zx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function gp(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Zx[t.type]:e==="textarea"}function d0(t,e,n,i){Gg(i),e=Nl(e,"onChange"),0<e.length&&(n=new Gd("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var Ca=null,za=null;function Qx(t){E0(t,0)}function lc(t){var e=Ss(t);if(Fg(e))return t}function Jx(t,e){if(t==="change")return e}var h0=!1;if(Ni){var kc;if(Ni){var Bc="oninput"in document;if(!Bc){var _p=document.createElement("div");_p.setAttribute("oninput","return;"),Bc=typeof _p.oninput=="function"}kc=Bc}else kc=!1;h0=kc&&(!document.documentMode||9<document.documentMode)}function vp(){Ca&&(Ca.detachEvent("onpropertychange",p0),za=Ca=null)}function p0(t){if(t.propertyName==="value"&&lc(za)){var e=[];d0(e,za,t,Od(t)),Yg(Qx,e)}}function ey(t,e,n){t==="focusin"?(vp(),Ca=e,za=n,Ca.attachEvent("onpropertychange",p0)):t==="focusout"&&vp()}function ty(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return lc(za)}function ny(t,e){if(t==="click")return lc(e)}function iy(t,e){if(t==="input"||t==="change")return lc(e)}function ry(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Zn=typeof Object.is=="function"?Object.is:ry;function Ha(t,e){if(Zn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!zu.call(e,r)||!Zn(t[r],e[r]))return!1}return!0}function xp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function yp(t,e){var n=xp(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=xp(n)}}function m0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?m0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function g0(){for(var t=window,e=Tl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Tl(t.document)}return e}function Xd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function sy(t){var e=g0(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&m0(n.ownerDocument.documentElement,n)){if(i!==null&&Xd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=yp(n,s);var a=yp(n,i);r&&a&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==a.node||t.focusOffset!==a.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(a.node,a.offset)):(e.setEnd(a.node,a.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ay=Ni&&"documentMode"in document&&11>=document.documentMode,xs=null,af=null,ba=null,of=!1;function Sp(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;of||xs==null||xs!==Tl(i)||(i=xs,"selectionStart"in i&&Xd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ba&&Ha(ba,i)||(ba=i,i=Nl(af,"onSelect"),0<i.length&&(e=new Gd("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=xs)))}function xo(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ys={animationend:xo("Animation","AnimationEnd"),animationiteration:xo("Animation","AnimationIteration"),animationstart:xo("Animation","AnimationStart"),transitionend:xo("Transition","TransitionEnd")},zc={},_0={};Ni&&(_0=document.createElement("div").style,"AnimationEvent"in window||(delete ys.animationend.animation,delete ys.animationiteration.animation,delete ys.animationstart.animation),"TransitionEvent"in window||delete ys.transitionend.transition);function cc(t){if(zc[t])return zc[t];if(!ys[t])return t;var e=ys[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in _0)return zc[t]=e[n];return t}var v0=cc("animationend"),x0=cc("animationiteration"),y0=cc("animationstart"),S0=cc("transitionend"),M0=new Map,Mp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function xr(t,e){M0.set(t,e),Yr(e,[t])}for(var Hc=0;Hc<Mp.length;Hc++){var Vc=Mp[Hc],oy=Vc.toLowerCase(),ly=Vc[0].toUpperCase()+Vc.slice(1);xr(oy,"on"+ly)}xr(v0,"onAnimationEnd");xr(x0,"onAnimationIteration");xr(y0,"onAnimationStart");xr("dblclick","onDoubleClick");xr("focusin","onFocus");xr("focusout","onBlur");xr(S0,"onTransitionEnd");ks("onMouseEnter",["mouseout","mouseover"]);ks("onMouseLeave",["mouseout","mouseover"]);ks("onPointerEnter",["pointerout","pointerover"]);ks("onPointerLeave",["pointerout","pointerover"]);Yr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ma="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),cy=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ma));function Ep(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,ox(i,e,void 0,t),t.currentTarget=null}function E0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var a=i.length-1;0<=a;a--){var o=i[a],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&r.isPropagationStopped())break e;Ep(r,o,c),s=l}else for(a=0;a<i.length;a++){if(o=i[a],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&r.isPropagationStopped())break e;Ep(r,o,c),s=l}}}if(Al)throw t=tf,Al=!1,tf=null,t}function xt(t,e){var n=e[df];n===void 0&&(n=e[df]=new Set);var i=t+"__bubble";n.has(i)||(T0(e,t,2,!1),n.add(i))}function Gc(t,e,n){var i=0;e&&(i|=4),T0(n,t,i,e)}var yo="_reactListening"+Math.random().toString(36).slice(2);function Va(t){if(!t[yo]){t[yo]=!0,Ng.forEach(function(n){n!=="selectionchange"&&(cy.has(n)||Gc(n,!1,t),Gc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[yo]||(e[yo]=!0,Gc("selectionchange",!1,e))}}function T0(t,e,n,i){switch(o0(e)){case 1:var r=Ex;break;case 4:r=Tx;break;default:r=Hd}n=r.bind(null,e,n,t),r=void 0,!ef||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Wc(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var a=i.tag;if(a===3||a===4){var o=i.stateNode.containerInfo;if(o===r||o.nodeType===8&&o.parentNode===r)break;if(a===4)for(a=i.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;o!==null;){if(a=Dr(o),a===null)return;if(l=a.tag,l===5||l===6){i=s=a;continue e}o=o.parentNode}}i=i.return}Yg(function(){var c=s,d=Od(n),h=[];e:{var f=M0.get(t);if(f!==void 0){var g=Gd,v=t;switch(t){case"keypress":if(cl(n)===0)break e;case"keydown":case"keyup":g=Bx;break;case"focusin":v="focus",g=Oc;break;case"focusout":v="blur",g=Oc;break;case"beforeblur":case"afterblur":g=Oc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=fp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=Rx;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=Vx;break;case v0:case x0:case y0:g=Px;break;case S0:g=Wx;break;case"scroll":g=wx;break;case"wheel":g=Xx;break;case"copy":case"cut":case"paste":g=Dx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=hp}var E=(e&4)!==0,m=!E&&t==="scroll",u=E?f!==null?f+"Capture":null:f;E=[];for(var p=c,_;p!==null;){_=p;var S=_.stateNode;if(_.tag===5&&S!==null&&(_=S,u!==null&&(S=Fa(p,u),S!=null&&E.push(Ga(p,S,_)))),m)break;p=p.return}0<E.length&&(f=new g(f,v,null,n,d),h.push({event:f,listeners:E}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",g=t==="mouseout"||t==="pointerout",f&&n!==Qu&&(v=n.relatedTarget||n.fromElement)&&(Dr(v)||v[Di]))break e;if((g||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,g?(v=n.relatedTarget||n.toElement,g=c,v=v?Dr(v):null,v!==null&&(m=qr(v),v!==m||v.tag!==5&&v.tag!==6)&&(v=null)):(g=null,v=c),g!==v)){if(E=fp,S="onMouseLeave",u="onMouseEnter",p="mouse",(t==="pointerout"||t==="pointerover")&&(E=hp,S="onPointerLeave",u="onPointerEnter",p="pointer"),m=g==null?f:Ss(g),_=v==null?f:Ss(v),f=new E(S,p+"leave",g,n,d),f.target=m,f.relatedTarget=_,S=null,Dr(d)===c&&(E=new E(u,p+"enter",v,n,d),E.target=_,E.relatedTarget=m,S=E),m=S,g&&v)t:{for(E=g,u=v,p=0,_=E;_;_=Zr(_))p++;for(_=0,S=u;S;S=Zr(S))_++;for(;0<p-_;)E=Zr(E),p--;for(;0<_-p;)u=Zr(u),_--;for(;p--;){if(E===u||u!==null&&E===u.alternate)break t;E=Zr(E),u=Zr(u)}E=null}else E=null;g!==null&&Tp(h,f,g,E,!1),v!==null&&m!==null&&Tp(h,m,v,E,!0)}}e:{if(f=c?Ss(c):window,g=f.nodeName&&f.nodeName.toLowerCase(),g==="select"||g==="input"&&f.type==="file")var w=Jx;else if(gp(f))if(h0)w=iy;else{w=ty;var M=ey}else(g=f.nodeName)&&g.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(w=ny);if(w&&(w=w(t,c))){d0(h,w,n,d);break e}M&&M(t,f,c),t==="focusout"&&(M=f._wrapperState)&&M.controlled&&f.type==="number"&&Yu(f,"number",f.value)}switch(M=c?Ss(c):window,t){case"focusin":(gp(M)||M.contentEditable==="true")&&(xs=M,af=c,ba=null);break;case"focusout":ba=af=xs=null;break;case"mousedown":of=!0;break;case"contextmenu":case"mouseup":case"dragend":of=!1,Sp(h,n,d);break;case"selectionchange":if(ay)break;case"keydown":case"keyup":Sp(h,n,d)}var R;if(jd)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else vs?u0(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(c0&&n.locale!=="ko"&&(vs||y!=="onCompositionStart"?y==="onCompositionEnd"&&vs&&(R=l0()):(ir=d,Vd="value"in ir?ir.value:ir.textContent,vs=!0)),M=Nl(c,y),0<M.length&&(y=new dp(y,t,null,n,d),h.push({event:y,listeners:M}),R?y.data=R:(R=f0(n),R!==null&&(y.data=R)))),(R=qx?$x(t,n):Kx(t,n))&&(c=Nl(c,"onBeforeInput"),0<c.length&&(d=new dp("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:c}),d.data=R))}E0(h,e)})}function Ga(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Nl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Fa(t,n),s!=null&&i.unshift(Ga(t,s,r)),s=Fa(t,e),s!=null&&i.push(Ga(t,s,r))),t=t.return}return i}function Zr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Tp(t,e,n,i,r){for(var s=e._reactName,a=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(l!==null&&l===i)break;o.tag===5&&c!==null&&(o=c,r?(l=Fa(n,s),l!=null&&a.unshift(Ga(n,l,o))):r||(l=Fa(n,s),l!=null&&a.push(Ga(n,l,o)))),n=n.return}a.length!==0&&t.push({event:e,listeners:a})}var uy=/\r\n?/g,fy=/\u0000|\uFFFD/g;function wp(t){return(typeof t=="string"?t:""+t).replace(uy,`
`).replace(fy,"")}function So(t,e,n){if(e=wp(e),wp(t)!==e&&n)throw Error(ce(425))}function Dl(){}var lf=null,cf=null;function uf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ff=typeof setTimeout=="function"?setTimeout:void 0,dy=typeof clearTimeout=="function"?clearTimeout:void 0,Ap=typeof Promise=="function"?Promise:void 0,hy=typeof queueMicrotask=="function"?queueMicrotask:typeof Ap<"u"?function(t){return Ap.resolve(null).then(t).catch(py)}:ff;function py(t){setTimeout(function(){throw t})}function jc(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ba(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ba(e)}function cr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Rp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Zs=Math.random().toString(36).slice(2),si="__reactFiber$"+Zs,Wa="__reactProps$"+Zs,Di="__reactContainer$"+Zs,df="__reactEvents$"+Zs,my="__reactListeners$"+Zs,gy="__reactHandles$"+Zs;function Dr(t){var e=t[si];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Di]||n[si]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Rp(t);t!==null;){if(n=t[si])return n;t=Rp(t)}return e}t=n,n=t.parentNode}return null}function io(t){return t=t[si]||t[Di],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ss(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ce(33))}function uc(t){return t[Wa]||null}var hf=[],Ms=-1;function yr(t){return{current:t}}function yt(t){0>Ms||(t.current=hf[Ms],hf[Ms]=null,Ms--)}function vt(t,e){Ms++,hf[Ms]=t.current,t.current=e}var gr={},nn=yr(gr),hn=yr(!1),Br=gr;function Bs(t,e){var n=t.type.contextTypes;if(!n)return gr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function pn(t){return t=t.childContextTypes,t!=null}function Ll(){yt(hn),yt(nn)}function Cp(t,e,n){if(nn.current!==gr)throw Error(ce(168));vt(nn,e),vt(hn,n)}function w0(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ce(108,ex(t)||"Unknown",r));return wt({},n,i)}function Il(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||gr,Br=nn.current,vt(nn,t),vt(hn,hn.current),!0}function bp(t,e,n){var i=t.stateNode;if(!i)throw Error(ce(169));n?(t=w0(t,e,Br),i.__reactInternalMemoizedMergedChildContext=t,yt(hn),yt(nn),vt(nn,t)):yt(hn),vt(hn,n)}var Ei=null,fc=!1,Xc=!1;function A0(t){Ei===null?Ei=[t]:Ei.push(t)}function _y(t){fc=!0,A0(t)}function Sr(){if(!Xc&&Ei!==null){Xc=!0;var t=0,e=ut;try{var n=Ei;for(ut=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ei=null,fc=!1}catch(r){throw Ei!==null&&(Ei=Ei.slice(t+1)),Zg(kd,Sr),r}finally{ut=e,Xc=!1}}return null}var Es=[],Ts=0,Ul=null,Fl=0,Dn=[],Ln=0,zr=null,wi=1,Ai="";function Cr(t,e){Es[Ts++]=Fl,Es[Ts++]=Ul,Ul=t,Fl=e}function R0(t,e,n){Dn[Ln++]=wi,Dn[Ln++]=Ai,Dn[Ln++]=zr,zr=t;var i=wi;t=Ai;var r=32-$n(i)-1;i&=~(1<<r),n+=1;var s=32-$n(e)+r;if(30<s){var a=r-r%5;s=(i&(1<<a)-1).toString(32),i>>=a,r-=a,wi=1<<32-$n(e)+r|n<<r|i,Ai=s+t}else wi=1<<s|n<<r|i,Ai=t}function Yd(t){t.return!==null&&(Cr(t,1),R0(t,1,0))}function qd(t){for(;t===Ul;)Ul=Es[--Ts],Es[Ts]=null,Fl=Es[--Ts],Es[Ts]=null;for(;t===zr;)zr=Dn[--Ln],Dn[Ln]=null,Ai=Dn[--Ln],Dn[Ln]=null,wi=Dn[--Ln],Dn[Ln]=null}var Tn=null,En=null,St=!1,Yn=null;function C0(t,e){var n=Un(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Pp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Tn=t,En=cr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Tn=t,En=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=zr!==null?{id:wi,overflow:Ai}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Un(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Tn=t,En=null,!0):!1;default:return!1}}function pf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function mf(t){if(St){var e=En;if(e){var n=e;if(!Pp(t,e)){if(pf(t))throw Error(ce(418));e=cr(n.nextSibling);var i=Tn;e&&Pp(t,e)?C0(i,n):(t.flags=t.flags&-4097|2,St=!1,Tn=t)}}else{if(pf(t))throw Error(ce(418));t.flags=t.flags&-4097|2,St=!1,Tn=t}}}function Np(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Tn=t}function Mo(t){if(t!==Tn)return!1;if(!St)return Np(t),St=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!uf(t.type,t.memoizedProps)),e&&(e=En)){if(pf(t))throw b0(),Error(ce(418));for(;e;)C0(t,e),e=cr(e.nextSibling)}if(Np(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ce(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){En=cr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}En=null}}else En=Tn?cr(t.stateNode.nextSibling):null;return!0}function b0(){for(var t=En;t;)t=cr(t.nextSibling)}function zs(){En=Tn=null,St=!1}function $d(t){Yn===null?Yn=[t]:Yn.push(t)}var vy=ki.ReactCurrentBatchConfig;function sa(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ce(309));var i=n.stateNode}if(!i)throw Error(ce(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(a){var o=r.refs;a===null?delete o[s]:o[s]=a},e._stringRef=s,e)}if(typeof t!="string")throw Error(ce(284));if(!n._owner)throw Error(ce(290,t))}return t}function Eo(t,e){throw t=Object.prototype.toString.call(e),Error(ce(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Dp(t){var e=t._init;return e(t._payload)}function P0(t){function e(u,p){if(t){var _=u.deletions;_===null?(u.deletions=[p],u.flags|=16):_.push(p)}}function n(u,p){if(!t)return null;for(;p!==null;)e(u,p),p=p.sibling;return null}function i(u,p){for(u=new Map;p!==null;)p.key!==null?u.set(p.key,p):u.set(p.index,p),p=p.sibling;return u}function r(u,p){return u=hr(u,p),u.index=0,u.sibling=null,u}function s(u,p,_){return u.index=_,t?(_=u.alternate,_!==null?(_=_.index,_<p?(u.flags|=2,p):_):(u.flags|=2,p)):(u.flags|=1048576,p)}function a(u){return t&&u.alternate===null&&(u.flags|=2),u}function o(u,p,_,S){return p===null||p.tag!==6?(p=Jc(_,u.mode,S),p.return=u,p):(p=r(p,_),p.return=u,p)}function l(u,p,_,S){var w=_.type;return w===_s?d(u,p,_.props.children,S,_.key):p!==null&&(p.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Zi&&Dp(w)===p.type)?(S=r(p,_.props),S.ref=sa(u,p,_),S.return=u,S):(S=gl(_.type,_.key,_.props,null,u.mode,S),S.ref=sa(u,p,_),S.return=u,S)}function c(u,p,_,S){return p===null||p.tag!==4||p.stateNode.containerInfo!==_.containerInfo||p.stateNode.implementation!==_.implementation?(p=eu(_,u.mode,S),p.return=u,p):(p=r(p,_.children||[]),p.return=u,p)}function d(u,p,_,S,w){return p===null||p.tag!==7?(p=kr(_,u.mode,S,w),p.return=u,p):(p=r(p,_),p.return=u,p)}function h(u,p,_){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Jc(""+p,u.mode,_),p.return=u,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case fo:return _=gl(p.type,p.key,p.props,null,u.mode,_),_.ref=sa(u,null,p),_.return=u,_;case gs:return p=eu(p,u.mode,_),p.return=u,p;case Zi:var S=p._init;return h(u,S(p._payload),_)}if(ya(p)||ea(p))return p=kr(p,u.mode,_,null),p.return=u,p;Eo(u,p)}return null}function f(u,p,_,S){var w=p!==null?p.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return w!==null?null:o(u,p,""+_,S);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case fo:return _.key===w?l(u,p,_,S):null;case gs:return _.key===w?c(u,p,_,S):null;case Zi:return w=_._init,f(u,p,w(_._payload),S)}if(ya(_)||ea(_))return w!==null?null:d(u,p,_,S,null);Eo(u,_)}return null}function g(u,p,_,S,w){if(typeof S=="string"&&S!==""||typeof S=="number")return u=u.get(_)||null,o(p,u,""+S,w);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case fo:return u=u.get(S.key===null?_:S.key)||null,l(p,u,S,w);case gs:return u=u.get(S.key===null?_:S.key)||null,c(p,u,S,w);case Zi:var M=S._init;return g(u,p,_,M(S._payload),w)}if(ya(S)||ea(S))return u=u.get(_)||null,d(p,u,S,w,null);Eo(p,S)}return null}function v(u,p,_,S){for(var w=null,M=null,R=p,y=p=0,C=null;R!==null&&y<_.length;y++){R.index>y?(C=R,R=null):C=R.sibling;var N=f(u,R,_[y],S);if(N===null){R===null&&(R=C);break}t&&R&&N.alternate===null&&e(u,R),p=s(N,p,y),M===null?w=N:M.sibling=N,M=N,R=C}if(y===_.length)return n(u,R),St&&Cr(u,y),w;if(R===null){for(;y<_.length;y++)R=h(u,_[y],S),R!==null&&(p=s(R,p,y),M===null?w=R:M.sibling=R,M=R);return St&&Cr(u,y),w}for(R=i(u,R);y<_.length;y++)C=g(R,u,y,_[y],S),C!==null&&(t&&C.alternate!==null&&R.delete(C.key===null?y:C.key),p=s(C,p,y),M===null?w=C:M.sibling=C,M=C);return t&&R.forEach(function(P){return e(u,P)}),St&&Cr(u,y),w}function E(u,p,_,S){var w=ea(_);if(typeof w!="function")throw Error(ce(150));if(_=w.call(_),_==null)throw Error(ce(151));for(var M=w=null,R=p,y=p=0,C=null,N=_.next();R!==null&&!N.done;y++,N=_.next()){R.index>y?(C=R,R=null):C=R.sibling;var P=f(u,R,N.value,S);if(P===null){R===null&&(R=C);break}t&&R&&P.alternate===null&&e(u,R),p=s(P,p,y),M===null?w=P:M.sibling=P,M=P,R=C}if(N.done)return n(u,R),St&&Cr(u,y),w;if(R===null){for(;!N.done;y++,N=_.next())N=h(u,N.value,S),N!==null&&(p=s(N,p,y),M===null?w=N:M.sibling=N,M=N);return St&&Cr(u,y),w}for(R=i(u,R);!N.done;y++,N=_.next())N=g(R,u,y,N.value,S),N!==null&&(t&&N.alternate!==null&&R.delete(N.key===null?y:N.key),p=s(N,p,y),M===null?w=N:M.sibling=N,M=N);return t&&R.forEach(function(B){return e(u,B)}),St&&Cr(u,y),w}function m(u,p,_,S){if(typeof _=="object"&&_!==null&&_.type===_s&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case fo:e:{for(var w=_.key,M=p;M!==null;){if(M.key===w){if(w=_.type,w===_s){if(M.tag===7){n(u,M.sibling),p=r(M,_.props.children),p.return=u,u=p;break e}}else if(M.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Zi&&Dp(w)===M.type){n(u,M.sibling),p=r(M,_.props),p.ref=sa(u,M,_),p.return=u,u=p;break e}n(u,M);break}else e(u,M);M=M.sibling}_.type===_s?(p=kr(_.props.children,u.mode,S,_.key),p.return=u,u=p):(S=gl(_.type,_.key,_.props,null,u.mode,S),S.ref=sa(u,p,_),S.return=u,u=S)}return a(u);case gs:e:{for(M=_.key;p!==null;){if(p.key===M)if(p.tag===4&&p.stateNode.containerInfo===_.containerInfo&&p.stateNode.implementation===_.implementation){n(u,p.sibling),p=r(p,_.children||[]),p.return=u,u=p;break e}else{n(u,p);break}else e(u,p);p=p.sibling}p=eu(_,u.mode,S),p.return=u,u=p}return a(u);case Zi:return M=_._init,m(u,p,M(_._payload),S)}if(ya(_))return v(u,p,_,S);if(ea(_))return E(u,p,_,S);Eo(u,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,p!==null&&p.tag===6?(n(u,p.sibling),p=r(p,_),p.return=u,u=p):(n(u,p),p=Jc(_,u.mode,S),p.return=u,u=p),a(u)):n(u,p)}return m}var Hs=P0(!0),N0=P0(!1),Ol=yr(null),kl=null,ws=null,Kd=null;function Zd(){Kd=ws=kl=null}function Qd(t){var e=Ol.current;yt(Ol),t._currentValue=e}function gf(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Ls(t,e){kl=t,Kd=ws=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(dn=!0),t.firstContext=null)}function kn(t){var e=t._currentValue;if(Kd!==t)if(t={context:t,memoizedValue:e,next:null},ws===null){if(kl===null)throw Error(ce(308));ws=t,kl.dependencies={lanes:0,firstContext:t}}else ws=ws.next=t;return e}var Lr=null;function Jd(t){Lr===null?Lr=[t]:Lr.push(t)}function D0(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Jd(e)):(n.next=r.next,r.next=n),e.interleaved=n,Li(t,i)}function Li(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Qi=!1;function eh(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function L0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Ci(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function ur(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,at&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Li(t,n)}return r=i.interleaved,r===null?(e.next=e,Jd(i)):(e.next=r.next,r.next=e),i.interleaved=e,Li(t,n)}function ul(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Bd(t,n)}}function Lp(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Bl(t,e,n,i){var r=t.updateQueue;Qi=!1;var s=r.firstBaseUpdate,a=r.lastBaseUpdate,o=r.shared.pending;if(o!==null){r.shared.pending=null;var l=o,c=l.next;l.next=null,a===null?s=c:a.next=c,a=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==a&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var h=r.baseState;a=0,d=c=l=null,o=s;do{var f=o.lane,g=o.eventTime;if((i&f)===f){d!==null&&(d=d.next={eventTime:g,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var v=t,E=o;switch(f=e,g=n,E.tag){case 1:if(v=E.payload,typeof v=="function"){h=v.call(g,h,f);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=E.payload,f=typeof v=="function"?v.call(g,h,f):v,f==null)break e;h=wt({},h,f);break e;case 2:Qi=!0}}o.callback!==null&&o.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[o]:f.push(o))}else g={eventTime:g,lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=g,l=h):d=d.next=g,a|=f;if(o=o.next,o===null){if(o=r.shared.pending,o===null)break;f=o,o=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(d===null&&(l=h),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do a|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Vr|=a,t.lanes=a,t.memoizedState=h}}function Ip(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ce(191,r));r.call(i)}}}var ro={},ui=yr(ro),ja=yr(ro),Xa=yr(ro);function Ir(t){if(t===ro)throw Error(ce(174));return t}function th(t,e){switch(vt(Xa,e),vt(ja,t),vt(ui,ro),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:$u(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=$u(e,t)}yt(ui),vt(ui,e)}function Vs(){yt(ui),yt(ja),yt(Xa)}function I0(t){Ir(Xa.current);var e=Ir(ui.current),n=$u(e,t.type);e!==n&&(vt(ja,t),vt(ui,n))}function nh(t){ja.current===t&&(yt(ui),yt(ja))}var Et=yr(0);function zl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Yc=[];function ih(){for(var t=0;t<Yc.length;t++)Yc[t]._workInProgressVersionPrimary=null;Yc.length=0}var fl=ki.ReactCurrentDispatcher,qc=ki.ReactCurrentBatchConfig,Hr=0,Tt=null,Ft=null,Ht=null,Hl=!1,Pa=!1,Ya=0,xy=0;function qt(){throw Error(ce(321))}function rh(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Zn(t[n],e[n]))return!1;return!0}function sh(t,e,n,i,r,s){if(Hr=s,Tt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,fl.current=t===null||t.memoizedState===null?Ey:Ty,t=n(i,r),Pa){s=0;do{if(Pa=!1,Ya=0,25<=s)throw Error(ce(301));s+=1,Ht=Ft=null,e.updateQueue=null,fl.current=wy,t=n(i,r)}while(Pa)}if(fl.current=Vl,e=Ft!==null&&Ft.next!==null,Hr=0,Ht=Ft=Tt=null,Hl=!1,e)throw Error(ce(300));return t}function ah(){var t=Ya!==0;return Ya=0,t}function ii(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ht===null?Tt.memoizedState=Ht=t:Ht=Ht.next=t,Ht}function Bn(){if(Ft===null){var t=Tt.alternate;t=t!==null?t.memoizedState:null}else t=Ft.next;var e=Ht===null?Tt.memoizedState:Ht.next;if(e!==null)Ht=e,Ft=t;else{if(t===null)throw Error(ce(310));Ft=t,t={memoizedState:Ft.memoizedState,baseState:Ft.baseState,baseQueue:Ft.baseQueue,queue:Ft.queue,next:null},Ht===null?Tt.memoizedState=Ht=t:Ht=Ht.next=t}return Ht}function qa(t,e){return typeof e=="function"?e(t):e}function $c(t){var e=Bn(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=Ft,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var a=r.next;r.next=s.next,s.next=a}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var o=a=null,l=null,c=s;do{var d=c.lane;if((Hr&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var h={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(o=l=h,a=i):l=l.next=h,Tt.lanes|=d,Vr|=d}c=c.next}while(c!==null&&c!==s);l===null?a=i:l.next=o,Zn(i,e.memoizedState)||(dn=!0),e.memoizedState=i,e.baseState=a,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Tt.lanes|=s,Vr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Kc(t){var e=Bn(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var a=r=r.next;do s=t(s,a.action),a=a.next;while(a!==r);Zn(s,e.memoizedState)||(dn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function U0(){}function F0(t,e){var n=Tt,i=Bn(),r=e(),s=!Zn(i.memoizedState,r);if(s&&(i.memoizedState=r,dn=!0),i=i.queue,oh(B0.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Ht!==null&&Ht.memoizedState.tag&1){if(n.flags|=2048,$a(9,k0.bind(null,n,i,r,e),void 0,null),Vt===null)throw Error(ce(349));Hr&30||O0(n,e,r)}return r}function O0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Tt.updateQueue,e===null?(e={lastEffect:null,stores:null},Tt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function k0(t,e,n,i){e.value=n,e.getSnapshot=i,z0(e)&&H0(t)}function B0(t,e,n){return n(function(){z0(e)&&H0(t)})}function z0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Zn(t,n)}catch{return!0}}function H0(t){var e=Li(t,1);e!==null&&Kn(e,t,1,-1)}function Up(t){var e=ii();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:qa,lastRenderedState:t},e.queue=t,t=t.dispatch=My.bind(null,Tt,t),[e.memoizedState,t]}function $a(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Tt.updateQueue,e===null?(e={lastEffect:null,stores:null},Tt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function V0(){return Bn().memoizedState}function dl(t,e,n,i){var r=ii();Tt.flags|=t,r.memoizedState=$a(1|e,n,void 0,i===void 0?null:i)}function dc(t,e,n,i){var r=Bn();i=i===void 0?null:i;var s=void 0;if(Ft!==null){var a=Ft.memoizedState;if(s=a.destroy,i!==null&&rh(i,a.deps)){r.memoizedState=$a(e,n,s,i);return}}Tt.flags|=t,r.memoizedState=$a(1|e,n,s,i)}function Fp(t,e){return dl(8390656,8,t,e)}function oh(t,e){return dc(2048,8,t,e)}function G0(t,e){return dc(4,2,t,e)}function W0(t,e){return dc(4,4,t,e)}function j0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function X0(t,e,n){return n=n!=null?n.concat([t]):null,dc(4,4,j0.bind(null,e,t),n)}function lh(){}function Y0(t,e){var n=Bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&rh(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function q0(t,e){var n=Bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&rh(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function $0(t,e,n){return Hr&21?(Zn(n,e)||(n=e0(),Tt.lanes|=n,Vr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,dn=!0),t.memoizedState=n)}function yy(t,e){var n=ut;ut=n!==0&&4>n?n:4,t(!0);var i=qc.transition;qc.transition={};try{t(!1),e()}finally{ut=n,qc.transition=i}}function K0(){return Bn().memoizedState}function Sy(t,e,n){var i=dr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},Z0(t))Q0(e,n);else if(n=D0(t,e,n,i),n!==null){var r=on();Kn(n,t,i,r),J0(n,e,i)}}function My(t,e,n){var i=dr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(Z0(t))Q0(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var a=e.lastRenderedState,o=s(a,n);if(r.hasEagerState=!0,r.eagerState=o,Zn(o,a)){var l=e.interleaved;l===null?(r.next=r,Jd(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=D0(t,e,r,i),n!==null&&(r=on(),Kn(n,t,i,r),J0(n,e,i))}}function Z0(t){var e=t.alternate;return t===Tt||e!==null&&e===Tt}function Q0(t,e){Pa=Hl=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function J0(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Bd(t,n)}}var Vl={readContext:kn,useCallback:qt,useContext:qt,useEffect:qt,useImperativeHandle:qt,useInsertionEffect:qt,useLayoutEffect:qt,useMemo:qt,useReducer:qt,useRef:qt,useState:qt,useDebugValue:qt,useDeferredValue:qt,useTransition:qt,useMutableSource:qt,useSyncExternalStore:qt,useId:qt,unstable_isNewReconciler:!1},Ey={readContext:kn,useCallback:function(t,e){return ii().memoizedState=[t,e===void 0?null:e],t},useContext:kn,useEffect:Fp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,dl(4194308,4,j0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return dl(4194308,4,t,e)},useInsertionEffect:function(t,e){return dl(4,2,t,e)},useMemo:function(t,e){var n=ii();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ii();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=Sy.bind(null,Tt,t),[i.memoizedState,t]},useRef:function(t){var e=ii();return t={current:t},e.memoizedState=t},useState:Up,useDebugValue:lh,useDeferredValue:function(t){return ii().memoizedState=t},useTransition:function(){var t=Up(!1),e=t[0];return t=yy.bind(null,t[1]),ii().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Tt,r=ii();if(St){if(n===void 0)throw Error(ce(407));n=n()}else{if(n=e(),Vt===null)throw Error(ce(349));Hr&30||O0(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Fp(B0.bind(null,i,s,t),[t]),i.flags|=2048,$a(9,k0.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ii(),e=Vt.identifierPrefix;if(St){var n=Ai,i=wi;n=(i&~(1<<32-$n(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ya++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=xy++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Ty={readContext:kn,useCallback:Y0,useContext:kn,useEffect:oh,useImperativeHandle:X0,useInsertionEffect:G0,useLayoutEffect:W0,useMemo:q0,useReducer:$c,useRef:V0,useState:function(){return $c(qa)},useDebugValue:lh,useDeferredValue:function(t){var e=Bn();return $0(e,Ft.memoizedState,t)},useTransition:function(){var t=$c(qa)[0],e=Bn().memoizedState;return[t,e]},useMutableSource:U0,useSyncExternalStore:F0,useId:K0,unstable_isNewReconciler:!1},wy={readContext:kn,useCallback:Y0,useContext:kn,useEffect:oh,useImperativeHandle:X0,useInsertionEffect:G0,useLayoutEffect:W0,useMemo:q0,useReducer:Kc,useRef:V0,useState:function(){return Kc(qa)},useDebugValue:lh,useDeferredValue:function(t){var e=Bn();return Ft===null?e.memoizedState=t:$0(e,Ft.memoizedState,t)},useTransition:function(){var t=Kc(qa)[0],e=Bn().memoizedState;return[t,e]},useMutableSource:U0,useSyncExternalStore:F0,useId:K0,unstable_isNewReconciler:!1};function jn(t,e){if(t&&t.defaultProps){e=wt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function _f(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:wt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var hc={isMounted:function(t){return(t=t._reactInternals)?qr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=on(),r=dr(t),s=Ci(i,r);s.payload=e,n!=null&&(s.callback=n),e=ur(t,s,r),e!==null&&(Kn(e,t,r,i),ul(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=on(),r=dr(t),s=Ci(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=ur(t,s,r),e!==null&&(Kn(e,t,r,i),ul(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=on(),i=dr(t),r=Ci(n,i);r.tag=2,e!=null&&(r.callback=e),e=ur(t,r,i),e!==null&&(Kn(e,t,i,n),ul(e,t,i))}};function Op(t,e,n,i,r,s,a){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,a):e.prototype&&e.prototype.isPureReactComponent?!Ha(n,i)||!Ha(r,s):!0}function e_(t,e,n){var i=!1,r=gr,s=e.contextType;return typeof s=="object"&&s!==null?s=kn(s):(r=pn(e)?Br:nn.current,i=e.contextTypes,s=(i=i!=null)?Bs(t,r):gr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=hc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function kp(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&hc.enqueueReplaceState(e,e.state,null)}function vf(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},eh(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=kn(s):(s=pn(e)?Br:nn.current,r.context=Bs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(_f(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&hc.enqueueReplaceState(r,r.state,null),Bl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function Gs(t,e){try{var n="",i=e;do n+=Jv(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Zc(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function xf(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Ay=typeof WeakMap=="function"?WeakMap:Map;function t_(t,e,n){n=Ci(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Wl||(Wl=!0,bf=i),xf(t,e)},n}function n_(t,e,n){n=Ci(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){xf(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){xf(t,e),typeof i!="function"&&(fr===null?fr=new Set([this]):fr.add(this));var a=e.stack;this.componentDidCatch(e.value,{componentStack:a!==null?a:""})}),n}function Bp(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Ay;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=zy.bind(null,t,e,n),e.then(t,t))}function zp(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Hp(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Ci(-1,1),e.tag=2,ur(n,e,1))),n.lanes|=1),t)}var Ry=ki.ReactCurrentOwner,dn=!1;function an(t,e,n,i){e.child=t===null?N0(e,null,n,i):Hs(e,t.child,n,i)}function Vp(t,e,n,i,r){n=n.render;var s=e.ref;return Ls(e,r),i=sh(t,e,n,i,s,r),n=ah(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(St&&n&&Yd(e),e.flags|=1,an(t,e,i,r),e.child)}function Gp(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!gh(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,i_(t,e,s,i,r)):(t=gl(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Ha,n(a,i)&&t.ref===e.ref)return Ii(t,e,r)}return e.flags|=1,t=hr(s,i),t.ref=e.ref,t.return=e,e.child=t}function i_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Ha(s,i)&&t.ref===e.ref)if(dn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(dn=!0);else return e.lanes=t.lanes,Ii(t,e,r)}return yf(t,e,n,i,r)}function r_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},vt(Rs,yn),yn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,vt(Rs,yn),yn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,vt(Rs,yn),yn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,vt(Rs,yn),yn|=i;return an(t,e,r,n),e.child}function s_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function yf(t,e,n,i,r){var s=pn(n)?Br:nn.current;return s=Bs(e,s),Ls(e,r),n=sh(t,e,n,i,s,r),i=ah(),t!==null&&!dn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,Ii(t,e,r)):(St&&i&&Yd(e),e.flags|=1,an(t,e,n,r),e.child)}function Wp(t,e,n,i,r){if(pn(n)){var s=!0;Il(e)}else s=!1;if(Ls(e,r),e.stateNode===null)hl(t,e),e_(e,n,i),vf(e,n,i,r),i=!0;else if(t===null){var a=e.stateNode,o=e.memoizedProps;a.props=o;var l=a.context,c=n.contextType;typeof c=="object"&&c!==null?c=kn(c):(c=pn(n)?Br:nn.current,c=Bs(e,c));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function";h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==i||l!==c)&&kp(e,a,i,c),Qi=!1;var f=e.memoizedState;a.state=f,Bl(e,i,a,r),l=e.memoizedState,o!==i||f!==l||hn.current||Qi?(typeof d=="function"&&(_f(e,n,d,i),l=e.memoizedState),(o=Qi||Op(e,n,o,i,f,l,c))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(e.flags|=4194308)):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),a.props=i,a.state=l,a.context=c,i=o):(typeof a.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{a=e.stateNode,L0(t,e),o=e.memoizedProps,c=e.type===e.elementType?o:jn(e.type,o),a.props=c,h=e.pendingProps,f=a.context,l=n.contextType,typeof l=="object"&&l!==null?l=kn(l):(l=pn(n)?Br:nn.current,l=Bs(e,l));var g=n.getDerivedStateFromProps;(d=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o!==h||f!==l)&&kp(e,a,i,l),Qi=!1,f=e.memoizedState,a.state=f,Bl(e,i,a,r);var v=e.memoizedState;o!==h||f!==v||hn.current||Qi?(typeof g=="function"&&(_f(e,n,g,i),v=e.memoizedState),(c=Qi||Op(e,n,c,i,f,v,l)||!1)?(d||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,v,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,v,l)),typeof a.componentDidUpdate=="function"&&(e.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),a.props=i,a.state=v,a.context=l,i=c):(typeof a.componentDidUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||o===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return Sf(t,e,n,i,s,r)}function Sf(t,e,n,i,r,s){s_(t,e);var a=(e.flags&128)!==0;if(!i&&!a)return r&&bp(e,n,!1),Ii(t,e,s);i=e.stateNode,Ry.current=e;var o=a&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&a?(e.child=Hs(e,t.child,null,s),e.child=Hs(e,null,o,s)):an(t,e,o,s),e.memoizedState=i.state,r&&bp(e,n,!0),e.child}function a_(t){var e=t.stateNode;e.pendingContext?Cp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Cp(t,e.context,!1),th(t,e.containerInfo)}function jp(t,e,n,i,r){return zs(),$d(r),e.flags|=256,an(t,e,n,i),e.child}var Mf={dehydrated:null,treeContext:null,retryLane:0};function Ef(t){return{baseLanes:t,cachePool:null,transitions:null}}function o_(t,e,n){var i=e.pendingProps,r=Et.current,s=!1,a=(e.flags&128)!==0,o;if((o=a)||(o=t!==null&&t.memoizedState===null?!1:(r&2)!==0),o?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),vt(Et,r&1),t===null)return mf(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(a=i.children,t=i.fallback,s?(i=e.mode,s=e.child,a={mode:"hidden",children:a},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=gc(a,i,0,null),t=kr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Ef(n),e.memoizedState=Mf,t):ch(e,a));if(r=t.memoizedState,r!==null&&(o=r.dehydrated,o!==null))return Cy(t,e,a,i,o,r,n);if(s){s=i.fallback,a=e.mode,r=t.child,o=r.sibling;var l={mode:"hidden",children:i.children};return!(a&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=hr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),o!==null?s=hr(o,s):(s=kr(s,a,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,a=t.child.memoizedState,a=a===null?Ef(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=t.childLanes&~n,e.memoizedState=Mf,i}return s=t.child,t=s.sibling,i=hr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function ch(t,e){return e=gc({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function To(t,e,n,i){return i!==null&&$d(i),Hs(e,t.child,null,n),t=ch(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Cy(t,e,n,i,r,s,a){if(n)return e.flags&256?(e.flags&=-257,i=Zc(Error(ce(422))),To(t,e,a,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=gc({mode:"visible",children:i.children},r,0,null),s=kr(s,r,a,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&Hs(e,t.child,null,a),e.child.memoizedState=Ef(a),e.memoizedState=Mf,s);if(!(e.mode&1))return To(t,e,a,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var o=i.dgst;return i=o,s=Error(ce(419)),i=Zc(s,i,void 0),To(t,e,a,i)}if(o=(a&t.childLanes)!==0,dn||o){if(i=Vt,i!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|a)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Li(t,r),Kn(i,t,r,-1))}return mh(),i=Zc(Error(ce(421))),To(t,e,a,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Hy.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,En=cr(r.nextSibling),Tn=e,St=!0,Yn=null,t!==null&&(Dn[Ln++]=wi,Dn[Ln++]=Ai,Dn[Ln++]=zr,wi=t.id,Ai=t.overflow,zr=e),e=ch(e,i.children),e.flags|=4096,e)}function Xp(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),gf(t.return,e,n)}function Qc(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function l_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(an(t,e,i.children,n),i=Et.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Xp(t,n,e);else if(t.tag===19)Xp(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(vt(Et,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&zl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Qc(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&zl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Qc(e,!0,n,null,s);break;case"together":Qc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function hl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ii(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Vr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ce(153));if(e.child!==null){for(t=e.child,n=hr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=hr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function by(t,e,n){switch(e.tag){case 3:a_(e),zs();break;case 5:I0(e);break;case 1:pn(e.type)&&Il(e);break;case 4:th(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;vt(Ol,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(vt(Et,Et.current&1),e.flags|=128,null):n&e.child.childLanes?o_(t,e,n):(vt(Et,Et.current&1),t=Ii(t,e,n),t!==null?t.sibling:null);vt(Et,Et.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return l_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),vt(Et,Et.current),i)break;return null;case 22:case 23:return e.lanes=0,r_(t,e,n)}return Ii(t,e,n)}var c_,Tf,u_,f_;c_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Tf=function(){};u_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Ir(ui.current);var s=null;switch(n){case"input":r=ju(t,r),i=ju(t,i),s=[];break;case"select":r=wt({},r,{value:void 0}),i=wt({},i,{value:void 0}),s=[];break;case"textarea":r=qu(t,r),i=qu(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Dl)}Ku(n,i);var a;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var o=r[c];for(a in o)o.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Ia.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(o=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==o&&(l!=null||o!=null))if(c==="style")if(o){for(a in o)!o.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in l)l.hasOwnProperty(a)&&o[a]!==l[a]&&(n||(n={}),n[a]=l[a])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,o=o?o.__html:void 0,l!=null&&o!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Ia.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&xt("scroll",t),s||o===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};f_=function(t,e,n,i){n!==i&&(e.flags|=4)};function aa(t,e){if(!St)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function $t(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Py(t,e,n){var i=e.pendingProps;switch(qd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return $t(e),null;case 1:return pn(e.type)&&Ll(),$t(e),null;case 3:return i=e.stateNode,Vs(),yt(hn),yt(nn),ih(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(Mo(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Yn!==null&&(Df(Yn),Yn=null))),Tf(t,e),$t(e),null;case 5:nh(e);var r=Ir(Xa.current);if(n=e.type,t!==null&&e.stateNode!=null)u_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ce(166));return $t(e),null}if(t=Ir(ui.current),Mo(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[si]=e,i[Wa]=s,t=(e.mode&1)!==0,n){case"dialog":xt("cancel",i),xt("close",i);break;case"iframe":case"object":case"embed":xt("load",i);break;case"video":case"audio":for(r=0;r<Ma.length;r++)xt(Ma[r],i);break;case"source":xt("error",i);break;case"img":case"image":case"link":xt("error",i),xt("load",i);break;case"details":xt("toggle",i);break;case"input":tp(i,s),xt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},xt("invalid",i);break;case"textarea":ip(i,s),xt("invalid",i)}Ku(n,s),r=null;for(var a in s)if(s.hasOwnProperty(a)){var o=s[a];a==="children"?typeof o=="string"?i.textContent!==o&&(s.suppressHydrationWarning!==!0&&So(i.textContent,o,t),r=["children",o]):typeof o=="number"&&i.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&So(i.textContent,o,t),r=["children",""+o]):Ia.hasOwnProperty(a)&&o!=null&&a==="onScroll"&&xt("scroll",i)}switch(n){case"input":ho(i),np(i,s,!0);break;case"textarea":ho(i),rp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Dl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Bg(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=a.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=a.createElement(n,{is:i.is}):(t=a.createElement(n),n==="select"&&(a=t,i.multiple?a.multiple=!0:i.size&&(a.size=i.size))):t=a.createElementNS(t,n),t[si]=e,t[Wa]=i,c_(t,e,!1,!1),e.stateNode=t;e:{switch(a=Zu(n,i),n){case"dialog":xt("cancel",t),xt("close",t),r=i;break;case"iframe":case"object":case"embed":xt("load",t),r=i;break;case"video":case"audio":for(r=0;r<Ma.length;r++)xt(Ma[r],t);r=i;break;case"source":xt("error",t),r=i;break;case"img":case"image":case"link":xt("error",t),xt("load",t),r=i;break;case"details":xt("toggle",t),r=i;break;case"input":tp(t,i),r=ju(t,i),xt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=wt({},i,{value:void 0}),xt("invalid",t);break;case"textarea":ip(t,i),r=qu(t,i),xt("invalid",t);break;default:r=i}Ku(n,r),o=r;for(s in o)if(o.hasOwnProperty(s)){var l=o[s];s==="style"?Vg(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&zg(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Ua(t,l):typeof l=="number"&&Ua(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ia.hasOwnProperty(s)?l!=null&&s==="onScroll"&&xt("scroll",t):l!=null&&Ld(t,s,l,a))}switch(n){case"input":ho(t),np(t,i,!1);break;case"textarea":ho(t),rp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+mr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?bs(t,!!i.multiple,s,!1):i.defaultValue!=null&&bs(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Dl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return $t(e),null;case 6:if(t&&e.stateNode!=null)f_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ce(166));if(n=Ir(Xa.current),Ir(ui.current),Mo(e)){if(i=e.stateNode,n=e.memoizedProps,i[si]=e,(s=i.nodeValue!==n)&&(t=Tn,t!==null))switch(t.tag){case 3:So(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&So(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[si]=e,e.stateNode=i}return $t(e),null;case 13:if(yt(Et),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(St&&En!==null&&e.mode&1&&!(e.flags&128))b0(),zs(),e.flags|=98560,s=!1;else if(s=Mo(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ce(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ce(317));s[si]=e}else zs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;$t(e),s=!1}else Yn!==null&&(Df(Yn),Yn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||Et.current&1?Ot===0&&(Ot=3):mh())),e.updateQueue!==null&&(e.flags|=4),$t(e),null);case 4:return Vs(),Tf(t,e),t===null&&Va(e.stateNode.containerInfo),$t(e),null;case 10:return Qd(e.type._context),$t(e),null;case 17:return pn(e.type)&&Ll(),$t(e),null;case 19:if(yt(Et),s=e.memoizedState,s===null)return $t(e),null;if(i=(e.flags&128)!==0,a=s.rendering,a===null)if(i)aa(s,!1);else{if(Ot!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(a=zl(t),a!==null){for(e.flags|=128,aa(s,!1),i=a.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,t=a.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return vt(Et,Et.current&1|2),e.child}t=t.sibling}s.tail!==null&&Dt()>Ws&&(e.flags|=128,i=!0,aa(s,!1),e.lanes=4194304)}else{if(!i)if(t=zl(a),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),aa(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!St)return $t(e),null}else 2*Dt()-s.renderingStartTime>Ws&&n!==1073741824&&(e.flags|=128,i=!0,aa(s,!1),e.lanes=4194304);s.isBackwards?(a.sibling=e.child,e.child=a):(n=s.last,n!==null?n.sibling=a:e.child=a,s.last=a)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Dt(),e.sibling=null,n=Et.current,vt(Et,i?n&1|2:n&1),e):($t(e),null);case 22:case 23:return ph(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?yn&1073741824&&($t(e),e.subtreeFlags&6&&(e.flags|=8192)):$t(e),null;case 24:return null;case 25:return null}throw Error(ce(156,e.tag))}function Ny(t,e){switch(qd(e),e.tag){case 1:return pn(e.type)&&Ll(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Vs(),yt(hn),yt(nn),ih(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return nh(e),null;case 13:if(yt(Et),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ce(340));zs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return yt(Et),null;case 4:return Vs(),null;case 10:return Qd(e.type._context),null;case 22:case 23:return ph(),null;case 24:return null;default:return null}}var wo=!1,Qt=!1,Dy=typeof WeakSet=="function"?WeakSet:Set,Ne=null;function As(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Rt(t,e,i)}else n.current=null}function wf(t,e,n){try{n()}catch(i){Rt(t,e,i)}}var Yp=!1;function Ly(t,e){if(lf=bl,t=g0(),Xd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,o=-1,l=-1,c=0,d=0,h=t,f=null;t:for(;;){for(var g;h!==n||r!==0&&h.nodeType!==3||(o=a+r),h!==s||i!==0&&h.nodeType!==3||(l=a+i),h.nodeType===3&&(a+=h.nodeValue.length),(g=h.firstChild)!==null;)f=h,h=g;for(;;){if(h===t)break t;if(f===n&&++c===r&&(o=a),f===s&&++d===i&&(l=a),(g=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=g}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(cf={focusedElem:t,selectionRange:n},bl=!1,Ne=e;Ne!==null;)if(e=Ne,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Ne=t;else for(;Ne!==null;){e=Ne;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var E=v.memoizedProps,m=v.memoizedState,u=e.stateNode,p=u.getSnapshotBeforeUpdate(e.elementType===e.type?E:jn(e.type,E),m);u.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ce(163))}}catch(S){Rt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,Ne=t;break}Ne=e.return}return v=Yp,Yp=!1,v}function Na(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&wf(e,n,s)}r=r.next}while(r!==i)}}function pc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function Af(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function d_(t){var e=t.alternate;e!==null&&(t.alternate=null,d_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[si],delete e[Wa],delete e[df],delete e[my],delete e[gy])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function h_(t){return t.tag===5||t.tag===3||t.tag===4}function qp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||h_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Rf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Dl));else if(i!==4&&(t=t.child,t!==null))for(Rf(t,e,n),t=t.sibling;t!==null;)Rf(t,e,n),t=t.sibling}function Cf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Cf(t,e,n),t=t.sibling;t!==null;)Cf(t,e,n),t=t.sibling}var Gt=null,Xn=!1;function Vi(t,e,n){for(n=n.child;n!==null;)p_(t,e,n),n=n.sibling}function p_(t,e,n){if(ci&&typeof ci.onCommitFiberUnmount=="function")try{ci.onCommitFiberUnmount(ac,n)}catch{}switch(n.tag){case 5:Qt||As(n,e);case 6:var i=Gt,r=Xn;Gt=null,Vi(t,e,n),Gt=i,Xn=r,Gt!==null&&(Xn?(t=Gt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Gt.removeChild(n.stateNode));break;case 18:Gt!==null&&(Xn?(t=Gt,n=n.stateNode,t.nodeType===8?jc(t.parentNode,n):t.nodeType===1&&jc(t,n),Ba(t)):jc(Gt,n.stateNode));break;case 4:i=Gt,r=Xn,Gt=n.stateNode.containerInfo,Xn=!0,Vi(t,e,n),Gt=i,Xn=r;break;case 0:case 11:case 14:case 15:if(!Qt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&wf(n,e,a),r=r.next}while(r!==i)}Vi(t,e,n);break;case 1:if(!Qt&&(As(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(o){Rt(n,e,o)}Vi(t,e,n);break;case 21:Vi(t,e,n);break;case 22:n.mode&1?(Qt=(i=Qt)||n.memoizedState!==null,Vi(t,e,n),Qt=i):Vi(t,e,n);break;default:Vi(t,e,n)}}function $p(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Dy),e.forEach(function(i){var r=Vy.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Hn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,a=e,o=a;e:for(;o!==null;){switch(o.tag){case 5:Gt=o.stateNode,Xn=!1;break e;case 3:Gt=o.stateNode.containerInfo,Xn=!0;break e;case 4:Gt=o.stateNode.containerInfo,Xn=!0;break e}o=o.return}if(Gt===null)throw Error(ce(160));p_(s,a,r),Gt=null,Xn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Rt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)m_(e,t),e=e.sibling}function m_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Hn(e,t),ei(t),i&4){try{Na(3,t,t.return),pc(3,t)}catch(E){Rt(t,t.return,E)}try{Na(5,t,t.return)}catch(E){Rt(t,t.return,E)}}break;case 1:Hn(e,t),ei(t),i&512&&n!==null&&As(n,n.return);break;case 5:if(Hn(e,t),ei(t),i&512&&n!==null&&As(n,n.return),t.flags&32){var r=t.stateNode;try{Ua(r,"")}catch(E){Rt(t,t.return,E)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,a=n!==null?n.memoizedProps:s,o=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Og(r,s),Zu(o,a);var c=Zu(o,s);for(a=0;a<l.length;a+=2){var d=l[a],h=l[a+1];d==="style"?Vg(r,h):d==="dangerouslySetInnerHTML"?zg(r,h):d==="children"?Ua(r,h):Ld(r,d,h,c)}switch(o){case"input":Xu(r,s);break;case"textarea":kg(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var g=s.value;g!=null?bs(r,!!s.multiple,g,!1):f!==!!s.multiple&&(s.defaultValue!=null?bs(r,!!s.multiple,s.defaultValue,!0):bs(r,!!s.multiple,s.multiple?[]:"",!1))}r[Wa]=s}catch(E){Rt(t,t.return,E)}}break;case 6:if(Hn(e,t),ei(t),i&4){if(t.stateNode===null)throw Error(ce(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(E){Rt(t,t.return,E)}}break;case 3:if(Hn(e,t),ei(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ba(e.containerInfo)}catch(E){Rt(t,t.return,E)}break;case 4:Hn(e,t),ei(t);break;case 13:Hn(e,t),ei(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(dh=Dt())),i&4&&$p(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(Qt=(c=Qt)||d,Hn(e,t),Qt=c):Hn(e,t),ei(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!d&&t.mode&1)for(Ne=t,d=t.child;d!==null;){for(h=Ne=d;Ne!==null;){switch(f=Ne,g=f.child,f.tag){case 0:case 11:case 14:case 15:Na(4,f,f.return);break;case 1:As(f,f.return);var v=f.stateNode;if(typeof v.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(E){Rt(i,n,E)}}break;case 5:As(f,f.return);break;case 22:if(f.memoizedState!==null){Zp(h);continue}}g!==null?(g.return=f,Ne=g):Zp(h)}d=d.sibling}e:for(d=null,h=t;;){if(h.tag===5){if(d===null){d=h;try{r=h.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=h.stateNode,l=h.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,o.style.display=Hg("display",a))}catch(E){Rt(t,t.return,E)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(E){Rt(t,t.return,E)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:Hn(e,t),ei(t),i&4&&$p(t);break;case 21:break;default:Hn(e,t),ei(t)}}function ei(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(h_(n)){var i=n;break e}n=n.return}throw Error(ce(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Ua(r,""),i.flags&=-33);var s=qp(t);Cf(t,s,r);break;case 3:case 4:var a=i.stateNode.containerInfo,o=qp(t);Rf(t,o,a);break;default:throw Error(ce(161))}}catch(l){Rt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Iy(t,e,n){Ne=t,g_(t)}function g_(t,e,n){for(var i=(t.mode&1)!==0;Ne!==null;){var r=Ne,s=r.child;if(r.tag===22&&i){var a=r.memoizedState!==null||wo;if(!a){var o=r.alternate,l=o!==null&&o.memoizedState!==null||Qt;o=wo;var c=Qt;if(wo=a,(Qt=l)&&!c)for(Ne=r;Ne!==null;)a=Ne,l=a.child,a.tag===22&&a.memoizedState!==null?Qp(r):l!==null?(l.return=a,Ne=l):Qp(r);for(;s!==null;)Ne=s,g_(s),s=s.sibling;Ne=r,wo=o,Qt=c}Kp(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Ne=s):Kp(t)}}function Kp(t){for(;Ne!==null;){var e=Ne;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Qt||pc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Qt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:jn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Ip(e,s,i);break;case 3:var a=e.updateQueue;if(a!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Ip(e,a,n)}break;case 5:var o=e.stateNode;if(n===null&&e.flags&4){n=o;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&Ba(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ce(163))}Qt||e.flags&512&&Af(e)}catch(f){Rt(e,e.return,f)}}if(e===t){Ne=null;break}if(n=e.sibling,n!==null){n.return=e.return,Ne=n;break}Ne=e.return}}function Zp(t){for(;Ne!==null;){var e=Ne;if(e===t){Ne=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Ne=n;break}Ne=e.return}}function Qp(t){for(;Ne!==null;){var e=Ne;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{pc(4,e)}catch(l){Rt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Rt(e,r,l)}}var s=e.return;try{Af(e)}catch(l){Rt(e,s,l)}break;case 5:var a=e.return;try{Af(e)}catch(l){Rt(e,a,l)}}}catch(l){Rt(e,e.return,l)}if(e===t){Ne=null;break}var o=e.sibling;if(o!==null){o.return=e.return,Ne=o;break}Ne=e.return}}var Uy=Math.ceil,Gl=ki.ReactCurrentDispatcher,uh=ki.ReactCurrentOwner,Fn=ki.ReactCurrentBatchConfig,at=0,Vt=null,It=null,jt=0,yn=0,Rs=yr(0),Ot=0,Ka=null,Vr=0,mc=0,fh=0,Da=null,fn=null,dh=0,Ws=1/0,Mi=null,Wl=!1,bf=null,fr=null,Ao=!1,rr=null,jl=0,La=0,Pf=null,pl=-1,ml=0;function on(){return at&6?Dt():pl!==-1?pl:pl=Dt()}function dr(t){return t.mode&1?at&2&&jt!==0?jt&-jt:vy.transition!==null?(ml===0&&(ml=e0()),ml):(t=ut,t!==0||(t=window.event,t=t===void 0?16:o0(t.type)),t):1}function Kn(t,e,n,i){if(50<La)throw La=0,Pf=null,Error(ce(185));to(t,n,i),(!(at&2)||t!==Vt)&&(t===Vt&&(!(at&2)&&(mc|=n),Ot===4&&tr(t,jt)),mn(t,i),n===1&&at===0&&!(e.mode&1)&&(Ws=Dt()+500,fc&&Sr()))}function mn(t,e){var n=t.callbackNode;vx(t,e);var i=Cl(t,t===Vt?jt:0);if(i===0)n!==null&&op(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&op(n),e===1)t.tag===0?_y(Jp.bind(null,t)):A0(Jp.bind(null,t)),hy(function(){!(at&6)&&Sr()}),n=null;else{switch(t0(i)){case 1:n=kd;break;case 4:n=Qg;break;case 16:n=Rl;break;case 536870912:n=Jg;break;default:n=Rl}n=T_(n,__.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function __(t,e){if(pl=-1,ml=0,at&6)throw Error(ce(327));var n=t.callbackNode;if(Is()&&t.callbackNode!==n)return null;var i=Cl(t,t===Vt?jt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Xl(t,i);else{e=i;var r=at;at|=2;var s=x_();(Vt!==t||jt!==e)&&(Mi=null,Ws=Dt()+500,Or(t,e));do try{ky();break}catch(o){v_(t,o)}while(!0);Zd(),Gl.current=s,at=r,It!==null?e=0:(Vt=null,jt=0,e=Ot)}if(e!==0){if(e===2&&(r=nf(t),r!==0&&(i=r,e=Nf(t,r))),e===1)throw n=Ka,Or(t,0),tr(t,i),mn(t,Dt()),n;if(e===6)tr(t,i);else{if(r=t.current.alternate,!(i&30)&&!Fy(r)&&(e=Xl(t,i),e===2&&(s=nf(t),s!==0&&(i=s,e=Nf(t,s))),e===1))throw n=Ka,Or(t,0),tr(t,i),mn(t,Dt()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ce(345));case 2:br(t,fn,Mi);break;case 3:if(tr(t,i),(i&130023424)===i&&(e=dh+500-Dt(),10<e)){if(Cl(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){on(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=ff(br.bind(null,t,fn,Mi),e);break}br(t,fn,Mi);break;case 4:if(tr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var a=31-$n(i);s=1<<a,a=e[a],a>r&&(r=a),i&=~s}if(i=r,i=Dt()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Uy(i/1960))-i,10<i){t.timeoutHandle=ff(br.bind(null,t,fn,Mi),i);break}br(t,fn,Mi);break;case 5:br(t,fn,Mi);break;default:throw Error(ce(329))}}}return mn(t,Dt()),t.callbackNode===n?__.bind(null,t):null}function Nf(t,e){var n=Da;return t.current.memoizedState.isDehydrated&&(Or(t,e).flags|=256),t=Xl(t,e),t!==2&&(e=fn,fn=n,e!==null&&Df(e)),t}function Df(t){fn===null?fn=t:fn.push.apply(fn,t)}function Fy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Zn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function tr(t,e){for(e&=~fh,e&=~mc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-$n(e),i=1<<n;t[n]=-1,e&=~i}}function Jp(t){if(at&6)throw Error(ce(327));Is();var e=Cl(t,0);if(!(e&1))return mn(t,Dt()),null;var n=Xl(t,e);if(t.tag!==0&&n===2){var i=nf(t);i!==0&&(e=i,n=Nf(t,i))}if(n===1)throw n=Ka,Or(t,0),tr(t,e),mn(t,Dt()),n;if(n===6)throw Error(ce(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,br(t,fn,Mi),mn(t,Dt()),null}function hh(t,e){var n=at;at|=1;try{return t(e)}finally{at=n,at===0&&(Ws=Dt()+500,fc&&Sr())}}function Gr(t){rr!==null&&rr.tag===0&&!(at&6)&&Is();var e=at;at|=1;var n=Fn.transition,i=ut;try{if(Fn.transition=null,ut=1,t)return t()}finally{ut=i,Fn.transition=n,at=e,!(at&6)&&Sr()}}function ph(){yn=Rs.current,yt(Rs)}function Or(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,dy(n)),It!==null)for(n=It.return;n!==null;){var i=n;switch(qd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Ll();break;case 3:Vs(),yt(hn),yt(nn),ih();break;case 5:nh(i);break;case 4:Vs();break;case 13:yt(Et);break;case 19:yt(Et);break;case 10:Qd(i.type._context);break;case 22:case 23:ph()}n=n.return}if(Vt=t,It=t=hr(t.current,null),jt=yn=e,Ot=0,Ka=null,fh=mc=Vr=0,fn=Da=null,Lr!==null){for(e=0;e<Lr.length;e++)if(n=Lr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var a=s.next;s.next=r,i.next=a}n.pending=i}Lr=null}return t}function v_(t,e){do{var n=It;try{if(Zd(),fl.current=Vl,Hl){for(var i=Tt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Hl=!1}if(Hr=0,Ht=Ft=Tt=null,Pa=!1,Ya=0,uh.current=null,n===null||n.return===null){Ot=1,Ka=e,It=null;break}e:{var s=t,a=n.return,o=n,l=e;if(e=jt,o.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=o,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var g=zp(a);if(g!==null){g.flags&=-257,Hp(g,a,o,s,e),g.mode&1&&Bp(s,c,e),e=g,l=c;var v=e.updateQueue;if(v===null){var E=new Set;E.add(l),e.updateQueue=E}else v.add(l);break e}else{if(!(e&1)){Bp(s,c,e),mh();break e}l=Error(ce(426))}}else if(St&&o.mode&1){var m=zp(a);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Hp(m,a,o,s,e),$d(Gs(l,o));break e}}s=l=Gs(l,o),Ot!==4&&(Ot=2),Da===null?Da=[s]:Da.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var u=t_(s,l,e);Lp(s,u);break e;case 1:o=l;var p=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof p.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(fr===null||!fr.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=n_(s,o,e);Lp(s,S);break e}}s=s.return}while(s!==null)}S_(n)}catch(w){e=w,It===n&&n!==null&&(It=n=n.return);continue}break}while(!0)}function x_(){var t=Gl.current;return Gl.current=Vl,t===null?Vl:t}function mh(){(Ot===0||Ot===3||Ot===2)&&(Ot=4),Vt===null||!(Vr&268435455)&&!(mc&268435455)||tr(Vt,jt)}function Xl(t,e){var n=at;at|=2;var i=x_();(Vt!==t||jt!==e)&&(Mi=null,Or(t,e));do try{Oy();break}catch(r){v_(t,r)}while(!0);if(Zd(),at=n,Gl.current=i,It!==null)throw Error(ce(261));return Vt=null,jt=0,Ot}function Oy(){for(;It!==null;)y_(It)}function ky(){for(;It!==null&&!cx();)y_(It)}function y_(t){var e=E_(t.alternate,t,yn);t.memoizedProps=t.pendingProps,e===null?S_(t):It=e,uh.current=null}function S_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Ny(n,e),n!==null){n.flags&=32767,It=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ot=6,It=null;return}}else if(n=Py(n,e,yn),n!==null){It=n;return}if(e=e.sibling,e!==null){It=e;return}It=e=t}while(e!==null);Ot===0&&(Ot=5)}function br(t,e,n){var i=ut,r=Fn.transition;try{Fn.transition=null,ut=1,By(t,e,n,i)}finally{Fn.transition=r,ut=i}return null}function By(t,e,n,i){do Is();while(rr!==null);if(at&6)throw Error(ce(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ce(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(xx(t,s),t===Vt&&(It=Vt=null,jt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ao||(Ao=!0,T_(Rl,function(){return Is(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Fn.transition,Fn.transition=null;var a=ut;ut=1;var o=at;at|=4,uh.current=null,Ly(t,n),m_(n,t),sy(cf),bl=!!lf,cf=lf=null,t.current=n,Iy(n),ux(),at=o,ut=a,Fn.transition=s}else t.current=n;if(Ao&&(Ao=!1,rr=t,jl=r),s=t.pendingLanes,s===0&&(fr=null),hx(n.stateNode),mn(t,Dt()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Wl)throw Wl=!1,t=bf,bf=null,t;return jl&1&&t.tag!==0&&Is(),s=t.pendingLanes,s&1?t===Pf?La++:(La=0,Pf=t):La=0,Sr(),null}function Is(){if(rr!==null){var t=t0(jl),e=Fn.transition,n=ut;try{if(Fn.transition=null,ut=16>t?16:t,rr===null)var i=!1;else{if(t=rr,rr=null,jl=0,at&6)throw Error(ce(331));var r=at;for(at|=4,Ne=t.current;Ne!==null;){var s=Ne,a=s.child;if(Ne.flags&16){var o=s.deletions;if(o!==null){for(var l=0;l<o.length;l++){var c=o[l];for(Ne=c;Ne!==null;){var d=Ne;switch(d.tag){case 0:case 11:case 15:Na(8,d,s)}var h=d.child;if(h!==null)h.return=d,Ne=h;else for(;Ne!==null;){d=Ne;var f=d.sibling,g=d.return;if(d_(d),d===c){Ne=null;break}if(f!==null){f.return=g,Ne=f;break}Ne=g}}}var v=s.alternate;if(v!==null){var E=v.child;if(E!==null){v.child=null;do{var m=E.sibling;E.sibling=null,E=m}while(E!==null)}}Ne=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,Ne=a;else e:for(;Ne!==null;){if(s=Ne,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Na(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,Ne=u;break e}Ne=s.return}}var p=t.current;for(Ne=p;Ne!==null;){a=Ne;var _=a.child;if(a.subtreeFlags&2064&&_!==null)_.return=a,Ne=_;else e:for(a=p;Ne!==null;){if(o=Ne,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:pc(9,o)}}catch(w){Rt(o,o.return,w)}if(o===a){Ne=null;break e}var S=o.sibling;if(S!==null){S.return=o.return,Ne=S;break e}Ne=o.return}}if(at=r,Sr(),ci&&typeof ci.onPostCommitFiberRoot=="function")try{ci.onPostCommitFiberRoot(ac,t)}catch{}i=!0}return i}finally{ut=n,Fn.transition=e}}return!1}function em(t,e,n){e=Gs(n,e),e=t_(t,e,1),t=ur(t,e,1),e=on(),t!==null&&(to(t,1,e),mn(t,e))}function Rt(t,e,n){if(t.tag===3)em(t,t,n);else for(;e!==null;){if(e.tag===3){em(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(fr===null||!fr.has(i))){t=Gs(n,t),t=n_(e,t,1),e=ur(e,t,1),t=on(),e!==null&&(to(e,1,t),mn(e,t));break}}e=e.return}}function zy(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=on(),t.pingedLanes|=t.suspendedLanes&n,Vt===t&&(jt&n)===n&&(Ot===4||Ot===3&&(jt&130023424)===jt&&500>Dt()-dh?Or(t,0):fh|=n),mn(t,e)}function M_(t,e){e===0&&(t.mode&1?(e=go,go<<=1,!(go&130023424)&&(go=4194304)):e=1);var n=on();t=Li(t,e),t!==null&&(to(t,e,n),mn(t,n))}function Hy(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),M_(t,n)}function Vy(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ce(314))}i!==null&&i.delete(e),M_(t,n)}var E_;E_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||hn.current)dn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return dn=!1,by(t,e,n);dn=!!(t.flags&131072)}else dn=!1,St&&e.flags&1048576&&R0(e,Fl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;hl(t,e),t=e.pendingProps;var r=Bs(e,nn.current);Ls(e,n),r=sh(null,e,i,t,r,n);var s=ah();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,pn(i)?(s=!0,Il(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,eh(e),r.updater=hc,e.stateNode=r,r._reactInternals=e,vf(e,i,t,n),e=Sf(null,e,i,!0,s,n)):(e.tag=0,St&&s&&Yd(e),an(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(hl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Wy(i),t=jn(i,t),r){case 0:e=yf(null,e,i,t,n);break e;case 1:e=Wp(null,e,i,t,n);break e;case 11:e=Vp(null,e,i,t,n);break e;case 14:e=Gp(null,e,i,jn(i.type,t),n);break e}throw Error(ce(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),yf(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),Wp(t,e,i,r,n);case 3:e:{if(a_(e),t===null)throw Error(ce(387));i=e.pendingProps,s=e.memoizedState,r=s.element,L0(t,e),Bl(e,i,null,n);var a=e.memoizedState;if(i=a.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=Gs(Error(ce(423)),e),e=jp(t,e,i,n,r);break e}else if(i!==r){r=Gs(Error(ce(424)),e),e=jp(t,e,i,n,r);break e}else for(En=cr(e.stateNode.containerInfo.firstChild),Tn=e,St=!0,Yn=null,n=N0(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(zs(),i===r){e=Ii(t,e,n);break e}an(t,e,i,n)}e=e.child}return e;case 5:return I0(e),t===null&&mf(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,a=r.children,uf(i,r)?a=null:s!==null&&uf(i,s)&&(e.flags|=32),s_(t,e),an(t,e,a,n),e.child;case 6:return t===null&&mf(e),null;case 13:return o_(t,e,n);case 4:return th(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Hs(e,null,i,n):an(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),Vp(t,e,i,r,n);case 7:return an(t,e,e.pendingProps,n),e.child;case 8:return an(t,e,e.pendingProps.children,n),e.child;case 12:return an(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,a=r.value,vt(Ol,i._currentValue),i._currentValue=a,s!==null)if(Zn(s.value,a)){if(s.children===r.children&&!hn.current){e=Ii(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var o=s.dependencies;if(o!==null){a=s.child;for(var l=o.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Ci(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),gf(s.return,n,e),o.lanes|=n;break}l=l.next}}else if(s.tag===10)a=s.type===e.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(ce(341));a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),gf(a,n,e),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===e){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}an(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Ls(e,n),r=kn(r),i=i(r),e.flags|=1,an(t,e,i,n),e.child;case 14:return i=e.type,r=jn(i,e.pendingProps),r=jn(i.type,r),Gp(t,e,i,r,n);case 15:return i_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:jn(i,r),hl(t,e),e.tag=1,pn(i)?(t=!0,Il(e)):t=!1,Ls(e,n),e_(e,i,r),vf(e,i,r,n),Sf(null,e,i,!0,t,n);case 19:return l_(t,e,n);case 22:return r_(t,e,n)}throw Error(ce(156,e.tag))};function T_(t,e){return Zg(t,e)}function Gy(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Un(t,e,n,i){return new Gy(t,e,n,i)}function gh(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Wy(t){if(typeof t=="function")return gh(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Ud)return 11;if(t===Fd)return 14}return 2}function hr(t,e){var n=t.alternate;return n===null?(n=Un(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function gl(t,e,n,i,r,s){var a=2;if(i=t,typeof t=="function")gh(t)&&(a=1);else if(typeof t=="string")a=5;else e:switch(t){case _s:return kr(n.children,r,s,e);case Id:a=8,r|=8;break;case Hu:return t=Un(12,n,e,r|2),t.elementType=Hu,t.lanes=s,t;case Vu:return t=Un(13,n,e,r),t.elementType=Vu,t.lanes=s,t;case Gu:return t=Un(19,n,e,r),t.elementType=Gu,t.lanes=s,t;case Ig:return gc(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Dg:a=10;break e;case Lg:a=9;break e;case Ud:a=11;break e;case Fd:a=14;break e;case Zi:a=16,i=null;break e}throw Error(ce(130,t==null?t:typeof t,""))}return e=Un(a,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function kr(t,e,n,i){return t=Un(7,t,i,e),t.lanes=n,t}function gc(t,e,n,i){return t=Un(22,t,i,e),t.elementType=Ig,t.lanes=n,t.stateNode={isHidden:!1},t}function Jc(t,e,n){return t=Un(6,t,null,e),t.lanes=n,t}function eu(t,e,n){return e=Un(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function jy(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Ic(0),this.expirationTimes=Ic(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ic(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function _h(t,e,n,i,r,s,a,o,l){return t=new jy(t,e,n,o,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Un(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},eh(s),t}function Xy(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function w_(t){if(!t)return gr;t=t._reactInternals;e:{if(qr(t)!==t||t.tag!==1)throw Error(ce(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(pn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ce(171))}if(t.tag===1){var n=t.type;if(pn(n))return w0(t,n,e)}return e}function A_(t,e,n,i,r,s,a,o,l){return t=_h(n,i,!0,t,r,s,a,o,l),t.context=w_(null),n=t.current,i=on(),r=dr(n),s=Ci(i,r),s.callback=e??null,ur(n,s,r),t.current.lanes=r,to(t,r,i),mn(t,i),t}function _c(t,e,n,i){var r=e.current,s=on(),a=dr(r);return n=w_(n),e.context===null?e.context=n:e.pendingContext=n,e=Ci(s,a),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=ur(r,e,a),t!==null&&(Kn(t,r,a,s),ul(t,r,a)),a}function Yl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function tm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function vh(t,e){tm(t,e),(t=t.alternate)&&tm(t,e)}function Yy(){return null}var R_=typeof reportError=="function"?reportError:function(t){console.error(t)};function xh(t){this._internalRoot=t}vc.prototype.render=xh.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ce(409));_c(t,e,null,null)};vc.prototype.unmount=xh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Gr(function(){_c(null,t,null,null)}),e[Di]=null}};function vc(t){this._internalRoot=t}vc.prototype.unstable_scheduleHydration=function(t){if(t){var e=r0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<er.length&&e!==0&&e<er[n].priority;n++);er.splice(n,0,t),n===0&&a0(t)}};function yh(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function xc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function nm(){}function qy(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Yl(a);s.call(c)}}var a=A_(e,i,t,0,null,!1,!1,"",nm);return t._reactRootContainer=a,t[Di]=a.current,Va(t.nodeType===8?t.parentNode:t),Gr(),a}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var o=i;i=function(){var c=Yl(l);o.call(c)}}var l=_h(t,0,!1,null,null,!1,!1,"",nm);return t._reactRootContainer=l,t[Di]=l.current,Va(t.nodeType===8?t.parentNode:t),Gr(function(){_c(e,l,n,i)}),l}function yc(t,e,n,i,r){var s=n._reactRootContainer;if(s){var a=s;if(typeof r=="function"){var o=r;r=function(){var l=Yl(a);o.call(l)}}_c(e,a,t,r)}else a=qy(n,e,t,r,i);return Yl(a)}n0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Sa(e.pendingLanes);n!==0&&(Bd(e,n|1),mn(e,Dt()),!(at&6)&&(Ws=Dt()+500,Sr()))}break;case 13:Gr(function(){var i=Li(t,1);if(i!==null){var r=on();Kn(i,t,1,r)}}),vh(t,1)}};zd=function(t){if(t.tag===13){var e=Li(t,134217728);if(e!==null){var n=on();Kn(e,t,134217728,n)}vh(t,134217728)}};i0=function(t){if(t.tag===13){var e=dr(t),n=Li(t,e);if(n!==null){var i=on();Kn(n,t,e,i)}vh(t,e)}};r0=function(){return ut};s0=function(t,e){var n=ut;try{return ut=t,e()}finally{ut=n}};Ju=function(t,e,n){switch(e){case"input":if(Xu(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=uc(i);if(!r)throw Error(ce(90));Fg(i),Xu(i,r)}}}break;case"textarea":kg(t,n);break;case"select":e=n.value,e!=null&&bs(t,!!n.multiple,e,!1)}};jg=hh;Xg=Gr;var $y={usingClientEntryPoint:!1,Events:[io,Ss,uc,Gg,Wg,hh]},oa={findFiberByHostInstance:Dr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Ky={bundleType:oa.bundleType,version:oa.version,rendererPackageName:oa.rendererPackageName,rendererConfig:oa.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ki.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=$g(t),t===null?null:t.stateNode},findFiberByHostInstance:oa.findFiberByHostInstance||Yy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ro=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ro.isDisabled&&Ro.supportsFiber)try{ac=Ro.inject(Ky),ci=Ro}catch{}}An.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$y;An.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!yh(e))throw Error(ce(200));return Xy(t,e,null,n)};An.createRoot=function(t,e){if(!yh(t))throw Error(ce(299));var n=!1,i="",r=R_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=_h(t,1,!1,null,null,n,!1,i,r),t[Di]=e.current,Va(t.nodeType===8?t.parentNode:t),new xh(e)};An.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ce(188)):(t=Object.keys(t).join(","),Error(ce(268,t)));return t=$g(e),t=t===null?null:t.stateNode,t};An.flushSync=function(t){return Gr(t)};An.hydrate=function(t,e,n){if(!xc(e))throw Error(ce(200));return yc(null,t,e,!0,n)};An.hydrateRoot=function(t,e,n){if(!yh(t))throw Error(ce(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",a=R_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),e=A_(e,null,t,1,n??null,r,!1,s,a),t[Di]=e.current,Va(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new vc(e)};An.render=function(t,e,n){if(!xc(e))throw Error(ce(200));return yc(null,t,e,!1,n)};An.unmountComponentAtNode=function(t){if(!xc(t))throw Error(ce(40));return t._reactRootContainer?(Gr(function(){yc(null,null,t,!1,function(){t._reactRootContainer=null,t[Di]=null})}),!0):!1};An.unstable_batchedUpdates=hh;An.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!xc(n))throw Error(ce(200));if(t==null||t._reactInternals===void 0)throw Error(ce(38));return yc(t,e,n,!1,i)};An.version="18.3.1-next-f1338f8080-20240426";function C_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(C_)}catch(t){console.error(t)}}C_(),Cg.exports=An;var Zy=Cg.exports,b_,im=Zy;b_=im.createRoot,im.hydrateRoot;const Qy=150;function Sh({value:t,onChange:e,onPick:n,placeholder:i,autoFocus:r,inputClassName:s}){const[a,o]=We.useState([]),[l,c]=We.useState(!1),[d,h]=We.useState(-1),f=We.useRef(void 0),g=We.useRef(null),v=We.useId(),E=()=>{var w;window.clearTimeout(f.current),(w=g.current)==null||w.abort(),g.current=null},m=()=>{E(),c(!1),o([]),h(-1)};We.useEffect(()=>E,[]);const u=w=>{e(w),E(),h(-1);const M=w.trim();if(M.length<2){c(!1),o([]);return}f.current=window.setTimeout(()=>{const R=new AbortController;g.current=R,fetch(`/api/suggest?q=${encodeURIComponent(M.slice(0,64))}`,{signal:R.signal}).then(y=>y.ok?y.json():{suggestions:[]}).then(y=>{if(R.signal.aborted)return;const C=Array.isArray(y.suggestions)?y.suggestions.slice(0,8):[];o(C),c(C.length>0)}).catch(()=>{})},Qy)},p=w=>{m(),n(w)},_=w=>{if(w.key==="ArrowDown"){if(a.length===0)return;w.preventDefault(),c(!0),h(M=>(M+1)%a.length)}else if(w.key==="ArrowUp"){if(a.length===0)return;w.preventDefault(),c(!0),h(M=>M<=0?a.length-1:M-1)}else w.key==="Enter"?l&&d>=0&&a[d]?(w.preventDefault(),p(a[d])):m():w.key==="Escape"&&l&&(w.preventDefault(),c(!1),h(-1))},S=l&&a.length>0;return b.jsxs("div",{className:"ac-wrap",children:[b.jsx("input",{className:s??"search-input",type:"text",role:"combobox","aria-expanded":S,"aria-controls":v,"aria-autocomplete":"list","aria-activedescendant":S&&d>=0?`${v}-${d}`:void 0,"aria-label":"Search query",value:t,onChange:w=>u(w.target.value),onKeyDown:_,onBlur:()=>{E(),c(!1),h(-1)},placeholder:i,autoFocus:r,spellCheck:!1,autoComplete:"off"}),S&&b.jsx("ul",{className:"ac-list",id:v,role:"listbox",children:a.map((w,M)=>b.jsx("li",{id:`${v}-${M}`,role:"option","aria-selected":M===d,className:"ac-item"+(M===d?" active":""),onMouseDown:R=>R.preventDefault(),onMouseEnter:()=>h(M),onClick:()=>p(w),children:w},w))})]})}const P_="search-theme",Lf=new Set;function Jy(){try{return localStorage.getItem(P_)==="classic"}catch{return!1}}let N_=Jy();function eS(t){N_=t;try{localStorage.setItem(P_,t?"classic":"terminal")}catch{}Lf.forEach(e=>e())}function tS(t){return Lf.add(t),()=>{Lf.delete(t)}}function so(){return[We.useSyncExternalStore(tS,()=>N_),eS]}function Mh({variant:t="crt"}){const[e,n]=so(),i=t==="about"?"about-nav-link theme-toggle":"crt-btn theme-toggle";return b.jsxs("button",{type:"button",className:i+(e?" on":""),"aria-pressed":e,onClick:()=>n(!e),style:t==="about"?void 0:{fontSize:"0.78em"},children:[b.jsx("span",{"aria-hidden":"true",children:e?"[x] ":"[ ] "}),"Classic view"]})}const nS=`
 ██████╗ ███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
██╔════╝ ██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
╚█████╗  █████╗  ███████║██████╔╝██║     ███████║
 ╚═══██╗ ██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
██████╔╝ ███████╗██║  ██║██║  ██║╚██████╗██║  ██║
╚═════╝  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`.trim();function iS(){return new Date().toISOString().replace("T"," ").slice(0,19)+" UTC"}function Ki(t){return t>=1e6?(t/1e6).toFixed(1)+"M":t>=1e3?(t/1e3).toFixed(1)+"K":t.toLocaleString()}function rm(t,e){var i;const n=t[e];return((i=t.approximate)!=null&&i.includes(e)?"~":"")+Ki(n)}function rS({onSearch:t,onAbout:e,onGraph:n}){const[i]=so(),[r,s]=We.useState(""),[a,o]=We.useState(null);We.useEffect(()=>{fetch("/api/stats").then(c=>c.ok?c.json():Promise.reject()).then(c=>o(c)).catch(()=>{})},[]);const l=c=>{c.preventDefault(),r.trim()&&t(r.trim())};return b.jsxs(b.Fragment,{children:[b.jsxs("header",{className:"site-header",children:[b.jsxs("div",{className:"header-meta",children:[b.jsx("span",{children:"CORP. NETWORK INTERFACE // AUTHORIZED ACCESS ONLY"}),b.jsx("span",{children:iS()})]}),b.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"10px",marginBottom:"6px"},children:[b.jsx(Mh,{}),b.jsx("button",{className:"crt-btn",onClick:n,style:{fontSize:"0.78em"},children:"GRAPH"}),b.jsx("button",{className:"crt-btn",onClick:e,style:{fontSize:"0.78em"},children:"ABOUT"})]}),b.jsxs("div",{className:"header-status",children:[b.jsx("span",{className:"status-dot",children:"■"})," MAINFRAME OPERATIONAL ",b.jsx("span",{className:"status-dot",children:"■"})," SEARCH NODE ONLINE ",b.jsx("span",{className:"status-dot",children:"■"})," CRAWLER NET ACTIVE"]})]}),b.jsxs("div",{className:"home-hero",children:[b.jsx("pre",{className:"ascii-logo glow",children:nS}),b.jsxs("div",{className:"classic-logo",lang:"ja","aria-label":"道草 (michikusa)",children:[b.jsx("span",{className:"classic-logo-mark","aria-hidden":"true",children:"道草"}),b.jsx("span",{className:"classic-logo-reading","aria-hidden":"true",children:"michikusa"})]}),b.jsx("p",{className:"subtitle",children:"D I S T R I B U T E D   W E B   I N D E X   v 2 . 4"}),b.jsxs("form",{className:"search-form-home",onSubmit:l,children:[b.jsxs("div",{className:"search-row",children:[b.jsx("span",{className:"prompt-label",children:"QUERY>"}),b.jsx(Sh,{value:r,onChange:s,onPick:c=>t(c.trim()),placeholder:"enter search terms...",autoFocus:!0}),b.jsx("span",{className:"cursor"})]}),b.jsx("div",{className:"search-submit-row",children:b.jsx("button",{type:"submit",className:"crt-btn",children:i?"Search":"[ EXECUTE SEARCH ]"})}),b.jsx("div",{className:"syntax-hint",children:'Tips: "exact phrase"   -exclude   word OR word'})]}),b.jsxs("div",{className:"sys-panel",children:[b.jsx("span",{className:"sys-panel-title",children:"// SUBSYSTEM STATUS"}),b.jsxs("div",{className:"sys-row dim",children:[b.jsx("span",{children:"SUBSYSTEM"}),b.jsx("span",{children:"STATUS"})]}),b.jsx("hr",{className:"divider"}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"FULL-TEXT SEARCH ENGINE"}),b.jsx("span",{className:"sys-ok",children:"■ ONLINE"})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"PAGERANK SCORER"}),a&&a.pagesRanked===0?b.jsx("span",{className:"sys-warn",children:"■ NO DATA"}):b.jsx("span",{className:"sys-ok",children:"■ ONLINE"})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"DISTRIBUTED CRAWLER NET"}),a&&a.crawledLast24h===0&&a.crawlRatePerHr===0?b.jsx("span",{className:"sys-warn",children:"■ IDLE"}):b.jsx("span",{className:"sys-ok",children:"■ ONLINE"})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"MICROSERVICE MESH"}),b.jsx("span",{className:"sys-ok",children:"■ 5 NODES"})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"GRPC TRANSPORT"}),b.jsx("span",{className:"sys-ok",children:"■ READY"})]})]}),a&&b.jsxs("div",{className:"stats-grid",children:[b.jsxs("div",{className:"sys-panel",children:[b.jsx("span",{className:"sys-panel-title",children:"// INDEX STATS"}),b.jsxs("div",{className:"sys-row dim",children:[b.jsx("span",{children:"METRIC"}),b.jsx("span",{children:"VALUE"})]}),b.jsx("hr",{className:"divider"}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"PAGES INDEXED"}),b.jsx("span",{className:"sys-ok",children:Ki(a.pagesIndexed)})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"PAGES RANKED"}),b.jsx("span",{className:"sys-ok",children:Ki(a.pagesRanked)})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"UNIQUE DOMAINS"}),b.jsx("span",{className:"sys-ok",children:rm(a,"uniqueDomains")})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"LINKS MAPPED"}),b.jsx("span",{className:"sys-ok",children:rm(a,"totalLinks")})]})]}),b.jsxs("div",{className:"sys-panel",children:[b.jsx("span",{className:"sys-panel-title",children:"// CRAWL & QUERY"}),b.jsxs("div",{className:"sys-row dim",children:[b.jsx("span",{children:"METRIC"}),b.jsx("span",{children:"VALUE"})]}),b.jsx("hr",{className:"divider"}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"CRAWLED LAST 24H"}),b.jsx("span",{className:"sys-ok",children:Ki(a.crawledLast24h)})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"PAGES / HOUR"}),b.jsx("span",{className:"sys-ok",children:Ki(a.crawlRatePerHr)})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"QUEUE DEPTH"}),b.jsx("span",{className:"sys-ok",children:Ki(a.queueDepth)})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"QUERIES LAST HR"}),b.jsx("span",{className:"sys-ok",children:Ki(a.searchQueriesLastHr)})]}),b.jsxs("div",{className:"sys-row",children:[b.jsx("span",{children:"QUERIES LAST 24H"}),b.jsx("span",{className:"sys-ok",children:Ki(a.searchQueriesLast24h)})]})]})]})]}),b.jsx("footer",{style:{marginTop:"3rem",paddingTop:"2rem",borderTop:"1px solid var(--border)",textAlign:"center",fontSize:"0.72em",color:"var(--p-dim)"},children:b.jsx("a",{href:"https://www.alexcollie.com",target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none",borderBottom:"1px solid var(--border)",paddingBottom:"2px"},children:"by Alex Collie"})})]})}function sS({result:t}){const e=t.segments;return!e||e.length===0?b.jsx(b.Fragment,{children:t.snippet}):b.jsx(b.Fragment,{children:e.map((n,i)=>n.match?b.jsx("mark",{className:"hl",children:n.text},i):b.jsx("span",{children:n.text},i))})}const Co="en.wikipedia.org",sm=[["","Any language"],["en","English"],["de","German"],["fr","French"],["es","Spanish"],["it","Italian"],["pt","Portuguese"],["nl","Dutch"],["ja","Japanese"],["zh","Chinese"],["ru","Russian"]],am=[["","Any time"],["day","Past day"],["week","Past week"],["month","Past month"],["year","Past year"]];function om(t,e){return t&&e.some(([n])=>n===t)?t:""}function aS({params:t,onNavigate:e,onHome:n,onAbout:i,onGraph:r}){const[s]=so(),a=t.get("q")??"",o=om(t.get("language"),sm),l=om(t.get("since"),am),c=t.get("domain")===Co,d=Math.max(1,parseInt(t.get("page")??"1",10)||1),[h,f]=We.useState(null),[g,v]=We.useState(!0),[E,m]=We.useState(a);We.useEffect(()=>{m(a)},[a]),We.useEffect(()=>{const S=new AbortController;v(!0),f(null);const w=new URLSearchParams({q:a,page:String(d)});return o&&w.set("language",o),c&&w.set("domain",Co),l&&w.set("since",l),fetch(`/api/search?${w}`,{signal:S.signal}).then(M=>M.json()).then(M=>{f(M),v(!1)}).catch(M=>{S.signal.aborted||(M==null?void 0:M.name)==="AbortError"||(f({results:[],resultCount:0,page:d,nextPage:d+1,prevPage:d-1,hasNext:!1,hasPrev:!1,searchTime:0,error:"CONNECTION TO SEARCH NODE FAILED — RETRY OR CHECK SYSTEM STATUS",query:a}),v(!1))}),()=>S.abort()},[a,d,o,c,l]);const u=S=>{const w=new URLSearchParams,M={q:a,language:o,domain:c?Co:"",since:l,page:d>1?String(d):""};for(const[R,y]of Object.entries({...M,...S}))y&&w.set(R,y);e(w)},p=S=>{S.trim()&&u({q:S.trim(),page:""})},_=S=>{S.preventDefault(),p(E)};return b.jsxs(b.Fragment,{children:[b.jsxs("header",{className:"site-header",children:[b.jsxs("div",{className:"header-bar",children:[b.jsx("button",{className:"crt-btn",onClick:n,style:{letterSpacing:"0.22em"},children:s?"道草":"SEARCH//SYS"}),b.jsx("button",{className:"crt-btn",onClick:r,style:{fontSize:"0.82em"},children:"GRAPH"}),b.jsx("button",{className:"crt-btn",onClick:i,style:{fontSize:"0.82em"},children:"ABOUT"}),b.jsx(Mh,{}),b.jsx("form",{onSubmit:_,style:{flex:1},children:b.jsxs("div",{className:"search-row",children:[b.jsx("span",{className:"prompt-label",children:"QUERY>"}),b.jsx(Sh,{value:E,onChange:m,onPick:S=>{m(S),p(S)},autoFocus:!0}),b.jsx("button",{type:"submit",className:"crt-btn",children:s?"Search":"EXEC"})]})})]}),b.jsxs("div",{className:"filters",role:"group","aria-label":"Search filters",children:[b.jsxs("label",{className:"filter",children:[b.jsx("span",{children:"LANG"}),b.jsx("select",{value:o,onChange:S=>u({language:S.target.value,page:""}),children:sm.map(([S,w])=>b.jsx("option",{value:S,children:w},S))})]}),b.jsxs("label",{className:"filter",children:[b.jsx("span",{children:"TIME"}),b.jsx("select",{value:l,onChange:S=>u({since:S.target.value,page:""}),children:am.map(([S,w])=>b.jsx("option",{value:S,children:w},S))})]}),b.jsx("button",{type:"button",className:"crt-btn filter-toggle"+(c?" on":""),"aria-pressed":c,onClick:()=>u({domain:c?"":Co,page:""}),children:"Wikipedia only"}),b.jsx("span",{className:"syntax-hint",children:'Tips: "exact phrase"   -exclude   word OR word'})]})]}),b.jsxs("main",{children:[g&&b.jsx("div",{className:"loading",children:b.jsx("span",{className:"loading-dots",children:s?"Searching":"SEARCHING INDEXED DOCUMENTS"})}),!g&&h&&b.jsxs(b.Fragment,{children:[b.jsx("div",{className:"results-meta",children:h.error?b.jsxs("span",{className:"err",children:["!! ",h.error]}):s?b.jsxs("span",{children:["About ",h.resultCount," results (",h.searchTime.toFixed(2)," seconds)"]}):b.jsxs(b.Fragment,{children:[b.jsxs("span",{children:["RECORDS FOUND: ",h.resultCount]})," | ",b.jsxs("span",{children:["QUERY TIME: ",h.searchTime.toFixed(3),"s"]})," | ",b.jsxs("span",{children:["PAGE: ",h.page]})]})}),h.results&&h.results.length>0?b.jsxs(b.Fragment,{children:[h.results.map((S,w)=>b.jsx(oS,{result:S,index:(d-1)*10+w+1},S.url)),b.jsxs("div",{className:"pagination",children:[h.hasPrev&&b.jsx("button",{className:"crt-btn",onClick:()=>u({page:d-1>1?String(d-1):""}),children:"◄ PREV"}),b.jsxs("span",{className:"page-info",children:["PAGE ",h.page]}),h.hasNext&&b.jsx("button",{className:"crt-btn",onClick:()=>u({page:String(d+1)}),children:"NEXT ►"})]})]}):!h.error&&b.jsxs("div",{className:"no-results",children:[h.didYouMean&&b.jsxs("div",{className:"did-you-mean",children:["Did you mean:"," ",b.jsx("button",{type:"button",className:"dym-link",onClick:()=>{m(h.didYouMean),p(h.didYouMean)},children:h.didYouMean}),"?"]}),b.jsxs("div",{children:['NO RECORDS MATCH QUERY: "',a,'"']}),b.jsx("div",{className:"dim",style:{fontSize:"0.82em",marginTop:"8px"},children:"SUGGEST: CHECK SPELLING · BROADEN SEARCH TERMS · TRY SYNONYMS"})]})]})]}),b.jsx("footer",{style:{marginTop:"2rem",paddingTop:"1.5rem",borderTop:"1px solid var(--border)",textAlign:"center",fontSize:"0.72em",color:"var(--p-dim)"},children:b.jsx("a",{href:"https://www.alexcollie.com",target:"_blank",rel:"noopener noreferrer",style:{color:"inherit",textDecoration:"none",borderBottom:"1px solid var(--border)",paddingBottom:"2px"},children:"by Alex Collie"})})]})}function oS({result:t,index:e}){const[n]=so();return b.jsxs("div",{className:"result-record",children:[b.jsxs("span",{className:"record-id",children:["[",String(e).padStart(3,"0"),"] RECORD"]}),b.jsx("div",{className:"record-title",children:b.jsx("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:t.title||t.url})}),b.jsx("div",{className:"record-url",children:t.url}),t.snippet&&b.jsx("div",{className:"record-snippet",children:b.jsx(sS,{result:t})}),t.lastCrawled&&b.jsxs("div",{className:"record-footer",children:[n?"Crawled":"INDEXED:"," ",t.lastCrawled]})]})}const lm="!<>-_\\/[]{}=+*^?#@%アイウエオカキクケコサシスセソ道草水火風0123456789ABCDEF";function tu(t,e=900,n=80){const[i,r]=We.useState(""),[s,a]=We.useState(0),o=()=>a(l=>l+1);return We.useEffect(()=>{const l=performance.now(),c=[...t].filter(g=>g.trim()).length;let d=l,h;const f=g=>{const v=Math.min((g-l)/e,1);if(g-d>=n){d=g;let m=0;const u=[...t].map(p=>{if(!p.trim())return p;const _=++m/c;return v>=_?p:lm[Math.floor(Math.random()*lm.length)]}).join("");r(u)}v<1?h=requestAnimationFrame(f):r(t)};return h=requestAnimationFrame(f),()=>cancelAnimationFrame(h)},[t,e,n,s]),{output:i,replay:o}}function bo(t){return t>=1e6?(t/1e6).toFixed(1)+"M":t>=1e3?(t/1e3).toFixed(1)+"K":t.toLocaleString()}function lS({onSearch:t,onGraph:e}){const[n,i]=We.useState(""),[r,s]=We.useState(null);We.useEffect(()=>{let v=!1;const E=()=>fetch("/api/stats").then(m=>m.ok?m.json():Promise.reject(new Error(`stats ${m.status}`))).then(m=>{v||s(m)}).catch(m=>{console.error("stats fetch failed",m),v||setTimeout(E,3e3)});return E(),()=>{v=!0}},[]);const{output:a,replay:o}=tu("MICHICHUSA",900),{output:l,replay:c}=tu("道草",700),{output:d,replay:h}=tu("WANDER · DISCOVER · SEARCH",1100),f=()=>{o(),c(),h()},g=v=>{v.preventDefault(),n.trim()&&t(n.trim())};return b.jsxs("div",{className:"about-root",children:[b.jsxs("nav",{className:"about-nav",children:[b.jsx("span",{className:"about-nav-brand",children:"道草"}),b.jsxs("div",{className:"about-nav-links",children:[b.jsx("span",{className:"about-nav-link about-nav-active",children:"ABOUT"}),b.jsx("button",{className:"about-nav-link",onClick:e,children:"GRAPH"}),b.jsx(Mh,{variant:"about"}),b.jsx("a",{className:"about-nav-link",href:"https://metrics.collie.codes",target:"_blank",rel:"noopener noreferrer",children:"METRICS"})]})]}),b.jsxs("section",{className:"about-hero",children:[b.jsx("div",{className:"about-hero-glow"}),b.jsxs("button",{className:"about-title-wrap",onClick:f,title:"replay animation",children:[b.jsx("h1",{className:"about-title neon-flicker",children:a||" "}),b.jsx("p",{className:"about-kanji  neon-pulse",children:l||" "})]}),b.jsx("p",{className:"about-sub",children:d}),b.jsxs("form",{className:"about-search-form",onSubmit:g,children:[b.jsxs("div",{className:"about-search-row",children:[b.jsx("span",{className:"about-search-prompt",children:"›"}),b.jsx(Sh,{value:n,onChange:i,onPick:v=>t(v.trim()),placeholder:"search the index...",inputClassName:"about-search-input"}),b.jsx("button",{type:"submit",className:"about-search-btn",children:"SEARCH"})]}),b.jsx("div",{className:"about-hint",children:'Tips: "exact phrase"   -exclude   word OR word'})]}),b.jsx("p",{className:"about-scroll-hint",children:"↓ scroll"})]}),b.jsx("section",{className:"about-body",children:b.jsxs("div",{className:"about-grid",children:[b.jsxs("div",{className:"about-card",children:[b.jsx("h2",{className:"about-card-title",children:"// WHAT IS THIS"}),b.jsx("p",{className:"about-card-text",children:"Michichusa is a distributed web search engine built from scratch in Go. Five microservices crawl, index, rank, and serve results — no third-party search API, no shortcuts."}),b.jsxs("p",{className:"about-card-text",children:["道草 ",b.jsx("span",{className:"about-dim",children:"(michikusa)"})," — to dawdle by the roadside, to linger and notice what others walk past. That's how this engine approaches the web: patient, thorough, unhurried."]})]}),b.jsxs("div",{className:"about-card",children:[b.jsx("h2",{className:"about-card-title",children:"// HOW IT WORKS"}),b.jsxs("ul",{className:"about-list",children:[b.jsxs("li",{children:[b.jsx("span",{className:"about-tag",children:"SPIDER"})," crawls URLs, respects robots.txt, guards against SSRF"]}),b.jsxs("li",{children:[b.jsx("span",{className:"about-tag",children:"CONDUCTOR"})," deduplicates and queues pages via PostgreSQL"]}),b.jsxs("li",{children:[b.jsx("span",{className:"about-tag",children:"CARTOGRAPHER"})," computes PageRank across the crawled graph"]}),b.jsxs("li",{children:[b.jsx("span",{className:"about-tag",children:"SEARCHER"})," ranks by full-text (30%) + PageRank (70%)"]}),b.jsxs("li",{children:[b.jsx("span",{className:"about-tag",children:"FRONTEND"})," this terminal you're looking at"]})]})]}),b.jsxs("div",{className:"about-card",children:[b.jsx("h2",{className:"about-card-title",children:"// INDEX"}),b.jsxs("div",{className:"about-stat-grid",children:[b.jsxs("div",{className:"about-stat",children:[b.jsx("span",{className:"about-stat-val",children:r?bo(r.pagesIndexed):"—"}),b.jsx("span",{className:"about-stat-label",children:"pages indexed"})]}),b.jsxs("div",{className:"about-stat",children:[b.jsx("span",{className:"about-stat-val",children:r?bo(r.crawledLast24h):"—"}),b.jsx("span",{className:"about-stat-label",children:"crawled last 24h"})]}),b.jsxs("div",{className:"about-stat",children:[b.jsx("span",{className:"about-stat-val",children:r?bo(r.queueDepth):"—"}),b.jsx("span",{className:"about-stat-label",children:"queued to crawl"})]}),b.jsxs("div",{className:"about-stat",children:[b.jsx("span",{className:"about-stat-val",children:r?bo(r.crawlRatePerHr):"—"}),b.jsx("span",{className:"about-stat-label",children:"pages / hour"})]})]})]}),b.jsxs("div",{className:"about-card",children:[b.jsx("h2",{className:"about-card-title",children:"// PHILOSOPHY"}),b.jsx("p",{className:"about-card-text about-quote",children:'"The one who wanders is not always lost — sometimes they are the only one paying attention."'}),b.jsx("p",{className:"about-card-text",children:"Search engines shape what we find. Building one by hand is the only way to understand what that means."})]})]})}),b.jsxs("footer",{className:"about-footer",children:[b.jsx("span",{className:"about-dim",children:"MICHICHUSA · 道草 · DISTRIBUTED WEB INDEX"}),b.jsx("br",{style:{marginBottom:"8px"}}),b.jsx("a",{href:"https://www.alexcollie.com",target:"_blank",rel:"noopener noreferrer",style:{color:"var(--o-dim)",textDecoration:"none",borderBottom:"1px solid var(--o-border)",paddingBottom:"2px"},children:"by Alex Collie"})]})]})}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Eh="184",Us={ROTATE:0,DOLLY:1,PAN:2},Cs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cS=0,cm=1,uS=2,_l=1,fS=2,Ea=3,_r=0,gn=1,Ti=2,bi=0,Fs=1,ql=2,um=3,fm=4,dS=5,Pr=100,hS=101,pS=102,mS=103,gS=104,_S=200,vS=201,xS=202,yS=203,If=204,Uf=205,SS=206,MS=207,ES=208,TS=209,wS=210,AS=211,RS=212,CS=213,bS=214,Ff=0,Of=1,kf=2,js=3,Bf=4,zf=5,Hf=6,Vf=7,D_=0,PS=1,NS=2,fi=0,L_=1,I_=2,U_=3,F_=4,O_=5,k_=6,B_=7,z_=300,Wr=301,Xs=302,nu=303,iu=304,Sc=306,Gf=1e3,Ri=1001,Wf=1002,Wt=1003,DS=1004,Po=1005,Jt=1006,ru=1007,Ur=1008,Mn=1009,H_=1010,V_=1011,Za=1012,Th=1013,pi=1014,oi=1015,Ui=1016,wh=1017,Ah=1018,Qa=1020,G_=35902,W_=35899,j_=1021,X_=1022,qn=1023,Fi=1026,Fr=1027,Y_=1028,Rh=1029,jr=1030,Ch=1031,bh=1033,vl=33776,xl=33777,yl=33778,Sl=33779,jf=35840,Xf=35841,Yf=35842,qf=35843,$f=36196,Kf=37492,Zf=37496,Qf=37488,Jf=37489,$l=37490,ed=37491,td=37808,nd=37809,id=37810,rd=37811,sd=37812,ad=37813,od=37814,ld=37815,cd=37816,ud=37817,fd=37818,dd=37819,hd=37820,pd=37821,md=36492,gd=36494,_d=36495,vd=36283,xd=36284,Kl=36285,yd=36286,LS=3200,dm=0,IS=1,nr="",Nn="srgb",Zl="srgb-linear",Ql="linear",ct="srgb",Qr=7680,hm=519,US=512,FS=513,OS=514,Ph=515,kS=516,BS=517,Nh=518,zS=519,Sd=35044,pm="300 es",li=2e3,Ja=2001;function HS(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Jl(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function VS(){const t=Jl("canvas");return t.style.display="block",t}const mm={};function ec(...t){const e="THREE."+t.shift();console.log(e,...t)}function q_(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ve(...t){t=q_(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function nt(...t){t=q_(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Md(...t){const e=t.join(" ");e in mm||(mm[e]=!0,Ve(...t))}function GS(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const WS={[Ff]:Of,[kf]:Hf,[Bf]:Vf,[js]:zf,[Of]:Ff,[Hf]:kf,[Vf]:Bf,[zf]:js};class Mr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ml=Math.PI/180,Ed=180/Math.PI;function pr(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[t&255]+Kt[t>>8&255]+Kt[t>>16&255]+Kt[t>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[n&63|128]+Kt[n>>8&255]+"-"+Kt[n>>16&255]+Kt[n>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function et(t,e,n){return Math.max(e,Math.min(n,t))}function jS(t,e){return(t%e+e)%e}function su(t,e,n){return(1-n)*t+n*e}function ai(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function ht(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const XS={DEG2RAD:Ml},Fh=class Fh{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=et(this.x,e.x,n.x),this.y=et(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=et(this.x,e,n),this.y=et(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Fh.prototype.isVector2=!0;let Ge=Fh;class vr{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let l=i[r+0],c=i[r+1],d=i[r+2],h=i[r+3],f=s[a+0],g=s[a+1],v=s[a+2],E=s[a+3];if(h!==E||l!==f||c!==g||d!==v){let m=l*f+c*g+d*v+h*E;m<0&&(f=-f,g=-g,v=-v,E=-E,m=-m);let u=1-o;if(m<.9995){const p=Math.acos(m),_=Math.sin(p);u=Math.sin(u*p)/_,o=Math.sin(o*p)/_,l=l*u+f*o,c=c*u+g*o,d=d*u+v*o,h=h*u+E*o}else{l=l*u+f*o,c=c*u+g*o,d=d*u+v*o,h=h*u+E*o;const p=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=p,c*=p,d*=p,h*=p}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],d=i[r+3],h=s[a],f=s[a+1],g=s[a+2],v=s[a+3];return e[n]=o*v+d*h+l*g-c*f,e[n+1]=l*v+d*f+c*h-o*g,e[n+2]=c*v+d*g+o*f-l*h,e[n+3]=d*v-o*h-l*f-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(r/2),h=o(s/2),f=l(i/2),g=l(r/2),v=l(s/2);switch(a){case"XYZ":this._x=f*d*h+c*g*v,this._y=c*g*h-f*d*v,this._z=c*d*v+f*g*h,this._w=c*d*h-f*g*v;break;case"YXZ":this._x=f*d*h+c*g*v,this._y=c*g*h-f*d*v,this._z=c*d*v-f*g*h,this._w=c*d*h+f*g*v;break;case"ZXY":this._x=f*d*h-c*g*v,this._y=c*g*h+f*d*v,this._z=c*d*v+f*g*h,this._w=c*d*h-f*g*v;break;case"ZYX":this._x=f*d*h-c*g*v,this._y=c*g*h+f*d*v,this._z=c*d*v-f*g*h,this._w=c*d*h+f*g*v;break;case"YZX":this._x=f*d*h+c*g*v,this._y=c*g*h+f*d*v,this._z=c*d*v-f*g*h,this._w=c*d*h-f*g*v;break;case"XZY":this._x=f*d*h-c*g*v,this._y=c*g*h-f*d*v,this._z=c*d*v+f*g*h,this._w=c*d*h+f*g*v;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],l=n[9],c=n[2],d=n[6],h=n[10],f=i+o+h;if(f>0){const g=.5/Math.sqrt(f+1);this._w=.25/g,this._x=(d-l)*g,this._y=(s-c)*g,this._z=(a-r)*g}else if(i>o&&i>h){const g=2*Math.sqrt(1+i-o-h);this._w=(d-l)/g,this._x=.25*g,this._y=(r+a)/g,this._z=(s+c)/g}else if(o>h){const g=2*Math.sqrt(1+o-i-h);this._w=(s-c)/g,this._x=(r+a)/g,this._y=.25*g,this._z=(l+d)/g}else{const g=2*Math.sqrt(1+h-i-o);this._w=(a-r)/g,this._x=(s+c)/g,this._y=(l+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+a*o+r*c-s*l,this._y=r*d+a*l+s*o-i*c,this._z=s*d+a*c+i*l-r*o,this._w=a*d-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Oh=class Oh{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(gm.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(gm.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),d=2*(o*n-s*r),h=2*(s*i-a*n);return this.x=n+l*c+a*h-o*d,this.y=i+l*d+o*c-s*h,this.z=r+l*h+s*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=et(this.x,e.x,n.x),this.y=et(this.y,e.y,n.y),this.z=et(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=et(this.x,e,n),this.y=et(this.y,e,n),this.z=et(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,l=n.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return au.copy(this).projectOnVector(e),this.sub(au)}reflect(e){return this.sub(au.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Oh.prototype.isVector3=!0;let H=Oh;const au=new H,gm=new vr,kh=class kh{constructor(e,n,i,r,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c)}set(e,n,i,r,s,a,o,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],f=i[2],g=i[5],v=i[8],E=r[0],m=r[3],u=r[6],p=r[1],_=r[4],S=r[7],w=r[2],M=r[5],R=r[8];return s[0]=a*E+o*p+l*w,s[3]=a*m+o*_+l*M,s[6]=a*u+o*S+l*R,s[1]=c*E+d*p+h*w,s[4]=c*m+d*_+h*M,s[7]=c*u+d*S+h*R,s[2]=f*E+g*p+v*w,s[5]=f*m+g*_+v*M,s[8]=f*u+g*S+v*R,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*a*d-n*o*c-i*s*d+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,f=o*l-d*s,g=c*s-a*l,v=n*h+i*f+r*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/v;return e[0]=h*E,e[1]=(r*c-d*i)*E,e[2]=(o*i-r*a)*E,e[3]=f*E,e[4]=(d*n-r*l)*E,e[5]=(r*s-o*n)*E,e[6]=g*E,e[7]=(i*l-c*n)*E,e[8]=(a*n-i*s)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(ou.makeScale(e,n)),this}rotate(e){return this.premultiply(ou.makeRotation(-e)),this}translate(e,n){return this.premultiply(ou.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};kh.prototype.isMatrix3=!0;let Xe=kh;const ou=new Xe,_m=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vm=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function YS(){const t={enabled:!0,workingColorSpace:Zl,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ct&&(r.r=Pi(r.r),r.g=Pi(r.g),r.b=Pi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ct&&(r.r=Os(r.r),r.g=Os(r.g),r.b=Os(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===nr?Ql:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Md("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Md("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Zl]:{primaries:e,whitePoint:i,transfer:Ql,toXYZ:_m,fromXYZ:vm,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Nn},outputColorSpaceConfig:{drawingBufferColorSpace:Nn}},[Nn]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:_m,fromXYZ:vm,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Nn}}}),t}const it=YS();function Pi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Os(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Jr;class qS{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Jr===void 0&&(Jr=Jl("canvas")),Jr.width=e.width,Jr.height=e.height;const r=Jr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Jr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Jl("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Pi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Pi(n[i]/255)*255):n[i]=Pi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $S=0;class Dh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$S++}),this.uuid=pr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(lu(r[a].image)):s.push(lu(r[a]))}else s=lu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function lu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?qS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let KS=0;const cu=new H;class en extends Mr{constructor(e=en.DEFAULT_IMAGE,n=en.DEFAULT_MAPPING,i=Ri,r=Ri,s=Jt,a=Ur,o=qn,l=Mn,c=en.DEFAULT_ANISOTROPY,d=nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:KS++}),this.uuid=pr(),this.name="",this.source=new Dh(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(cu).x}get height(){return this.source.getSize(cu).y}get depth(){return this.source.getSize(cu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ve(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ve(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==z_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gf:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case Wf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Gf:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case Wf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=z_;en.DEFAULT_ANISOTROPY=1;const Bh=class Bh{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],d=l[4],h=l[8],f=l[1],g=l[5],v=l[9],E=l[2],m=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-E)<.01&&Math.abs(v-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+E)<.1&&Math.abs(v+m)<.1&&Math.abs(c+g+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const _=(c+1)/2,S=(g+1)/2,w=(u+1)/2,M=(d+f)/4,R=(h+E)/4,y=(v+m)/4;return _>S&&_>w?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=M/i,s=R/i):S>w?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=M/r,s=y/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=R/s,r=y/s),this.set(i,r,s,n),this}let p=Math.sqrt((m-v)*(m-v)+(h-E)*(h-E)+(f-d)*(f-d));return Math.abs(p)<.001&&(p=1),this.x=(m-v)/p,this.y=(h-E)/p,this.z=(f-d)/p,this.w=Math.acos((c+g+u-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=et(this.x,e.x,n.x),this.y=et(this.y,e.y,n.y),this.z=et(this.z,e.z,n.z),this.w=et(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=et(this.x,e,n),this.y=et(this.y,e,n),this.z=et(this.z,e,n),this.w=et(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Bh.prototype.isVector4=!0;let Ct=Bh;class ZS extends Mr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Ct(0,0,e,n),this.scissorTest=!1,this.viewport=new Ct(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new en(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Dh(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}}class di extends ZS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class $_ extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class QS extends en{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Wt,this.minFilter=Wt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rc=class rc{constructor(e,n,i,r,s,a,o,l,c,d,h,f,g,v,E,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,l,c,d,h,f,g,v,E,m)}set(e,n,i,r,s,a,o,l,c,d,h,f,g,v,E,m){const u=this.elements;return u[0]=e,u[4]=n,u[8]=i,u[12]=r,u[1]=s,u[5]=a,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=f,u[3]=g,u[7]=v,u[11]=E,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rc().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,r=1/es.setFromMatrixColumn(e,0).length(),s=1/es.setFromMatrixColumn(e,1).length(),a=1/es.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*d,g=a*h,v=o*d,E=o*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=g+v*c,n[5]=f-E*c,n[9]=-o*l,n[2]=E-f*c,n[6]=v+g*c,n[10]=a*l}else if(e.order==="YXZ"){const f=l*d,g=l*h,v=c*d,E=c*h;n[0]=f+E*o,n[4]=v*o-g,n[8]=a*c,n[1]=a*h,n[5]=a*d,n[9]=-o,n[2]=g*o-v,n[6]=E+f*o,n[10]=a*l}else if(e.order==="ZXY"){const f=l*d,g=l*h,v=c*d,E=c*h;n[0]=f-E*o,n[4]=-a*h,n[8]=v+g*o,n[1]=g+v*o,n[5]=a*d,n[9]=E-f*o,n[2]=-a*c,n[6]=o,n[10]=a*l}else if(e.order==="ZYX"){const f=a*d,g=a*h,v=o*d,E=o*h;n[0]=l*d,n[4]=v*c-g,n[8]=f*c+E,n[1]=l*h,n[5]=E*c+f,n[9]=g*c-v,n[2]=-c,n[6]=o*l,n[10]=a*l}else if(e.order==="YZX"){const f=a*l,g=a*c,v=o*l,E=o*c;n[0]=l*d,n[4]=E-f*h,n[8]=v*h+g,n[1]=h,n[5]=a*d,n[9]=-o*d,n[2]=-c*d,n[6]=g*h+v,n[10]=f-E*h}else if(e.order==="XZY"){const f=a*l,g=a*c,v=o*l,E=o*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=f*h+E,n[5]=a*d,n[9]=g*h-v,n[2]=v*h-g,n[6]=o*d,n[10]=E*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(JS,e,eM)}lookAt(e,n,i){const r=this.elements;return vn.subVectors(e,n),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Gi.crossVectors(i,vn),Gi.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Gi.crossVectors(i,vn)),Gi.normalize(),No.crossVectors(vn,Gi),r[0]=Gi.x,r[4]=No.x,r[8]=vn.x,r[1]=Gi.y,r[5]=No.y,r[9]=vn.y,r[2]=Gi.z,r[6]=No.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],f=i[9],g=i[13],v=i[2],E=i[6],m=i[10],u=i[14],p=i[3],_=i[7],S=i[11],w=i[15],M=r[0],R=r[4],y=r[8],C=r[12],N=r[1],P=r[5],B=r[9],Y=r[13],J=r[2],O=r[6],W=r[10],I=r[14],F=r[3],G=r[7],$=r[11],V=r[15];return s[0]=a*M+o*N+l*J+c*F,s[4]=a*R+o*P+l*O+c*G,s[8]=a*y+o*B+l*W+c*$,s[12]=a*C+o*Y+l*I+c*V,s[1]=d*M+h*N+f*J+g*F,s[5]=d*R+h*P+f*O+g*G,s[9]=d*y+h*B+f*W+g*$,s[13]=d*C+h*Y+f*I+g*V,s[2]=v*M+E*N+m*J+u*F,s[6]=v*R+E*P+m*O+u*G,s[10]=v*y+E*B+m*W+u*$,s[14]=v*C+E*Y+m*I+u*V,s[3]=p*M+_*N+S*J+w*F,s[7]=p*R+_*P+S*O+w*G,s[11]=p*y+_*B+S*W+w*$,s[15]=p*C+_*Y+S*I+w*V,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],f=e[10],g=e[14],v=e[3],E=e[7],m=e[11],u=e[15],p=l*g-c*f,_=o*g-c*h,S=o*f-l*h,w=a*g-c*d,M=a*f-l*d,R=a*h-o*d;return n*(E*p-m*_+u*S)-i*(v*p-m*w+u*M)+r*(v*_-E*w+u*R)-s*(v*S-E*M+m*R)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],f=e[10],g=e[11],v=e[12],E=e[13],m=e[14],u=e[15],p=n*o-i*a,_=n*l-r*a,S=n*c-s*a,w=i*l-r*o,M=i*c-s*o,R=r*c-s*l,y=d*E-h*v,C=d*m-f*v,N=d*u-g*v,P=h*m-f*E,B=h*u-g*E,Y=f*u-g*m,J=p*Y-_*B+S*P+w*N-M*C+R*y;if(J===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/J;return e[0]=(o*Y-l*B+c*P)*O,e[1]=(r*B-i*Y-s*P)*O,e[2]=(E*R-m*M+u*w)*O,e[3]=(f*M-h*R-g*w)*O,e[4]=(l*N-a*Y-c*C)*O,e[5]=(n*Y-r*N+s*C)*O,e[6]=(m*S-v*R-u*_)*O,e[7]=(d*R-f*S+g*_)*O,e[8]=(a*B-o*N+c*y)*O,e[9]=(i*N-n*B-s*y)*O,e[10]=(v*M-E*S+u*p)*O,e[11]=(h*S-d*M-g*p)*O,e[12]=(o*C-a*P-l*y)*O,e[13]=(n*P-i*C+r*y)*O,e[14]=(E*_-v*w-m*p)*O,e[15]=(d*w-h*_+f*p)*O,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,d=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,d*o+i,d*l-r*a,0,c*l-r*o,d*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,l=n._w,c=s+s,d=a+a,h=o+o,f=s*c,g=s*d,v=s*h,E=a*d,m=a*h,u=o*h,p=l*c,_=l*d,S=l*h,w=i.x,M=i.y,R=i.z;return r[0]=(1-(E+u))*w,r[1]=(g+S)*w,r[2]=(v-_)*w,r[3]=0,r[4]=(g-S)*M,r[5]=(1-(f+u))*M,r[6]=(m+p)*M,r[7]=0,r[8]=(v+_)*R,r[9]=(m-p)*R,r[10]=(1-(f+E))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let a=es.set(r[0],r[1],r[2]).length();const o=es.set(r[4],r[5],r[6]).length(),l=es.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Vn.copy(this);const c=1/a,d=1/o,h=1/l;return Vn.elements[0]*=c,Vn.elements[1]*=c,Vn.elements[2]*=c,Vn.elements[4]*=d,Vn.elements[5]*=d,Vn.elements[6]*=d,Vn.elements[8]*=h,Vn.elements[9]*=h,Vn.elements[10]*=h,n.setFromRotationMatrix(Vn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,n,i,r,s,a,o=li,l=!1){const c=this.elements,d=2*s/(n-e),h=2*s/(i-r),f=(n+e)/(n-e),g=(i+r)/(i-r);let v,E;if(l)v=s/(a-s),E=a*s/(a-s);else if(o===li)v=-(a+s)/(a-s),E=-2*a*s/(a-s);else if(o===Ja)v=-a/(a-s),E=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=li,l=!1){const c=this.elements,d=2/(n-e),h=2/(i-r),f=-(n+e)/(n-e),g=-(i+r)/(i-r);let v,E;if(l)v=1/(a-s),E=a/(a-s);else if(o===li)v=-2/(a-s),E=-(a+s)/(a-s);else if(o===Ja)v=-1/(a-s),E=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=v,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};rc.prototype.isMatrix4=!0;let Mt=rc;const es=new H,Vn=new Mt,JS=new H(0,0,0),eM=new H(1,1,1),Gi=new H,No=new H,vn=new H,xm=new Mt,ym=new vr;class Xr{constructor(e=0,n=0,i=0,r=Xr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],d=r[9],h=r[2],f=r[6],g=r[10];switch(n){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-et(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,g),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(et(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return xm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xm,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return ym.setFromEuler(this),this.setFromQuaternion(ym,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xr.DEFAULT_ORDER="XYZ";class Lh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tM=0;const Sm=new H,ts=new vr,_i=new Mt,Do=new H,la=new H,nM=new H,iM=new vr,Mm=new H(1,0,0),Em=new H(0,1,0),Tm=new H(0,0,1),wm={type:"added"},rM={type:"removed"},ns={type:"childadded",child:null},uu={type:"childremoved",child:null};class tn extends Mr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tM++}),this.uuid=pr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new H,n=new Xr,i=new vr,r=new H(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Mt},normalMatrix:{value:new Xe}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ts.setFromAxisAngle(e,n),this.quaternion.multiply(ts),this}rotateOnWorldAxis(e,n){return ts.setFromAxisAngle(e,n),this.quaternion.premultiply(ts),this}rotateX(e){return this.rotateOnAxis(Mm,e)}rotateY(e){return this.rotateOnAxis(Em,e)}rotateZ(e){return this.rotateOnAxis(Tm,e)}translateOnAxis(e,n){return Sm.copy(e).applyQuaternion(this.quaternion),this.position.add(Sm.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Mm,e)}translateY(e){return this.translateOnAxis(Em,e)}translateZ(e){return this.translateOnAxis(Tm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Do.copy(e):Do.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),la.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(la,Do,this.up):_i.lookAt(Do,la,this.up),this.quaternion.setFromRotationMatrix(_i),r&&(_i.extractRotation(r.matrixWorld),ts.setFromRotationMatrix(_i),this.quaternion.premultiply(ts.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(nt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wm),ns.child=e,this.dispatchEvent(ns),ns.child=null):nt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(rM),uu.child=e,this.dispatchEvent(uu),uu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),_i.multiply(e.parent.matrixWorld)),e.applyMatrix4(_i),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wm),ns.child=e,this.dispatchEvent(ns),ns.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,e,nM),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,iM,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(n){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),f=a(e.skeletons),g=a(e.animations),v=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),g.length>0&&(i.animations=g),v.length>0&&(i.nodes=v)}return i.object=r,i;function a(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}tn.DEFAULT_UP=new H(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Lo extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sM={type:"move"};class fu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const E of e.hand.values()){const m=n.getJointPose(E,i),u=this._getHandJoint(c,E);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),g=.02,v=.005;c.inputState.pinching&&f>g+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=g-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(sM)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Lo;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const K_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},Io={h:0,s:0,l:0};function du(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class lt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Nn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=it.workingColorSpace){return this.r=e,this.g=n,this.b=i,it.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=it.workingColorSpace){if(e=jS(e,1),n=et(n,0,1),i=et(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=du(a,s,e+1/3),this.g=du(a,s,e),this.b=du(a,s,e-1/3)}return it.colorSpaceToWorking(this,r),this}setStyle(e,n=Nn){function i(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Nn){const i=K_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=Os(e.r),this.g=Os(e.g),this.b=Os(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nn){return it.workingToColorSpace(Zt.copy(this),e),Math.round(et(Zt.r*255,0,255))*65536+Math.round(et(Zt.g*255,0,255))*256+Math.round(et(Zt.b*255,0,255))}getHexString(e=Nn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=it.workingColorSpace){it.workingToColorSpace(Zt.copy(this),n);const i=Zt.r,r=Zt.g,s=Zt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const d=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case i:l=(r-s)/h+(r<s?6:0);break;case r:l=(s-i)/h+2;break;case s:l=(i-r)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=it.workingColorSpace){return it.workingToColorSpace(Zt.copy(this),n),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Nn){it.workingToColorSpace(Zt.copy(this),e);const n=Zt.r,i=Zt.g,r=Zt.b;return e!==Nn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+n,Wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Wi),e.getHSL(Io);const i=su(Wi.h,Io.h,n),r=su(Wi.s,Io.s,n),s=su(Wi.l,Io.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new lt;lt.NAMES=K_;class aM extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xr,this.environmentIntensity=1,this.environmentRotation=new Xr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Gn=new H,vi=new H,hu=new H,xi=new H,is=new H,rs=new H,Am=new H,pu=new H,mu=new H,gu=new H,_u=new Ct,vu=new Ct,xu=new Ct;class In{constructor(e=new H,n=new H,i=new H){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Gn.subVectors(e,n),r.cross(Gn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Gn.subVectors(r,n),vi.subVectors(i,n),hu.subVectors(e,n);const a=Gn.dot(Gn),o=Gn.dot(vi),l=Gn.dot(hu),c=vi.dot(vi),d=vi.dot(hu),h=a*c-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,g=(c*l-o*d)*f,v=(a*d-o*l)*f;return s.set(1-g-v,v,g)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(e,n,i,r,s,a,o,l){return this.getBarycoord(e,n,i,r,xi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,xi.x),l.addScaledVector(a,xi.y),l.addScaledVector(o,xi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,a){return _u.setScalar(0),vu.setScalar(0),xu.setScalar(0),_u.fromBufferAttribute(e,n),vu.fromBufferAttribute(e,i),xu.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(_u,s.x),a.addScaledVector(vu,s.y),a.addScaledVector(xu,s.z),a}static isFrontFacing(e,n,i,r){return Gn.subVectors(i,n),vi.subVectors(e,n),Gn.cross(vi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Gn.subVectors(this.c,this.b),vi.subVectors(this.a,this.b),Gn.cross(vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return In.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return In.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return In.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return In.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return In.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;is.subVectors(r,i),rs.subVectors(s,i),pu.subVectors(e,i);const l=is.dot(pu),c=rs.dot(pu);if(l<=0&&c<=0)return n.copy(i);mu.subVectors(e,r);const d=is.dot(mu),h=rs.dot(mu);if(d>=0&&h<=d)return n.copy(r);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return a=l/(l-d),n.copy(i).addScaledVector(is,a);gu.subVectors(e,s);const g=is.dot(gu),v=rs.dot(gu);if(v>=0&&g<=v)return n.copy(s);const E=g*c-l*v;if(E<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(rs,o);const m=d*v-g*h;if(m<=0&&h-d>=0&&g-v>=0)return Am.subVectors(s,r),o=(h-d)/(h-d+(g-v)),n.copy(r).addScaledVector(Am,o);const u=1/(m+E+f);return a=E*u,o=f*u,n.copy(i).addScaledVector(is,a).addScaledVector(rs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ao{constructor(e=new H(1/0,1/0,1/0),n=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Wn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Wn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Wn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Wn):Wn.fromBufferAttribute(s,a),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Uo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Uo.copy(i.boundingBox)),Uo.applyMatrix4(e.matrixWorld),this.union(Uo)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ca),Fo.subVectors(this.max,ca),ss.subVectors(e.a,ca),as.subVectors(e.b,ca),os.subVectors(e.c,ca),ji.subVectors(as,ss),Xi.subVectors(os,as),Tr.subVectors(ss,os);let n=[0,-ji.z,ji.y,0,-Xi.z,Xi.y,0,-Tr.z,Tr.y,ji.z,0,-ji.x,Xi.z,0,-Xi.x,Tr.z,0,-Tr.x,-ji.y,ji.x,0,-Xi.y,Xi.x,0,-Tr.y,Tr.x,0];return!yu(n,ss,as,os,Fo)||(n=[1,0,0,0,1,0,0,0,1],!yu(n,ss,as,os,Fo))?!1:(Oo.crossVectors(ji,Xi),n=[Oo.x,Oo.y,Oo.z],yu(n,ss,as,os,Fo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yi=[new H,new H,new H,new H,new H,new H,new H,new H],Wn=new H,Uo=new ao,ss=new H,as=new H,os=new H,ji=new H,Xi=new H,Tr=new H,ca=new H,Fo=new H,Oo=new H,wr=new H;function yu(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){wr.fromArray(t,s);const o=r.x*Math.abs(wr.x)+r.y*Math.abs(wr.y)+r.z*Math.abs(wr.z),l=e.dot(wr),c=n.dot(wr),d=i.dot(wr);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Lt=new H,ko=new Ge;let oM=0;class On extends Mr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:oM++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Sd,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)ko.fromBufferAttribute(this,n),ko.applyMatrix3(e),this.setXY(n,ko.x,ko.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix3(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix4(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyNormalMatrix(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.transformDirection(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ai(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=ht(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ai(n,this.array)),n}setX(e,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ai(n,this.array)),n}setY(e,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ai(n,this.array)),n}setZ(e,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ai(n,this.array)),n}setW(e,n){return this.normalized&&(n=ht(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=ht(n,this.array),i=ht(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array),s=ht(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Sd&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Z_ extends On{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Q_ extends On{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class hi extends On{constructor(e,n,i){super(new Float32Array(e),n,i)}}const lM=new ao,ua=new H,Su=new H;class Mc{constructor(e=new H,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):lM.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ua.subVectors(e,this.center);const n=ua.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ua,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Su.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ua.copy(e.center).add(Su)),this.expandByPoint(ua.copy(e.center).sub(Su))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let cM=0;const bn=new Mt,Mu=new tn,ls=new H,xn=new ao,fa=new ao,zt=new H;class zn extends Mr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cM++}),this.uuid=pr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(HS(e)?Q_:Z_)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Xe().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,n,i){return bn.makeTranslation(e,n,i),this.applyMatrix4(bn),this}scale(e,n,i){return bn.makeScale(e,n,i),this.applyMatrix4(bn),this}lookAt(e){return Mu.lookAt(e),Mu.updateMatrix(),this.applyMatrix4(Mu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new hi(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ao);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&nt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){nt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];fa.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(xn.min,fa.min),xn.expandByPoint(zt),zt.addVectors(xn.max,fa.max),xn.expandByPoint(zt)):(xn.expandByPoint(fa.min),xn.expandByPoint(fa.max))}xn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(zt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)zt.fromBufferAttribute(o,c),l&&(ls.fromBufferAttribute(e,c),zt.add(ls)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&nt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){nt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new On(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new H,l[y]=new H;const c=new H,d=new H,h=new H,f=new Ge,g=new Ge,v=new Ge,E=new H,m=new H;function u(y,C,N){c.fromBufferAttribute(i,y),d.fromBufferAttribute(i,C),h.fromBufferAttribute(i,N),f.fromBufferAttribute(s,y),g.fromBufferAttribute(s,C),v.fromBufferAttribute(s,N),d.sub(c),h.sub(c),g.sub(f),v.sub(f);const P=1/(g.x*v.y-v.x*g.y);isFinite(P)&&(E.copy(d).multiplyScalar(v.y).addScaledVector(h,-g.y).multiplyScalar(P),m.copy(h).multiplyScalar(g.x).addScaledVector(d,-v.x).multiplyScalar(P),o[y].add(E),o[C].add(E),o[N].add(E),l[y].add(m),l[C].add(m),l[N].add(m))}let p=this.groups;p.length===0&&(p=[{start:0,count:e.count}]);for(let y=0,C=p.length;y<C;++y){const N=p[y],P=N.start,B=N.count;for(let Y=P,J=P+B;Y<J;Y+=3)u(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const _=new H,S=new H,w=new H,M=new H;function R(y){w.fromBufferAttribute(r,y),M.copy(w);const C=o[y];_.copy(C),_.sub(w.multiplyScalar(w.dot(C))).normalize(),S.crossVectors(M,C);const P=S.dot(l[y])<0?-1:1;a.setXYZW(y,_.x,_.y,_.z,P)}for(let y=0,C=p.length;y<C;++y){const N=p[y],P=N.start,B=N.count;for(let Y=P,J=P+B;Y<J;Y+=3)R(e.getX(Y+0)),R(e.getX(Y+1)),R(e.getX(Y+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new On(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,g=i.count;f<g;f++)i.setXYZ(f,0,0,0);const r=new H,s=new H,a=new H,o=new H,l=new H,c=new H,d=new H,h=new H;if(e)for(let f=0,g=e.count;f<g;f+=3){const v=e.getX(f+0),E=e.getX(f+1),m=e.getX(f+2);r.fromBufferAttribute(n,v),s.fromBufferAttribute(n,E),a.fromBufferAttribute(n,m),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,g=n.count;f<g;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),a.fromBufferAttribute(n,f+2),d.subVectors(a,s),h.subVectors(r,s),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)zt.fromBufferAttribute(e,n),zt.normalize(),e.setXYZ(n,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,f=new c.constructor(l.length*d);let g=0,v=0;for(let E=0,m=l.length;E<m;E++){o.isInterleavedBufferAttribute?g=l[E]*o.data.stride+o.offset:g=l[E]*d;for(let u=0;u<d;u++)f[v++]=c[g++]}return new On(f,d,h)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new zn,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,h=c.length;d<h;d++){const f=c[d],g=e(f,i);l.push(g)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const g=c[h];d.push(g.toJSON(e.data))}d.length>0&&(r[l]=d,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let f=0,g=h.length;f<g;f++)d.push(h[f].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}class uM{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=Sd,this.updateRanges=[],this.version=0,this.uuid=pr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const rn=new H;class tc{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)rn.fromBufferAttribute(this,n),rn.applyMatrix4(e),this.setXYZ(n,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)rn.fromBufferAttribute(this,n),rn.applyNormalMatrix(e),this.setXYZ(n,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)rn.fromBufferAttribute(this,n),rn.transformDirection(e),this.setXYZ(n,rn.x,rn.y,rn.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=ai(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=ht(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=ht(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=ai(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=ai(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=ai(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=ai(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=ht(n,this.array),i=ht(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=ht(n,this.array),i=ht(i,this.array),r=ht(r,this.array),s=ht(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){ec("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new On(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new tc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ec("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let fM=0;class Qs extends Mr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fM++}),this.uuid=pr(),this.name="",this.type="Material",this.blending=Fs,this.side=_r,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=If,this.blendDst=Uf,this.blendEquation=Pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ve(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ve(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Fs&&(i.blending=this.blending),this.side!==_r&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==If&&(i.blendSrc=this.blendSrc),this.blendDst!==Uf&&(i.blendDst=this.blendDst),this.blendEquation!==Pr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==js&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class J_ extends Qs{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let cs;const da=new H,us=new H,fs=new H,ds=new Ge,ha=new Ge,ev=new Mt,Bo=new H,pa=new H,zo=new H,Rm=new Ge,Eu=new Ge,Cm=new Ge;class dM extends tn{constructor(e=new J_){if(super(),this.isSprite=!0,this.type="Sprite",cs===void 0){cs=new zn;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new uM(n,5);cs.setIndex([0,1,2,0,2,3]),cs.setAttribute("position",new tc(i,3,0,!1)),cs.setAttribute("uv",new tc(i,2,3,!1))}this.geometry=cs,this.material=e,this.center=new Ge(.5,.5),this.count=1}raycast(e,n){e.camera===null&&nt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),us.setFromMatrixScale(this.matrixWorld),ev.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),fs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&us.multiplyScalar(-fs.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;Ho(Bo.set(-.5,-.5,0),fs,a,us,r,s),Ho(pa.set(.5,-.5,0),fs,a,us,r,s),Ho(zo.set(.5,.5,0),fs,a,us,r,s),Rm.set(0,0),Eu.set(1,0),Cm.set(1,1);let o=e.ray.intersectTriangle(Bo,pa,zo,!1,da);if(o===null&&(Ho(pa.set(-.5,.5,0),fs,a,us,r,s),Eu.set(0,1),o=e.ray.intersectTriangle(Bo,zo,pa,!1,da),o===null))return;const l=e.ray.origin.distanceTo(da);l<e.near||l>e.far||n.push({distance:l,point:da.clone(),uv:In.getInterpolation(da,Bo,pa,zo,Rm,Eu,Cm,new Ge),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ho(t,e,n,i,r,s){ds.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(ha.x=s*ds.x-r*ds.y,ha.y=r*ds.x+s*ds.y):ha.copy(ds),t.copy(e),t.x+=ha.x,t.y+=ha.y,t.applyMatrix4(ev)}const Si=new H,Tu=new H,Vo=new H,Yi=new H,wu=new H,Go=new H,Au=new H;class Ec{constructor(e=new H,n=new H(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Si)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Si.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Si.copy(this.origin).addScaledVector(this.direction,n),Si.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Tu.copy(e).add(n).multiplyScalar(.5),Vo.copy(n).sub(e).normalize(),Yi.copy(this.origin).sub(Tu);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Vo),o=Yi.dot(this.direction),l=-Yi.dot(Vo),c=Yi.lengthSq(),d=Math.abs(1-a*a);let h,f,g,v;if(d>0)if(h=a*l-o,f=a*o-l,v=s*d,h>=0)if(f>=-v)if(f<=v){const E=1/d;h*=E,f*=E,g=h*(h+a*f+2*o)+f*(a*h+f+2*l)+c}else f=s,h=Math.max(0,-(a*f+o)),g=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(a*f+o)),g=-h*h+f*(f+2*l)+c;else f<=-v?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-l),s),g=-h*h+f*(f+2*l)+c):f<=v?(h=0,f=Math.min(Math.max(-s,-l),s),g=f*(f+2*l)+c):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-l),s),g=-h*h+f*(f+2*l)+c);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),g=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(Tu).addScaledVector(Vo,f),g}intersectSphere(e,n){Si.subVectors(e.center,this.origin);const i=Si.dot(this.direction),r=Si.dot(Si)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),d>=0?(s=(e.min.y-f.y)*d,a=(e.max.y-f.y)*d):(s=(e.max.y-f.y)*d,a=(e.min.y-f.y)*d),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),h>=0?(o=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Si)!==null}intersectTriangle(e,n,i,r,s){wu.subVectors(n,e),Go.subVectors(i,e),Au.crossVectors(wu,Go);let a=this.direction.dot(Au),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yi.subVectors(this.origin,e);const l=o*this.direction.dot(Go.crossVectors(Yi,Go));if(l<0)return null;const c=o*this.direction.dot(wu.cross(Yi));if(c<0||l+c>a)return null;const d=-o*Yi.dot(Au);return d<0?null:this.at(d/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tv extends Qs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xr,this.combine=D_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bm=new Mt,Ar=new Ec,Wo=new Mc,Pm=new H,jo=new H,Xo=new H,Yo=new H,Ru=new H,qo=new H,Nm=new H,$o=new H;class Oi extends tn{constructor(e=new zn,n=new tv){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){qo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],h=s[l];d!==0&&(Ru.fromBufferAttribute(h,e),a?qo.addScaledVector(Ru,d):qo.addScaledVector(Ru.sub(n),d))}n.add(qo)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wo.copy(i.boundingSphere),Wo.applyMatrix4(s),Ar.copy(e.ray).recast(e.near),!(Wo.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(Wo,Pm)===null||Ar.origin.distanceToSquared(Pm)>(e.far-e.near)**2))&&(bm.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(bm),!(i.boundingBox!==null&&Ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ar)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,f=s.groups,g=s.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,E=f.length;v<E;v++){const m=f[v],u=a[m.materialIndex],p=Math.max(m.start,g.start),_=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let S=p,w=_;S<w;S+=3){const M=o.getX(S),R=o.getX(S+1),y=o.getX(S+2);r=Ko(this,u,e,i,c,d,h,M,R,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,g.start),E=Math.min(o.count,g.start+g.count);for(let m=v,u=E;m<u;m+=3){const p=o.getX(m),_=o.getX(m+1),S=o.getX(m+2);r=Ko(this,a,e,i,c,d,h,p,_,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let v=0,E=f.length;v<E;v++){const m=f[v],u=a[m.materialIndex],p=Math.max(m.start,g.start),_=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let S=p,w=_;S<w;S+=3){const M=S,R=S+1,y=S+2;r=Ko(this,u,e,i,c,d,h,M,R,y),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const v=Math.max(0,g.start),E=Math.min(l.count,g.start+g.count);for(let m=v,u=E;m<u;m+=3){const p=m,_=m+1,S=m+2;r=Ko(this,a,e,i,c,d,h,p,_,S),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function hM(t,e,n,i,r,s,a,o){let l;if(e.side===gn?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===_r,o),l===null)return null;$o.copy(o),$o.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo($o);return c<n.near||c>n.far?null:{distance:c,point:$o.clone(),object:t}}function Ko(t,e,n,i,r,s,a,o,l,c){t.getVertexPosition(o,jo),t.getVertexPosition(l,Xo),t.getVertexPosition(c,Yo);const d=hM(t,e,n,i,jo,Xo,Yo,Nm);if(d){const h=new H;In.getBarycoord(Nm,jo,Xo,Yo,h),r&&(d.uv=In.getInterpolatedAttribute(r,o,l,c,h,new Ge)),s&&(d.uv1=In.getInterpolatedAttribute(s,o,l,c,h,new Ge)),a&&(d.normal=In.getInterpolatedAttribute(a,o,l,c,h,new H),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new H,materialIndex:0};In.getNormal(jo,Xo,Yo,f.normal),d.face=f,d.barycoord=h}return d}class pM extends en{constructor(e=null,n=1,i=1,r,s,a,o,l,c=Wt,d=Wt,h,f){super(null,a,o,l,c,d,r,s,h,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Cu=new H,mM=new H,gM=new Xe;class Ji{constructor(e=new H(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Cu.subVectors(i,n).cross(mM.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Cu),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:n.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||gM.getNormalMatrix(e),r=this.coplanarPoint(Cu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rr=new Mc,_M=new Ge(.5,.5),Zo=new H;class Ih{constructor(e=new Ji,n=new Ji,i=new Ji,r=new Ji,s=new Ji,a=new Ji){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=li,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],d=s[4],h=s[5],f=s[6],g=s[7],v=s[8],E=s[9],m=s[10],u=s[11],p=s[12],_=s[13],S=s[14],w=s[15];if(r[0].setComponents(c-a,g-d,u-v,w-p).normalize(),r[1].setComponents(c+a,g+d,u+v,w+p).normalize(),r[2].setComponents(c+o,g+h,u+E,w+_).normalize(),r[3].setComponents(c-o,g-h,u-E,w-_).normalize(),i)r[4].setComponents(l,f,m,S).normalize(),r[5].setComponents(c-l,g-f,u-m,w-S).normalize();else if(r[4].setComponents(c-l,g-f,u-m,w-S).normalize(),n===li)r[5].setComponents(c+l,g+f,u+m,w+S).normalize();else if(n===Ja)r[5].setComponents(l,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rr)}intersectsSprite(e){Rr.center.set(0,0,0);const n=_M.distanceTo(e.center);return Rr.radius=.7071067811865476+n,Rr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Zo.x=r.normal.x>0?e.max.x:e.min.x,Zo.y=r.normal.y>0?e.max.y:e.min.y,Zo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class nv extends Qs{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const nc=new H,ic=new H,Dm=new Mt,ma=new Ec,Qo=new Mc,bu=new H,Lm=new H;class vM extends tn{constructor(e=new zn,n=new nv){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)nc.fromBufferAttribute(n,r-1),ic.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=nc.distanceTo(ic);e.setAttribute("lineDistance",new hi(i,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qo.copy(i.boundingSphere),Qo.applyMatrix4(r),Qo.radius+=s,e.ray.intersectsSphere(Qo)===!1)return;Dm.copy(r).invert(),ma.copy(e.ray).applyMatrix4(Dm);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const g=Math.max(0,a.start),v=Math.min(d.count,a.start+a.count);for(let E=g,m=v-1;E<m;E+=c){const u=d.getX(E),p=d.getX(E+1),_=Jo(this,e,ma,l,u,p,E);_&&n.push(_)}if(this.isLineLoop){const E=d.getX(v-1),m=d.getX(g),u=Jo(this,e,ma,l,E,m,v-1);u&&n.push(u)}}else{const g=Math.max(0,a.start),v=Math.min(f.count,a.start+a.count);for(let E=g,m=v-1;E<m;E+=c){const u=Jo(this,e,ma,l,E,E+1,E);u&&n.push(u)}if(this.isLineLoop){const E=Jo(this,e,ma,l,v-1,g,v-1);E&&n.push(E)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Jo(t,e,n,i,r,s,a){const o=t.geometry.attributes.position;if(nc.fromBufferAttribute(o,r),ic.fromBufferAttribute(o,s),n.distanceSqToSegment(nc,ic,bu,Lm)>i)return;bu.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(bu);if(!(c<e.near||c>e.far))return{distance:c,point:Lm.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}class iv extends en{constructor(e=[],n=Wr,i,r,s,a,o,l,c,d){super(e,n,i,r,s,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xM extends en{constructor(e,n,i,r,s,a,o,l,c){super(e,n,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ys extends en{constructor(e,n,i=pi,r,s,a,o=Wt,l=Wt,c,d=Fi,h=1){if(d!==Fi&&d!==Fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:n,depth:h};super(f,r,s,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Dh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class yM extends Ys{constructor(e,n=pi,i=Wr,r,s,a=Wt,o=Wt,l,c=Fi){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,n,i,r,s,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class rv extends en{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class oo extends zn{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],d=[],h=[];let f=0,g=0;v("z","y","x",-1,-1,i,n,e,a,s,0),v("z","y","x",1,-1,i,n,-e,a,s,1),v("x","z","y",1,1,e,i,n,r,a,2),v("x","z","y",1,-1,e,i,-n,r,a,3),v("x","y","z",1,-1,e,n,i,r,s,4),v("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new hi(c,3)),this.setAttribute("normal",new hi(d,3)),this.setAttribute("uv",new hi(h,2));function v(E,m,u,p,_,S,w,M,R,y,C){const N=S/R,P=w/y,B=S/2,Y=w/2,J=M/2,O=R+1,W=y+1;let I=0,F=0;const G=new H;for(let $=0;$<W;$++){const V=$*P-Y;for(let te=0;te<O;te++){const re=te*N-B;G[E]=re*p,G[m]=V*_,G[u]=J,c.push(G.x,G.y,G.z),G[E]=0,G[m]=0,G[u]=M>0?1:-1,d.push(G.x,G.y,G.z),h.push(te/R),h.push(1-$/y),I+=1}}for(let $=0;$<y;$++)for(let V=0;V<R;V++){const te=f+V+O*$,re=f+V+O*($+1),Ee=f+(V+1)+O*($+1),ue=f+(V+1)+O*$;l.push(te,re,ue),l.push(re,Ee,ue),F+=6}o.addGroup(g,F,C),g+=F,f+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Tc extends zn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),l=Math.floor(r),c=o+1,d=l+1,h=e/o,f=n/l,g=[],v=[],E=[],m=[];for(let u=0;u<d;u++){const p=u*f-a;for(let _=0;_<c;_++){const S=_*h-s;v.push(S,-p,0),E.push(0,0,1),m.push(_/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let p=0;p<o;p++){const _=p+c*u,S=p+c*(u+1),w=p+1+c*(u+1),M=p+1+c*u;g.push(_,S,M),g.push(S,w,M)}this.setIndex(g),this.setAttribute("position",new hi(v,3)),this.setAttribute("normal",new hi(E,3)),this.setAttribute("uv",new hi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tc(e.width,e.height,e.widthSegments,e.heightSegments)}}function qs(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(Im(r))r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(Im(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function sn(t){const e={};for(let n=0;n<t.length;n++){const i=qs(t[n]);for(const r in i)e[r]=i[r]}return e}function Im(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function SM(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function sv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const MM={clone:qs,merge:sn};var EM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,TM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends Qs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=EM,this.fragmentShader=TM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=qs(e.uniforms),this.uniformsGroups=SM(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class wM extends mi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class AM extends Qs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=LS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class RM extends Qs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class av extends tn{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new lt(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Pu=new Mt,Um=new H,Fm=new H;class CM{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ih,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Um.setFromMatrixPosition(e.matrixWorld),n.position.copy(Um),Fm.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Fm),n.updateMatrixWorld(),Pu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Pu,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===Ja||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Pu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const el=new H,tl=new vr,ti=new H;class ov extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(el,tl,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(el,tl,ti.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(el,tl,ti),ti.x===1&&ti.y===1&&ti.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(el,tl,ti.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qi=new H,Om=new Ge,km=new Ge;class Sn extends ov{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ed*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ml*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ed*2*Math.atan(Math.tan(Ml*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,n){return this.getViewBounds(e,Om,km),n.subVectors(km,Om)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Ml*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,n-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class bM extends CM{constructor(){super(new Sn(90,1,.5,500)),this.isPointLightShadow=!0}}class Bm extends av{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new bM}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class lv extends ov{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class PM extends av{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const hs=-90,ps=1;class NM extends tn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Sn(hs,ps,e,n);r.layers=this.layers,this.add(r);const s=new Sn(hs,ps,e,n);s.layers=this.layers,this.add(s);const a=new Sn(hs,ps,e,n);a.layers=this.layers,this.add(a);const o=new Sn(hs,ps,e,n);o.layers=this.layers,this.add(o);const l=new Sn(hs,ps,e,n);l.layers=this.layers,this.add(l);const c=new Sn(hs,ps,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,l]=n;for(const c of n)this.remove(c);if(e===li)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ja)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,d]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),e.setRenderTarget(h,f,g),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class DM extends Sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const zm=new Mt;class LM{constructor(e,n,i=0,r=1/0){this.ray=new Ec(e,n),this.near=i,this.far=r,this.camera=null,this.layers=new Lh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,n){this.ray.set(e,n)}setFromCamera(e,n){n.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(n.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(n).sub(this.ray.origin).normalize(),this.camera=n):n.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(n.near+n.far)/(n.near-n.far)).unproject(n),this.ray.direction.set(0,0,-1).transformDirection(n.matrixWorld),this.camera=n):nt("Raycaster: Unsupported camera type: "+n.type)}setFromXRController(e){return zm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(zm),this}intersectObject(e,n=!0,i=[]){return Td(e,this,i,n),i.sort(Hm),i}intersectObjects(e,n=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Td(e[r],this,i,n);return i.sort(Hm),i}}function Hm(t,e){return t.distance-e.distance}function Td(t,e,n,i){let r=!0;if(t.layers.test(e.layers)&&t.raycast(e,n)===!1&&(r=!1),r===!0&&i===!0){const s=t.children;for(let a=0,o=s.length;a<o;a++)Td(s[a],e,n,!0)}}class Vm{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(et(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const zh=class zh{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};zh.prototype.isMatrix2=!0;let Gm=zh;class IM extends Mr{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ve("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Wm(t,e,n,i){const r=UM(i);switch(n){case j_:return t*e;case Y_:return t*e/r.components*r.byteLength;case Rh:return t*e/r.components*r.byteLength;case jr:return t*e*2/r.components*r.byteLength;case Ch:return t*e*2/r.components*r.byteLength;case X_:return t*e*3/r.components*r.byteLength;case qn:return t*e*4/r.components*r.byteLength;case bh:return t*e*4/r.components*r.byteLength;case vl:case xl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case yl:case Sl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Xf:case qf:return Math.max(t,16)*Math.max(e,8)/4;case jf:case Yf:return Math.max(t,8)*Math.max(e,8)/2;case $f:case Kf:case Qf:case Jf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Zf:case $l:case ed:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case td:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case nd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case id:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case rd:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case sd:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case ad:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case od:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case ld:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case cd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case ud:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case fd:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case dd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case hd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case pd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case md:case gd:case _d:return Math.ceil(t/4)*Math.ceil(e/4)*16;case vd:case xd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Kl:case yd:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function UM(t){switch(t){case Mn:case H_:return{byteLength:1,components:1};case Za:case V_:case Ui:return{byteLength:2,components:1};case wh:case Ah:return{byteLength:2,components:4};case pi:case Th:case oi:return{byteLength:4,components:1};case G_:case W_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eh}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function cv(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function FM(t){const e=new WeakMap;function n(o,l){const c=o.array,d=o.usage,h=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,d),o.onUploadCallback();let g;if(c instanceof Float32Array)g=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=t.HALF_FLOAT:g=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=t.SHORT;else if(c instanceof Uint32Array)g=t.UNSIGNED_INT;else if(c instanceof Int32Array)g=t.INT;else if(c instanceof Int8Array)g=t.BYTE;else if(c instanceof Uint8Array)g=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,d);else{h.sort((g,v)=>g.start-v.start);let f=0;for(let g=1;g<h.length;g++){const v=h[f],E=h[g];E.start<=v.start+v.count+1?v.count=Math.max(v.count,E.start+E.count-v.start):(++f,h[f]=E)}h.length=f+1;for(let g=0,v=h.length;g<v;g++){const E=h[g];t.bufferSubData(c,E.start*d.BYTES_PER_ELEMENT,d,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:r,remove:s,update:a}}var OM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kM=`#ifdef USE_ALPHAHASH
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
#endif`,BM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,HM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,VM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,GM=`#ifdef USE_AOMAP
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
#endif`,WM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jM=`#ifdef USE_BATCHING
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
#endif`,XM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,YM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$M=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,KM=`#ifdef USE_IRIDESCENCE
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
#endif`,ZM=`#ifdef USE_BUMPMAP
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
#endif`,QM=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,JM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,eE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,iE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sE=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,aE=`#define PI 3.141592653589793
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
} // validated`,oE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lE=`vec3 transformedNormal = objectNormal;
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
#endif`,cE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hE="gl_FragColor = linearToOutputTexel( gl_FragColor );",pE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mE=`#ifdef USE_ENVMAP
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
#endif`,gE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_E=`#ifdef USE_ENVMAP
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
#endif`,vE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xE=`#ifdef USE_ENVMAP
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
#endif`,yE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,SE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ME=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,EE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,TE=`#ifdef USE_GRADIENTMAP
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
}`,wE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,AE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,RE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CE=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,bE=`#ifdef USE_ENVMAP
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
#endif`,PE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,NE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,DE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,LE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,IE=`PhysicalMaterial material;
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
#endif`,UE=`uniform sampler2D dfgLUT;
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
}`,FE=`
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
#endif`,OE=`#if defined( RE_IndirectDiffuse )
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
#endif`,kE=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,BE=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,zE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,HE=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,VE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,GE=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,WE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,XE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,YE=`#if defined( USE_POINTS_UV )
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
#endif`,qE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$E=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,KE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ZE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,QE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JE=`#ifdef USE_MORPHTARGETS
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
#endif`,eT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,iT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,aT=`#ifdef USE_NORMALMAP
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
#endif`,oT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,uT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,fT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_T=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ST=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,MT=`float getShadowMask() {
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
}`,ET=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,TT=`#ifdef USE_SKINNING
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
#endif`,wT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,AT=`#ifdef USE_SKINNING
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
#endif`,RT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,PT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,NT=`#ifdef USE_TRANSMISSION
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
#endif`,DT=`#ifdef USE_TRANSMISSION
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
#endif`,LT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,IT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,UT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,FT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const OT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,kT=`uniform sampler2D t2D;
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
}`,BT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,HT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,VT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GT=`#include <common>
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
}`,WT=`#if DEPTH_PACKING == 3200
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
}`,jT=`#define DISTANCE
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
}`,XT=`#define DISTANCE
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
}`,YT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$T=`uniform float scale;
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
}`,KT=`uniform vec3 diffuse;
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
}`,ZT=`#include <common>
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
}`,QT=`uniform vec3 diffuse;
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
}`,JT=`#define LAMBERT
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
}`,e1=`#define LAMBERT
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
}`,t1=`#define MATCAP
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
}`,n1=`#define MATCAP
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
}`,i1=`#define NORMAL
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
}`,r1=`#define NORMAL
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
}`,s1=`#define PHONG
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
}`,a1=`#define PHONG
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
}`,o1=`#define STANDARD
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
}`,l1=`#define STANDARD
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
}`,c1=`#define TOON
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
}`,u1=`#define TOON
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
}`,f1=`uniform float size;
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
}`,d1=`uniform vec3 diffuse;
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
}`,h1=`#include <common>
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
}`,p1=`uniform vec3 color;
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
}`,m1=`uniform float rotation;
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
}`,g1=`uniform vec3 diffuse;
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
}`,Ze={alphahash_fragment:OM,alphahash_pars_fragment:kM,alphamap_fragment:BM,alphamap_pars_fragment:zM,alphatest_fragment:HM,alphatest_pars_fragment:VM,aomap_fragment:GM,aomap_pars_fragment:WM,batching_pars_vertex:jM,batching_vertex:XM,begin_vertex:YM,beginnormal_vertex:qM,bsdfs:$M,iridescence_fragment:KM,bumpmap_pars_fragment:ZM,clipping_planes_fragment:QM,clipping_planes_pars_fragment:JM,clipping_planes_pars_vertex:eE,clipping_planes_vertex:tE,color_fragment:nE,color_pars_fragment:iE,color_pars_vertex:rE,color_vertex:sE,common:aE,cube_uv_reflection_fragment:oE,defaultnormal_vertex:lE,displacementmap_pars_vertex:cE,displacementmap_vertex:uE,emissivemap_fragment:fE,emissivemap_pars_fragment:dE,colorspace_fragment:hE,colorspace_pars_fragment:pE,envmap_fragment:mE,envmap_common_pars_fragment:gE,envmap_pars_fragment:_E,envmap_pars_vertex:vE,envmap_physical_pars_fragment:bE,envmap_vertex:xE,fog_vertex:yE,fog_pars_vertex:SE,fog_fragment:ME,fog_pars_fragment:EE,gradientmap_pars_fragment:TE,lightmap_pars_fragment:wE,lights_lambert_fragment:AE,lights_lambert_pars_fragment:RE,lights_pars_begin:CE,lights_toon_fragment:PE,lights_toon_pars_fragment:NE,lights_phong_fragment:DE,lights_phong_pars_fragment:LE,lights_physical_fragment:IE,lights_physical_pars_fragment:UE,lights_fragment_begin:FE,lights_fragment_maps:OE,lights_fragment_end:kE,lightprobes_pars_fragment:BE,logdepthbuf_fragment:zE,logdepthbuf_pars_fragment:HE,logdepthbuf_pars_vertex:VE,logdepthbuf_vertex:GE,map_fragment:WE,map_pars_fragment:jE,map_particle_fragment:XE,map_particle_pars_fragment:YE,metalnessmap_fragment:qE,metalnessmap_pars_fragment:$E,morphinstance_vertex:KE,morphcolor_vertex:ZE,morphnormal_vertex:QE,morphtarget_pars_vertex:JE,morphtarget_vertex:eT,normal_fragment_begin:tT,normal_fragment_maps:nT,normal_pars_fragment:iT,normal_pars_vertex:rT,normal_vertex:sT,normalmap_pars_fragment:aT,clearcoat_normal_fragment_begin:oT,clearcoat_normal_fragment_maps:lT,clearcoat_pars_fragment:cT,iridescence_pars_fragment:uT,opaque_fragment:fT,packing:dT,premultiplied_alpha_fragment:hT,project_vertex:pT,dithering_fragment:mT,dithering_pars_fragment:gT,roughnessmap_fragment:_T,roughnessmap_pars_fragment:vT,shadowmap_pars_fragment:xT,shadowmap_pars_vertex:yT,shadowmap_vertex:ST,shadowmask_pars_fragment:MT,skinbase_vertex:ET,skinning_pars_vertex:TT,skinning_vertex:wT,skinnormal_vertex:AT,specularmap_fragment:RT,specularmap_pars_fragment:CT,tonemapping_fragment:bT,tonemapping_pars_fragment:PT,transmission_fragment:NT,transmission_pars_fragment:DT,uv_pars_fragment:LT,uv_pars_vertex:IT,uv_vertex:UT,worldpos_vertex:FT,background_vert:OT,background_frag:kT,backgroundCube_vert:BT,backgroundCube_frag:zT,cube_vert:HT,cube_frag:VT,depth_vert:GT,depth_frag:WT,distance_vert:jT,distance_frag:XT,equirect_vert:YT,equirect_frag:qT,linedashed_vert:$T,linedashed_frag:KT,meshbasic_vert:ZT,meshbasic_frag:QT,meshlambert_vert:JT,meshlambert_frag:e1,meshmatcap_vert:t1,meshmatcap_frag:n1,meshnormal_vert:i1,meshnormal_frag:r1,meshphong_vert:s1,meshphong_frag:a1,meshphysical_vert:o1,meshphysical_frag:l1,meshtoon_vert:c1,meshtoon_frag:u1,points_vert:f1,points_frag:d1,shadow_vert:h1,shadow_frag:p1,sprite_vert:m1,sprite_frag:g1},ye={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new H},probesMax:{value:new H},probesResolution:{value:new H}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},ri={basic:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new lt(0)},envMapIntensity:{value:1}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:sn([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:sn([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new lt(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:sn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:sn([ye.points,ye.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:sn([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:sn([ye.common,ye.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:sn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:sn([ye.sprite,ye.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distance:{uniforms:sn([ye.common,ye.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distance_vert,fragmentShader:Ze.distance_frag},shadow:{uniforms:sn([ye.lights,ye.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};ri.physical={uniforms:sn([ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};const nl={r:0,b:0,g:0},_1=new Mt,uv=new Xe;uv.set(-1,0,0,0,1,0,0,0,1);function v1(t,e,n,i,r,s){const a=new lt(0);let o=r===!0?0:1,l,c,d=null,h=0,f=null;function g(p){let _=p.isScene===!0?p.background:null;if(_&&_.isTexture){const S=p.backgroundBlurriness>0;_=e.get(_,S)}return _}function v(p){let _=!1;const S=g(p);S===null?m(a,o):S&&S.isColor&&(m(S,1),_=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function E(p,_){const S=g(_);S&&(S.isCubeTexture||S.mapping===Sc)?(c===void 0&&(c=new Oi(new oo(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:qs(ri.backgroundCube.uniforms),vertexShader:ri.backgroundCube.vertexShader,fragmentShader:ri.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,M,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(_1.makeRotationFromEuler(_.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(uv),c.material.toneMapped=it.getTransfer(S.colorSpace)!==ct,(d!==S||h!==S.version||f!==t.toneMapping)&&(c.material.needsUpdate=!0,d=S,h=S.version,f=t.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Oi(new Tc(2,2),new mi({name:"BackgroundMaterial",uniforms:qs(ri.background.uniforms),vertexShader:ri.background.vertexShader,fragmentShader:ri.background.fragmentShader,side:_r,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=it.getTransfer(S.colorSpace)!==ct,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||h!==S.version||f!==t.toneMapping)&&(l.material.needsUpdate=!0,d=S,h=S.version,f=t.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function m(p,_){p.getRGB(nl,sv(t)),n.buffers.color.setClear(nl.r,nl.g,nl.b,_,s)}function u(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(p,_=1){a.set(p),o=_,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(p){o=p,m(a,o)},render:v,addToRenderList:E,dispose:u}}function x1(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,a=!1;function o(P,B,Y,J,O){let W=!1;const I=h(P,J,Y,B);s!==I&&(s=I,c(s.object)),W=g(P,J,Y,O),W&&v(P,J,Y,O),O!==null&&e.update(O,t.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,S(P,B,Y,J),O!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function l(){return t.createVertexArray()}function c(P){return t.bindVertexArray(P)}function d(P){return t.deleteVertexArray(P)}function h(P,B,Y,J){const O=J.wireframe===!0;let W=i[B.id];W===void 0&&(W={},i[B.id]=W);const I=P.isInstancedMesh===!0?P.id:0;let F=W[I];F===void 0&&(F={},W[I]=F);let G=F[Y.id];G===void 0&&(G={},F[Y.id]=G);let $=G[O];return $===void 0&&($=f(l()),G[O]=$),$}function f(P){const B=[],Y=[],J=[];for(let O=0;O<n;O++)B[O]=0,Y[O]=0,J[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:Y,attributeDivisors:J,object:P,attributes:{},index:null}}function g(P,B,Y,J){const O=s.attributes,W=B.attributes;let I=0;const F=Y.getAttributes();for(const G in F)if(F[G].location>=0){const V=O[G];let te=W[G];if(te===void 0&&(G==="instanceMatrix"&&P.instanceMatrix&&(te=P.instanceMatrix),G==="instanceColor"&&P.instanceColor&&(te=P.instanceColor)),V===void 0||V.attribute!==te||te&&V.data!==te.data)return!0;I++}return s.attributesNum!==I||s.index!==J}function v(P,B,Y,J){const O={},W=B.attributes;let I=0;const F=Y.getAttributes();for(const G in F)if(F[G].location>=0){let V=W[G];V===void 0&&(G==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),G==="instanceColor"&&P.instanceColor&&(V=P.instanceColor));const te={};te.attribute=V,V&&V.data&&(te.data=V.data),O[G]=te,I++}s.attributes=O,s.attributesNum=I,s.index=J}function E(){const P=s.newAttributes;for(let B=0,Y=P.length;B<Y;B++)P[B]=0}function m(P){u(P,0)}function u(P,B){const Y=s.newAttributes,J=s.enabledAttributes,O=s.attributeDivisors;Y[P]=1,J[P]===0&&(t.enableVertexAttribArray(P),J[P]=1),O[P]!==B&&(t.vertexAttribDivisor(P,B),O[P]=B)}function p(){const P=s.newAttributes,B=s.enabledAttributes;for(let Y=0,J=B.length;Y<J;Y++)B[Y]!==P[Y]&&(t.disableVertexAttribArray(Y),B[Y]=0)}function _(P,B,Y,J,O,W,I){I===!0?t.vertexAttribIPointer(P,B,Y,O,W):t.vertexAttribPointer(P,B,Y,J,O,W)}function S(P,B,Y,J){E();const O=J.attributes,W=Y.getAttributes(),I=B.defaultAttributeValues;for(const F in W){const G=W[F];if(G.location>=0){let $=O[F];if($===void 0&&(F==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),F==="instanceColor"&&P.instanceColor&&($=P.instanceColor)),$!==void 0){const V=$.normalized,te=$.itemSize,re=e.get($);if(re===void 0)continue;const Ee=re.buffer,ue=re.type,U=re.bytesPerElement,K=ue===t.INT||ue===t.UNSIGNED_INT||$.gpuType===Th;if($.isInterleavedBufferAttribute){const Z=$.data,ae=Z.stride,Te=$.offset;if(Z.isInstancedInterleavedBuffer){for(let ve=0;ve<G.locationSize;ve++)u(G.location+ve,Z.meshPerAttribute);P.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ve=0;ve<G.locationSize;ve++)m(G.location+ve);t.bindBuffer(t.ARRAY_BUFFER,Ee);for(let ve=0;ve<G.locationSize;ve++)_(G.location+ve,te/G.locationSize,ue,V,ae*U,(Te+te/G.locationSize*ve)*U,K)}else{if($.isInstancedBufferAttribute){for(let Z=0;Z<G.locationSize;Z++)u(G.location+Z,$.meshPerAttribute);P.isInstancedMesh!==!0&&J._maxInstanceCount===void 0&&(J._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Z=0;Z<G.locationSize;Z++)m(G.location+Z);t.bindBuffer(t.ARRAY_BUFFER,Ee);for(let Z=0;Z<G.locationSize;Z++)_(G.location+Z,te/G.locationSize,ue,V,te*U,te/G.locationSize*Z*U,K)}}else if(I!==void 0){const V=I[F];if(V!==void 0)switch(V.length){case 2:t.vertexAttrib2fv(G.location,V);break;case 3:t.vertexAttrib3fv(G.location,V);break;case 4:t.vertexAttrib4fv(G.location,V);break;default:t.vertexAttrib1fv(G.location,V)}}}}p()}function w(){C();for(const P in i){const B=i[P];for(const Y in B){const J=B[Y];for(const O in J){const W=J[O];for(const I in W)d(W[I].object),delete W[I];delete J[O]}}delete i[P]}}function M(P){if(i[P.id]===void 0)return;const B=i[P.id];for(const Y in B){const J=B[Y];for(const O in J){const W=J[O];for(const I in W)d(W[I].object),delete W[I];delete J[O]}}delete i[P.id]}function R(P){for(const B in i){const Y=i[B];for(const J in Y){const O=Y[J];if(O[P.id]===void 0)continue;const W=O[P.id];for(const I in W)d(W[I].object),delete W[I];delete O[P.id]}}}function y(P){for(const B in i){const Y=i[B],J=P.isInstancedMesh===!0?P.id:0,O=Y[J];if(O!==void 0){for(const W in O){const I=O[W];for(const F in I)d(I[F].object),delete I[F];delete O[W]}delete Y[J],Object.keys(Y).length===0&&delete i[B]}}}function C(){N(),a=!0,s!==r&&(s=r,c(s.object))}function N(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:C,resetDefaultState:N,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfObject:y,releaseStatesOfProgram:R,initAttributes:E,enableAttribute:m,disableUnusedAttributes:p}}function y1(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function a(l,c,d){d!==0&&(t.drawArraysInstanced(i,l,c,d),n.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let f=0;for(let g=0;g<d;g++)f+=c[g];n.update(f,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function S1(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(R){return!(R!==qn&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const y=R===Ui&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Mn&&i.convert(R)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==oi&&!y)}function l(R){if(R==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(Ve("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&f===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),u=t.getParameter(t.MAX_VERTEX_ATTRIBS),p=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),_=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),M=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:g,maxVertexTextures:v,maxTextureSize:E,maxCubemapSize:m,maxAttributes:u,maxVertexUniforms:p,maxVaryings:_,maxFragmentUniforms:S,maxSamples:w,samples:M}}function M1(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Ji,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const g=h.length!==0||f||i!==0||r;return r=f,i=h.length,g},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){n=d(h,f,0)},this.setState=function(h,f,g){const v=h.clippingPlanes,E=h.clipIntersection,m=h.clipShadows,u=t.get(h);if(!r||v===null||v.length===0||s&&!m)s?d(null):c();else{const p=s?0:i,_=p*4;let S=u.clippingState||null;l.value=S,S=d(v,f,_,g);for(let w=0;w!==_;++w)S[w]=n[w];u.clippingState=S,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=p}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,f,g,v){const E=h!==null?h.length:0;let m=null;if(E!==0){if(m=l.value,v!==!0||m===null){const u=g+E*4,p=f.matrixWorldInverse;o.getNormalMatrix(p),(m===null||m.length<u)&&(m=new Float32Array(u));for(let _=0,S=g;_!==E;++_,S+=4)a.copy(h[_]).applyMatrix4(p,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,m}}const sr=4,jm=[.125,.215,.35,.446,.526,.582],Nr=20,E1=256,ga=new lv,Xm=new lt;let Nu=null,Du=0,Lu=0,Iu=!1;const T1=new H;class Ym{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=T1}=s;Nu=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Lu=this._renderer.getActiveMipmapLevel(),Iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Km(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$m(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Nu,Du,Lu),this._renderer.xr.enabled=Iu,e.scissorTest=!1,ms(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Wr||e.mapping===Xs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Nu=this._renderer.getRenderTarget(),Du=this._renderer.getActiveCubeFace(),Lu=this._renderer.getActiveMipmapLevel(),Iu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Ui,format:qn,colorSpace:Zl,depthBuffer:!1},r=qm(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qm(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=w1(s)),this._blurMaterial=R1(s,e,n),this._ggxMaterial=A1(s,e,n)}return r}_compileMaterial(e){const n=new Oi(new zn,e);this._renderer.compile(n,ga)}_sceneToCubeUV(e,n,i,r,s){const l=new Sn(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,g=h.toneMapping;h.getClearColor(Xm),h.toneMapping=fi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(r),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Oi(new oo,new tv({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,m=E.material;let u=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,u=!0):(m.color.copy(Xm),u=!0);for(let _=0;_<6;_++){const S=_%3;S===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[_],s.y,s.z)):S===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[_]));const w=this._cubeSize;ms(r,S*w,_>2?w:0,w,w),h.setRenderTarget(r),u&&h.render(E,l),h.render(e,l)}h.toneMapping=g,h.autoClear=f,e.background=p}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Wr||e.mapping===Xs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Km()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$m());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ms(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(a,ga)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),f=0+c*1.25,g=h*f,{_lodMax:v}=this,E=this._sizeLods[i],m=3*E*(i>v-sr?i-v+sr:0),u=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=g,l.mipInt.value=v-n,ms(s,m,u,3*E,2*E),r.setRenderTarget(s),r.render(o,ga),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=v-i,ms(e,m,u,3*E,2*E),r.setRenderTarget(e),r.render(o,ga)}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&nt("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[r];h.material=c;const f=c.uniforms,g=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*g):2*Math.PI/(2*Nr-1),E=s/v,m=isFinite(s)?1+Math.floor(d*E):Nr;m>Nr&&Ve(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Nr}`);const u=[];let p=0;for(let R=0;R<Nr;++R){const y=R/E,C=Math.exp(-y*y/2);u.push(C),R===0?p+=C:R<m&&(p+=2*C)}for(let R=0;R<u.length;R++)u[R]=u[R]/p;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:_}=this;f.dTheta.value=v,f.mipInt.value=_-i;const S=this._sizeLods[r],w=3*S*(r>_-sr?r-_+sr:0),M=4*(this._cubeSize-S);ms(n,w,M,3*S,2*S),l.setRenderTarget(n),l.render(h,ga)}}function w1(t){const e=[],n=[],i=[];let r=t;const s=t-sr+1+jm.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let l=1/o;a>t-sr?l=jm[a-t+sr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],g=6,v=6,E=3,m=2,u=1,p=new Float32Array(E*v*g),_=new Float32Array(m*v*g),S=new Float32Array(u*v*g);for(let M=0;M<g;M++){const R=M%3*2/3-1,y=M>2?0:-1,C=[R,y,0,R+2/3,y,0,R+2/3,y+1,0,R,y,0,R+2/3,y+1,0,R,y+1,0];p.set(C,E*v*M),_.set(f,m*v*M);const N=[M,M,M,M,M,M];S.set(N,u*v*M)}const w=new zn;w.setAttribute("position",new On(p,E)),w.setAttribute("uv",new On(_,m)),w.setAttribute("faceIndex",new On(S,u)),i.push(new Oi(w,null)),r>sr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function qm(t,e,n){const i=new di(t,e,n);return i.texture.mapping=Sc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ms(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function A1(t,e,n){return new mi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:E1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:wc(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function R1(t,e,n){const i=new Float32Array(Nr),r=new H(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:Nr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:wc(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function $m(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wc(),fragmentShader:`

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
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Km(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function wc(){return`

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
	`}class fv extends di{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new iv(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new oo(5,5,5),s=new mi({name:"CubemapFromEquirect",uniforms:qs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:bi});s.uniforms.tEquirect.value=n;const a=new Oi(r,s),o=n.minFilter;return n.minFilter===Ur&&(n.minFilter=Jt),new NM(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function C1(t){let e=new WeakMap,n=new WeakMap,i=null;function r(f,g=!1){return f==null?null:g?a(f):s(f)}function s(f){if(f&&f.isTexture){const g=f.mapping;if(g===nu||g===iu)if(e.has(f)){const v=e.get(f).texture;return o(v,f.mapping)}else{const v=f.image;if(v&&v.height>0){const E=new fv(v.height);return E.fromEquirectangularTexture(t,f),e.set(f,E),f.addEventListener("dispose",c),o(E.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const g=f.mapping,v=g===nu||g===iu,E=g===Wr||g===Xs;if(v||E){let m=n.get(f);const u=m!==void 0?m.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==u)return i===null&&(i=new Ym(t)),m=v?i.fromEquirectangular(f,m):i.fromCubemap(f,m),m.texture.pmremVersion=f.pmremVersion,n.set(f,m),m.texture;if(m!==void 0)return m.texture;{const p=f.image;return v&&p&&p.height>0||E&&p&&l(p)?(i===null&&(i=new Ym(t)),m=v?i.fromEquirectangular(f):i.fromCubemap(f),m.texture.pmremVersion=f.pmremVersion,n.set(f,m),f.addEventListener("dispose",d),m.texture):null}}}return f}function o(f,g){return g===nu?f.mapping=Wr:g===iu&&(f.mapping=Xs),f}function l(f){let g=0;const v=6;for(let E=0;E<v;E++)f[E]!==void 0&&g++;return g===v}function c(f){const g=f.target;g.removeEventListener("dispose",c);const v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function d(f){const g=f.target;g.removeEventListener("dispose",d);const v=n.get(g);v!==void 0&&(n.delete(g),v.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:h}}function b1(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Md("WebGLRenderer: "+i+" extension not supported."),r}}}function P1(t,e,n,i){const r={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);f.removeEventListener("dispose",a),delete r[f.id];const g=s.get(f);g&&(e.remove(g),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(h,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,n.memory.geometries++),f}function l(h){const f=h.attributes;for(const g in f)e.update(f[g],t.ARRAY_BUFFER)}function c(h){const f=[],g=h.index,v=h.attributes.position;let E=0;if(v===void 0)return;if(g!==null){const p=g.array;E=g.version;for(let _=0,S=p.length;_<S;_+=3){const w=p[_+0],M=p[_+1],R=p[_+2];f.push(w,M,M,R,R,w)}}else{const p=v.array;E=v.version;for(let _=0,S=p.length/3-1;_<S;_+=3){const w=_+0,M=_+1,R=_+2;f.push(w,M,M,R,R,w)}}const m=new(v.count>=65535?Q_:Z_)(f,1);m.version=E;const u=s.get(h);u&&e.remove(u),s.set(h,m)}function d(h){const f=s.get(h);if(f){const g=h.index;g!==null&&f.version<g.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function N1(t,e,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function l(h,f){t.drawElements(i,f,s,h*a),n.update(f,i,1)}function c(h,f,g){g!==0&&(t.drawElementsInstanced(i,f,s,h*a,g),n.update(f,i,g))}function d(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,h,0,g);let E=0;for(let m=0;m<g;m++)E+=f[m];n.update(E,i,1)}this.setMode=r,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function D1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:nt("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function L1(t,e,n){const i=new WeakMap,r=new Ct;function s(a,o,l){const c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let N=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",N)};var g=N;f!==void 0&&f.texture.dispose();const v=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let S=0;v===!0&&(S=1),E===!0&&(S=2),m===!0&&(S=3);let w=o.attributes.position.count*S,M=1;w>e.maxTextureSize&&(M=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const R=new Float32Array(w*M*4*h),y=new $_(R,w,M,h);y.type=oi,y.needsUpdate=!0;const C=S*4;for(let P=0;P<h;P++){const B=u[P],Y=p[P],J=_[P],O=w*M*4*P;for(let W=0;W<B.count;W++){const I=W*C;v===!0&&(r.fromBufferAttribute(B,W),R[O+I+0]=r.x,R[O+I+1]=r.y,R[O+I+2]=r.z,R[O+I+3]=0),E===!0&&(r.fromBufferAttribute(Y,W),R[O+I+4]=r.x,R[O+I+5]=r.y,R[O+I+6]=r.z,R[O+I+7]=0),m===!0&&(r.fromBufferAttribute(J,W),R[O+I+8]=r.x,R[O+I+9]=r.y,R[O+I+10]=r.z,R[O+I+11]=J.itemSize===4?r.w:1)}}f={count:h,texture:y,size:new Ge(w,M)},i.set(o,f),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let v=0;for(let m=0;m<c.length;m++)v+=c[m];const E=o.morphTargetsRelative?1:1-v;l.getUniforms().setValue(t,"morphTargetBaseInfluence",E),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function I1(t,e,n,i,r){let s=new WeakMap;function a(c){const d=r.render.frame,h=c.geometry,f=e.get(c,h);if(s.get(f)!==d&&(e.update(f),s.set(f,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const g=c.skeleton;s.get(g)!==d&&(g.update(),s.set(g,d))}return f}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:a,dispose:o}}const U1={[L_]:"LINEAR_TONE_MAPPING",[I_]:"REINHARD_TONE_MAPPING",[U_]:"CINEON_TONE_MAPPING",[F_]:"ACES_FILMIC_TONE_MAPPING",[k_]:"AGX_TONE_MAPPING",[B_]:"NEUTRAL_TONE_MAPPING",[O_]:"CUSTOM_TONE_MAPPING"};function F1(t,e,n,i,r){const s=new di(e,n,{type:t,depthBuffer:i,stencilBuffer:r,depthTexture:i?new Ys(e,n):void 0}),a=new di(e,n,{type:Ui,depthBuffer:!1,stencilBuffer:!1}),o=new zn;o.setAttribute("position",new hi([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new hi([0,2,0,0,2,0],2));const l=new wM({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new Oi(o,l),d=new lv(-1,1,1,-1,0,1);let h=null,f=null,g=!1,v,E=null,m=[],u=!1;this.setSize=function(p,_){s.setSize(p,_),a.setSize(p,_);for(let S=0;S<m.length;S++){const w=m[S];w.setSize&&w.setSize(p,_)}},this.setEffects=function(p){m=p,u=m.length>0&&m[0].isRenderPass===!0;const _=s.width,S=s.height;for(let w=0;w<m.length;w++){const M=m[w];M.setSize&&M.setSize(_,S)}},this.begin=function(p,_){if(g||p.toneMapping===fi&&m.length===0)return!1;if(E=_,_!==null){const S=_.width,w=_.height;(s.width!==S||s.height!==w)&&this.setSize(S,w)}return u===!1&&p.setRenderTarget(s),v=p.toneMapping,p.toneMapping=fi,!0},this.hasRenderPass=function(){return u},this.end=function(p,_){p.toneMapping=v,g=!0;let S=s,w=a;for(let M=0;M<m.length;M++){const R=m[M];if(R.enabled!==!1&&(R.render(p,w,S,_),R.needsSwap!==!1)){const y=S;S=w,w=y}}if(h!==p.outputColorSpace||f!==p.toneMapping){h=p.outputColorSpace,f=p.toneMapping,l.defines={},it.getTransfer(h)===ct&&(l.defines.SRGB_TRANSFER="");const M=U1[f];M&&(l.defines[M]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=S.texture,p.setRenderTarget(E),p.render(c,d),E=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),a.dispose(),o.dispose(),l.dispose()}}const dv=new en,wd=new Ys(1,1),hv=new $_,pv=new QS,mv=new iv,Zm=[],Qm=[],Jm=new Float32Array(16),eg=new Float32Array(9),tg=new Float32Array(4);function Js(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Zm[r];if(s===void 0&&(s=new Float32Array(r),Zm[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function kt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Bt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ac(t,e){let n=Qm[e];n===void 0&&(n=new Int32Array(e),Qm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function O1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function k1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2fv(this.addr,e),Bt(n,e)}}function B1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(kt(n,e))return;t.uniform3fv(this.addr,e),Bt(n,e)}}function z1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4fv(this.addr,e),Bt(n,e)}}function H1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Bt(n,e)}else{if(kt(n,i))return;tg.set(i),t.uniformMatrix2fv(this.addr,!1,tg),Bt(n,i)}}function V1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Bt(n,e)}else{if(kt(n,i))return;eg.set(i),t.uniformMatrix3fv(this.addr,!1,eg),Bt(n,i)}}function G1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(kt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Bt(n,e)}else{if(kt(n,i))return;Jm.set(i),t.uniformMatrix4fv(this.addr,!1,Jm),Bt(n,i)}}function W1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function j1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2iv(this.addr,e),Bt(n,e)}}function X1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(kt(n,e))return;t.uniform3iv(this.addr,e),Bt(n,e)}}function Y1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4iv(this.addr,e),Bt(n,e)}}function q1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function $1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(kt(n,e))return;t.uniform2uiv(this.addr,e),Bt(n,e)}}function K1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(kt(n,e))return;t.uniform3uiv(this.addr,e),Bt(n,e)}}function Z1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(kt(n,e))return;t.uniform4uiv(this.addr,e),Bt(n,e)}}function Q1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(wd.compareFunction=n.isReversedDepthBuffer()?Nh:Ph,s=wd):s=dv,n.setTexture2D(e||s,r)}function J1(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||pv,r)}function ew(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||mv,r)}function tw(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||hv,r)}function nw(t){switch(t){case 5126:return O1;case 35664:return k1;case 35665:return B1;case 35666:return z1;case 35674:return H1;case 35675:return V1;case 35676:return G1;case 5124:case 35670:return W1;case 35667:case 35671:return j1;case 35668:case 35672:return X1;case 35669:case 35673:return Y1;case 5125:return q1;case 36294:return $1;case 36295:return K1;case 36296:return Z1;case 35678:case 36198:case 36298:case 36306:case 35682:return Q1;case 35679:case 36299:case 36307:return J1;case 35680:case 36300:case 36308:case 36293:return ew;case 36289:case 36303:case 36311:case 36292:return tw}}function iw(t,e){t.uniform1fv(this.addr,e)}function rw(t,e){const n=Js(e,this.size,2);t.uniform2fv(this.addr,n)}function sw(t,e){const n=Js(e,this.size,3);t.uniform3fv(this.addr,n)}function aw(t,e){const n=Js(e,this.size,4);t.uniform4fv(this.addr,n)}function ow(t,e){const n=Js(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function lw(t,e){const n=Js(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function cw(t,e){const n=Js(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function uw(t,e){t.uniform1iv(this.addr,e)}function fw(t,e){t.uniform2iv(this.addr,e)}function dw(t,e){t.uniform3iv(this.addr,e)}function hw(t,e){t.uniform4iv(this.addr,e)}function pw(t,e){t.uniform1uiv(this.addr,e)}function mw(t,e){t.uniform2uiv(this.addr,e)}function gw(t,e){t.uniform3uiv(this.addr,e)}function _w(t,e){t.uniform4uiv(this.addr,e)}function vw(t,e,n){const i=this.cache,r=e.length,s=Ac(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=wd:a=dv;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function xw(t,e,n){const i=this.cache,r=e.length,s=Ac(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||pv,s[a])}function yw(t,e,n){const i=this.cache,r=e.length,s=Ac(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||mv,s[a])}function Sw(t,e,n){const i=this.cache,r=e.length,s=Ac(n,r);kt(i,s)||(t.uniform1iv(this.addr,s),Bt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||hv,s[a])}function Mw(t){switch(t){case 5126:return iw;case 35664:return rw;case 35665:return sw;case 35666:return aw;case 35674:return ow;case 35675:return lw;case 35676:return cw;case 5124:case 35670:return uw;case 35667:case 35671:return fw;case 35668:case 35672:return dw;case 35669:case 35673:return hw;case 5125:return pw;case 36294:return mw;case 36295:return gw;case 36296:return _w;case 35678:case 36198:case 36298:case 36306:case 35682:return vw;case 35679:case 36299:case 36307:return xw;case 35680:case 36300:case 36308:case 36293:return yw;case 36289:case 36303:case 36311:case 36292:return Sw}}class Ew{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=nw(n.type)}}class Tw{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Mw(n.type)}}class ww{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Uu=/(\w+)(\])?(\[|\.)?/g;function ng(t,e){t.seq.push(e),t.map[e.id]=e}function Aw(t,e,n){const i=t.name,r=i.length;for(Uu.lastIndex=0;;){const s=Uu.exec(i),a=Uu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){ng(n,c===void 0?new Ew(o,t,e):new Tw(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new ww(o),ng(n,h)),n=h}}}class El{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),l=e.getUniformLocation(n,o.name);Aw(o,l,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function ig(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Rw=37297;let Cw=0;function bw(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const rg=new Xe;function Pw(t){it._getMatrix(rg,it.workingColorSpace,t);const e=`mat3( ${rg.elements.map(n=>n.toFixed(4))} )`;switch(it.getTransfer(t)){case Ql:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function sg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+bw(t.getShaderSource(e),o)}else return s}function Nw(t,e){const n=Pw(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Dw={[L_]:"Linear",[I_]:"Reinhard",[U_]:"Cineon",[F_]:"ACESFilmic",[k_]:"AgX",[B_]:"Neutral",[O_]:"Custom"};function Lw(t,e){const n=Dw[e];return n===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const il=new H;function Iw(){it.getLuminanceCoefficients(il);const t=il.x.toFixed(4),e=il.y.toFixed(4),n=il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Uw(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ta).join(`
`)}function Fw(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Ow(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ta(t){return t!==""}function ag(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function og(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const kw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ad(t){return t.replace(kw,zw)}const Bw=new Map;function zw(t,e){let n=Ze[e];if(n===void 0){const i=Bw.get(e);if(i!==void 0)n=Ze[i],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ad(n)}const Hw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lg(t){return t.replace(Hw,Vw)}function Vw(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function cg(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const Gw={[_l]:"SHADOWMAP_TYPE_PCF",[Ea]:"SHADOWMAP_TYPE_VSM"};function Ww(t){return Gw[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const jw={[Wr]:"ENVMAP_TYPE_CUBE",[Xs]:"ENVMAP_TYPE_CUBE",[Sc]:"ENVMAP_TYPE_CUBE_UV"};function Xw(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":jw[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const Yw={[Xs]:"ENVMAP_MODE_REFRACTION"};function qw(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":Yw[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const $w={[D_]:"ENVMAP_BLENDING_MULTIPLY",[PS]:"ENVMAP_BLENDING_MIX",[NS]:"ENVMAP_BLENDING_ADD"};function Kw(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":$w[t.combine]||"ENVMAP_BLENDING_NONE"}function Zw(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Qw(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const l=Ww(n),c=Xw(n),d=qw(n),h=Kw(n),f=Zw(n),g=Uw(n),v=Fw(s),E=r.createProgram();let m,u,p=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Ta).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(Ta).join(`
`),u.length>0&&(u+=`
`)):(m=[cg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ta).join(`
`),u=[cg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==fi?"#define TONE_MAPPING":"",n.toneMapping!==fi?Ze.tonemapping_pars_fragment:"",n.toneMapping!==fi?Lw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,Nw("linearToOutputTexel",n.outputColorSpace),Iw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ta).join(`
`)),a=Ad(a),a=ag(a,n),a=og(a,n),o=Ad(o),o=ag(o,n),o=og(o,n),a=lg(a),o=lg(o),n.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===pm?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===pm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const _=p+m+a,S=p+u+o,w=ig(r,r.VERTEX_SHADER,_),M=ig(r,r.FRAGMENT_SHADER,S);r.attachShader(E,w),r.attachShader(E,M),n.index0AttributeName!==void 0?r.bindAttribLocation(E,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(E,0,"position"),r.linkProgram(E);function R(P){if(t.debug.checkShaderErrors){const B=r.getProgramInfoLog(E)||"",Y=r.getShaderInfoLog(w)||"",J=r.getShaderInfoLog(M)||"",O=B.trim(),W=Y.trim(),I=J.trim();let F=!0,G=!0;if(r.getProgramParameter(E,r.LINK_STATUS)===!1)if(F=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,E,w,M);else{const $=sg(r,w,"vertex"),V=sg(r,M,"fragment");nt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(E,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+$+`
`+V)}else O!==""?Ve("WebGLProgram: Program Info Log:",O):(W===""||I==="")&&(G=!1);G&&(P.diagnostics={runnable:F,programLog:O,vertexShader:{log:W,prefix:m},fragmentShader:{log:I,prefix:u}})}r.deleteShader(w),r.deleteShader(M),y=new El(r,E),C=Ow(r,E)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let N=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(E,Rw)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Cw++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=w,this.fragmentShader=M,this}let Jw=0;class eA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new tA(e),n.set(e,i)),i}}class tA{constructor(e){this.id=Jw++,this.code=e,this.usedTimes=0}}function nA(t){return t===jr||t===$l||t===Kl}function iA(t,e,n,i,r,s){const a=new Lh,o=new eA,l=new Set,c=[],d=new Map,h=i.logarithmicDepthBuffer;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function E(y,C,N,P,B,Y){const J=P.fog,O=B.geometry,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,I=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,F=e.get(y.envMap||W,I),G=F&&F.mapping===Sc?F.image.height:null,$=g[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&Ve("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const V=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,te=V!==void 0?V.length:0;let re=0;O.morphAttributes.position!==void 0&&(re=1),O.morphAttributes.normal!==void 0&&(re=2),O.morphAttributes.color!==void 0&&(re=3);let Ee,ue,U,K;if($){const Ye=ri[$];Ee=Ye.vertexShader,ue=Ye.fragmentShader}else Ee=y.vertexShader,ue=y.fragmentShader,o.update(y),U=o.getVertexShaderID(y),K=o.getFragmentShaderID(y);const Z=t.getRenderTarget(),ae=t.state.buffers.depth.getReversed(),Te=B.isInstancedMesh===!0,ve=B.isBatchedMesh===!0,Se=!!y.map,_e=!!y.matcap,Le=!!F,Oe=!!y.aoMap,De=!!y.lightMap,Fe=!!y.bumpMap,Ie=!!y.normalMap,rt=!!y.displacementMap,D=!!y.emissiveMap,Ke=!!y.metalnessMap,xe=!!y.roughnessMap,He=y.anisotropy>0,le=y.clearcoat>0,Je=y.dispersion>0,A=y.iridescence>0,x=y.sheen>0,z=y.transmission>0,ee=He&&!!y.anisotropyMap,se=le&&!!y.clearcoatMap,fe=le&&!!y.clearcoatNormalMap,ge=le&&!!y.clearcoatRoughnessMap,Q=A&&!!y.iridescenceMap,ie=A&&!!y.iridescenceThicknessMap,Ae=x&&!!y.sheenColorMap,be=x&&!!y.sheenRoughnessMap,pe=!!y.specularMap,de=!!y.specularColorMap,je=!!y.specularIntensityMap,$e=z&&!!y.transmissionMap,ot=z&&!!y.thicknessMap,L=!!y.gradientMap,he=!!y.alphaMap,ne=y.alphaTest>0,Re=!!y.alphaHash,me=!!y.extensions;let oe=fi;y.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(oe=t.toneMapping);const ke={shaderID:$,shaderType:y.type,shaderName:y.name,vertexShader:Ee,fragmentShader:ue,defines:y.defines,customVertexShaderID:U,customFragmentShaderID:K,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:ve,batchingColor:ve&&B._colorsTexture!==null,instancing:Te,instancingColor:Te&&B.instanceColor!==null,instancingMorph:Te&&B.morphTexture!==null,outputColorSpace:Z===null?t.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:it.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Se,matcap:_e,envMap:Le,envMapMode:Le&&F.mapping,envMapCubeUVHeight:G,aoMap:Oe,lightMap:De,bumpMap:Fe,normalMap:Ie,displacementMap:rt,emissiveMap:D,normalMapObjectSpace:Ie&&y.normalMapType===IS,normalMapTangentSpace:Ie&&y.normalMapType===dm,packedNormalMap:Ie&&y.normalMapType===dm&&nA(y.normalMap.format),metalnessMap:Ke,roughnessMap:xe,anisotropy:He,anisotropyMap:ee,clearcoat:le,clearcoatMap:se,clearcoatNormalMap:fe,clearcoatRoughnessMap:ge,dispersion:Je,iridescence:A,iridescenceMap:Q,iridescenceThicknessMap:ie,sheen:x,sheenColorMap:Ae,sheenRoughnessMap:be,specularMap:pe,specularColorMap:de,specularIntensityMap:je,transmission:z,transmissionMap:$e,thicknessMap:ot,gradientMap:L,opaque:y.transparent===!1&&y.blending===Fs&&y.alphaToCoverage===!1,alphaMap:he,alphaTest:ne,alphaHash:Re,combine:y.combine,mapUv:Se&&v(y.map.channel),aoMapUv:Oe&&v(y.aoMap.channel),lightMapUv:De&&v(y.lightMap.channel),bumpMapUv:Fe&&v(y.bumpMap.channel),normalMapUv:Ie&&v(y.normalMap.channel),displacementMapUv:rt&&v(y.displacementMap.channel),emissiveMapUv:D&&v(y.emissiveMap.channel),metalnessMapUv:Ke&&v(y.metalnessMap.channel),roughnessMapUv:xe&&v(y.roughnessMap.channel),anisotropyMapUv:ee&&v(y.anisotropyMap.channel),clearcoatMapUv:se&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:fe&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:be&&v(y.sheenRoughnessMap.channel),specularMapUv:pe&&v(y.specularMap.channel),specularColorMapUv:de&&v(y.specularColorMap.channel),specularIntensityMapUv:je&&v(y.specularIntensityMap.channel),transmissionMapUv:$e&&v(y.transmissionMap.channel),thicknessMapUv:ot&&v(y.thicknessMap.channel),alphaMapUv:he&&v(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Ie||He),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!O.attributes.uv&&(Se||he),fog:!!J,useFog:y.fog===!0,fogExp2:!!J&&J.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Ie===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ae,skinning:B.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:re,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&N.length>0,shadowMapType:t.shadowMap.type,toneMapping:oe,decodeVideoTexture:Se&&y.map.isVideoTexture===!0&&it.getTransfer(y.map.colorSpace)===ct,decodeVideoTextureEmissive:D&&y.emissiveMap.isVideoTexture===!0&&it.getTransfer(y.emissiveMap.colorSpace)===ct,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ti,flipSided:y.side===gn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:me&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(me&&y.extensions.multiDraw===!0||ve)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ke.vertexUv1s=l.has(1),ke.vertexUv2s=l.has(2),ke.vertexUv3s=l.has(3),l.clear(),ke}function m(y){const C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(const N in y.defines)C.push(N),C.push(y.defines[N]);return y.isRawShaderMaterial===!1&&(u(C,y),p(C,y),C.push(t.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function u(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function p(y,C){a.disableAll(),C.instancing&&a.enable(0),C.instancingColor&&a.enable(1),C.instancingMorph&&a.enable(2),C.matcap&&a.enable(3),C.envMap&&a.enable(4),C.normalMapObjectSpace&&a.enable(5),C.normalMapTangentSpace&&a.enable(6),C.clearcoat&&a.enable(7),C.iridescence&&a.enable(8),C.alphaTest&&a.enable(9),C.vertexColors&&a.enable(10),C.vertexAlphas&&a.enable(11),C.vertexUv1s&&a.enable(12),C.vertexUv2s&&a.enable(13),C.vertexUv3s&&a.enable(14),C.vertexTangents&&a.enable(15),C.anisotropy&&a.enable(16),C.alphaHash&&a.enable(17),C.batching&&a.enable(18),C.dispersion&&a.enable(19),C.batchingColor&&a.enable(20),C.gradientMap&&a.enable(21),C.packedNormalMap&&a.enable(22),C.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.reversedDepthBuffer&&a.enable(4),C.skinning&&a.enable(5),C.morphTargets&&a.enable(6),C.morphNormals&&a.enable(7),C.morphColors&&a.enable(8),C.premultipliedAlpha&&a.enable(9),C.shadowMapEnabled&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.decodeVideoTextureEmissive&&a.enable(20),C.alphaToCoverage&&a.enable(21),C.numLightProbeGrids>0&&a.enable(22),y.push(a.mask)}function _(y){const C=g[y.type];let N;if(C){const P=ri[C];N=MM.clone(P.uniforms)}else N=y.uniforms;return N}function S(y,C){let N=d.get(C);return N!==void 0?++N.usedTimes:(N=new Qw(t,C,y,r),c.push(N),d.set(C,N)),N}function w(y){if(--y.usedTimes===0){const C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),d.delete(y.cacheKey),y.destroy()}}function M(y){o.remove(y)}function R(){o.dispose()}return{getParameters:E,getProgramCacheKey:m,getUniforms:_,acquireProgram:S,releaseProgram:w,releaseShaderCache:M,programs:c,dispose:R}}function rA(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,l){t.get(a)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function sA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function ug(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function fg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(f){let g=0;return f.isInstancedMesh&&(g+=2),f.isSkinnedMesh&&(g+=1),g}function o(f,g,v,E,m,u){let p=t[e];return p===void 0?(p={id:f.id,object:f,geometry:g,material:v,materialVariant:a(f),groupOrder:E,renderOrder:f.renderOrder,z:m,group:u},t[e]=p):(p.id=f.id,p.object=f,p.geometry=g,p.material=v,p.materialVariant=a(f),p.groupOrder=E,p.renderOrder=f.renderOrder,p.z=m,p.group=u),e++,p}function l(f,g,v,E,m,u){const p=o(f,g,v,E,m,u);v.transmission>0?i.push(p):v.transparent===!0?r.push(p):n.push(p)}function c(f,g,v,E,m,u){const p=o(f,g,v,E,m,u);v.transmission>0?i.unshift(p):v.transparent===!0?r.unshift(p):n.unshift(p)}function d(f,g){n.length>1&&n.sort(f||sA),i.length>1&&i.sort(g||ug),r.length>1&&r.sort(g||ug)}function h(){for(let f=e,g=t.length;f<g;f++){const v=t[f];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:h,sort:d}}function aA(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new fg,t.set(i,[a])):r>=s.length?(a=new fg,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function oA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new H,color:new lt};break;case"SpotLight":n={position:new H,direction:new H,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new H,color:new lt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new H,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":n={color:new lt,position:new H,halfWidth:new H,halfHeight:new H};break}return t[e.id]=n,n}}}function lA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let cA=0;function uA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function fA(t){const e=new oA,n=lA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new H);const r=new H,s=new Mt,a=new Mt;function o(c){let d=0,h=0,f=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let g=0,v=0,E=0,m=0,u=0,p=0,_=0,S=0,w=0,M=0,R=0;c.sort(uA);for(let C=0,N=c.length;C<N;C++){const P=c[C],B=P.color,Y=P.intensity,J=P.distance;let O=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===jr?O=P.shadow.map.texture:O=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=B.r*Y,h+=B.g*Y,f+=B.b*Y;else if(P.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(P.sh.coefficients[W],Y);R++}else if(P.isDirectionalLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const I=P.shadow,F=n.get(P);F.shadowIntensity=I.intensity,F.shadowBias=I.bias,F.shadowNormalBias=I.normalBias,F.shadowRadius=I.radius,F.shadowMapSize=I.mapSize,i.directionalShadow[g]=F,i.directionalShadowMap[g]=O,i.directionalShadowMatrix[g]=P.shadow.matrix,p++}i.directional[g]=W,g++}else if(P.isSpotLight){const W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(B).multiplyScalar(Y),W.distance=J,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,i.spot[E]=W;const I=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,I.updateMatrices(P),P.castShadow&&M++),i.spotLightMatrix[E]=I.matrix,P.castShadow){const F=n.get(P);F.shadowIntensity=I.intensity,F.shadowBias=I.bias,F.shadowNormalBias=I.normalBias,F.shadowRadius=I.radius,F.shadowMapSize=I.mapSize,i.spotShadow[E]=F,i.spotShadowMap[E]=O,S++}E++}else if(P.isRectAreaLight){const W=e.get(P);W.color.copy(B).multiplyScalar(Y),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=W,m++}else if(P.isPointLight){const W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){const I=P.shadow,F=n.get(P);F.shadowIntensity=I.intensity,F.shadowBias=I.bias,F.shadowNormalBias=I.normalBias,F.shadowRadius=I.radius,F.shadowMapSize=I.mapSize,F.shadowCameraNear=I.camera.near,F.shadowCameraFar=I.camera.far,i.pointShadow[v]=F,i.pointShadowMap[v]=O,i.pointShadowMatrix[v]=P.shadow.matrix,_++}i.point[v]=W,v++}else if(P.isHemisphereLight){const W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(Y),W.groundColor.copy(P.groundColor).multiplyScalar(Y),i.hemi[u]=W,u++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ye.LTC_FLOAT_1,i.rectAreaLTC2=ye.LTC_FLOAT_2):(i.rectAreaLTC1=ye.LTC_HALF_1,i.rectAreaLTC2=ye.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const y=i.hash;(y.directionalLength!==g||y.pointLength!==v||y.spotLength!==E||y.rectAreaLength!==m||y.hemiLength!==u||y.numDirectionalShadows!==p||y.numPointShadows!==_||y.numSpotShadows!==S||y.numSpotMaps!==w||y.numLightProbes!==R)&&(i.directional.length=g,i.spot.length=E,i.rectArea.length=m,i.point.length=v,i.hemi.length=u,i.directionalShadow.length=p,i.directionalShadowMap.length=p,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=p,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=S+w-M,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=R,y.directionalLength=g,y.pointLength=v,y.spotLength=E,y.rectAreaLength=m,y.hemiLength=u,y.numDirectionalShadows=p,y.numPointShadows=_,y.numSpotShadows=S,y.numSpotMaps=w,y.numLightProbes=R,i.version=cA++)}function l(c,d){let h=0,f=0,g=0,v=0,E=0;const m=d.matrixWorldInverse;for(let u=0,p=c.length;u<p;u++){const _=c[u];if(_.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(_.isSpotLight){const S=i.spot[g];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),g++}else if(_.isRectAreaLight){const S=i.rectArea[v];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),a.identity(),s.copy(_.matrixWorld),s.premultiply(m),a.extractRotation(s),S.halfWidth.set(_.width*.5,0,0),S.halfHeight.set(0,_.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),v++}else if(_.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(_.matrixWorld),S.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){const S=i.hemi[E];S.direction.setFromMatrixPosition(_.matrixWorld),S.direction.transformDirection(m),E++}}}return{setup:o,setupView:l,state:i}}function dg(t){const e=new fA(t),n=[],i=[],r=[];function s(f){h.camera=f,n.length=0,i.length=0,r.length=0}function a(f){n.push(f)}function o(f){i.push(f)}function l(f){r.push(f)}function c(){e.setup(n)}function d(f){e.setupView(n,f)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function dA(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new dg(t),e.set(r,[o])):s>=a.length?(o=new dg(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const hA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pA=`uniform sampler2D shadow_pass;
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
}`,mA=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],gA=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],hg=new Mt,_a=new H,Fu=new H;function _A(t,e,n){let i=new Ih;const r=new Ge,s=new Ge,a=new Ct,o=new AM,l=new RM,c={},d=n.maxTextureSize,h={[_r]:gn,[gn]:_r,[Ti]:Ti},f=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:hA,fragmentShader:pA}),g=f.clone();g.defines.HORIZONTAL_PASS=1;const v=new zn;v.setAttribute("position",new On(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Oi(v,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_l;let u=this.type;this.render=function(M,R,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;this.type===fS&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=_l);const C=t.getRenderTarget(),N=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),B=t.state;B.setBlending(bi),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const Y=u!==this.type;Y&&R.traverse(function(J){J.material&&(Array.isArray(J.material)?J.material.forEach(O=>O.needsUpdate=!0):J.material.needsUpdate=!0)});for(let J=0,O=M.length;J<O;J++){const W=M[J],I=W.shadow;if(I===void 0){Ve("WebGLShadowMap:",W,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;r.copy(I.mapSize);const F=I.getFrameExtents();r.multiply(F),s.copy(I.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(s.x=Math.floor(d/F.x),r.x=s.x*F.x,I.mapSize.x=s.x),r.y>d&&(s.y=Math.floor(d/F.y),r.y=s.y*F.y,I.mapSize.y=s.y));const G=t.state.buffers.depth.getReversed();if(I.camera._reversedDepth=G,I.map===null||Y===!0){if(I.map!==null&&(I.map.depthTexture!==null&&(I.map.depthTexture.dispose(),I.map.depthTexture=null),I.map.dispose()),this.type===Ea){if(W.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}I.map=new di(r.x,r.y,{format:jr,type:Ui,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),I.map.texture.name=W.name+".shadowMap",I.map.depthTexture=new Ys(r.x,r.y,oi),I.map.depthTexture.name=W.name+".shadowMapDepth",I.map.depthTexture.format=Fi,I.map.depthTexture.compareFunction=null,I.map.depthTexture.minFilter=Wt,I.map.depthTexture.magFilter=Wt}else W.isPointLight?(I.map=new fv(r.x),I.map.depthTexture=new yM(r.x,pi)):(I.map=new di(r.x,r.y),I.map.depthTexture=new Ys(r.x,r.y,pi)),I.map.depthTexture.name=W.name+".shadowMap",I.map.depthTexture.format=Fi,this.type===_l?(I.map.depthTexture.compareFunction=G?Nh:Ph,I.map.depthTexture.minFilter=Jt,I.map.depthTexture.magFilter=Jt):(I.map.depthTexture.compareFunction=null,I.map.depthTexture.minFilter=Wt,I.map.depthTexture.magFilter=Wt);I.camera.updateProjectionMatrix()}const $=I.map.isWebGLCubeRenderTarget?6:1;for(let V=0;V<$;V++){if(I.map.isWebGLCubeRenderTarget)t.setRenderTarget(I.map,V),t.clear();else{V===0&&(t.setRenderTarget(I.map),t.clear());const te=I.getViewport(V);a.set(s.x*te.x,s.y*te.y,s.x*te.z,s.y*te.w),B.viewport(a)}if(W.isPointLight){const te=I.camera,re=I.matrix,Ee=W.distance||te.far;Ee!==te.far&&(te.far=Ee,te.updateProjectionMatrix()),_a.setFromMatrixPosition(W.matrixWorld),te.position.copy(_a),Fu.copy(te.position),Fu.add(mA[V]),te.up.copy(gA[V]),te.lookAt(Fu),te.updateMatrixWorld(),re.makeTranslation(-_a.x,-_a.y,-_a.z),hg.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),I._frustum.setFromProjectionMatrix(hg,te.coordinateSystem,te.reversedDepth)}else I.updateMatrices(W);i=I.getFrustum(),S(R,y,I.camera,W,this.type)}I.isPointLightShadow!==!0&&this.type===Ea&&p(I,y),I.needsUpdate=!1}u=this.type,m.needsUpdate=!1,t.setRenderTarget(C,N,P)};function p(M,R){const y=e.update(E);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,g.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,g.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new di(r.x,r.y,{format:jr,type:Ui})),f.uniforms.shadow_pass.value=M.map.depthTexture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,t.setRenderTarget(M.mapPass),t.clear(),t.renderBufferDirect(R,null,y,f,E,null),g.uniforms.shadow_pass.value=M.mapPass.texture,g.uniforms.resolution.value=M.mapSize,g.uniforms.radius.value=M.radius,t.setRenderTarget(M.map),t.clear(),t.renderBufferDirect(R,null,y,g,E,null)}function _(M,R,y,C){let N=null;const P=y.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)N=P;else if(N=y.isPointLight===!0?l:o,t.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const B=N.uuid,Y=R.uuid;let J=c[B];J===void 0&&(J={},c[B]=J);let O=J[Y];O===void 0&&(O=N.clone(),J[Y]=O,R.addEventListener("dispose",w)),N=O}if(N.visible=R.visible,N.wireframe=R.wireframe,C===Ea?N.side=R.shadowSide!==null?R.shadowSide:R.side:N.side=R.shadowSide!==null?R.shadowSide:h[R.side],N.alphaMap=R.alphaMap,N.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,N.map=R.map,N.clipShadows=R.clipShadows,N.clippingPlanes=R.clippingPlanes,N.clipIntersection=R.clipIntersection,N.displacementMap=R.displacementMap,N.displacementScale=R.displacementScale,N.displacementBias=R.displacementBias,N.wireframeLinewidth=R.wireframeLinewidth,N.linewidth=R.linewidth,y.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const B=t.properties.get(N);B.light=y}return N}function S(M,R,y,C,N){if(M.visible===!1)return;if(M.layers.test(R.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&N===Ea)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,M.matrixWorld);const Y=e.update(M),J=M.material;if(Array.isArray(J)){const O=Y.groups;for(let W=0,I=O.length;W<I;W++){const F=O[W],G=J[F.materialIndex];if(G&&G.visible){const $=_(M,G,C,N);M.onBeforeShadow(t,M,R,y,Y,$,F),t.renderBufferDirect(y,null,Y,$,M,F),M.onAfterShadow(t,M,R,y,Y,$,F)}}}else if(J.visible){const O=_(M,J,C,N);M.onBeforeShadow(t,M,R,y,Y,O,null),t.renderBufferDirect(y,null,Y,O,M,null),M.onAfterShadow(t,M,R,y,Y,O,null)}}const B=M.children;for(let Y=0,J=B.length;Y<J;Y++)S(B[Y],R,y,C,N)}function w(M){M.target.removeEventListener("dispose",w);for(const y in c){const C=c[y],N=M.target.uuid;N in C&&(C[N].dispose(),delete C[N])}}}function vA(t,e){function n(){let L=!1;const he=new Ct;let ne=null;const Re=new Ct(0,0,0,0);return{setMask:function(me){ne!==me&&!L&&(t.colorMask(me,me,me,me),ne=me)},setLocked:function(me){L=me},setClear:function(me,oe,ke,Ye,bt){bt===!0&&(me*=Ye,oe*=Ye,ke*=Ye),he.set(me,oe,ke,Ye),Re.equals(he)===!1&&(t.clearColor(me,oe,ke,Ye),Re.copy(he))},reset:function(){L=!1,ne=null,Re.set(-1,0,0,0)}}}function i(){let L=!1,he=!1,ne=null,Re=null,me=null;return{setReversed:function(oe){if(he!==oe){const ke=e.get("EXT_clip_control");oe?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),he=oe;const Ye=me;me=null,this.setClear(Ye)}},getReversed:function(){return he},setTest:function(oe){oe?Z(t.DEPTH_TEST):ae(t.DEPTH_TEST)},setMask:function(oe){ne!==oe&&!L&&(t.depthMask(oe),ne=oe)},setFunc:function(oe){if(he&&(oe=WS[oe]),Re!==oe){switch(oe){case Ff:t.depthFunc(t.NEVER);break;case Of:t.depthFunc(t.ALWAYS);break;case kf:t.depthFunc(t.LESS);break;case js:t.depthFunc(t.LEQUAL);break;case Bf:t.depthFunc(t.EQUAL);break;case zf:t.depthFunc(t.GEQUAL);break;case Hf:t.depthFunc(t.GREATER);break;case Vf:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Re=oe}},setLocked:function(oe){L=oe},setClear:function(oe){me!==oe&&(me=oe,he&&(oe=1-oe),t.clearDepth(oe))},reset:function(){L=!1,ne=null,Re=null,me=null,he=!1}}}function r(){let L=!1,he=null,ne=null,Re=null,me=null,oe=null,ke=null,Ye=null,bt=null;return{setTest:function(ft){L||(ft?Z(t.STENCIL_TEST):ae(t.STENCIL_TEST))},setMask:function(ft){he!==ft&&!L&&(t.stencilMask(ft),he=ft)},setFunc:function(ft,gi,Qn){(ne!==ft||Re!==gi||me!==Qn)&&(t.stencilFunc(ft,gi,Qn),ne=ft,Re=gi,me=Qn)},setOp:function(ft,gi,Qn){(oe!==ft||ke!==gi||Ye!==Qn)&&(t.stencilOp(ft,gi,Qn),oe=ft,ke=gi,Ye=Qn)},setLocked:function(ft){L=ft},setClear:function(ft){bt!==ft&&(t.clearStencil(ft),bt=ft)},reset:function(){L=!1,he=null,ne=null,Re=null,me=null,oe=null,ke=null,Ye=null,bt=null}}}const s=new n,a=new i,o=new r,l=new WeakMap,c=new WeakMap;let d={},h={},f={},g=new WeakMap,v=[],E=null,m=!1,u=null,p=null,_=null,S=null,w=null,M=null,R=null,y=new lt(0,0,0),C=0,N=!1,P=null,B=null,Y=null,J=null,O=null;const W=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,F=0;const G=t.getParameter(t.VERSION);G.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(G)[1]),I=F>=1):G.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),I=F>=2);let $=null,V={};const te=t.getParameter(t.SCISSOR_BOX),re=t.getParameter(t.VIEWPORT),Ee=new Ct().fromArray(te),ue=new Ct().fromArray(re);function U(L,he,ne,Re){const me=new Uint8Array(4),oe=t.createTexture();t.bindTexture(L,oe),t.texParameteri(L,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(L,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ke=0;ke<ne;ke++)L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?t.texImage3D(he,0,t.RGBA,1,1,Re,0,t.RGBA,t.UNSIGNED_BYTE,me):t.texImage2D(he+ke,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,me);return oe}const K={};K[t.TEXTURE_2D]=U(t.TEXTURE_2D,t.TEXTURE_2D,1),K[t.TEXTURE_CUBE_MAP]=U(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[t.TEXTURE_2D_ARRAY]=U(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),K[t.TEXTURE_3D]=U(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(t.DEPTH_TEST),a.setFunc(js),Fe(!1),Ie(cm),Z(t.CULL_FACE),Oe(bi);function Z(L){d[L]!==!0&&(t.enable(L),d[L]=!0)}function ae(L){d[L]!==!1&&(t.disable(L),d[L]=!1)}function Te(L,he){return f[L]!==he?(t.bindFramebuffer(L,he),f[L]=he,L===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=he),L===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=he),!0):!1}function ve(L,he){let ne=v,Re=!1;if(L){ne=g.get(he),ne===void 0&&(ne=[],g.set(he,ne));const me=L.textures;if(ne.length!==me.length||ne[0]!==t.COLOR_ATTACHMENT0){for(let oe=0,ke=me.length;oe<ke;oe++)ne[oe]=t.COLOR_ATTACHMENT0+oe;ne.length=me.length,Re=!0}}else ne[0]!==t.BACK&&(ne[0]=t.BACK,Re=!0);Re&&t.drawBuffers(ne)}function Se(L){return E!==L?(t.useProgram(L),E=L,!0):!1}const _e={[Pr]:t.FUNC_ADD,[hS]:t.FUNC_SUBTRACT,[pS]:t.FUNC_REVERSE_SUBTRACT};_e[mS]=t.MIN,_e[gS]=t.MAX;const Le={[_S]:t.ZERO,[vS]:t.ONE,[xS]:t.SRC_COLOR,[If]:t.SRC_ALPHA,[wS]:t.SRC_ALPHA_SATURATE,[ES]:t.DST_COLOR,[SS]:t.DST_ALPHA,[yS]:t.ONE_MINUS_SRC_COLOR,[Uf]:t.ONE_MINUS_SRC_ALPHA,[TS]:t.ONE_MINUS_DST_COLOR,[MS]:t.ONE_MINUS_DST_ALPHA,[AS]:t.CONSTANT_COLOR,[RS]:t.ONE_MINUS_CONSTANT_COLOR,[CS]:t.CONSTANT_ALPHA,[bS]:t.ONE_MINUS_CONSTANT_ALPHA};function Oe(L,he,ne,Re,me,oe,ke,Ye,bt,ft){if(L===bi){m===!0&&(ae(t.BLEND),m=!1);return}if(m===!1&&(Z(t.BLEND),m=!0),L!==dS){if(L!==u||ft!==N){if((p!==Pr||w!==Pr)&&(t.blendEquation(t.FUNC_ADD),p=Pr,w=Pr),ft)switch(L){case Fs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ql:t.blendFunc(t.ONE,t.ONE);break;case um:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case fm:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:nt("WebGLState: Invalid blending: ",L);break}else switch(L){case Fs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ql:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case um:nt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fm:nt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:nt("WebGLState: Invalid blending: ",L);break}_=null,S=null,M=null,R=null,y.set(0,0,0),C=0,u=L,N=ft}return}me=me||he,oe=oe||ne,ke=ke||Re,(he!==p||me!==w)&&(t.blendEquationSeparate(_e[he],_e[me]),p=he,w=me),(ne!==_||Re!==S||oe!==M||ke!==R)&&(t.blendFuncSeparate(Le[ne],Le[Re],Le[oe],Le[ke]),_=ne,S=Re,M=oe,R=ke),(Ye.equals(y)===!1||bt!==C)&&(t.blendColor(Ye.r,Ye.g,Ye.b,bt),y.copy(Ye),C=bt),u=L,N=!1}function De(L,he){L.side===Ti?ae(t.CULL_FACE):Z(t.CULL_FACE);let ne=L.side===gn;he&&(ne=!ne),Fe(ne),L.blending===Fs&&L.transparent===!1?Oe(bi):Oe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const Re=L.stencilWrite;o.setTest(Re),Re&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),D(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Z(t.SAMPLE_ALPHA_TO_COVERAGE):ae(t.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(L){P!==L&&(L?t.frontFace(t.CW):t.frontFace(t.CCW),P=L)}function Ie(L){L!==cS?(Z(t.CULL_FACE),L!==B&&(L===cm?t.cullFace(t.BACK):L===uS?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ae(t.CULL_FACE),B=L}function rt(L){L!==Y&&(I&&t.lineWidth(L),Y=L)}function D(L,he,ne){L?(Z(t.POLYGON_OFFSET_FILL),(J!==he||O!==ne)&&(J=he,O=ne,a.getReversed()&&(he=-he),t.polygonOffset(he,ne))):ae(t.POLYGON_OFFSET_FILL)}function Ke(L){L?Z(t.SCISSOR_TEST):ae(t.SCISSOR_TEST)}function xe(L){L===void 0&&(L=t.TEXTURE0+W-1),$!==L&&(t.activeTexture(L),$=L)}function He(L,he,ne){ne===void 0&&($===null?ne=t.TEXTURE0+W-1:ne=$);let Re=V[ne];Re===void 0&&(Re={type:void 0,texture:void 0},V[ne]=Re),(Re.type!==L||Re.texture!==he)&&($!==ne&&(t.activeTexture(ne),$=ne),t.bindTexture(L,he||K[L]),Re.type=L,Re.texture=he)}function le(){const L=V[$];L!==void 0&&L.type!==void 0&&(t.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Je(){try{t.compressedTexImage2D(...arguments)}catch(L){nt("WebGLState:",L)}}function A(){try{t.compressedTexImage3D(...arguments)}catch(L){nt("WebGLState:",L)}}function x(){try{t.texSubImage2D(...arguments)}catch(L){nt("WebGLState:",L)}}function z(){try{t.texSubImage3D(...arguments)}catch(L){nt("WebGLState:",L)}}function ee(){try{t.compressedTexSubImage2D(...arguments)}catch(L){nt("WebGLState:",L)}}function se(){try{t.compressedTexSubImage3D(...arguments)}catch(L){nt("WebGLState:",L)}}function fe(){try{t.texStorage2D(...arguments)}catch(L){nt("WebGLState:",L)}}function ge(){try{t.texStorage3D(...arguments)}catch(L){nt("WebGLState:",L)}}function Q(){try{t.texImage2D(...arguments)}catch(L){nt("WebGLState:",L)}}function ie(){try{t.texImage3D(...arguments)}catch(L){nt("WebGLState:",L)}}function Ae(L){return h[L]!==void 0?h[L]:t.getParameter(L)}function be(L,he){h[L]!==he&&(t.pixelStorei(L,he),h[L]=he)}function pe(L){Ee.equals(L)===!1&&(t.scissor(L.x,L.y,L.z,L.w),Ee.copy(L))}function de(L){ue.equals(L)===!1&&(t.viewport(L.x,L.y,L.z,L.w),ue.copy(L))}function je(L,he){let ne=c.get(he);ne===void 0&&(ne=new WeakMap,c.set(he,ne));let Re=ne.get(L);Re===void 0&&(Re=t.getUniformBlockIndex(he,L.name),ne.set(L,Re))}function $e(L,he){const Re=c.get(he).get(L);l.get(he)!==Re&&(t.uniformBlockBinding(he,Re,L.__bindingPointIndex),l.set(he,Re))}function ot(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),d={},h={},$=null,V={},f={},g=new WeakMap,v=[],E=null,m=!1,u=null,p=null,_=null,S=null,w=null,M=null,R=null,y=new lt(0,0,0),C=0,N=!1,P=null,B=null,Y=null,J=null,O=null,Ee.set(0,0,t.canvas.width,t.canvas.height),ue.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Z,disable:ae,bindFramebuffer:Te,drawBuffers:ve,useProgram:Se,setBlending:Oe,setMaterial:De,setFlipSided:Fe,setCullFace:Ie,setLineWidth:rt,setPolygonOffset:D,setScissorTest:Ke,activeTexture:xe,bindTexture:He,unbindTexture:le,compressedTexImage2D:Je,compressedTexImage3D:A,texImage2D:Q,texImage3D:ie,pixelStorei:be,getParameter:Ae,updateUBOMapping:je,uniformBlockBinding:$e,texStorage2D:fe,texStorage3D:ge,texSubImage2D:x,texSubImage3D:z,compressedTexSubImage2D:ee,compressedTexSubImage3D:se,scissor:pe,viewport:de,reset:ot}}function xA(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ge,d=new WeakMap,h=new Set;let f;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(A,x){return v?new OffscreenCanvas(A,x):Jl("canvas")}function m(A,x,z){let ee=1;const se=Je(A);if((se.width>z||se.height>z)&&(ee=z/Math.max(se.width,se.height)),ee<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const fe=Math.floor(ee*se.width),ge=Math.floor(ee*se.height);f===void 0&&(f=E(fe,ge));const Q=x?E(fe,ge):f;return Q.width=fe,Q.height=ge,Q.getContext("2d").drawImage(A,0,0,fe,ge),Ve("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+fe+"x"+ge+")."),Q}else return"data"in A&&Ve("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),A;return A}function u(A){return A.generateMipmaps}function p(A){t.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?t.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(A,x,z,ee,se,fe=!1){if(A!==null){if(t[A]!==void 0)return t[A];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ge;ee&&(ge=e.get("EXT_texture_norm16"),ge||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=x;if(x===t.RED&&(z===t.FLOAT&&(Q=t.R32F),z===t.HALF_FLOAT&&(Q=t.R16F),z===t.UNSIGNED_BYTE&&(Q=t.R8),z===t.UNSIGNED_SHORT&&ge&&(Q=ge.R16_EXT),z===t.SHORT&&ge&&(Q=ge.R16_SNORM_EXT)),x===t.RED_INTEGER&&(z===t.UNSIGNED_BYTE&&(Q=t.R8UI),z===t.UNSIGNED_SHORT&&(Q=t.R16UI),z===t.UNSIGNED_INT&&(Q=t.R32UI),z===t.BYTE&&(Q=t.R8I),z===t.SHORT&&(Q=t.R16I),z===t.INT&&(Q=t.R32I)),x===t.RG&&(z===t.FLOAT&&(Q=t.RG32F),z===t.HALF_FLOAT&&(Q=t.RG16F),z===t.UNSIGNED_BYTE&&(Q=t.RG8),z===t.UNSIGNED_SHORT&&ge&&(Q=ge.RG16_EXT),z===t.SHORT&&ge&&(Q=ge.RG16_SNORM_EXT)),x===t.RG_INTEGER&&(z===t.UNSIGNED_BYTE&&(Q=t.RG8UI),z===t.UNSIGNED_SHORT&&(Q=t.RG16UI),z===t.UNSIGNED_INT&&(Q=t.RG32UI),z===t.BYTE&&(Q=t.RG8I),z===t.SHORT&&(Q=t.RG16I),z===t.INT&&(Q=t.RG32I)),x===t.RGB_INTEGER&&(z===t.UNSIGNED_BYTE&&(Q=t.RGB8UI),z===t.UNSIGNED_SHORT&&(Q=t.RGB16UI),z===t.UNSIGNED_INT&&(Q=t.RGB32UI),z===t.BYTE&&(Q=t.RGB8I),z===t.SHORT&&(Q=t.RGB16I),z===t.INT&&(Q=t.RGB32I)),x===t.RGBA_INTEGER&&(z===t.UNSIGNED_BYTE&&(Q=t.RGBA8UI),z===t.UNSIGNED_SHORT&&(Q=t.RGBA16UI),z===t.UNSIGNED_INT&&(Q=t.RGBA32UI),z===t.BYTE&&(Q=t.RGBA8I),z===t.SHORT&&(Q=t.RGBA16I),z===t.INT&&(Q=t.RGBA32I)),x===t.RGB&&(z===t.UNSIGNED_SHORT&&ge&&(Q=ge.RGB16_EXT),z===t.SHORT&&ge&&(Q=ge.RGB16_SNORM_EXT),z===t.UNSIGNED_INT_5_9_9_9_REV&&(Q=t.RGB9_E5),z===t.UNSIGNED_INT_10F_11F_11F_REV&&(Q=t.R11F_G11F_B10F)),x===t.RGBA){const ie=fe?Ql:it.getTransfer(se);z===t.FLOAT&&(Q=t.RGBA32F),z===t.HALF_FLOAT&&(Q=t.RGBA16F),z===t.UNSIGNED_BYTE&&(Q=ie===ct?t.SRGB8_ALPHA8:t.RGBA8),z===t.UNSIGNED_SHORT&&ge&&(Q=ge.RGBA16_EXT),z===t.SHORT&&ge&&(Q=ge.RGBA16_SNORM_EXT),z===t.UNSIGNED_SHORT_4_4_4_4&&(Q=t.RGBA4),z===t.UNSIGNED_SHORT_5_5_5_1&&(Q=t.RGB5_A1)}return(Q===t.R16F||Q===t.R32F||Q===t.RG16F||Q===t.RG32F||Q===t.RGBA16F||Q===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function w(A,x){let z;return A?x===null||x===pi||x===Qa?z=t.DEPTH24_STENCIL8:x===oi?z=t.DEPTH32F_STENCIL8:x===Za&&(z=t.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===pi||x===Qa?z=t.DEPTH_COMPONENT24:x===oi?z=t.DEPTH_COMPONENT32F:x===Za&&(z=t.DEPTH_COMPONENT16),z}function M(A,x){return u(A)===!0||A.isFramebufferTexture&&A.minFilter!==Wt&&A.minFilter!==Jt?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function R(A){const x=A.target;x.removeEventListener("dispose",R),C(x),x.isVideoTexture&&d.delete(x),x.isHTMLTexture&&h.delete(x)}function y(A){const x=A.target;x.removeEventListener("dispose",y),P(x)}function C(A){const x=i.get(A);if(x.__webglInit===void 0)return;const z=A.source,ee=g.get(z);if(ee){const se=ee[x.__cacheKey];se.usedTimes--,se.usedTimes===0&&N(A),Object.keys(ee).length===0&&g.delete(z)}i.remove(A)}function N(A){const x=i.get(A);t.deleteTexture(x.__webglTexture);const z=A.source,ee=g.get(z);delete ee[x.__cacheKey],a.memory.textures--}function P(A){const x=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(x.__webglFramebuffer[ee]))for(let se=0;se<x.__webglFramebuffer[ee].length;se++)t.deleteFramebuffer(x.__webglFramebuffer[ee][se]);else t.deleteFramebuffer(x.__webglFramebuffer[ee]);x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer[ee])}else{if(Array.isArray(x.__webglFramebuffer))for(let ee=0;ee<x.__webglFramebuffer.length;ee++)t.deleteFramebuffer(x.__webglFramebuffer[ee]);else t.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&t.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&t.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let ee=0;ee<x.__webglColorRenderbuffer.length;ee++)x.__webglColorRenderbuffer[ee]&&t.deleteRenderbuffer(x.__webglColorRenderbuffer[ee]);x.__webglDepthRenderbuffer&&t.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const z=A.textures;for(let ee=0,se=z.length;ee<se;ee++){const fe=i.get(z[ee]);fe.__webglTexture&&(t.deleteTexture(fe.__webglTexture),a.memory.textures--),i.remove(z[ee])}i.remove(A)}let B=0;function Y(){B=0}function J(){return B}function O(A){B=A}function W(){const A=B;return A>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),B+=1,A}function I(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function F(A,x){const z=i.get(A);if(A.isVideoTexture&&He(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){const ee=A.image;if(ee===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{ae(z,A,x);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,z.__webglTexture,t.TEXTURE0+x)}function G(A,x){const z=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){ae(z,A,x);return}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,z.__webglTexture,t.TEXTURE0+x)}function $(A,x){const z=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){ae(z,A,x);return}n.bindTexture(t.TEXTURE_3D,z.__webglTexture,t.TEXTURE0+x)}function V(A,x){const z=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&z.__version!==A.version){Te(z,A,x);return}n.bindTexture(t.TEXTURE_CUBE_MAP,z.__webglTexture,t.TEXTURE0+x)}const te={[Gf]:t.REPEAT,[Ri]:t.CLAMP_TO_EDGE,[Wf]:t.MIRRORED_REPEAT},re={[Wt]:t.NEAREST,[DS]:t.NEAREST_MIPMAP_NEAREST,[Po]:t.NEAREST_MIPMAP_LINEAR,[Jt]:t.LINEAR,[ru]:t.LINEAR_MIPMAP_NEAREST,[Ur]:t.LINEAR_MIPMAP_LINEAR},Ee={[US]:t.NEVER,[zS]:t.ALWAYS,[FS]:t.LESS,[Ph]:t.LEQUAL,[OS]:t.EQUAL,[Nh]:t.GEQUAL,[kS]:t.GREATER,[BS]:t.NOTEQUAL};function ue(A,x){if(x.type===oi&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Jt||x.magFilter===ru||x.magFilter===Po||x.magFilter===Ur||x.minFilter===Jt||x.minFilter===ru||x.minFilter===Po||x.minFilter===Ur)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(A,t.TEXTURE_WRAP_S,te[x.wrapS]),t.texParameteri(A,t.TEXTURE_WRAP_T,te[x.wrapT]),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,te[x.wrapR]),t.texParameteri(A,t.TEXTURE_MAG_FILTER,re[x.magFilter]),t.texParameteri(A,t.TEXTURE_MIN_FILTER,re[x.minFilter]),x.compareFunction&&(t.texParameteri(A,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(A,t.TEXTURE_COMPARE_FUNC,Ee[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Wt||x.minFilter!==Po&&x.minFilter!==Ur||x.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");t.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function U(A,x){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",R));const ee=x.source;let se=g.get(ee);se===void 0&&(se={},g.set(ee,se));const fe=I(x);if(fe!==A.__cacheKey){se[fe]===void 0&&(se[fe]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,z=!0),se[fe].usedTimes++;const ge=se[A.__cacheKey];ge!==void 0&&(se[A.__cacheKey].usedTimes--,ge.usedTimes===0&&N(x)),A.__cacheKey=fe,A.__webglTexture=se[fe].texture}return z}function K(A,x,z){return Math.floor(Math.floor(A/z)/x)}function Z(A,x,z,ee){const fe=A.updateRanges;if(fe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,x.width,x.height,z,ee,x.data);else{fe.sort((be,pe)=>be.start-pe.start);let ge=0;for(let be=1;be<fe.length;be++){const pe=fe[ge],de=fe[be],je=pe.start+pe.count,$e=K(de.start,x.width,4),ot=K(pe.start,x.width,4);de.start<=je+1&&$e===ot&&K(de.start+de.count-1,x.width,4)===$e?pe.count=Math.max(pe.count,de.start+de.count-pe.start):(++ge,fe[ge]=de)}fe.length=ge+1;const Q=n.getParameter(t.UNPACK_ROW_LENGTH),ie=n.getParameter(t.UNPACK_SKIP_PIXELS),Ae=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,x.width);for(let be=0,pe=fe.length;be<pe;be++){const de=fe[be],je=Math.floor(de.start/4),$e=Math.ceil(de.count/4),ot=je%x.width,L=Math.floor(je/x.width),he=$e,ne=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,ot),n.pixelStorei(t.UNPACK_SKIP_ROWS,L),n.texSubImage2D(t.TEXTURE_2D,0,ot,L,he,ne,z,ee,x.data)}A.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,Q),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ie),n.pixelStorei(t.UNPACK_SKIP_ROWS,Ae)}}function ae(A,x,z){let ee=t.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ee=t.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ee=t.TEXTURE_3D);const se=U(A,x),fe=x.source;n.bindTexture(ee,A.__webglTexture,t.TEXTURE0+z);const ge=i.get(fe);if(fe.version!==ge.__version||se===!0){if(n.activeTexture(t.TEXTURE0+z),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ne=it.getPrimaries(it.workingColorSpace),Re=x.colorSpace===nr?null:it.getPrimaries(x.colorSpace),me=x.colorSpace===nr||ne===Re?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,me)}n.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment);let ie=m(x.image,!1,r.maxTextureSize);ie=le(x,ie);const Ae=s.convert(x.format,x.colorSpace),be=s.convert(x.type);let pe=S(x.internalFormat,Ae,be,x.normalized,x.colorSpace,x.isVideoTexture);ue(ee,x);let de;const je=x.mipmaps,$e=x.isVideoTexture!==!0,ot=ge.__version===void 0||se===!0,L=fe.dataReady,he=M(x,ie);if(x.isDepthTexture)pe=w(x.format===Fr,x.type),ot&&($e?n.texStorage2D(t.TEXTURE_2D,1,pe,ie.width,ie.height):n.texImage2D(t.TEXTURE_2D,0,pe,ie.width,ie.height,0,Ae,be,null));else if(x.isDataTexture)if(je.length>0){$e&&ot&&n.texStorage2D(t.TEXTURE_2D,he,pe,je[0].width,je[0].height);for(let ne=0,Re=je.length;ne<Re;ne++)de=je[ne],$e?L&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,de.width,de.height,Ae,be,de.data):n.texImage2D(t.TEXTURE_2D,ne,pe,de.width,de.height,0,Ae,be,de.data);x.generateMipmaps=!1}else $e?(ot&&n.texStorage2D(t.TEXTURE_2D,he,pe,ie.width,ie.height),L&&Z(x,ie,Ae,be)):n.texImage2D(t.TEXTURE_2D,0,pe,ie.width,ie.height,0,Ae,be,ie.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){$e&&ot&&n.texStorage3D(t.TEXTURE_2D_ARRAY,he,pe,je[0].width,je[0].height,ie.depth);for(let ne=0,Re=je.length;ne<Re;ne++)if(de=je[ne],x.format!==qn)if(Ae!==null)if($e){if(L)if(x.layerUpdates.size>0){const me=Wm(de.width,de.height,x.format,x.type);for(const oe of x.layerUpdates){const ke=de.data.subarray(oe*me/de.data.BYTES_PER_ELEMENT,(oe+1)*me/de.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,oe,de.width,de.height,1,Ae,ke)}x.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,ie.depth,Ae,de.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ne,pe,de.width,de.height,ie.depth,0,de.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?L&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,ie.depth,Ae,be,de.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ne,pe,de.width,de.height,ie.depth,0,Ae,be,de.data)}else{$e&&ot&&n.texStorage2D(t.TEXTURE_2D,he,pe,je[0].width,je[0].height);for(let ne=0,Re=je.length;ne<Re;ne++)de=je[ne],x.format!==qn?Ae!==null?$e?L&&n.compressedTexSubImage2D(t.TEXTURE_2D,ne,0,0,de.width,de.height,Ae,de.data):n.compressedTexImage2D(t.TEXTURE_2D,ne,pe,de.width,de.height,0,de.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?L&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,de.width,de.height,Ae,be,de.data):n.texImage2D(t.TEXTURE_2D,ne,pe,de.width,de.height,0,Ae,be,de.data)}else if(x.isDataArrayTexture)if($e){if(ot&&n.texStorage3D(t.TEXTURE_2D_ARRAY,he,pe,ie.width,ie.height,ie.depth),L)if(x.layerUpdates.size>0){const ne=Wm(ie.width,ie.height,x.format,x.type);for(const Re of x.layerUpdates){const me=ie.data.subarray(Re*ne/ie.data.BYTES_PER_ELEMENT,(Re+1)*ne/ie.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Re,ie.width,ie.height,1,Ae,be,me)}x.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Ae,be,ie.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,pe,ie.width,ie.height,ie.depth,0,Ae,be,ie.data);else if(x.isData3DTexture)$e?(ot&&n.texStorage3D(t.TEXTURE_3D,he,pe,ie.width,ie.height,ie.depth),L&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Ae,be,ie.data)):n.texImage3D(t.TEXTURE_3D,0,pe,ie.width,ie.height,ie.depth,0,Ae,be,ie.data);else if(x.isFramebufferTexture){if(ot)if($e)n.texStorage2D(t.TEXTURE_2D,he,pe,ie.width,ie.height);else{let ne=ie.width,Re=ie.height;for(let me=0;me<he;me++)n.texImage2D(t.TEXTURE_2D,me,pe,ne,Re,0,Ae,be,null),ne>>=1,Re>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in t){const ne=t.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),ie.parentNode!==ne){ne.appendChild(ie),h.add(x),ne.onpaint=Ye=>{const bt=Ye.changedElements;for(const ft of h)bt.includes(ft.image)&&(ft.needsUpdate=!0)},ne.requestPaint();return}const Re=0,me=t.RGBA,oe=t.RGBA,ke=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,Re,me,oe,ke,ie),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(je.length>0){if($e&&ot){const ne=Je(je[0]);n.texStorage2D(t.TEXTURE_2D,he,pe,ne.width,ne.height)}for(let ne=0,Re=je.length;ne<Re;ne++)de=je[ne],$e?L&&n.texSubImage2D(t.TEXTURE_2D,ne,0,0,Ae,be,de):n.texImage2D(t.TEXTURE_2D,ne,pe,Ae,be,de);x.generateMipmaps=!1}else if($e){if(ot){const ne=Je(ie);n.texStorage2D(t.TEXTURE_2D,he,pe,ne.width,ne.height)}L&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,Ae,be,ie)}else n.texImage2D(t.TEXTURE_2D,0,pe,Ae,be,ie);u(x)&&p(ee),ge.__version=fe.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Te(A,x,z){if(x.image.length!==6)return;const ee=U(A,x),se=x.source;n.bindTexture(t.TEXTURE_CUBE_MAP,A.__webglTexture,t.TEXTURE0+z);const fe=i.get(se);if(se.version!==fe.__version||ee===!0){n.activeTexture(t.TEXTURE0+z);const ge=it.getPrimaries(it.workingColorSpace),Q=x.colorSpace===nr?null:it.getPrimaries(x.colorSpace),ie=x.colorSpace===nr||ge===Q?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);const Ae=x.isCompressedTexture||x.image[0].isCompressedTexture,be=x.image[0]&&x.image[0].isDataTexture,pe=[];for(let oe=0;oe<6;oe++)!Ae&&!be?pe[oe]=m(x.image[oe],!0,r.maxCubemapSize):pe[oe]=be?x.image[oe].image:x.image[oe],pe[oe]=le(x,pe[oe]);const de=pe[0],je=s.convert(x.format,x.colorSpace),$e=s.convert(x.type),ot=S(x.internalFormat,je,$e,x.normalized,x.colorSpace),L=x.isVideoTexture!==!0,he=fe.__version===void 0||ee===!0,ne=se.dataReady;let Re=M(x,de);ue(t.TEXTURE_CUBE_MAP,x);let me;if(Ae){L&&he&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Re,ot,de.width,de.height);for(let oe=0;oe<6;oe++){me=pe[oe].mipmaps;for(let ke=0;ke<me.length;ke++){const Ye=me[ke];x.format!==qn?je!==null?L?ne&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,0,0,Ye.width,Ye.height,je,Ye.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,ot,Ye.width,Ye.height,0,Ye.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,0,0,Ye.width,Ye.height,je,$e,Ye.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke,ot,Ye.width,Ye.height,0,je,$e,Ye.data)}}}else{if(me=x.mipmaps,L&&he){me.length>0&&Re++;const oe=Je(pe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Re,ot,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(be){L?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,pe[oe].width,pe[oe].height,je,$e,pe[oe].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ot,pe[oe].width,pe[oe].height,0,je,$e,pe[oe].data);for(let ke=0;ke<me.length;ke++){const bt=me[ke].image[oe].image;L?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,0,0,bt.width,bt.height,je,$e,bt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,ot,bt.width,bt.height,0,je,$e,bt.data)}}else{L?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,je,$e,pe[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ot,je,$e,pe[oe]);for(let ke=0;ke<me.length;ke++){const Ye=me[ke];L?ne&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,0,0,je,$e,Ye.image[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ke+1,ot,je,$e,Ye.image[oe])}}}u(x)&&p(t.TEXTURE_CUBE_MAP),fe.__version=se.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function ve(A,x,z,ee,se,fe){const ge=s.convert(z.format,z.colorSpace),Q=s.convert(z.type),ie=S(z.internalFormat,ge,Q,z.normalized,z.colorSpace),Ae=i.get(x),be=i.get(z);if(be.__renderTarget=x,!Ae.__hasExternalTextures){const pe=Math.max(1,x.width>>fe),de=Math.max(1,x.height>>fe);se===t.TEXTURE_3D||se===t.TEXTURE_2D_ARRAY?n.texImage3D(se,fe,ie,pe,de,x.depth,0,ge,Q,null):n.texImage2D(se,fe,ie,pe,de,0,ge,Q,null)}n.bindFramebuffer(t.FRAMEBUFFER,A),xe(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ee,se,be.__webglTexture,0,Ke(x)):(se===t.TEXTURE_2D||se>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,ee,se,be.__webglTexture,fe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Se(A,x,z){if(t.bindRenderbuffer(t.RENDERBUFFER,A),x.depthBuffer){const ee=x.depthTexture,se=ee&&ee.isDepthTexture?ee.type:null,fe=w(x.stencilBuffer,se),ge=x.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;xe(x)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ke(x),fe,x.width,x.height):z?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ke(x),fe,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,fe,x.width,x.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ge,t.RENDERBUFFER,A)}else{const ee=x.textures;for(let se=0;se<ee.length;se++){const fe=ee[se],ge=s.convert(fe.format,fe.colorSpace),Q=s.convert(fe.type),ie=S(fe.internalFormat,ge,Q,fe.normalized,fe.colorSpace);xe(x)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Ke(x),ie,x.width,x.height):z?t.renderbufferStorageMultisample(t.RENDERBUFFER,Ke(x),ie,x.width,x.height):t.renderbufferStorage(t.RENDERBUFFER,ie,x.width,x.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function _e(A,x,z){const ee=x.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const se=i.get(x.depthTexture);if(se.__renderTarget=x,(!se.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),ee){if(se.__webglInit===void 0&&(se.__webglInit=!0,x.depthTexture.addEventListener("dispose",R)),se.__webglTexture===void 0){se.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,se.__webglTexture),ue(t.TEXTURE_CUBE_MAP,x.depthTexture);const Ae=s.convert(x.depthTexture.format),be=s.convert(x.depthTexture.type);let pe;x.depthTexture.format===Fi?pe=t.DEPTH_COMPONENT24:x.depthTexture.format===Fr&&(pe=t.DEPTH24_STENCIL8);for(let de=0;de<6;de++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,pe,x.width,x.height,0,Ae,be,null)}}else F(x.depthTexture,0);const fe=se.__webglTexture,ge=Ke(x),Q=ee?t.TEXTURE_CUBE_MAP_POSITIVE_X+z:t.TEXTURE_2D,ie=x.depthTexture.format===Fr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(x.depthTexture.format===Fi)xe(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ie,Q,fe,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,ie,Q,fe,0);else if(x.depthTexture.format===Fr)xe(x)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ie,Q,fe,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,ie,Q,fe,0);else throw new Error("Unknown depthTexture format")}function Le(A){const x=i.get(A),z=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const ee=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),ee){const se=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,ee.removeEventListener("dispose",se)};ee.addEventListener("dispose",se),x.__depthDisposeCallback=se}x.__boundDepthTexture=ee}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(z)for(let ee=0;ee<6;ee++)_e(x.__webglFramebuffer[ee],A,ee);else{const ee=A.texture.mipmaps;ee&&ee.length>0?_e(x.__webglFramebuffer[0],A,0):_e(x.__webglFramebuffer,A,0)}else if(z){x.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[ee]),x.__webglDepthbuffer[ee]===void 0)x.__webglDepthbuffer[ee]=t.createRenderbuffer(),Se(x.__webglDepthbuffer[ee],A,!1);else{const se=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,fe=x.__webglDepthbuffer[ee];t.bindRenderbuffer(t.RENDERBUFFER,fe),t.framebufferRenderbuffer(t.FRAMEBUFFER,se,t.RENDERBUFFER,fe)}}else{const ee=A.texture.mipmaps;if(ee&&ee.length>0?n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=t.createRenderbuffer(),Se(x.__webglDepthbuffer,A,!1);else{const se=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,fe=x.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,fe),t.framebufferRenderbuffer(t.FRAMEBUFFER,se,t.RENDERBUFFER,fe)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Oe(A,x,z){const ee=i.get(A);x!==void 0&&ve(ee.__webglFramebuffer,A,A.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),z!==void 0&&Le(A)}function De(A){const x=A.texture,z=i.get(A),ee=i.get(x);A.addEventListener("dispose",y);const se=A.textures,fe=A.isWebGLCubeRenderTarget===!0,ge=se.length>1;if(ge||(ee.__webglTexture===void 0&&(ee.__webglTexture=t.createTexture()),ee.__version=x.version,a.memory.textures++),fe){z.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer[Q]=[];for(let ie=0;ie<x.mipmaps.length;ie++)z.__webglFramebuffer[Q][ie]=t.createFramebuffer()}else z.__webglFramebuffer[Q]=t.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){z.__webglFramebuffer=[];for(let Q=0;Q<x.mipmaps.length;Q++)z.__webglFramebuffer[Q]=t.createFramebuffer()}else z.__webglFramebuffer=t.createFramebuffer();if(ge)for(let Q=0,ie=se.length;Q<ie;Q++){const Ae=i.get(se[Q]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=t.createTexture(),a.memory.textures++)}if(A.samples>0&&xe(A)===!1){z.__webglMultisampledFramebuffer=t.createFramebuffer(),z.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Q=0;Q<se.length;Q++){const ie=se[Q];z.__webglColorRenderbuffer[Q]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,z.__webglColorRenderbuffer[Q]);const Ae=s.convert(ie.format,ie.colorSpace),be=s.convert(ie.type),pe=S(ie.internalFormat,Ae,be,ie.normalized,ie.colorSpace,A.isXRRenderTarget===!0),de=Ke(A);t.renderbufferStorageMultisample(t.RENDERBUFFER,de,pe,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Q,t.RENDERBUFFER,z.__webglColorRenderbuffer[Q])}t.bindRenderbuffer(t.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=t.createRenderbuffer(),Se(z.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(fe){n.bindTexture(t.TEXTURE_CUBE_MAP,ee.__webglTexture),ue(t.TEXTURE_CUBE_MAP,x);for(let Q=0;Q<6;Q++)if(x.mipmaps&&x.mipmaps.length>0)for(let ie=0;ie<x.mipmaps.length;ie++)ve(z.__webglFramebuffer[Q][ie],A,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ie);else ve(z.__webglFramebuffer[Q],A,x,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);u(x)&&p(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ge){for(let Q=0,ie=se.length;Q<ie;Q++){const Ae=se[Q],be=i.get(Ae);let pe=t.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pe=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(pe,be.__webglTexture),ue(pe,Ae),ve(z.__webglFramebuffer,A,Ae,t.COLOR_ATTACHMENT0+Q,pe,0),u(Ae)&&p(pe)}n.unbindTexture()}else{let Q=t.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Q,ee.__webglTexture),ue(Q,x),x.mipmaps&&x.mipmaps.length>0)for(let ie=0;ie<x.mipmaps.length;ie++)ve(z.__webglFramebuffer[ie],A,x,t.COLOR_ATTACHMENT0,Q,ie);else ve(z.__webglFramebuffer,A,x,t.COLOR_ATTACHMENT0,Q,0);u(x)&&p(Q),n.unbindTexture()}A.depthBuffer&&Le(A)}function Fe(A){const x=A.textures;for(let z=0,ee=x.length;z<ee;z++){const se=x[z];if(u(se)){const fe=_(A),ge=i.get(se).__webglTexture;n.bindTexture(fe,ge),p(fe),n.unbindTexture()}}}const Ie=[],rt=[];function D(A){if(A.samples>0){if(xe(A)===!1){const x=A.textures,z=A.width,ee=A.height;let se=t.COLOR_BUFFER_BIT;const fe=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ge=i.get(A),Q=x.length>1;if(Q)for(let Ae=0;Ae<x.length;Ae++)n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const ie=A.texture.mipmaps;ie&&ie.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Ae=0;Ae<x.length;Ae++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(se|=t.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(se|=t.STENCIL_BUFFER_BIT)),Q){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ge.__webglColorRenderbuffer[Ae]);const be=i.get(x[Ae]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,be,0)}t.blitFramebuffer(0,0,z,ee,0,0,z,ee,se,t.NEAREST),l===!0&&(Ie.length=0,rt.length=0,Ie.push(t.COLOR_ATTACHMENT0+Ae),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ie.push(fe),rt.push(fe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,rt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ie))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Q)for(let Ae=0;Ae<x.length;Ae++){n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.RENDERBUFFER,ge.__webglColorRenderbuffer[Ae]);const be=i.get(x[Ae]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ae,t.TEXTURE_2D,be,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const x=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[x])}}}function Ke(A){return Math.min(r.maxSamples,A.samples)}function xe(A){const x=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function He(A){const x=a.render.frame;d.get(A)!==x&&(d.set(A,x),A.update())}function le(A,x){const z=A.colorSpace,ee=A.format,se=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==Zl&&z!==nr&&(it.getTransfer(z)===ct?(ee!==qn||se!==Mn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):nt("WebGLTextures: Unsupported texture color space:",z)),x}function Je(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=Y,this.getTextureUnits=J,this.setTextureUnits=O,this.setTexture2D=F,this.setTexture2DArray=G,this.setTexture3D=$,this.setTextureCube=V,this.rebindTextures=Oe,this.setupRenderTarget=De,this.updateRenderTargetMipmap=Fe,this.updateMultisampleRenderTarget=D,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=xe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function yA(t,e){function n(i,r=nr){let s;const a=it.getTransfer(r);if(i===Mn)return t.UNSIGNED_BYTE;if(i===wh)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Ah)return t.UNSIGNED_SHORT_5_5_5_1;if(i===G_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===W_)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===H_)return t.BYTE;if(i===V_)return t.SHORT;if(i===Za)return t.UNSIGNED_SHORT;if(i===Th)return t.INT;if(i===pi)return t.UNSIGNED_INT;if(i===oi)return t.FLOAT;if(i===Ui)return t.HALF_FLOAT;if(i===j_)return t.ALPHA;if(i===X_)return t.RGB;if(i===qn)return t.RGBA;if(i===Fi)return t.DEPTH_COMPONENT;if(i===Fr)return t.DEPTH_STENCIL;if(i===Y_)return t.RED;if(i===Rh)return t.RED_INTEGER;if(i===jr)return t.RG;if(i===Ch)return t.RG_INTEGER;if(i===bh)return t.RGBA_INTEGER;if(i===vl||i===xl||i===yl||i===Sl)if(a===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===vl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Sl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===vl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===xl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Sl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jf||i===Xf||i===Yf||i===qf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===jf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Xf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Yf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===qf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===$f||i===Kf||i===Zf||i===Qf||i===Jf||i===$l||i===ed)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===$f||i===Kf)return a===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Zf)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Qf)return s.COMPRESSED_R11_EAC;if(i===Jf)return s.COMPRESSED_SIGNED_R11_EAC;if(i===$l)return s.COMPRESSED_RG11_EAC;if(i===ed)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===td||i===nd||i===id||i===rd||i===sd||i===ad||i===od||i===ld||i===cd||i===ud||i===fd||i===dd||i===hd||i===pd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===td)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===nd)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===id)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===rd)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===sd)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ad)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===od)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ld)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===cd)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ud)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fd)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===dd)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===hd)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===pd)return a===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===md||i===gd||i===_d)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===md)return a===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===gd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===_d)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===vd||i===xd||i===Kl||i===yd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===vd)return s.COMPRESSED_RED_RGTC1_EXT;if(i===xd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Kl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Qa?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const SA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,MA=`
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

}`;class EA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new rv(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new mi({vertexShader:SA,fragmentShader:MA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Oi(new Tc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class TA extends Mr{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,f=null,g=null,v=null;const E=typeof XRWebGLBinding<"u",m=new EA,u={},p=n.getContextAttributes();let _=null,S=null;const w=[],M=[],R=new Ge;let y=null;const C=new Sn;C.viewport=new Ct;const N=new Sn;N.viewport=new Ct;const P=[C,N],B=new DM;let Y=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let K=w[U];return K===void 0&&(K=new fu,w[U]=K),K.getTargetRaySpace()},this.getControllerGrip=function(U){let K=w[U];return K===void 0&&(K=new fu,w[U]=K),K.getGripSpace()},this.getHand=function(U){let K=w[U];return K===void 0&&(K=new fu,w[U]=K),K.getHandSpace()};function O(U){const K=M.indexOf(U.inputSource);if(K===-1)return;const Z=w[K];Z!==void 0&&(Z.update(U.inputSource,U.frame,c||a),Z.dispatchEvent({type:U.type,data:U.inputSource}))}function W(){r.removeEventListener("select",O),r.removeEventListener("selectstart",O),r.removeEventListener("selectend",O),r.removeEventListener("squeeze",O),r.removeEventListener("squeezestart",O),r.removeEventListener("squeezeend",O),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",I);for(let U=0;U<w.length;U++){const K=M[U];K!==null&&(M[U]=null,w[U].disconnect(K))}Y=null,J=null,m.reset();for(const U in u)delete u[U];e.setRenderTarget(_),g=null,f=null,h=null,r=null,S=null,ue.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){s=U,i.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){o=U,i.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(U){c=U},this.getBaseLayer=function(){return f!==null?f:g},this.getBinding=function(){return h===null&&E&&(h=new XRWebGLBinding(r,n)),h},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(U){if(r=U,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",O),r.addEventListener("selectstart",O),r.addEventListener("selectend",O),r.addEventListener("squeeze",O),r.addEventListener("squeezestart",O),r.addEventListener("squeezeend",O),r.addEventListener("end",W),r.addEventListener("inputsourceschange",I),p.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(R),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let Z=null,ae=null,Te=null;p.depth&&(Te=p.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,Z=p.stencil?Fr:Fi,ae=p.stencil?Qa:pi);const ve={colorFormat:n.RGBA8,depthFormat:Te,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(ve),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new di(f.textureWidth,f.textureHeight,{format:qn,type:Mn,depthTexture:new Ys(f.textureWidth,f.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Z={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};g=new XRWebGLLayer(r,n,Z),r.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),S=new di(g.framebufferWidth,g.framebufferHeight,{format:qn,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),ue.setContext(r),ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function I(U){for(let K=0;K<U.removed.length;K++){const Z=U.removed[K],ae=M.indexOf(Z);ae>=0&&(M[ae]=null,w[ae].disconnect(Z))}for(let K=0;K<U.added.length;K++){const Z=U.added[K];let ae=M.indexOf(Z);if(ae===-1){for(let ve=0;ve<w.length;ve++)if(ve>=M.length){M.push(Z),ae=ve;break}else if(M[ve]===null){M[ve]=Z,ae=ve;break}if(ae===-1)break}const Te=w[ae];Te&&Te.connect(Z)}}const F=new H,G=new H;function $(U,K,Z){F.setFromMatrixPosition(K.matrixWorld),G.setFromMatrixPosition(Z.matrixWorld);const ae=F.distanceTo(G),Te=K.projectionMatrix.elements,ve=Z.projectionMatrix.elements,Se=Te[14]/(Te[10]-1),_e=Te[14]/(Te[10]+1),Le=(Te[9]+1)/Te[5],Oe=(Te[9]-1)/Te[5],De=(Te[8]-1)/Te[0],Fe=(ve[8]+1)/ve[0],Ie=Se*De,rt=Se*Fe,D=ae/(-De+Fe),Ke=D*-De;if(K.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(Ke),U.translateZ(D),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),Te[10]===-1)U.projectionMatrix.copy(K.projectionMatrix),U.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const xe=Se+D,He=_e+D,le=Ie-Ke,Je=rt+(ae-Ke),A=Le*_e/He*xe,x=Oe*_e/He*xe;U.projectionMatrix.makePerspective(le,Je,A,x,xe,He),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function V(U,K){K===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(K.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(r===null)return;let K=U.near,Z=U.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(Z=m.depthFar)),B.near=N.near=C.near=K,B.far=N.far=C.far=Z,(Y!==B.near||J!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),Y=B.near,J=B.far),B.layers.mask=U.layers.mask|6,C.layers.mask=B.layers.mask&-5,N.layers.mask=B.layers.mask&-3;const ae=U.parent,Te=B.cameras;V(B,ae);for(let ve=0;ve<Te.length;ve++)V(Te[ve],ae);Te.length===2?$(B,C,N):B.projectionMatrix.copy(C.projectionMatrix),te(U,B,ae)};function te(U,K,Z){Z===null?U.matrix.copy(K.matrixWorld):(U.matrix.copy(Z.matrixWorld),U.matrix.invert(),U.matrix.multiply(K.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(K.projectionMatrix),U.projectionMatrixInverse.copy(K.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=Ed*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(f===null&&g===null))return l},this.setFoveation=function(U){l=U,f!==null&&(f.fixedFoveation=U),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=U)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(U){return u[U]};let re=null;function Ee(U,K){if(d=K.getViewerPose(c||a),v=K,d!==null){const Z=d.views;g!==null&&(e.setRenderTargetFramebuffer(S,g.framebuffer),e.setRenderTarget(S));let ae=!1;Z.length!==B.cameras.length&&(B.cameras.length=0,ae=!0);for(let _e=0;_e<Z.length;_e++){const Le=Z[_e];let Oe=null;if(g!==null)Oe=g.getViewport(Le);else{const Fe=h.getViewSubImage(f,Le);Oe=Fe.viewport,_e===0&&(e.setRenderTargetTextures(S,Fe.colorTexture,Fe.depthStencilTexture),e.setRenderTarget(S))}let De=P[_e];De===void 0&&(De=new Sn,De.layers.enable(_e),De.viewport=new Ct,P[_e]=De),De.matrix.fromArray(Le.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(Le.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),_e===0&&(B.matrix.copy(De.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ae===!0&&B.cameras.push(De)}const Te=r.enabledFeatures;if(Te&&Te.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&E){h=i.getBinding();const _e=h.getDepthInformation(Z[0]);_e&&_e.isValid&&_e.texture&&m.init(_e,r.renderState)}if(Te&&Te.includes("camera-access")&&E){e.state.unbindTexture(),h=i.getBinding();for(let _e=0;_e<Z.length;_e++){const Le=Z[_e].camera;if(Le){let Oe=u[Le];Oe||(Oe=new rv,u[Le]=Oe);const De=h.getCameraImage(Le);Oe.sourceTexture=De}}}}for(let Z=0;Z<w.length;Z++){const ae=M[Z],Te=w[Z];ae!==null&&Te!==void 0&&Te.update(ae,K,c||a)}re&&re(U,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),v=null}const ue=new cv;ue.setAnimationLoop(Ee),this.setAnimationLoop=function(U){re=U},this.dispose=function(){}}}const wA=new Mt,gv=new Xe;gv.set(-1,0,0,0,1,0,0,0,1);function AA(t,e){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,sv(t)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function r(m,u,p,_,S){u.isNodeMaterial?u.uniformsNeedUpdate=!1:u.isMeshBasicMaterial?s(m,u):u.isMeshLambertMaterial?(s(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshToonMaterial?(s(m,u),h(m,u)):u.isMeshPhongMaterial?(s(m,u),d(m,u),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)):u.isMeshStandardMaterial?(s(m,u),f(m,u),u.isMeshPhysicalMaterial&&g(m,u,S)):u.isMeshMatcapMaterial?(s(m,u),v(m,u)):u.isMeshDepthMaterial?s(m,u):u.isMeshDistanceMaterial?(s(m,u),E(m,u)):u.isMeshNormalMaterial?s(m,u):u.isLineBasicMaterial?(a(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,p,_):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function s(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===gn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===gn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const p=e.get(u),_=p.envMap,S=p.envMapRotation;_&&(m.envMap.value=_,m.envMapRotation.value.setFromMatrix4(wA.makeRotationFromEuler(S)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(gv),m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function a(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,p,_){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*p,m.scale.value=_*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function g(m,u,p){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===gn&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=p.texture,m.transmissionSamplerSize.value.set(p.width,p.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,u){u.matcap&&(m.matcap.value=u.matcap)}function E(m,u){const p=e.get(u).light;m.referencePosition.value.setFromMatrixPosition(p.matrixWorld),m.nearDistance.value=p.shadow.camera.near,m.farDistance.value=p.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function RA(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(p,_){const S=_.program;i.uniformBlockBinding(p,S)}function c(p,_){let S=r[p.id];S===void 0&&(v(p),S=d(p),r[p.id]=S,p.addEventListener("dispose",m));const w=_.program;i.updateUBOMapping(p,w);const M=e.render.frame;s[p.id]!==M&&(f(p),s[p.id]=M)}function d(p){const _=h();p.__bindingPointIndex=_;const S=t.createBuffer(),w=p.__size,M=p.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,w,M),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,_,S),S}function h(){for(let p=0;p<o;p++)if(a.indexOf(p)===-1)return a.push(p),p;return nt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(p){const _=r[p.id],S=p.uniforms,w=p.__cache;t.bindBuffer(t.UNIFORM_BUFFER,_);for(let M=0,R=S.length;M<R;M++){const y=Array.isArray(S[M])?S[M]:[S[M]];for(let C=0,N=y.length;C<N;C++){const P=y[C];if(g(P,M,C,w)===!0){const B=P.__offset,Y=Array.isArray(P.value)?P.value:[P.value];let J=0;for(let O=0;O<Y.length;O++){const W=Y[O],I=E(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,t.bufferSubData(t.UNIFORM_BUFFER,B+J,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):ArrayBuffer.isView(W)?P.__data.set(new W.constructor(W.buffer,W.byteOffset,P.__data.length)):(W.toArray(P.__data,J),J+=I.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,B,P.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function g(p,_,S,w){const M=p.value,R=_+"_"+S;if(w[R]===void 0)return typeof M=="number"||typeof M=="boolean"?w[R]=M:ArrayBuffer.isView(M)?w[R]=M.slice():w[R]=M.clone(),!0;{const y=w[R];if(typeof M=="number"||typeof M=="boolean"){if(y!==M)return w[R]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(y.equals(M)===!1)return y.copy(M),!0}}return!1}function v(p){const _=p.uniforms;let S=0;const w=16;for(let R=0,y=_.length;R<y;R++){const C=Array.isArray(_[R])?_[R]:[_[R]];for(let N=0,P=C.length;N<P;N++){const B=C[N],Y=Array.isArray(B.value)?B.value:[B.value];for(let J=0,O=Y.length;J<O;J++){const W=Y[J],I=E(W),F=S%w,G=F%I.boundary,$=F+G;S+=G,$!==0&&w-$<I.storage&&(S+=w-$),B.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=I.storage}}}const M=S%w;return M>0&&(S+=w-M),p.__size=S,p.__cache={},this}function E(p){const _={boundary:0,storage:0};return typeof p=="number"||typeof p=="boolean"?(_.boundary=4,_.storage=4):p.isVector2?(_.boundary=8,_.storage=8):p.isVector3||p.isColor?(_.boundary=16,_.storage=12):p.isVector4?(_.boundary=16,_.storage=16):p.isMatrix3?(_.boundary=48,_.storage=48):p.isMatrix4?(_.boundary=64,_.storage=64):p.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(p)?(_.boundary=16,_.storage=p.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",p),_}function m(p){const _=p.target;_.removeEventListener("dispose",m);const S=a.indexOf(_.__bindingPointIndex);a.splice(S,1),t.deleteBuffer(r[_.id]),delete r[_.id],delete s[_.id]}function u(){for(const p in r)t.deleteBuffer(r[p]);a=[],r={},s={}}return{bind:l,update:c,dispose:u}}const CA=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ni=null;function bA(){return ni===null&&(ni=new pM(CA,16,16,jr,Ui),ni.name="DFG_LUT",ni.minFilter=Jt,ni.magFilter=Jt,ni.wrapS=Ri,ni.wrapT=Ri,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}class PA{constructor(e={}){const{canvas:n=VS(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1,outputBufferType:g=Mn}=e;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=a;const E=g,m=new Set([bh,Ch,Rh]),u=new Set([Mn,pi,Za,Qa,wh,Ah]),p=new Uint32Array(4),_=new Int32Array(4),S=new H;let w=null,M=null;const R=[],y=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const N=this;let P=!1,B=null;this._outputColorSpace=Nn;let Y=0,J=0,O=null,W=-1,I=null;const F=new Ct,G=new Ct;let $=null;const V=new lt(0);let te=0,re=n.width,Ee=n.height,ue=1,U=null,K=null;const Z=new Ct(0,0,re,Ee),ae=new Ct(0,0,re,Ee);let Te=!1;const ve=new Ih;let Se=!1,_e=!1;const Le=new Mt,Oe=new H,De=new Ct,Fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ie=!1;function rt(){return O===null?ue:1}let D=i;function Ke(T,k){return n.getContext(T,k)}try{const T={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Eh}`),n.addEventListener("webglcontextlost",oe,!1),n.addEventListener("webglcontextrestored",ke,!1),n.addEventListener("webglcontextcreationerror",Ye,!1),D===null){const k="webgl2";if(D=Ke(k,T),D===null)throw Ke(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw nt("WebGLRenderer: "+T.message),T}let xe,He,le,Je,A,x,z,ee,se,fe,ge,Q,ie,Ae,be,pe,de,je,$e,ot,L,he,ne;function Re(){xe=new b1(D),xe.init(),L=new yA(D,xe),He=new S1(D,xe,e,L),le=new vA(D,xe),He.reversedDepthBuffer&&f&&le.buffers.depth.setReversed(!0),Je=new D1(D),A=new rA,x=new xA(D,xe,le,A,He,L,Je),z=new C1(N),ee=new FM(D),he=new x1(D,ee),se=new P1(D,ee,Je,he),fe=new I1(D,se,ee,he,Je),je=new L1(D,He,x),be=new M1(A),ge=new iA(N,z,xe,He,he,be),Q=new AA(N,A),ie=new aA,Ae=new dA(xe),de=new v1(N,z,le,fe,v,l),pe=new _A(N,fe,He),ne=new RA(D,Je,He,le),$e=new y1(D,xe,Je),ot=new N1(D,xe,Je),Je.programs=ge.programs,N.capabilities=He,N.extensions=xe,N.properties=A,N.renderLists=ie,N.shadowMap=pe,N.state=le,N.info=Je}Re(),E!==Mn&&(C=new F1(E,n.width,n.height,r,s));const me=new TA(N,D);this.xr=me,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const T=xe.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=xe.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(T){T!==void 0&&(ue=T,this.setSize(re,Ee,!1))},this.getSize=function(T){return T.set(re,Ee)},this.setSize=function(T,k,q=!0){if(me.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}re=T,Ee=k,n.width=Math.floor(T*ue),n.height=Math.floor(k*ue),q===!0&&(n.style.width=T+"px",n.style.height=k+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,T,k)},this.getDrawingBufferSize=function(T){return T.set(re*ue,Ee*ue).floor()},this.setDrawingBufferSize=function(T,k,q){re=T,Ee=k,ue=q,n.width=Math.floor(T*q),n.height=Math.floor(k*q),this.setViewport(0,0,T,k)},this.setEffects=function(T){if(E===Mn){nt("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let k=0;k<T.length;k++)if(T[k].isOutputPass===!0){Ve("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(F)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,k,q,j){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,k,q,j),le.viewport(F.copy(Z).multiplyScalar(ue).round())},this.getScissor=function(T){return T.copy(ae)},this.setScissor=function(T,k,q,j){T.isVector4?ae.set(T.x,T.y,T.z,T.w):ae.set(T,k,q,j),le.scissor(G.copy(ae).multiplyScalar(ue).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(T){le.setScissorTest(Te=T)},this.setOpaqueSort=function(T){U=T},this.setTransparentSort=function(T){K=T},this.getClearColor=function(T){return T.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(T=!0,k=!0,q=!0){let j=0;if(T){let X=!1;if(O!==null){const we=O.texture.format;X=m.has(we)}if(X){const we=O.texture.type,Pe=u.has(we),Me=de.getClearColor(),Ue=de.getClearAlpha(),Be=Me.r,qe=Me.g,Qe=Me.b;Pe?(p[0]=Be,p[1]=qe,p[2]=Qe,p[3]=Ue,D.clearBufferuiv(D.COLOR,0,p)):(_[0]=Be,_[1]=qe,_[2]=Qe,_[3]=Ue,D.clearBufferiv(D.COLOR,0,_))}else j|=D.COLOR_BUFFER_BIT}k&&(j|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(j|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j!==0&&D.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),B=T},this.dispose=function(){n.removeEventListener("webglcontextlost",oe,!1),n.removeEventListener("webglcontextrestored",ke,!1),n.removeEventListener("webglcontextcreationerror",Ye,!1),de.dispose(),ie.dispose(),Ae.dispose(),A.dispose(),z.dispose(),fe.dispose(),he.dispose(),ne.dispose(),ge.dispose(),me.dispose(),me.removeEventListener("sessionstart",Hh),me.removeEventListener("sessionend",Vh),Er.stop()};function oe(T){T.preventDefault(),ec("WebGLRenderer: Context Lost."),P=!0}function ke(){ec("WebGLRenderer: Context Restored."),P=!1;const T=Je.autoReset,k=pe.enabled,q=pe.autoUpdate,j=pe.needsUpdate,X=pe.type;Re(),Je.autoReset=T,pe.enabled=k,pe.autoUpdate=q,pe.needsUpdate=j,pe.type=X}function Ye(T){nt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function bt(T){const k=T.target;k.removeEventListener("dispose",bt),ft(k)}function ft(T){gi(T),A.remove(T)}function gi(T){const k=A.get(T).programs;k!==void 0&&(k.forEach(function(q){ge.releaseProgram(q)}),T.isShaderMaterial&&ge.releaseShaderCache(T))}this.renderBufferDirect=function(T,k,q,j,X,we){k===null&&(k=Fe);const Pe=X.isMesh&&X.matrixWorld.determinant()<0,Me=yv(T,k,q,j,X);le.setMaterial(j,Pe);let Ue=q.index,Be=1;if(j.wireframe===!0){if(Ue=se.getWireframeAttribute(q),Ue===void 0)return;Be=2}const qe=q.drawRange,Qe=q.attributes.position;let ze=qe.start*Be,dt=(qe.start+qe.count)*Be;we!==null&&(ze=Math.max(ze,we.start*Be),dt=Math.min(dt,(we.start+we.count)*Be)),Ue!==null?(ze=Math.max(ze,0),dt=Math.min(dt,Ue.count)):Qe!=null&&(ze=Math.max(ze,0),dt=Math.min(dt,Qe.count));const Pt=dt-ze;if(Pt<0||Pt===1/0)return;he.setup(X,j,Me,q,Ue);let At,mt=$e;if(Ue!==null&&(At=ee.get(Ue),mt=ot,mt.setIndex(At)),X.isMesh)j.wireframe===!0?(le.setLineWidth(j.wireframeLinewidth*rt()),mt.setMode(D.LINES)):mt.setMode(D.TRIANGLES);else if(X.isLine){let Yt=j.linewidth;Yt===void 0&&(Yt=1),le.setLineWidth(Yt*rt()),X.isLineSegments?mt.setMode(D.LINES):X.isLineLoop?mt.setMode(D.LINE_LOOP):mt.setMode(D.LINE_STRIP)}else X.isPoints?mt.setMode(D.POINTS):X.isSprite&&mt.setMode(D.TRIANGLES);if(X.isBatchedMesh)if(xe.get("WEBGL_multi_draw"))mt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Yt=X._multiDrawStarts,Ce=X._multiDrawCounts,_n=X._multiDrawCount,st=Ue?ee.get(Ue).bytesPerElement:1,Cn=A.get(j).currentProgram.getUniforms();for(let Jn=0;Jn<_n;Jn++)Cn.setValue(D,"_gl_DrawID",Jn),mt.render(Yt[Jn]/st,Ce[Jn])}else if(X.isInstancedMesh)mt.renderInstances(ze,Pt,X.count);else if(q.isInstancedBufferGeometry){const Yt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ce=Math.min(q.instanceCount,Yt);mt.renderInstances(ze,Pt,Ce)}else mt.render(ze,Pt)};function Qn(T,k,q){T.transparent===!0&&T.side===Ti&&T.forceSinglePass===!1?(T.side=gn,T.needsUpdate=!0,co(T,k,q),T.side=_r,T.needsUpdate=!0,co(T,k,q),T.side=Ti):co(T,k,q)}this.compile=function(T,k,q=null){q===null&&(q=T),M=Ae.get(q),M.init(k),y.push(M),q.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(M.pushLight(X),X.castShadow&&M.pushShadow(X))}),T!==q&&T.traverseVisible(function(X){X.isLight&&X.layers.test(k.layers)&&(M.pushLight(X),X.castShadow&&M.pushShadow(X))}),M.setupLights();const j=new Set;return T.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const we=X.material;if(we)if(Array.isArray(we))for(let Pe=0;Pe<we.length;Pe++){const Me=we[Pe];Qn(Me,q,X),j.add(Me)}else Qn(we,q,X),j.add(we)}),M=y.pop(),j},this.compileAsync=function(T,k,q=null){const j=this.compile(T,k,q);return new Promise(X=>{function we(){if(j.forEach(function(Pe){A.get(Pe).currentProgram.isReady()&&j.delete(Pe)}),j.size===0){X(T);return}setTimeout(we,10)}xe.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let Rc=null;function vv(T){Rc&&Rc(T)}function Hh(){Er.stop()}function Vh(){Er.start()}const Er=new cv;Er.setAnimationLoop(vv),typeof self<"u"&&Er.setContext(self),this.setAnimationLoop=function(T){Rc=T,me.setAnimationLoop(T),T===null?Er.stop():Er.start()},me.addEventListener("sessionstart",Hh),me.addEventListener("sessionend",Vh),this.render=function(T,k){if(k!==void 0&&k.isCamera!==!0){nt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;B!==null&&B.renderStart(T,k);const q=me.enabled===!0&&me.isPresenting===!0,j=C!==null&&(O===null||q)&&C.begin(N,O);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),me.enabled===!0&&me.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(me.cameraAutoUpdate===!0&&me.updateCamera(k),k=me.getCamera()),T.isScene===!0&&T.onBeforeRender(N,T,k,O),M=Ae.get(T,y.length),M.init(k),M.state.textureUnits=x.getTextureUnits(),y.push(M),Le.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ve.setFromProjectionMatrix(Le,li,k.reversedDepth),_e=this.localClippingEnabled,Se=be.init(this.clippingPlanes,_e),w=ie.get(T,R.length),w.init(),R.push(w),me.enabled===!0&&me.isPresenting===!0){const Pe=N.xr.getDepthSensingMesh();Pe!==null&&Cc(Pe,k,-1/0,N.sortObjects)}Cc(T,k,0,N.sortObjects),w.finish(),N.sortObjects===!0&&w.sort(U,K),Ie=me.enabled===!1||me.isPresenting===!1||me.hasDepthSensing()===!1,Ie&&de.addToRenderList(w,T),this.info.render.frame++,Se===!0&&be.beginShadows();const X=M.state.shadowsArray;if(pe.render(X,T,k),Se===!0&&be.endShadows(),this.info.autoReset===!0&&this.info.reset(),(j&&C.hasRenderPass())===!1){const Pe=w.opaque,Me=w.transmissive;if(M.setupLights(),k.isArrayCamera){const Ue=k.cameras;if(Me.length>0)for(let Be=0,qe=Ue.length;Be<qe;Be++){const Qe=Ue[Be];Wh(Pe,Me,T,Qe)}Ie&&de.render(T);for(let Be=0,qe=Ue.length;Be<qe;Be++){const Qe=Ue[Be];Gh(w,T,Qe,Qe.viewport)}}else Me.length>0&&Wh(Pe,Me,T,k),Ie&&de.render(T),Gh(w,T,k)}O!==null&&J===0&&(x.updateMultisampleRenderTarget(O),x.updateRenderTargetMipmap(O)),j&&C.end(N),T.isScene===!0&&T.onAfterRender(N,T,k),he.resetDefaultState(),W=-1,I=null,y.pop(),y.length>0?(M=y[y.length-1],x.setTextureUnits(M.state.textureUnits),Se===!0&&be.setGlobalState(N.clippingPlanes,M.state.camera)):M=null,R.pop(),R.length>0?w=R[R.length-1]:w=null,B!==null&&B.renderEnd()};function Cc(T,k,q,j){if(T.visible===!1)return;if(T.layers.test(k.layers)){if(T.isGroup)q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(k);else if(T.isLightProbeGrid)M.pushLightProbeGrid(T);else if(T.isLight)M.pushLight(T),T.castShadow&&M.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ve.intersectsSprite(T)){j&&De.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Le);const Pe=fe.update(T),Me=T.material;Me.visible&&w.push(T,Pe,Me,q,De.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ve.intersectsObject(T))){const Pe=fe.update(T),Me=T.material;if(j&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),De.copy(T.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),De.copy(Pe.boundingSphere.center)),De.applyMatrix4(T.matrixWorld).applyMatrix4(Le)),Array.isArray(Me)){const Ue=Pe.groups;for(let Be=0,qe=Ue.length;Be<qe;Be++){const Qe=Ue[Be],ze=Me[Qe.materialIndex];ze&&ze.visible&&w.push(T,Pe,ze,q,De.z,Qe)}}else Me.visible&&w.push(T,Pe,Me,q,De.z,null)}}const we=T.children;for(let Pe=0,Me=we.length;Pe<Me;Pe++)Cc(we[Pe],k,q,j)}function Gh(T,k,q,j){const{opaque:X,transmissive:we,transparent:Pe}=T;M.setupLightsView(q),Se===!0&&be.setGlobalState(N.clippingPlanes,q),j&&le.viewport(F.copy(j)),X.length>0&&lo(X,k,q),we.length>0&&lo(we,k,q),Pe.length>0&&lo(Pe,k,q),le.buffers.depth.setTest(!0),le.buffers.depth.setMask(!0),le.buffers.color.setMask(!0),le.setPolygonOffset(!1)}function Wh(T,k,q,j){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[j.id]===void 0){const ze=xe.has("EXT_color_buffer_half_float")||xe.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[j.id]=new di(1,1,{generateMipmaps:!0,type:ze?Ui:Mn,minFilter:Ur,samples:Math.max(4,He.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace})}const we=M.state.transmissionRenderTarget[j.id],Pe=j.viewport||F;we.setSize(Pe.z*N.transmissionResolutionScale,Pe.w*N.transmissionResolutionScale);const Me=N.getRenderTarget(),Ue=N.getActiveCubeFace(),Be=N.getActiveMipmapLevel();N.setRenderTarget(we),N.getClearColor(V),te=N.getClearAlpha(),te<1&&N.setClearColor(16777215,.5),N.clear(),Ie&&de.render(q);const qe=N.toneMapping;N.toneMapping=fi;const Qe=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),M.setupLightsView(j),Se===!0&&be.setGlobalState(N.clippingPlanes,j),lo(T,q,j),x.updateMultisampleRenderTarget(we),x.updateRenderTargetMipmap(we),xe.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let dt=0,Pt=k.length;dt<Pt;dt++){const At=k[dt],{object:mt,geometry:Yt,material:Ce,group:_n}=At;if(Ce.side===Ti&&mt.layers.test(j.layers)){const st=Ce.side;Ce.side=gn,Ce.needsUpdate=!0,jh(mt,q,j,Yt,Ce,_n),Ce.side=st,Ce.needsUpdate=!0,ze=!0}}ze===!0&&(x.updateMultisampleRenderTarget(we),x.updateRenderTargetMipmap(we))}N.setRenderTarget(Me,Ue,Be),N.setClearColor(V,te),Qe!==void 0&&(j.viewport=Qe),N.toneMapping=qe}function lo(T,k,q){const j=k.isScene===!0?k.overrideMaterial:null;for(let X=0,we=T.length;X<we;X++){const Pe=T[X],{object:Me,geometry:Ue,group:Be}=Pe;let qe=Pe.material;qe.allowOverride===!0&&j!==null&&(qe=j),Me.layers.test(q.layers)&&jh(Me,k,q,Ue,qe,Be)}}function jh(T,k,q,j,X,we){T.onBeforeRender(N,k,q,j,X,we),T.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),X.onBeforeRender(N,k,q,j,T,we),X.transparent===!0&&X.side===Ti&&X.forceSinglePass===!1?(X.side=gn,X.needsUpdate=!0,N.renderBufferDirect(q,k,j,X,T,we),X.side=_r,X.needsUpdate=!0,N.renderBufferDirect(q,k,j,X,T,we),X.side=Ti):N.renderBufferDirect(q,k,j,X,T,we),T.onAfterRender(N,k,q,j,X,we)}function co(T,k,q){k.isScene!==!0&&(k=Fe);const j=A.get(T),X=M.state.lights,we=M.state.shadowsArray,Pe=X.state.version,Me=ge.getParameters(T,X.state,we,k,q,M.state.lightProbeGridArray),Ue=ge.getProgramCacheKey(Me);let Be=j.programs;j.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?k.environment:null,j.fog=k.fog;const qe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;j.envMap=z.get(T.envMap||j.environment,qe),j.envMapRotation=j.environment!==null&&T.envMap===null?k.environmentRotation:T.envMapRotation,Be===void 0&&(T.addEventListener("dispose",bt),Be=new Map,j.programs=Be);let Qe=Be.get(Ue);if(Qe!==void 0){if(j.currentProgram===Qe&&j.lightsStateVersion===Pe)return Yh(T,Me),Qe}else Me.uniforms=ge.getUniforms(T),B!==null&&T.isNodeMaterial&&B.build(T,q,Me),T.onBeforeCompile(Me,N),Qe=ge.acquireProgram(Me,Ue),Be.set(Ue,Qe),j.uniforms=Me.uniforms;const ze=j.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(ze.clippingPlanes=be.uniform),Yh(T,Me),j.needsLights=Mv(T),j.lightsStateVersion=Pe,j.needsLights&&(ze.ambientLightColor.value=X.state.ambient,ze.lightProbe.value=X.state.probe,ze.directionalLights.value=X.state.directional,ze.directionalLightShadows.value=X.state.directionalShadow,ze.spotLights.value=X.state.spot,ze.spotLightShadows.value=X.state.spotShadow,ze.rectAreaLights.value=X.state.rectArea,ze.ltc_1.value=X.state.rectAreaLTC1,ze.ltc_2.value=X.state.rectAreaLTC2,ze.pointLights.value=X.state.point,ze.pointLightShadows.value=X.state.pointShadow,ze.hemisphereLights.value=X.state.hemi,ze.directionalShadowMatrix.value=X.state.directionalShadowMatrix,ze.spotLightMatrix.value=X.state.spotLightMatrix,ze.spotLightMap.value=X.state.spotLightMap,ze.pointShadowMatrix.value=X.state.pointShadowMatrix),j.lightProbeGrid=M.state.lightProbeGridArray.length>0,j.currentProgram=Qe,j.uniformsList=null,Qe}function Xh(T){if(T.uniformsList===null){const k=T.currentProgram.getUniforms();T.uniformsList=El.seqWithValue(k.seq,T.uniforms)}return T.uniformsList}function Yh(T,k){const q=A.get(T);q.outputColorSpace=k.outputColorSpace,q.batching=k.batching,q.batchingColor=k.batchingColor,q.instancing=k.instancing,q.instancingColor=k.instancingColor,q.instancingMorph=k.instancingMorph,q.skinning=k.skinning,q.morphTargets=k.morphTargets,q.morphNormals=k.morphNormals,q.morphColors=k.morphColors,q.morphTargetsCount=k.morphTargetsCount,q.numClippingPlanes=k.numClippingPlanes,q.numIntersection=k.numClipIntersection,q.vertexAlphas=k.vertexAlphas,q.vertexTangents=k.vertexTangents,q.toneMapping=k.toneMapping}function xv(T,k){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;S.setFromMatrixPosition(k.matrixWorld);for(let q=0,j=T.length;q<j;q++){const X=T[q];if(X.texture!==null&&X.boundingBox.containsPoint(S))return X}return null}function yv(T,k,q,j,X){k.isScene!==!0&&(k=Fe),x.resetTextureUnits();const we=k.fog,Pe=j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial?k.environment:null,Me=O===null?N.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:it.workingColorSpace,Ue=j.isMeshStandardMaterial||j.isMeshLambertMaterial&&!j.envMap||j.isMeshPhongMaterial&&!j.envMap,Be=z.get(j.envMap||Pe,Ue),qe=j.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Qe=!!q.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),ze=!!q.morphAttributes.position,dt=!!q.morphAttributes.normal,Pt=!!q.morphAttributes.color;let At=fi;j.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(At=N.toneMapping);const mt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Yt=mt!==void 0?mt.length:0,Ce=A.get(j),_n=M.state.lights;if(Se===!0&&(_e===!0||T!==I)){const _t=T===I&&j.id===W;be.setState(j,T,_t)}let st=!1;j.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==_n.state.version||Ce.outputColorSpace!==Me||X.isBatchedMesh&&Ce.batching===!1||!X.isBatchedMesh&&Ce.batching===!0||X.isBatchedMesh&&Ce.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Ce.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Ce.instancing===!1||!X.isInstancedMesh&&Ce.instancing===!0||X.isSkinnedMesh&&Ce.skinning===!1||!X.isSkinnedMesh&&Ce.skinning===!0||X.isInstancedMesh&&Ce.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ce.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ce.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ce.instancingMorph===!1&&X.morphTexture!==null||Ce.envMap!==Be||j.fog===!0&&Ce.fog!==we||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==be.numPlanes||Ce.numIntersection!==be.numIntersection)||Ce.vertexAlphas!==qe||Ce.vertexTangents!==Qe||Ce.morphTargets!==ze||Ce.morphNormals!==dt||Ce.morphColors!==Pt||Ce.toneMapping!==At||Ce.morphTargetsCount!==Yt||!!Ce.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(st=!0):(st=!0,Ce.__version=j.version);let Cn=Ce.currentProgram;st===!0&&(Cn=co(j,k,X),B&&j.isNodeMaterial&&B.onUpdateProgram(j,Cn,Ce));let Jn=!1,Bi=!1,$r=!1;const gt=Cn.getUniforms(),Nt=Ce.uniforms;if(le.useProgram(Cn.program)&&(Jn=!0,Bi=!0,$r=!0),j.id!==W&&(W=j.id,Bi=!0),Ce.needsLights){const _t=xv(M.state.lightProbeGridArray,X);Ce.lightProbeGrid!==_t&&(Ce.lightProbeGrid=_t,Bi=!0)}if(Jn||I!==T){le.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),gt.setValue(D,"projectionMatrix",T.projectionMatrix),gt.setValue(D,"viewMatrix",T.matrixWorldInverse);const Hi=gt.map.cameraPosition;Hi!==void 0&&Hi.setValue(D,Oe.setFromMatrixPosition(T.matrixWorld)),He.logarithmicDepthBuffer&&gt.setValue(D,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&gt.setValue(D,"isOrthographic",T.isOrthographicCamera===!0),I!==T&&(I=T,Bi=!0,$r=!0)}if(Ce.needsLights&&(_n.state.directionalShadowMap.length>0&&gt.setValue(D,"directionalShadowMap",_n.state.directionalShadowMap,x),_n.state.spotShadowMap.length>0&&gt.setValue(D,"spotShadowMap",_n.state.spotShadowMap,x),_n.state.pointShadowMap.length>0&&gt.setValue(D,"pointShadowMap",_n.state.pointShadowMap,x)),X.isSkinnedMesh){gt.setOptional(D,X,"bindMatrix"),gt.setOptional(D,X,"bindMatrixInverse");const _t=X.skeleton;_t&&(_t.boneTexture===null&&_t.computeBoneTexture(),gt.setValue(D,"boneTexture",_t.boneTexture,x))}X.isBatchedMesh&&(gt.setOptional(D,X,"batchingTexture"),gt.setValue(D,"batchingTexture",X._matricesTexture,x),gt.setOptional(D,X,"batchingIdTexture"),gt.setValue(D,"batchingIdTexture",X._indirectTexture,x),gt.setOptional(D,X,"batchingColorTexture"),X._colorsTexture!==null&&gt.setValue(D,"batchingColorTexture",X._colorsTexture,x));const zi=q.morphAttributes;if((zi.position!==void 0||zi.normal!==void 0||zi.color!==void 0)&&je.update(X,q,Cn),(Bi||Ce.receiveShadow!==X.receiveShadow)&&(Ce.receiveShadow=X.receiveShadow,gt.setValue(D,"receiveShadow",X.receiveShadow)),(j.isMeshStandardMaterial||j.isMeshLambertMaterial||j.isMeshPhongMaterial)&&j.envMap===null&&k.environment!==null&&(Nt.envMapIntensity.value=k.environmentIntensity),Nt.dfgLUT!==void 0&&(Nt.dfgLUT.value=bA()),Bi){if(gt.setValue(D,"toneMappingExposure",N.toneMappingExposure),Ce.needsLights&&Sv(Nt,$r),we&&j.fog===!0&&Q.refreshFogUniforms(Nt,we),Q.refreshMaterialUniforms(Nt,j,ue,Ee,M.state.transmissionRenderTarget[T.id]),Ce.needsLights&&Ce.lightProbeGrid){const _t=Ce.lightProbeGrid;Nt.probesSH.value=_t.texture,Nt.probesMin.value.copy(_t.boundingBox.min),Nt.probesMax.value.copy(_t.boundingBox.max),Nt.probesResolution.value.copy(_t.resolution)}El.upload(D,Xh(Ce),Nt,x)}if(j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(El.upload(D,Xh(Ce),Nt,x),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&gt.setValue(D,"center",X.center),gt.setValue(D,"modelViewMatrix",X.modelViewMatrix),gt.setValue(D,"normalMatrix",X.normalMatrix),gt.setValue(D,"modelMatrix",X.matrixWorld),j.uniformsGroups!==void 0){const _t=j.uniformsGroups;for(let Hi=0,Kr=_t.length;Hi<Kr;Hi++){const qh=_t[Hi];ne.update(qh,Cn),ne.bind(qh,Cn)}}return Cn}function Sv(T,k){T.ambientLightColor.needsUpdate=k,T.lightProbe.needsUpdate=k,T.directionalLights.needsUpdate=k,T.directionalLightShadows.needsUpdate=k,T.pointLights.needsUpdate=k,T.pointLightShadows.needsUpdate=k,T.spotLights.needsUpdate=k,T.spotLightShadows.needsUpdate=k,T.rectAreaLights.needsUpdate=k,T.hemisphereLights.needsUpdate=k}function Mv(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(T,k,q){const j=A.get(T);j.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),A.get(T.texture).__webglTexture=k,A.get(T.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:q,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,k){const q=A.get(T);q.__webglFramebuffer=k,q.__useDefaultFramebuffer=k===void 0};const Ev=D.createFramebuffer();this.setRenderTarget=function(T,k=0,q=0){O=T,Y=k,J=q;let j=null,X=!1,we=!1;if(T){const Me=A.get(T);if(Me.__useDefaultFramebuffer!==void 0){le.bindFramebuffer(D.FRAMEBUFFER,Me.__webglFramebuffer),F.copy(T.viewport),G.copy(T.scissor),$=T.scissorTest,le.viewport(F),le.scissor(G),le.setScissorTest($),W=-1;return}else if(Me.__webglFramebuffer===void 0)x.setupRenderTarget(T);else if(Me.__hasExternalTextures)x.rebindTextures(T,A.get(T.texture).__webglTexture,A.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const qe=T.depthTexture;if(Me.__boundDepthTexture!==qe){if(qe!==null&&A.has(qe)&&(T.width!==qe.image.width||T.height!==qe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");x.setupDepthRenderbuffer(T)}}const Ue=T.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(we=!0);const Be=A.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Be[k])?j=Be[k][q]:j=Be[k],X=!0):T.samples>0&&x.useMultisampledRTT(T)===!1?j=A.get(T).__webglMultisampledFramebuffer:Array.isArray(Be)?j=Be[q]:j=Be,F.copy(T.viewport),G.copy(T.scissor),$=T.scissorTest}else F.copy(Z).multiplyScalar(ue).floor(),G.copy(ae).multiplyScalar(ue).floor(),$=Te;if(q!==0&&(j=Ev),le.bindFramebuffer(D.FRAMEBUFFER,j)&&le.drawBuffers(T,j),le.viewport(F),le.scissor(G),le.setScissorTest($),X){const Me=A.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+k,Me.__webglTexture,q)}else if(we){const Me=k;for(let Ue=0;Ue<T.textures.length;Ue++){const Be=A.get(T.textures[Ue]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ue,Be.__webglTexture,q,Me)}}else if(T!==null&&q!==0){const Me=A.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Me.__webglTexture,q)}W=-1},this.readRenderTargetPixels=function(T,k,q,j,X,we,Pe,Me=0){if(!(T&&T.isWebGLRenderTarget)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=A.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ue=Ue[Pe]),Ue){le.bindFramebuffer(D.FRAMEBUFFER,Ue);try{const Be=T.textures[Me],qe=Be.format,Qe=Be.type;if(T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Me),!He.textureFormatReadable(qe)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Qe)){nt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=T.width-j&&q>=0&&q<=T.height-X&&D.readPixels(k,q,j,X,L.convert(qe),L.convert(Qe),we)}finally{const Be=O!==null?A.get(O).__webglFramebuffer:null;le.bindFramebuffer(D.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(T,k,q,j,X,we,Pe,Me=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=A.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ue=Ue[Pe]),Ue)if(k>=0&&k<=T.width-j&&q>=0&&q<=T.height-X){le.bindFramebuffer(D.FRAMEBUFFER,Ue);const Be=T.textures[Me],qe=Be.format,Qe=Be.type;if(T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Me),!He.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ze=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ze),D.bufferData(D.PIXEL_PACK_BUFFER,we.byteLength,D.STREAM_READ),D.readPixels(k,q,j,X,L.convert(qe),L.convert(Qe),0);const dt=O!==null?A.get(O).__webglFramebuffer:null;le.bindFramebuffer(D.FRAMEBUFFER,dt);const Pt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await GS(D,Pt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ze),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,we),D.deleteBuffer(ze),D.deleteSync(Pt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,k=null,q=0){const j=Math.pow(2,-q),X=Math.floor(T.image.width*j),we=Math.floor(T.image.height*j),Pe=k!==null?k.x:0,Me=k!==null?k.y:0;x.setTexture2D(T,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,Pe,Me,X,we),le.unbindTexture()};const Tv=D.createFramebuffer(),wv=D.createFramebuffer();this.copyTextureToTexture=function(T,k,q=null,j=null,X=0,we=0){let Pe,Me,Ue,Be,qe,Qe,ze,dt,Pt;const At=T.isCompressedTexture?T.mipmaps[we]:T.image;if(q!==null)Pe=q.max.x-q.min.x,Me=q.max.y-q.min.y,Ue=q.isBox3?q.max.z-q.min.z:1,Be=q.min.x,qe=q.min.y,Qe=q.isBox3?q.min.z:0;else{const Nt=Math.pow(2,-X);Pe=Math.floor(At.width*Nt),Me=Math.floor(At.height*Nt),T.isDataArrayTexture?Ue=At.depth:T.isData3DTexture?Ue=Math.floor(At.depth*Nt):Ue=1,Be=0,qe=0,Qe=0}j!==null?(ze=j.x,dt=j.y,Pt=j.z):(ze=0,dt=0,Pt=0);const mt=L.convert(k.format),Yt=L.convert(k.type);let Ce;k.isData3DTexture?(x.setTexture3D(k,0),Ce=D.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(x.setTexture2DArray(k,0),Ce=D.TEXTURE_2D_ARRAY):(x.setTexture2D(k,0),Ce=D.TEXTURE_2D),le.activeTexture(D.TEXTURE0),le.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,k.flipY),le.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),le.pixelStorei(D.UNPACK_ALIGNMENT,k.unpackAlignment);const _n=le.getParameter(D.UNPACK_ROW_LENGTH),st=le.getParameter(D.UNPACK_IMAGE_HEIGHT),Cn=le.getParameter(D.UNPACK_SKIP_PIXELS),Jn=le.getParameter(D.UNPACK_SKIP_ROWS),Bi=le.getParameter(D.UNPACK_SKIP_IMAGES);le.pixelStorei(D.UNPACK_ROW_LENGTH,At.width),le.pixelStorei(D.UNPACK_IMAGE_HEIGHT,At.height),le.pixelStorei(D.UNPACK_SKIP_PIXELS,Be),le.pixelStorei(D.UNPACK_SKIP_ROWS,qe),le.pixelStorei(D.UNPACK_SKIP_IMAGES,Qe);const $r=T.isDataArrayTexture||T.isData3DTexture,gt=k.isDataArrayTexture||k.isData3DTexture;if(T.isDepthTexture){const Nt=A.get(T),zi=A.get(k),_t=A.get(Nt.__renderTarget),Hi=A.get(zi.__renderTarget);le.bindFramebuffer(D.READ_FRAMEBUFFER,_t.__webglFramebuffer),le.bindFramebuffer(D.DRAW_FRAMEBUFFER,Hi.__webglFramebuffer);for(let Kr=0;Kr<Ue;Kr++)$r&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,A.get(T).__webglTexture,X,Qe+Kr),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,A.get(k).__webglTexture,we,Pt+Kr)),D.blitFramebuffer(Be,qe,Pe,Me,ze,dt,Pe,Me,D.DEPTH_BUFFER_BIT,D.NEAREST);le.bindFramebuffer(D.READ_FRAMEBUFFER,null),le.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(X!==0||T.isRenderTargetTexture||A.has(T)){const Nt=A.get(T),zi=A.get(k);le.bindFramebuffer(D.READ_FRAMEBUFFER,Tv),le.bindFramebuffer(D.DRAW_FRAMEBUFFER,wv);for(let _t=0;_t<Ue;_t++)$r?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Nt.__webglTexture,X,Qe+_t):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Nt.__webglTexture,X),gt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,zi.__webglTexture,we,Pt+_t):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,zi.__webglTexture,we),X!==0?D.blitFramebuffer(Be,qe,Pe,Me,ze,dt,Pe,Me,D.COLOR_BUFFER_BIT,D.NEAREST):gt?D.copyTexSubImage3D(Ce,we,ze,dt,Pt+_t,Be,qe,Pe,Me):D.copyTexSubImage2D(Ce,we,ze,dt,Be,qe,Pe,Me);le.bindFramebuffer(D.READ_FRAMEBUFFER,null),le.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else gt?T.isDataTexture||T.isData3DTexture?D.texSubImage3D(Ce,we,ze,dt,Pt,Pe,Me,Ue,mt,Yt,At.data):k.isCompressedArrayTexture?D.compressedTexSubImage3D(Ce,we,ze,dt,Pt,Pe,Me,Ue,mt,At.data):D.texSubImage3D(Ce,we,ze,dt,Pt,Pe,Me,Ue,mt,Yt,At):T.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,we,ze,dt,Pe,Me,mt,Yt,At.data):T.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,we,ze,dt,At.width,At.height,mt,At.data):D.texSubImage2D(D.TEXTURE_2D,we,ze,dt,Pe,Me,mt,Yt,At);le.pixelStorei(D.UNPACK_ROW_LENGTH,_n),le.pixelStorei(D.UNPACK_IMAGE_HEIGHT,st),le.pixelStorei(D.UNPACK_SKIP_PIXELS,Cn),le.pixelStorei(D.UNPACK_SKIP_ROWS,Jn),le.pixelStorei(D.UNPACK_SKIP_IMAGES,Bi),we===0&&k.generateMipmaps&&D.generateMipmap(Ce),le.unbindTexture()},this.initRenderTarget=function(T){A.get(T).__webglFramebuffer===void 0&&x.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?x.setTextureCube(T,0):T.isData3DTexture?x.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?x.setTexture2DArray(T,0):x.setTexture2D(T,0),le.unbindTexture()},this.resetState=function(){Y=0,J=0,O=null,le.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=it._getDrawingBufferColorSpace(e),n.unpackColorSpace=it._getUnpackColorSpace()}}const pg={type:"change"},Uh={type:"start"},_v={type:"end"},rl=new Ec,mg=new Ji,NA=Math.cos(70*XS.DEG2RAD),Ut=new H,un=2*Math.PI,pt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ou=1e-6;class DA extends IM{constructor(e,n=null){super(e,n),this.state=pt.NONE,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Us.ROTATE,MIDDLE:Us.DOLLY,RIGHT:Us.PAN},this.touches={ONE:Cs.ROTATE,TWO:Cs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new H,this._lastQuaternion=new vr,this._lastTargetPosition=new H,this._quat=new vr().setFromUnitVectors(e.up,new H(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Vm,this._sphericalDelta=new Vm,this._scale=1,this._panOffset=new H,this._rotateStart=new Ge,this._rotateEnd=new Ge,this._rotateDelta=new Ge,this._panStart=new Ge,this._panEnd=new Ge,this._panDelta=new Ge,this._dollyStart=new Ge,this._dollyEnd=new Ge,this._dollyDelta=new Ge,this._dollyDirection=new H,this._mouse=new Ge,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=IA.bind(this),this._onPointerDown=LA.bind(this),this._onPointerUp=UA.bind(this),this._onContextMenu=VA.bind(this),this._onMouseWheel=kA.bind(this),this._onKeyDown=BA.bind(this),this._onTouchStart=zA.bind(this),this._onTouchMove=HA.bind(this),this._onMouseDown=FA.bind(this),this._onMouseMove=OA.bind(this),this._interceptControlDown=GA.bind(this),this._interceptControlUp=WA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(pg),this.update(),this.state=pt.NONE}pan(e,n){this._pan(e,n),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const n=this.object.position;Ut.copy(n).sub(this.target),Ut.applyQuaternion(this._quat),this._spherical.setFromVector3(Ut),this.autoRotate&&this.state===pt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=un:i>Math.PI&&(i-=un),r<-Math.PI?r+=un:r>Math.PI&&(r-=un),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Ut.setFromSpherical(this._spherical),Ut.applyQuaternion(this._quatInverse),n.copy(this.target).add(Ut),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Ut.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new H(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new H(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ut.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(rl.origin.copy(this.object.position),rl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(rl.direction))<NA?this.object.lookAt(this.target):(mg.setFromNormalAndCoplanarPoint(this.object.up,this.target),rl.intersectPlane(mg,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Ou||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ou||this._lastTargetPosition.distanceToSquared(this.target)>Ou?(this.dispatchEvent(pg),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?un/60*this.autoRotateSpeed*e:un/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){Ut.setFromMatrixColumn(n,0),Ut.multiplyScalar(-e),this._panOffset.add(Ut)}_panUp(e,n){this.screenSpacePanning===!0?Ut.setFromMatrixColumn(n,1):(Ut.setFromMatrixColumn(n,0),Ut.crossVectors(this.object.up,Ut)),Ut.multiplyScalar(e),this._panOffset.add(Ut)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Ut.copy(r).sub(this.target);let s=Ut.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(un*this._rotateDelta.x/n.clientHeight),this._rotateUp(un*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-un*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(un*this._rotateDelta.x/n.clientHeight),this._rotateUp(un*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+n.x)*.5,o=(e.pageY+n.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new Ge,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function LA(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function IA(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function UA(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(_v),this.state=pt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function FA(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Us.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=pt.DOLLY;break;case Us.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=pt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=pt.ROTATE}break;case Us.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=pt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=pt.PAN}break;default:this.state=pt.NONE}this.state!==pt.NONE&&this.dispatchEvent(Uh)}function OA(t){switch(this.state){case pt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case pt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case pt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function kA(t){this.enabled===!1||this.enableZoom===!1||this.state!==pt.NONE||(t.preventDefault(),this.dispatchEvent(Uh),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(_v))}function BA(t){this.enabled!==!1&&this._handleKeyDown(t)}function zA(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Cs.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=pt.TOUCH_ROTATE;break;case Cs.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=pt.TOUCH_PAN;break;default:this.state=pt.NONE}break;case 2:switch(this.touches.TWO){case Cs.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=pt.TOUCH_DOLLY_PAN;break;case Cs.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=pt.TOUCH_DOLLY_ROTATE;break;default:this.state=pt.NONE}break;default:this.state=pt.NONE}this.state!==pt.NONE&&this.dispatchEvent(Uh)}function HA(t){switch(this._trackPointer(t),this.state){case pt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case pt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case pt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case pt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=pt.NONE}}function VA(t){this.enabled!==!1&&t.preventDefault()}function GA(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function WA(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Pn="#33ff33",$i=3407667,va="#1a7a1a",ku="#030c03";function gg(t){const n=document.createElement("canvas");n.width=n.height=128;const i=n.getContext("2d"),r=128/2,s=i.createRadialGradient(r,r,0,r,r,r);return s.addColorStop(0,t),s.addColorStop(.3,t),s.addColorStop(.7,"rgba(51,255,51,0.15)"),s.addColorStop(1,"transparent"),i.fillStyle=s,i.fillRect(0,0,128,128),new xM(n)}function jA({onHome:t}){const e=We.useRef(null),[n,i]=We.useState("3d"),[r,s]=We.useState("loading"),[a,o]=We.useState({nodes:0,edges:0}),[l,c]=We.useState(null),[d,h]=We.useState(100),[f,g]=We.useState(100);We.useEffect(()=>{if(n!=="3d")return;const m=e.current;if(!m)return;s("loading"),o({nodes:0,edges:0}),c(null);const u=m.clientWidth,p=m.clientHeight,_=new PA({antialias:!0});_.setPixelRatio(window.devicePixelRatio),_.setSize(u,p),_.setClearColor(199683,1),m.appendChild(_.domElement);const S=new aM,w=new Sn(60,u/p,.1,2e3);w.position.set(0,0,280);const M=new DA(w,_.domElement);M.enableDamping=!0,M.dampingFactor=.08,M.autoRotate=!0,M.autoRotateSpeed=.4,M.minDistance=80,M.maxDistance=600,S.add(new PM(6656,2)),S.add(new Bm($i,1.2,600));const R=gg("rgba(51,255,51,0.9)"),y=gg("rgba(10,60,10,0.7)");let C=[],N=[],P=[],B=null,Y=new Set,J=0;fetch(`/api/graph?n=${d}`).then(re=>re.json()).then(re=>{const Ee=Math.max(...re.nodes.map(ue=>ue.score),.001);C=re.nodes.map((ue,U)=>{const K=Math.acos(-1+2*U/re.nodes.length),Z=Math.sqrt(re.nodes.length*Math.PI)*K,ae=3+ue.score/Ee*9,Te=new H(60*Math.sin(K)*Math.cos(Z)+(Math.random()-.5)*30,60*Math.sin(K)*Math.sin(Z)+(Math.random()-.5)*30,60*Math.cos(K)+(Math.random()-.5)*30),ve=new J_({map:R,color:$i,transparent:!0,opacity:1,blending:ql,depthWrite:!1}),Se=new dM(ve);Se.scale.setScalar(ae*3.5),Se.position.copy(Te),S.add(Se);const _e=new Bm($i,.15,ae*12);return _e.position.copy(Te),S.add(_e),{...ue,x:Te.x,y:Te.y,z:Te.z,vx:0,vy:0,vz:0,r:ae,sprite:Se,light:_e}}),N=re.edges||[];for(const ue of N){const U=C.find(ve=>ve.id===ue.source),K=C.find(ve=>ve.id===ue.target);if(!U||!K)continue;const Z=new zn().setFromPoints([new H(U.x,U.y,U.z),new H(K.x,K.y,K.z)]),ae=new nv({color:$i,transparent:!0,opacity:.1,blending:ql,depthWrite:!1}),Te=new vM(Z,ae);S.add(Te),P.push({line:Te,src:ue.source,tgt:ue.target})}o({nodes:C.length,edges:N.length}),s("ok")}).catch(()=>s("error"));const O=()=>{const re=new Map(C.map(U=>[U.id,U]));for(let U=0;U<C.length;U++){const K=C[U];K.vx-=K.x*.002,K.vy-=K.y*.002,K.vz-=K.z*.002;for(let Z=U+1;Z<C.length;Z++){const ae=C[Z],Te=K.x-ae.x,ve=K.y-ae.y,Se=K.z-ae.z,_e=Math.max(Te*Te+ve*ve+Se*Se,100),Le=Math.sqrt(_e),Oe=220/_e,De=Te/Le*Oe,Fe=ve/Le*Oe,Ie=Se/Le*Oe;K.vx+=De,K.vy+=Fe,K.vz+=Ie,ae.vx-=De,ae.vy-=Fe,ae.vz-=Ie}}for(const U of N){const K=re.get(U.source),Z=re.get(U.target);if(!K||!Z)continue;const ae=Z.x-K.x,Te=Z.y-K.y,ve=Z.z-K.z,Se=Math.sqrt(ae*ae+Te*Te+ve*ve)||1,_e=(Se-70)*.006,Le=ae/Se*_e,Oe=Te/Se*_e,De=ve/Se*_e;K.vx+=Le,K.vy+=Oe,K.vz+=De,Z.vx-=Le,Z.vy-=Oe,Z.vz-=De}const Ee=5,ue=new Float32Array(6);for(const U of C){U.vx*=.8,U.vy*=.8,U.vz*=.8;const K=Math.sqrt(U.vx*U.vx+U.vy*U.vy+U.vz*U.vz);K>Ee&&(U.vx=U.vx/K*Ee,U.vy=U.vy/K*Ee,U.vz=U.vz/K*Ee),U.x+=U.vx,U.y+=U.vy,U.z+=U.vz,U.sprite.position.set(U.x,U.y,U.z),U.light.position.set(U.x,U.y,U.z)}for(const{line:U,src:K,tgt:Z}of P){const ae=re.get(K),Te=re.get(Z);!ae||!Te||(ue[0]=ae.x,ue[1]=ae.y,ue[2]=ae.z,ue[3]=Te.x,ue[4]=Te.y,ue[5]=Te.z,U.geometry.setAttribute("position",new On(ue.slice(),3)),U.geometry.attributes.position.needsUpdate=!0)}},W=new LM;W.params.Sprite={threshold:4};const I=new Ge,F=(re,Ee)=>{const ue=_.domElement.getBoundingClientRect();I.x=(re-ue.left)/ue.width*2-1,I.y=-((Ee-ue.top)/ue.height)*2+1,W.setFromCamera(I,w);const U=W.intersectObjects(C.map(Z=>Z.sprite)),K=U.length>0?C.find(Z=>Z.sprite===U[0].object)??null:null;if(K!==B&&(B=K,Y=new Set,K))for(const Z of N)Z.source===K.id&&Y.add(Z.target),Z.target===K.id&&Y.add(Z.source);if(_.domElement.style.cursor=K?"pointer":"default",K){const Z=K.sprite.position.clone().project(w),ae=_.domElement.getBoundingClientRect();c({title:K.title.length>52?K.title.slice(0,52)+"…":K.title,x:(Z.x+1)/2*ae.width+ae.left,y:-(Z.y-1)/2*ae.height+ae.top})}else c(null);for(const Z of C){const ae=Z.sprite.material;B?Z===B?(ae.map=R,ae.opacity=1,ae.color.set(10092441),Z.light.intensity=.4):Y.has(Z.id)?(ae.map=R,ae.opacity=.9,ae.color.set(5635925),Z.light.intensity=.2):(ae.map=y,ae.opacity=.25,ae.color.setHex($i),Z.light.intensity=.02):(ae.map=R,ae.opacity=1,ae.color.setHex($i),Z.light.intensity=.15),ae.needsUpdate=!0}for(const{line:Z,src:ae,tgt:Te}of P){const ve=Z.material;B?ae===B.id||Te===B.id?(ve.opacity=.65,ve.color.set(6750054)):(ve.opacity=.04,ve.color.setHex($i)):(ve.opacity=.1,ve.color.setHex($i)),ve.needsUpdate=!0}},G=re=>F(re.clientX,re.clientY),$=re=>{const Ee=_.domElement.getBoundingClientRect();I.x=(re.clientX-Ee.left)/Ee.width*2-1,I.y=-((re.clientY-Ee.top)/Ee.height)*2+1,W.setFromCamera(I,w);const ue=W.intersectObjects(C.map(U=>U.sprite));if(ue.length>0){const U=C.find(K=>K.sprite===ue[0].object);U&&window.open(U.url,"_blank","noopener,noreferrer")}},V=()=>{const re=m.clientWidth,Ee=m.clientHeight;w.aspect=re/Ee,w.updateProjectionMatrix(),_.setSize(re,Ee)};_.domElement.addEventListener("mousemove",G),_.domElement.addEventListener("click",$),window.addEventListener("resize",V);const te=()=>{J=requestAnimationFrame(te),O(),M.update(),_.render(S,w)};return J=requestAnimationFrame(te),()=>{cancelAnimationFrame(J),window.removeEventListener("resize",V),_.domElement.removeEventListener("mousemove",G),_.domElement.removeEventListener("click",$),M.dispose();for(const re of C)re.sprite.material.dispose(),re.sprite.geometry.dispose();for(const{line:re}of P)re.material.dispose(),re.geometry.dispose();R.dispose(),y.dispose(),_.dispose(),m.contains(_.domElement)&&m.removeChild(_.domElement)}},[d,n]),We.useEffect(()=>{if(n!=="2d")return;const m=e.current;if(!m)return;s("loading"),o({nodes:0,edges:0}),c(null);const u=document.createElement("canvas");u.style.display="block",u.style.width="100%",u.style.height="100%",m.appendChild(u);const p=u.getContext("2d");let _=[],S=[],w=null,M=null,R=0;const y=()=>{u.width=m.clientWidth,u.height=m.clientHeight};y(),window.addEventListener("resize",y),fetch(`/api/graph?n=${d}`).then(I=>I.json()).then(I=>{const F=u.width,G=u.height,$=Math.max(...I.nodes.map(V=>V.score),.001);_=I.nodes.map((V,te)=>{const re=te/I.nodes.length*Math.PI*2,Ee=Math.min(F,G)*.35;return{...V,x:F/2+Math.cos(re)*Ee*(.5+Math.random()*.5),y:G/2+Math.sin(re)*Ee*(.5+Math.random()*.5),vx:0,vy:0,r:3+V.score/$*8}}),S=I.edges||[],o({nodes:_.length,edges:S.length}),s("ok")}).catch(()=>s("error"));const C=()=>{const I=u.width,F=u.height;for(let V=0;V<_.length;V++){const te=_[V];if(te!==w){te.vx+=(I/2-te.x)*.002,te.vy+=(F/2-te.y)*.002;for(let re=V+1;re<_.length;re++){const Ee=_[re],ue=te.x-Ee.x,U=te.y-Ee.y,K=Math.max(ue*ue+U*U,100),Z=Math.sqrt(K),ae=250/K,Te=ue/Z*ae,ve=U/Z*ae;te.vx+=Te,te.vy+=ve,Ee.vx-=Te,Ee.vy-=ve}}}const G=new Map(_.map(V=>[V.id,V]));for(const V of S){const te=G.get(V.source),re=G.get(V.target);if(!te||!re)continue;const Ee=re.x-te.x,ue=re.y-te.y,U=Math.sqrt(Ee*Ee+ue*ue)||1,K=(U-90)*.008,Z=Ee/U*K,ae=ue/U*K;te!==w&&(te.vx+=Z,te.vy+=ae),re!==w&&(re.vx-=Z,re.vy-=ae)}const $=6;for(const V of _){if(V===w)continue;V.vx*=.78,V.vy*=.78;const te=Math.sqrt(V.vx*V.vx+V.vy*V.vy);te>$&&(V.vx=V.vx/te*$,V.vy=V.vy/te*$),V.x+=V.vx,V.y+=V.vy;const re=V.r+4;V.x<re&&(V.x=re,V.vx*=-.4),V.x>I-re&&(V.x=I-re,V.vx*=-.4),V.y<re&&(V.y=re,V.vy*=-.4),V.y>F-re&&(V.y=F-re,V.vy*=-.4)}},N=()=>{const I=u.width,F=u.height;p.fillStyle=ku,p.fillRect(0,0,I,F);const G=new Map(_.map(V=>[V.id,V])),$=new Set;if(M)for(const V of S)V.source===M.id&&$.add(V.target),V.target===M.id&&$.add(V.source);for(const V of S){const te=G.get(V.source),re=G.get(V.target);if(!te||!re)continue;const Ee=M&&(V.source===M.id||V.target===M.id);p.beginPath(),p.moveTo(te.x,te.y),p.lineTo(re.x,re.y),p.strokeStyle=Ee?"rgba(102,255,102,0.45)":"rgba(51,255,51,0.10)",p.lineWidth=Ee?1.5:.8,p.stroke()}for(const V of _){const te=V===M,re=$.has(V.id),Ee=M&&!te&&!re,ue=te?V.r*1.35:re?V.r*1.1:V.r;p.globalAlpha=Ee?.25:1;const U=p.createRadialGradient(V.x,V.y,0,V.x,V.y,ue*3);U.addColorStop(0,te?"rgba(102,255,102,0.5)":"rgba(51,255,51,0.22)"),U.addColorStop(1,"transparent"),p.beginPath(),p.arc(V.x,V.y,ue*3,0,Math.PI*2),p.fillStyle=U,p.fill(),p.beginPath(),p.arc(V.x,V.y,ue,0,Math.PI*2),p.fillStyle=te?"#66ff66":re?"#4dff4d":Pn,p.fill(),p.globalAlpha=1}if(M){const V=M.title.length>42?M.title.slice(0,42)+"…":M.title,te=Math.min(Math.max(M.x,180),I-180),re=M.y-M.r*1.4-8;p.font='13px "Share Tech Mono","Courier New",monospace',p.textAlign="center",p.fillStyle=va,p.fillText(V,te,re),p.fillStyle="#66ff66",p.shadowColor=Pn,p.shadowBlur=8,p.fillText(V,te,re),p.shadowBlur=0}},P=(I,F)=>{for(let G=_.length-1;G>=0;G--){const $=_[G],V=$.x-I,te=$.y-F;if(Math.sqrt(V*V+te*te)<=$.r+6)return $}return null},B=I=>{const F=u.getBoundingClientRect(),G=I.clientX-F.left,$=I.clientY-F.top;w?(w.vx=(G-w.x)*.6,w.vy=($-w.y)*.6,w.x=G,w.y=$):(M=P(G,$),u.style.cursor=M?"pointer":"default")},Y=I=>{const F=u.getBoundingClientRect();w=P(I.clientX-F.left,I.clientY-F.top)},J=I=>{w&&(w.vx=(I.movementX||0)*.8,w.vy=(I.movementY||0)*.8,w=null)},O=I=>{const F=u.getBoundingClientRect(),G=P(I.clientX-F.left,I.clientY-F.top);G&&window.open(G.url,"_blank","noopener,noreferrer")};u.addEventListener("mousemove",B),u.addEventListener("mousedown",Y),u.addEventListener("mouseup",J),u.addEventListener("click",O);const W=()=>{C(),N(),R=requestAnimationFrame(W)};return R=requestAnimationFrame(W),()=>{cancelAnimationFrame(R),window.removeEventListener("resize",y),u.removeEventListener("mousemove",B),u.removeEventListener("mousedown",Y),u.removeEventListener("mouseup",J),u.removeEventListener("click",O),m.contains(u)&&m.removeChild(u)}},[d,n]),We.useEffect(()=>{if(n!=="constellation")return;const m=e.current;if(!m)return;s("loading"),o({nodes:0,edges:0}),c(null);const u=window.devicePixelRatio||1,p=document.createElement("canvas");p.style.display="block",p.style.width="100%",p.style.height="100%",p.style.cursor="grab",m.appendChild(p);const _=p.getContext("2d"),S=128,w=document.createElement("canvas");w.width=w.height=S;{const Se=w.getContext("2d"),_e=Se.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2);_e.addColorStop(0,"rgba(190,255,190,1)"),_e.addColorStop(.12,"rgba(120,255,120,0.55)"),_e.addColorStop(.4,"rgba(51,255,51,0.14)"),_e.addColorStop(1,"rgba(51,255,51,0)"),Se.fillStyle=_e,Se.fillRect(0,0,S,S)}let M=[],R=[],y=0,C=0,N=1,P=0,B=0,Y=null,J=!1,O=0,W=0,I=0,F=0,G=!1;const $=()=>{y=m.clientWidth,C=m.clientHeight,p.width=Math.max(1,Math.round(y*u)),p.height=Math.max(1,Math.round(C*u))};$(),window.addEventListener("resize",$);const V=()=>{if(!M.length)return;let Se=1/0,_e=1/0,Le=-1/0,Oe=-1/0;for(const Ie of M)Se=Math.min(Se,Ie.x),Le=Math.max(Le,Ie.x),_e=Math.min(_e,Ie.y),Oe=Math.max(Oe,Ie.y);const De=Math.max(Le-Se,1),Fe=Math.max(Oe-_e,1);N=Math.min(y*.86/De,C*.78/Fe),P=y/2-(Se+Le)/2*N,B=C/2+20-(_e+Oe)/2*N};fetch(`/api/graph?n=${d}&mode=constellation`).then(Se=>Se.json()).then(Se=>{if(G)return;const _e=Se.nodes||[],Le=new Map(_e.map((D,Ke)=>[D.id,Ke])),Oe=Math.max(..._e.map(D=>D.score),1e-9),De=new Array(_e.length).fill(0);R=[];for(const D of Se.edges||[]){const Ke=Le.get(D.source),xe=Le.get(D.target);Ke===void 0||xe===void 0||(R.push({a:Ke,b:xe,w:D.weight??1}),De[Ke]++,De[xe]++)}const Fe=Math.max(...De,1),Ie=Math.max(...R.map(D=>D.w),1);M=_e.map((D,Ke)=>{const xe=Ke*2.399963,He=30*Math.sqrt(Ke+1);return{...D,x:Math.cos(xe)*He,y:Math.sin(xe)*He,vx:0,vy:0,b:Math.min(1,.75*Math.sqrt(D.score/Oe)+.25*(De[Ke]/Fe)),phase:Math.random()*Math.PI*2,nb:[]}});for(const D of R)M[D.a].nb.push(D.b),M[D.b].nb.push(D.a);const rt=M.length;for(let D=0;D<250;D++){const Ke=1-D/250;for(let xe=0;xe<rt;xe++){const He=M[xe];He.vx-=He.x*.0015,He.vy-=He.y*.0015;for(let le=xe+1;le<rt;le++){const Je=M[le],A=He.x-Je.x,x=He.y-Je.y,z=Math.max(A*A+x*x,25),ee=Math.sqrt(z),se=900/z;He.vx+=A/ee*se,He.vy+=x/ee*se,Je.vx-=A/ee*se,Je.vy-=x/ee*se}}for(const xe of R){const He=M[xe.a],le=M[xe.b],Je=le.x-He.x,A=le.y-He.y,x=Math.sqrt(Je*Je+A*A)||1,z=(x-60)*.01*(.5+xe.w/Ie);He.vx+=Je/x*z,He.vy+=A/x*z,le.vx-=Je/x*z,le.vy-=A/x*z}for(const xe of M){xe.vx*=.75,xe.vy*=.75;const He=Math.hypot(xe.vx,xe.vy),le=8*Ke+.5;He>le&&(xe.vx=xe.vx/He*le,xe.vy=xe.vy/He*le),xe.x+=xe.vx,xe.y+=xe.vy}}V(),o({nodes:M.length,edges:R.length}),s("ok")}).catch(()=>{G||s("error")});const te=Se=>1.2+4.2*Math.pow(Se.b,1.3),re=Se=>{if(_.setTransform(u,0,0,u,0,0),_.fillStyle=ku,_.fillRect(0,0,y,C),!M.length)return;const _e=(Fe,Ie)=>{const rt=Fe.x*N+P,D=Fe.y*N+B;return rt>-Ie&&rt<y+Ie&&D>-Ie&&D<C+Ie},Le=new Set;if(Y){Le.add(M.indexOf(Y));for(const Fe of Y.nb)Le.add(Fe)}const Oe=Y?M.indexOf(Y):-1;_.strokeStyle="rgba(51,255,51,0.05)",_.lineWidth=1,_.setLineDash([1,6]);for(const Fe of[150,320,520])_.beginPath(),_.arc(P,B,Fe*N,0,Math.PI*2),_.stroke();_.setLineDash([]);let De=1;for(const Fe of R)Fe.w>De&&(De=Fe.w);_.lineWidth=.7;for(const Fe of R){const Ie=M[Fe.a],rt=M[Fe.b],D=Oe>=0&&(Fe.a===Oe||Fe.b===Oe),Ke=Oe>=0?D?.6:.03:.07+.28*(Fe.w/De);_.strokeStyle=`rgba(120,255,120,${Ke})`,_.beginPath(),_.moveTo(Ie.x*N+P,Ie.y*N+B),_.lineTo(rt.x*N+P,rt.y*N+B),_.stroke()}_.globalCompositeOperation="lighter";for(let Fe=0;Fe<M.length;Fe++){const Ie=M[Fe];if(!_e(Ie,80))continue;const rt=Ie.x*N+P,D=Ie.y*N+B,Ke=.88+.12*Math.sin(Se*.0012+Ie.phase),xe=Oe>=0&&!Le.has(Fe)?.3:1,He=te(Ie)*(Fe===Oe?1.4:1)*Math.min(1.8,Math.max(.7,Math.sqrt(N))),le=He*(7+10*Ie.b);_.globalAlpha=(.35+.65*Ie.b)*Ke*xe,_.drawImage(w,rt-le,D-le,le*2,le*2),_.globalAlpha=xe,_.fillStyle=Ie.b>.5?"#f2fff0":"#b8ffb8",_.beginPath(),_.arc(rt,D,He,0,Math.PI*2),_.fill()}_.lineCap="round";for(let Fe=0;Fe<M.length;Fe++){const Ie=M[Fe];if(Ie.b<.3||!_e(Ie,120))continue;const rt=Ie.x*N+P,D=Ie.y*N+B,Ke=Oe>=0&&!Le.has(Fe)?.3:1,xe=(8+46*Math.pow(Ie.b,.8))*Math.min(1.8,Math.max(.7,Math.sqrt(N))),He=.85+.15*Math.sin(Se*.0012+Ie.phase),le=[[1,0,xe],[0,1,xe*.62]];Ie.b>.6&&le.push([.7071,.7071,xe*.4],[.7071,-.7071,xe*.4]);for(const[Je,A,x]of le){const z=_.createLinearGradient(rt-Je*x,D-A*x,rt+Je*x,D+A*x),ee=`rgba(190,255,190,${.55*Ie.b*He*Ke})`;z.addColorStop(0,"rgba(190,255,190,0)"),z.addColorStop(.5,ee),z.addColorStop(1,"rgba(190,255,190,0)"),_.strokeStyle=z,_.lineWidth=.8,_.beginPath(),_.moveTo(rt-Je*x,D-A*x),_.lineTo(rt+Je*x,D+A*x),_.stroke()}}if(_.globalCompositeOperation="source-over",_.globalAlpha=1,Y){const Fe=Y.x*N+P,Ie=Y.y*N+B,rt=Y.title.length>52?Y.title.slice(0,52)+"…":Y.title,D=Math.min(Math.max(Fe,190),y-190),Ke=Ie-te(Y)*1.4-14;_.font='13px "Share Tech Mono","Courier New",monospace',_.textAlign="center",_.fillStyle="rgba(3,12,3,0.8)";const xe=_.measureText(rt).width;_.fillRect(D-xe/2-6,Ke-13,xe+12,19),_.fillStyle="#66ff66",_.shadowColor=Pn,_.shadowBlur=8,_.fillText(rt,D,Ke),_.shadowBlur=0}},Ee=(Se,_e)=>{let Le=null,Oe=1/0;for(const De of M){const Fe=Math.hypot(De.x*N+P-Se,De.y*N+B-_e);Fe<=te(De)+8&&Fe<Oe&&(Le=De,Oe=Fe)}return Le},ue=Se=>{const _e=p.getBoundingClientRect(),Le=Se.clientX-_e.left,Oe=Se.clientY-_e.top;if(J){P+=Le-W,B+=Oe-I,O+=Math.abs(Le-W)+Math.abs(Oe-I),W=Le,I=Oe;return}Y=Ee(Le,Oe),p.style.cursor=Y?"pointer":"grab"},U=Se=>{const _e=p.getBoundingClientRect();J=!0,O=0,W=Se.clientX-_e.left,I=Se.clientY-_e.top,p.style.cursor="grabbing"},K=()=>{J=!1,p.style.cursor=Y?"pointer":"grab"},Z=()=>{J=!1,Y=null},ae=Se=>{if(O>4)return;const _e=p.getBoundingClientRect(),Le=Ee(Se.clientX-_e.left,Se.clientY-_e.top);Le&&window.open(Le.url,"_blank","noopener,noreferrer")},Te=Se=>{Se.preventDefault();const _e=p.getBoundingClientRect(),Le=Se.clientX-_e.left,Oe=Se.clientY-_e.top,De=Math.min(40,Math.max(.05,N*Math.exp(-Se.deltaY*.0015)));P=Le-(Le-P)*(De/N),B=Oe-(Oe-B)*(De/N),N=De};p.addEventListener("mousemove",ue),p.addEventListener("mousedown",U),window.addEventListener("mouseup",K),p.addEventListener("mouseleave",Z),p.addEventListener("click",ae),p.addEventListener("wheel",Te,{passive:!1});const ve=Se=>{re(Se),F=requestAnimationFrame(ve)};return F=requestAnimationFrame(ve),()=>{G=!0,cancelAnimationFrame(F),window.removeEventListener("resize",$),window.removeEventListener("mouseup",K),p.removeEventListener("mousemove",ue),p.removeEventListener("mousedown",U),p.removeEventListener("mouseleave",Z),p.removeEventListener("click",ae),p.removeEventListener("wheel",Te),m.contains(p)&&m.removeChild(p)}},[d,n]);const v=m=>{h(m),g(m)},E=n==="constellation"?500:300;return b.jsxs("div",{style:{position:"fixed",inset:0,background:ku,overflow:"hidden"},children:[b.jsx("div",{ref:e,style:{width:"100%",height:"100%"}}),b.jsxs("div",{style:{position:"absolute",top:0,left:0,right:0,padding:"12px 20px",display:"flex",alignItems:"center",gap:"16px",background:"linear-gradient(to bottom, rgba(3,12,3,0.92) 60%, transparent)",pointerEvents:"none"},children:[b.jsxs("div",{style:{color:va,fontSize:"0.72em",letterSpacing:"0.2em",textTransform:"uppercase",flexShrink:0},children:[b.jsx("span",{style:{color:Pn,textShadow:`0 0 6px ${Pn}`},children:"■"})," LINK GRAPH // ",a.nodes," ",n==="constellation"?"STARS":"NODES"," ",a.edges," ",n==="constellation"?"LINKS":"EDGES"]}),b.jsx("div",{style:{display:"flex",gap:"4px",pointerEvents:"all",flexShrink:0},children:["3d","2d","constellation"].map(m=>b.jsx("button",{className:"crt-btn",onClick:()=>{i(m);const u=m==="constellation"?500:300;f>u&&v(u)},style:{fontSize:"0.68em",opacity:n===m?1:.38,boxShadow:n===m?`0 0 6px ${Pn}`:"none"},children:m==="constellation"?"STARS":m.toUpperCase()},m))}),b.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",pointerEvents:"all",flex:1,maxWidth:260},children:[b.jsx("span",{style:{color:va,fontSize:"0.65em",letterSpacing:"0.15em",flexShrink:0},children:"N:"}),b.jsx("input",{type:"range",min:2,max:E,step:1,value:f,onChange:m=>g(Number(m.target.value)),onMouseUp:m=>v(Number(m.target.value)),onTouchEnd:m=>v(Number(m.currentTarget.value)),style:{flex:1,WebkitAppearance:"none",appearance:"none",height:"2px",outline:"none",border:"none",cursor:"pointer",background:`linear-gradient(to right, ${Pn} 0%, ${Pn} ${(f-2)/(E-2)*100}%, rgba(51,255,51,0.2) ${(f-2)/(E-2)*100}%, rgba(51,255,51,0.2) 100%)`}}),b.jsx("span",{style:{color:Pn,fontSize:"0.68em",letterSpacing:"0.1em",minWidth:"3ch",textAlign:"right",textShadow:`0 0 4px ${Pn}`},children:f})]}),b.jsx("div",{style:{flex:1}}),b.jsx("button",{className:"crt-btn",onClick:t,style:{pointerEvents:"all",fontSize:"0.72em",flexShrink:0},children:"← BACK"})]}),r==="ok"&&b.jsx("div",{style:{position:"absolute",bottom:18,left:"50%",transform:"translateX(-50%)",color:va,fontSize:"0.68em",letterSpacing:"0.2em",textTransform:"uppercase",pointerEvents:"none",whiteSpace:"nowrap"},children:n==="3d"?"DRAG TO ROTATE · SCROLL TO ZOOM · CLICK NODE TO OPEN":n==="constellation"?"DRAG TO PAN · SCROLL TO ZOOM · CLICK STAR TO OPEN · LINKS = SHARED CITATIONS":"DRAG NODES · CLICK TO OPEN URL · NODE SIZE = PAGERANK"}),l&&n==="3d"&&b.jsx("div",{style:{position:"fixed",left:l.x,top:l.y-28,transform:"translateX(-50%)",color:Pn,textShadow:`0 0 8px ${Pn}`,fontSize:"0.72em",letterSpacing:"0.08em",fontFamily:'"Share Tech Mono","Courier New",monospace',pointerEvents:"none",whiteSpace:"nowrap",background:"rgba(3,12,3,0.75)",padding:"3px 8px",borderRadius:"2px"},children:l.title}),r==="loading"&&b.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:va,fontSize:"1em",letterSpacing:"0.25em",textTransform:"uppercase"},children:["LOADING GRAPH",b.jsx("span",{className:"loading-dots"})]}),r==="error"&&b.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"20px"},children:[b.jsx("div",{style:{color:"#ff4444",letterSpacing:"0.15em",textTransform:"uppercase",fontSize:"0.9em"},children:"GRAPH DATA UNAVAILABLE"}),b.jsx("button",{className:"crt-btn",onClick:t,children:"← RETURN TO MAIN"})]})]})}function Bu(){return new URLSearchParams(window.location.search)}function XA(){const[t,e]=We.useState(Bu),[n]=so(),[i,r]=We.useState(()=>Bu().get("q")?"results":n?"home":"about"),s=We.useRef(!0);We.useEffect(()=>{if(s.current){s.current=!1;return}n&&r(h=>h==="about"?"home":h)},[n]),We.useLayoutEffect(()=>{n&&(i==="home"||i==="results")?document.documentElement.setAttribute("data-theme","classic"):document.documentElement.removeAttribute("data-theme")},[n,i]),We.useEffect(()=>{const h=()=>{const f=Bu();e(f),r(g=>f.get("q")?"results":g==="results"?"home":g)};return window.addEventListener("popstate",h),()=>window.removeEventListener("popstate",h)},[]);const a=We.useCallback(h=>{const f=h.toString();window.history.pushState(null,"",f?`?${f}`:window.location.pathname),e(new URLSearchParams(f)),r(h.get("q")?"results":"home")},[]),o=We.useCallback(h=>a(new URLSearchParams({q:h})),[a]),l=We.useCallback(()=>{window.history.pushState(null,"",window.location.pathname),e(new URLSearchParams),r("home")},[]),c=We.useCallback(()=>r("about"),[]),d=We.useCallback(()=>r("graph"),[]);return i==="about"?b.jsx(lS,{onSearch:o,onGraph:d}):i==="graph"?b.jsx(jA,{onHome:l}):b.jsxs(b.Fragment,{children:[b.jsx("div",{className:"crt-beam"}),b.jsx("div",{className:"screen",children:i==="home"?b.jsx(rS,{onSearch:o,onAbout:c,onGraph:d}):b.jsx(aS,{params:t,onNavigate:a,onHome:l,onAbout:c,onGraph:d})})]})}b_(document.getElementById("root")).render(b.jsx(We.StrictMode,{children:b.jsx(XA,{})}));
