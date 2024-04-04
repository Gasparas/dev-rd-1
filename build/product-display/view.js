(()=>{"use strict";var e={63:(e,t,o)=>{var r=o(609),n="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},a=r.useState,c=r.useEffect,u=r.useLayoutEffect,l=r.useDebugValue;function s(e){var t=e.getSnapshot;e=e.value;try{var o=t();return!n(e,o)}catch(e){return!0}}var i="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var o=t(),r=a({inst:{value:o,getSnapshot:t}}),n=r[0].inst,i=r[1];return u((function(){n.value=o,n.getSnapshot=t,s(n)&&i({inst:n})}),[e,o,t]),c((function(){return s(n)&&i({inst:n}),e((function(){s(n)&&i({inst:n})}))}),[e]),l(o),o};t.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:i},940:(e,t,o)=>{var r=o(609),n=o(888),a="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},c=n.useSyncExternalStore,u=r.useRef,l=r.useEffect,s=r.useMemo,i=r.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,o,r,n){var d=u(null);if(null===d.current){var p={hasValue:!1,value:null};d.current=p}else p=d.current;d=s((function(){function e(e){if(!l){if(l=!0,c=e,e=r(e),void 0!==n&&p.hasValue){var t=p.value;if(n(t,e))return u=t}return u=e}if(t=u,a(c,e))return t;var o=r(e);return void 0!==n&&n(t,o)?t:(c=e,u=o)}var c,u,l=!1,s=void 0===o?null:o;return[function(){return e(t())},null===s?void 0:function(){return e(s())}]}),[t,o,r,n]);var f=c(e,d[0],d[1]);return l((function(){p.hasValue=!0,p.value=f}),[f]),i(f),f}},888:(e,t,o)=>{e.exports=o(63)},242:(e,t,o)=>{e.exports=o(940)},609:e=>{e.exports=window.React}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,o),a.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=o(609);const t=window.wp.element,r=window.wp.apiFetch;var n=o.n(r);const a=e=>{let t;const o=new Set,r=(e,r)=>{const n="function"==typeof e?e(t):e;if(!Object.is(n,t)){const e=t;t=(null!=r?r:"object"!=typeof n||null===n)?n:Object.assign({},t,n),o.forEach((o=>o(t,e)))}},n=()=>t,a={setState:r,getState:n,getInitialState:()=>c,subscribe:e=>(o.add(e),()=>o.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),o.clear()}},c=t=e(r,n,a);return a};var c=o(242);const{useDebugValue:u}=e,{useSyncExternalStoreWithSelector:l}=c;let s=!1;const i=e=>e,d=e=>{"function"!=typeof e&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t="function"==typeof e?(e=>e?a(e):a)(e):e,o=(e,o)=>function(e,t=i,o){o&&!s&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),s=!0);const r=l(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,o);return u(r),r}(t,e,o);return Object.assign(o,t),o},p=(f=e=>({totalCartUpdate:0,triggerTotalCartUpdate:()=>e((e=>(console.log(`Updating totalCartUpdate from ${e.totalCartUpdate} to ${e.totalCartUpdate+1}`),{totalCartUpdate:e.totalCartUpdate+1})))}))?d(f):d;var f;function m({selectedProductId:o,productsData:r}){const n=r.find((e=>e.id===o)),[a,c]=(0,t.useState)(n?.imageUrls[0]||"");return(0,t.useEffect)((()=>{c(n?.imageUrls[0]||"")}),[o,n]),n?(0,e.createElement)("div",{className:"image-viewer-wrapper"},(0,e.createElement)("div",{className:"full-size-wrapper"},(0,e.createElement)("img",{src:a,alt:"Selected"}))):(0,e.createElement)("div",null,"No product selected")}function g({selectedProductId:t}){return(0,e.createElement)("div",null,"Selected Product ID: ",t)}function v({products:t,onProductSelect:o,selectedProductId:r}){return(0,e.createElement)("div",null,t.map((t=>(0,e.createElement)("button",{key:t.id,onClick:()=>o(t.id),style:{padding:"0.5em 1em",margin:"1em 0",fontWeight:t.id===r?"bold":"normal"}},t.counterValue))))}function h({productId:o,initialValue:r,togglerValueChange:a}){const[c,u]=(0,t.useState)(r),{fetchCart:l,addToCart:s,remFromCart:i,isLoading:d,error:f}=function(e){const o=p((e=>e.triggerTotalCartUpdate)),[r,a]=(0,t.useState)(!1),[c,u]=(0,t.useState)(null),[l,s]=(0,t.useState)([]),[i,d]=(0,t.useState)(0),[f,m]=(0,t.useState)(0),[g,v]=(0,t.useState)(0),[h,S]=(0,t.useState)(0),[E,y]=(0,t.useState)("");(0,t.useEffect)((()=>{b()}),[]);const b=()=>{n()({path:"/wc/store/cart"}).then((e=>{const t=e.items;s(t);const o=e.items.reduce(((e,t)=>e+t.quantity),0);d(o);const r=parseFloat(e.totals.total_items)/100;m(r);const n=parseFloat(e.totals.total_price)/100;v(n),a(!1)})).catch((e=>{console.error("Error fetching cart:",e),u("Failed to fetch cart."),a(!1)}))};return{fetchCart:b,addToCart:e=>{a(!0);const t={id:e,quantity:1};n()({path:"/wc/store/cart/add-item",method:"POST",data:t}).then((()=>{console.log(`Add to cart: ${e}`)})).catch((e=>{console.error("Error incrementing item:",e),u("Failed to increment item."),a(!1)})).finally((()=>{b(),o()}))},remFromCart:e=>{a(!0);const t=l.find((t=>t.id===e));if(t)if(1===t.quantity){const r={key:t.key};n()({path:"/wc/store/cart/remove-item",method:"POST",data:r}).then((()=>{console.log(`Remove from cart: ${e}`),b(),o()})).catch((e=>{console.error("Error removing item:",e),u("Failed to remove item."),a(!1)}))}else{const r={key:t.key,quantity:t.quantity-1};n()({path:"/wc/store/cart/update-item",method:"POST",data:r}).then((()=>{console.log(`Decrease cart quantity: ${e}`),b(),o()})).catch((e=>{console.error("Error decrementing item:",e),u("Failed to decrement item."),a(!1)}))}else console.error("Item not found in cart:",e)},applyCoupon:e=>(console.log(`Applying coupon: ${e}`),n()({path:"/wc/store/v1/cart/apply-coupon",method:"POST",data:{code:e}}).then((t=>(console.log(`Coupon ${e} applied.`),y(e),t))).catch((t=>{throw console.error(`Error applying coupon ${e}:`,t),t}))),removeCoupon:e=>(console.log(`Removing coupon: ${e}`),n()({path:"/wc/store/v1/cart/remove-coupon",method:"POST",data:{code:e}}).then((t=>(console.log(`Coupon ${e} removed.`),y(""),t))).catch((t=>{throw console.error(`Error removing coupon ${e}:`,t),t}))),appliedCoupon:E,totalPrice:f,totalSalePrice:g,salePercentage:h,totalQuantity:i,isLoading:r,error:c}}();return(0,t.useEffect)((()=>{u(r)}),[r]),(0,t.useEffect)((()=>{}),[]),(0,e.createElement)("div",null,(0,e.createElement)("button",{style:{padding:"0.5em 1em"},onClick:()=>{if(c>0){const e=c-1;u(e),a(e),i(o)}},disabled:d},"-"),(0,e.createElement)("span",null," ",c," "),(0,e.createElement)("button",{style:{padding:"0.5em 1em"},onClick:()=>{const e=c+1;u(e),a(e),s(o)},disabled:d},"+"))}function S({data:o}){const[r,n]=(0,t.useState)([]),[a,c]=(0,t.useState)(null),[u,l]=(0,t.useState)(0);return(0,t.useEffect)((()=>{const e=r.find((e=>e.id===a));l(e?e.counterValue:0)}),[r,a]),(0,t.useEffect)((()=>{n(o),o.length>0&&c(o[0].id)}),[o]),(0,e.createElement)("div",{className:"product-wrapper",style:{display:"flex",flexDirection:"column",alignItems:"center"}},(0,e.createElement)(m,{selectedProductId:a,productsData:r}),(0,e.createElement)(g,{selectedProductId:a}),(0,e.createElement)(v,{products:r,onProductSelect:e=>{c(e)},selectedProductId:a}),(0,e.createElement)(h,{productId:a,initialValue:u,togglerValueChange:e=>{const t=r.map((t=>t.id===a?{...t,counterValue:e}:t));n(t)}}))}console.log("view.js"),console.log("hi"),document.querySelectorAll(".react-container").forEach((t=>{const o=t.querySelector(".product-data");if(o){const r=JSON.parse(o.textContent||"[]");ReactDOM.createRoot(t).render((0,e.createElement)(S,{data:r}))}}))})()})();