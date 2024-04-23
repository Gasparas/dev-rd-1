(()=>{"use strict";var t={63:(t,e,r)=>{var o=r(609),a="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},n=o.useState,c=o.useEffect,i=o.useLayoutEffect,s=o.useDebugValue;function u(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!a(t,r)}catch(t){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(t,e){var r=e(),o=n({inst:{value:r,getSnapshot:e}}),a=o[0].inst,l=o[1];return i((function(){a.value=r,a.getSnapshot=e,u(a)&&l({inst:a})}),[t,r,e]),c((function(){return u(a)&&l({inst:a}),t((function(){u(a)&&l({inst:a})}))}),[t]),s(r),r};e.useSyncExternalStore=void 0!==o.useSyncExternalStore?o.useSyncExternalStore:l},940:(t,e,r)=>{var o=r(609),a=r(888),n="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},c=a.useSyncExternalStore,i=o.useRef,s=o.useEffect,u=o.useMemo,l=o.useDebugValue;e.useSyncExternalStoreWithSelector=function(t,e,r,o,a){var d=i(null);if(null===d.current){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=u((function(){function t(t){if(!s){if(s=!0,c=t,t=o(t),void 0!==a&&f.hasValue){var e=f.value;if(a(e,t))return i=e}return i=t}if(e=i,n(c,t))return e;var r=o(t);return void 0!==a&&a(e,r)?e:(c=t,i=r)}var c,i,s=!1,u=void 0===r?null:r;return[function(){return t(e())},null===u?void 0:function(){return t(u())}]}),[e,r,o,a]);var p=c(t,d[0],d[1]);return s((function(){f.hasValue=!0,f.value=p}),[p]),l(p),p}},888:(t,e,r)=>{t.exports=r(63)},242:(t,e,r)=>{t.exports=r(940)},609:t=>{t.exports=window.React}},e={};function r(o){var a=e[o];if(void 0!==a)return a.exports;var n=e[o]={exports:{}};return t[o](n,n.exports,r),n.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=r(609);window.wp.element;const e=t=>{let e;const r=new Set,o=(t,o)=>{const a="function"==typeof t?t(e):t;if(!Object.is(a,e)){const t=e;e=(null!=o?o:"object"!=typeof a||null===a)?a:Object.assign({},e,a),r.forEach((r=>r(e,t)))}},a=()=>e,n={setState:o,getState:a,getInitialState:()=>c,subscribe:t=>(r.add(t),()=>r.delete(t)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}},c=e=t(o,a,n);return n};var o=r(242);const{useDebugValue:a}=t,{useSyncExternalStoreWithSelector:n}=o;let c=!1;const i=t=>t,s=t=>{"function"!=typeof t&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const r="function"==typeof t?(t=>t?e(t):e)(t):t,o=(t,e)=>function(t,e=i,r){r&&!c&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),c=!0);const o=n(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,r);return a(o),o}(r,t,e);return Object.assign(o,r),o},u=window.wp.apiFetch;var l=r.n(u);function d(t,e){let r;return function(...o){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),t(...o)}),e)}}const f={},p={};var y;window.myGlobalStore=window.myGlobalStore||((y=(t,e)=>({totalCartUpdate:0,cartProducts:[],totalQuantity:0,totalPrice:0,totalSalePrice:0,isLoading:!1,error:"",isAddingToCart:!1,cartAdditions:{},cartRemovals:{},fetchCart:async()=>{try{const e=await l()({path:"/wc/store/cart"});t({cartProducts:e.items,totalQuantity:e.items.reduce(((t,e)=>t+e.quantity),0),totalPrice:parseFloat(e.totals.total_items)/100,totalSalePrice:parseFloat(e.totals.total_price)/100,error:""})}catch(e){console.error("Error fetching cart:",e),t({error:"Failed to fetch cart."})}},addToCart:r=>{const o=e().cartAdditions[r]||0;t((t=>({cartAdditions:{...t.cartAdditions,[r]:o+1}}))),f[r]||(f[r]=d((async()=>{t({isLoading:!0});try{const o=e().cartAdditions[r];console.log(`Adding ${o} of product ${r} to cart.`),await l()({path:"/wc/store/cart/add-item",method:"POST",data:{id:r,quantity:o}}),t((t=>({cartAdditions:{...t.cartAdditions,[r]:0}}))),e().fetchCart()}catch(e){console.error("Error adding item to cart:",e),t({error:"Failed to add item to cart."})}finally{t({isLoading:!1})}}),300)),f[r]()},remFromCart:r=>{const o=e().cartRemovals[r]||0;t((t=>({cartRemovals:{...t.cartRemovals,[r]:o+1}}))),p[r]||(p[r]=d((async()=>{t({isLoading:!0});const o=e().cartProducts.find((t=>t.id===r));if(!o)return console.error("Item not found in cart:",r),void t({isLoading:!1});try{const a={key:o.key,quantity:o.quantity-e().cartRemovals[r]};t((t=>({cartRemovals:{...t.cartRemovals,[r]:0}}))),await l()({path:a.quantity>0?"/wc/store/cart/update-item":"/wc/store/cart/remove-item",method:"POST",data:a}),console.log(`Updated cart for product ${r}.`),e().fetchCart()}catch(e){console.error("Error updating cart:",e),t({error:"Failed to update cart."})}finally{t({isLoading:!1}),e().triggerTotalCartUpdate()}}),300)),p[r]()},applyCoupon:async t=>{console.log(`Applying coupon: ${t}`);try{const e=await l()({path:"/wc/store/v1/cart/apply-coupon",method:"POST",data:{code:t}});return console.log(`Coupon ${t} applied.`),e}catch(e){throw console.error(`Error applying coupon ${t}:`,e),e}},triggerTotalCartUpdate:()=>{t((t=>({totalCartUpdate:t.totalCartUpdate+1})))}}))?s(y):s),window.myGlobalStore,console.log("view.js"),document.querySelector("#root-total-cart");const v=document.querySelector(".total-cart-data");JSON.parse(v.textContent||"{}")})()})();