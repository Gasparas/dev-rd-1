(()=>{"use strict";var t={63:(t,e,r)=>{var a=r(609),n="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},o=a.useState,c=a.useEffect,s=a.useLayoutEffect,i=a.useDebugValue;function l(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!n(t,r)}catch(t){return!0}}var u="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(t,e){var r=e(),a=o({inst:{value:r,getSnapshot:e}}),n=a[0].inst,u=a[1];return s((function(){n.value=r,n.getSnapshot=e,l(n)&&u({inst:n})}),[t,r,e]),c((function(){return l(n)&&u({inst:n}),t((function(){l(n)&&u({inst:n})}))}),[t]),i(r),r};e.useSyncExternalStore=void 0!==a.useSyncExternalStore?a.useSyncExternalStore:u},940:(t,e,r)=>{var a=r(609),n=r(888),o="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},c=n.useSyncExternalStore,s=a.useRef,i=a.useEffect,l=a.useMemo,u=a.useDebugValue;e.useSyncExternalStoreWithSelector=function(t,e,r,a,n){var d=s(null);if(null===d.current){var m={hasValue:!1,value:null};d.current=m}else m=d.current;d=l((function(){function t(t){if(!i){if(i=!0,c=t,t=a(t),void 0!==n&&m.hasValue){var e=m.value;if(n(e,t))return s=e}return s=t}if(e=s,o(c,t))return e;var r=a(t);return void 0!==n&&n(e,r)?e:(c=t,s=r)}var c,s,i=!1,l=void 0===r?null:r;return[function(){return t(e())},null===l?void 0:function(){return t(l())}]}),[e,r,a,n]);var p=c(t,d[0],d[1]);return i((function(){m.hasValue=!0,m.value=p}),[p]),u(p),p}},888:(t,e,r)=>{t.exports=r(63)},242:(t,e,r)=>{t.exports=r(940)},609:t=>{t.exports=window.React}},e={};function r(a){var n=e[a];if(void 0!==n)return n.exports;var o=e[a]={exports:{}};return t[a](o,o.exports,r),o.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=r(609);const e=t=>{let e;const r=new Set,a=(t,a)=>{const n="function"==typeof t?t(e):t;if(!Object.is(n,e)){const t=e;e=(null!=a?a:"object"!=typeof n||null===n)?n:Object.assign({},e,n),r.forEach((r=>r(e,t)))}},n=()=>e,o={setState:a,getState:n,getInitialState:()=>c,subscribe:t=>(r.add(t),()=>r.delete(t)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}},c=e=t(a,n,o);return o};var a=r(242);const{useDebugValue:n}=t,{useSyncExternalStoreWithSelector:o}=a;let c=!1;const s=t=>t,i=t=>{"function"!=typeof t&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const r="function"==typeof t?(t=>t?e(t):e)(t):t,a=(t,e)=>function(t,e=s,r){r&&!c&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),c=!0);const a=o(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,r);return n(a),a}(r,t,e);return Object.assign(a,r),a},l=window.wp.apiFetch;var u=r.n(l);const d=window.lodash;function m(t,e){let r;return function(...a){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),t(...a)}),e)}}void 0===window.throttle&&(window.throttle=d.throttle),void 0===window.debounce&&(window.debounce=m);const p={},y={};var f;window.myGlobalStore=window.myGlobalStore||((f=(t,e)=>({totalCartUpdate:0,cartProducts:[],totalQuantity:0,totalPrice:0,totalSalePrice:0,totalDiscountPrice:0,currencyData:{currency_code:"EUR",currency_decimal_separator:".",currency_minor_unit:2,currency_prefix:"",currency_suffix:"€",currency_symbol:"€",currency_thousand_separator:""},isLoading:!1,error:"",isAddingToCart:!1,cartAdditions:{},cartRemovals:{},triggerUpdateProductDisplayPrices:!1,fetchCart:async()=>{try{const e=await u()({path:"/wc/store/cart"});t({cartProducts:e.items,totalQuantity:e.items.reduce(((t,e)=>t+e.quantity),0),totalPrice:parseFloat(e.totals.total_items)/100,totalSalePrice:parseFloat(e.totals.total_price)/100,totalDiscountPrice:parseFloat(e.totals.total_discount)/100,currencyData:{currency_code:e.totals.currency_code,currency_decimal_separator:e.totals.currency_decimal_separator,currency_minor_unit:e.totals.currency_minor_unit,currency_prefix:e.totals.currency_prefix,currency_suffix:e.totals.currency_suffix,currency_symbol:e.totals.currency_symbol,currency_thousand_separator:e.totals.currency_thousand_separator},error:""})}catch(e){console.error("Error fetching cart:",e),t({error:"Failed to fetch cart."})}},wc_price:(t,r=!0)=>{const{currency_code:a,currency_decimal_separator:n,currency_minor_unit:o,currency_prefix:c,currency_suffix:s,currency_symbol:i,currency_thousand_separator:l}=e().currencyData,u=t.toFixed(o),[d,m]=u.split(".");let p=c+d.replace(/\B(?=(\d{3})+(?!\d))/g,l);return m&&(p+=n+m),p+=s,r?`<span class="woocommerce-Price-amount amount"><bdi>${p}</bdi></span>`:p},addToCart:r=>{const a=e().cartAdditions[r]||0;t((t=>({cartAdditions:{...t.cartAdditions,[r]:a+1}}))),p[r]||(p[r]=m((async()=>{t({isLoading:!0});try{const a=e().cartAdditions[r];console.log(`Adding ${a} of product ${r} to cart.`),await u()({path:"/wc/store/cart/add-item",method:"POST",data:{id:r,quantity:a}}),t((t=>({cartAdditions:{...t.cartAdditions,[r]:0}}))),e().fetchCart()}catch(e){console.error("Error adding item to cart:",e),t({error:"Failed to add item to cart."})}finally{t({isLoading:!1})}}),300)),p[r]()},remFromCart:r=>{const a=e().cartRemovals[r]||0;t((t=>({cartRemovals:{...t.cartRemovals,[r]:a+1}}))),y[r]||(y[r]=m((async()=>{t({isLoading:!0});const a=e().cartProducts.find((t=>t.id===r));if(!a)return console.error("Item not found in cart:",r),void t({isLoading:!1});try{const n={key:a.key,quantity:a.quantity-e().cartRemovals[r]};t((t=>({cartRemovals:{...t.cartRemovals,[r]:0}}))),await u()({path:n.quantity>0?"/wc/store/cart/update-item":"/wc/store/cart/remove-item",method:"POST",data:n}),console.log(`Updated cart for product ${r}.`),e().fetchCart()}catch(e){console.error("Error updating cart:",e),t({error:"Failed to update cart."})}finally{t({isLoading:!1}),e().triggerTotalCartUpdate()}}),300)),y[r]()},applyCoupon:async e=>{console.log(`Applying coupon: ${e}`);try{const r=await u()({path:"/wc/store/v1/cart/apply-coupon",method:"POST",data:{code:e}});return console.log(`Coupon ${e} applied.`),t({triggerUpdateProductDisplayPrices:!0}),setTimeout((()=>{t({triggerUpdateProductDisplayPrices:!1})}),200),t({totalPrice:parseFloat(r.totals.total_items)/100,totalSalePrice:parseFloat(r.totals.total_price)/100,totalDiscountPrice:parseFloat(r.totals.total_discount)/100,currencyData:{currency_code:r.totals.currency_code,currency_decimal_separator:r.totals.currency_decimal_separator,currency_minor_unit:r.totals.currency_minor_unit,currency_prefix:r.totals.currency_prefix,currency_suffix:r.totals.currency_suffix,currency_symbol:r.totals.currency_symbol,currency_thousand_separator:r.totals.currency_thousand_separator}}),r}catch(t){throw console.error(`Error applying coupon ${e}:`,t),t}},triggerTotalCartUpdate:()=>{t((t=>({totalCartUpdate:t.totalCartUpdate+1})))}}))?i(f):i);const g=window.myGlobalStore;console.log("step-indicator view.js");const v=({data:e})=>{var r,a;const{totalQuantity:n}=g((t=>({totalQuantity:t.totalQuantity}))),o=e.steps.filter((t=>n>=t)).length-1,c=null!==(r=e.percs[o+1])&&void 0!==r?r:"",s=c?e.steps[o+1]-n:0;return(0,t.createElement)("div",{className:"lg:w-[400px] w-[330px]",style:{position:"fixed",bottom:"5px",left:"50%",translate:"-50%"}},(0,t.createElement)("div",{className:"flex  justify-around items-center px-3 py-2 mb-1 text-sm font-medium text-white bg-blue-500 rounded-lg [&>span]:text-xs"},c?(0,t.createElement)("div",null,"Add ",(0,t.createElement)("span",{className:"mr-1"},s),"more to get"," ",(0,t.createElement)("span",{className:"mx-1"},c," OFF")):(0,t.createElement)("div",null,"You have a ",(0,t.createElement)("span",{className:"mr-1"},null!==(a=e.percs[o])&&void 0!==a?a:"0%")," discount"),(0,t.createElement)("a",{href:"/?page_id=9",className:"px-2 py-1 text-sm text-white no-underline bg-blue-600 rounded-lg"},"View Order")))},_=document.querySelector(".total-cart-data"),h=JSON.parse(_?.textContent||"{}"),w=document.querySelector("#root-step-indicator");w&&ReactDOM.createRoot(w).render((0,t.createElement)((({data:e})=>{const{totalQuantity:r,totalPrice:a,totalSalePrice:n,totalDiscountPrice:o,wc_price:c}=g((t=>({totalQuantity:t.totalQuantity,totalPrice:t.totalPrice,totalSalePrice:t.totalSalePrice,totalDiscountPrice:t.totalDiscountPrice,wc_price:t.wc_price}))),s=[0,...e.steps,e.steps[0]+e.steps[e.steps.length-1]],i=s[s.length-1],l=r/i*100;return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"px-3 pt-1 pb-2 bg-blue-500 rounded-lg"},(0,t.createElement)("div",{className:"mb-3 text-xs font-semibold tracking-wide text-center text-white"},"Items selected: ",r),(0,t.createElement)("div",{className:"numbers-container"},s.filter(((t,e)=>0!==e&&e!==s.length-1)).map(((e,r)=>{const a=e/i*100;return(0,t.createElement)("div",{key:r,className:"step-number",style:{width:"20px",textAlign:"center",marginLeft:"-4px",left:a-2+"%"}},e)}))),(0,t.createElement)("div",{className:"progress-container"},(0,t.createElement)("div",{className:"progress-bar",style:{width:`${l}%`}}),s.filter(((t,e)=>0!==e&&e!==s.length-1)).map((e=>{const r=e/i*100;return(0,t.createElement)("div",{key:e,className:"step-marker",style:{left:`${r}%`}})}))),(0,t.createElement)("div",{className:"mt-2.5 numbers-container"},s.filter(((t,e)=>0!==e&&e!==s.length-1)).map(((r,a)=>{const n=r/i*100;return(0,t.createElement)("div",{key:a,className:"step-number",style:{width:"36px",textAlign:"center",marginLeft:"-4px",left:n-4+"%"}},e.percs[a])}))),(0,t.createElement)("div",null,(0,t.createElement)("div",{className:"flex items-center w-full pt-2 font-medium text-white bg-blue-500 rounded-lg justify-evenly"},(0,t.createElement)("div",null,(0,t.createElement)("span",{className:"text-sm font-light text-gray-100"},"Total: "),n<a?(0,t.createElement)("span",{className:"strikethrough-diagonal font-light text-sm text-gray-100"},c(a,!1)):"",(0,t.createElement)("span",{className:"ml-2"},c(n,!1))),(0,t.createElement)("div",null,(0,t.createElement)("span",{className:"text-sm font-light text-gray-100"},"You save: "),(0,t.createElement)("span",null,c(null!=o?o:a,!1)))))),(0,t.createElement)(v,{data:e}))}),{data:h}))})()})();