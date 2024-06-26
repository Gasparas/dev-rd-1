(()=>{"use strict";var t={63:(t,e,r)=>{var a=r(609),o="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},n=a.useState,c=a.useEffect,i=a.useLayoutEffect,s=a.useDebugValue;function l(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!o(t,r)}catch(t){return!0}}var u="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(t,e){var r=e(),a=n({inst:{value:r,getSnapshot:e}}),o=a[0].inst,u=a[1];return i((function(){o.value=r,o.getSnapshot=e,l(o)&&u({inst:o})}),[t,r,e]),c((function(){return l(o)&&u({inst:o}),t((function(){l(o)&&u({inst:o})}))}),[t]),s(r),r};e.useSyncExternalStore=void 0!==a.useSyncExternalStore?a.useSyncExternalStore:u},940:(t,e,r)=>{var a=r(609),o=r(888),n="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},c=o.useSyncExternalStore,i=a.useRef,s=a.useEffect,l=a.useMemo,u=a.useDebugValue;e.useSyncExternalStoreWithSelector=function(t,e,r,a,o){var d=i(null);if(null===d.current){var p={hasValue:!1,value:null};d.current=p}else p=d.current;d=l((function(){function t(t){if(!s){if(s=!0,c=t,t=a(t),void 0!==o&&p.hasValue){var e=p.value;if(o(e,t))return i=e}return i=t}if(e=i,n(c,t))return e;var r=a(t);return void 0!==o&&o(e,r)?e:(c=t,i=r)}var c,i,s=!1,l=void 0===r?null:r;return[function(){return t(e())},null===l?void 0:function(){return t(l())}]}),[e,r,a,o]);var y=c(t,d[0],d[1]);return s((function(){p.hasValue=!0,p.value=y}),[y]),u(y),y}},888:(t,e,r)=>{t.exports=r(63)},242:(t,e,r)=>{t.exports=r(940)},609:t=>{t.exports=window.React}},e={};function r(a){var o=e[a];if(void 0!==o)return o.exports;var n=e[a]={exports:{}};return t[a](n,n.exports,r),n.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=r(609);const e=t=>{let e;const r=new Set,a=(t,a)=>{const o="function"==typeof t?t(e):t;if(!Object.is(o,e)){const t=e;e=(null!=a?a:"object"!=typeof o||null===o)?o:Object.assign({},e,o),r.forEach((r=>r(e,t)))}},o=()=>e,n={setState:a,getState:o,getInitialState:()=>c,subscribe:t=>(r.add(t),()=>r.delete(t)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}},c=e=t(a,o,n);return n};var a=r(242);const{useDebugValue:o}=t,{useSyncExternalStoreWithSelector:n}=a;let c=!1;const i=t=>t,s=t=>{"function"!=typeof t&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const r="function"==typeof t?(t=>t?e(t):e)(t):t,a=(t,e)=>function(t,e=i,r){r&&!c&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),c=!0);const a=n(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,r);return o(a),a}(r,t,e);return Object.assign(a,r),a},l=window.wp.apiFetch;var u=r.n(l);const d=window.lodash;function p(t,e){let r;return function(...a){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),t(...a)}),e)}}void 0===window.throttle&&(window.throttle=d.throttle),void 0===window.debounce&&(window.debounce=p);const y={},f={};var m;window.myGlobalStore=window.myGlobalStore||((m=(t,e)=>({totalCartUpdate:0,cartProducts:[],totalQuantity:0,totalPrice:0,totalSalePrice:0,totalDiscountPrice:0,currencyData:{currency_code:"EUR",currency_decimal_separator:".",currency_minor_unit:2,currency_prefix:"",currency_suffix:"€",currency_symbol:"€",currency_thousand_separator:""},isLoading:!1,error:"",isAddingToCart:!1,cartAdditions:{},cartRemovals:{},cartCoupons:[],triggerUpdateProductDisplayPrices:!1,fetchCart:async()=>{try{const e=await u()({path:"/wc/store/cart"}),r=(await u()({path:"/custom/v1/shipping-methods",method:"GET"})).find((t=>"flat_rate"===t.id)),a=r?parseFloat(r.cost):0,o=wc_free_shipping_data.threshold,n=parseFloat(e.totals.total_items)/100||0,c=parseFloat(e.totals.total_price)/100||0,i=c>=o?0:a,s=Math.max(n,0).toFixed(2),l=Math.max(c-i,0).toFixed(2);t({cartProducts:e.items,totalQuantity:e.items.reduce(((t,e)=>t+e.quantity),0),totalPrice:n,totalPriceMinusShipping:s,totalSalePrice:c,totalSalePriceMinusShipping:l,shippingTotal:i,currencyData:{currency_code:e.totals.currency_code,currency_decimal_separator:e.totals.currency_decimal_separator,currency_minor_unit:e.totals.currency_minor_unit,currency_prefix:e.totals.currency_prefix,currency_suffix:e.totals.currency_suffix,currency_symbol:e.totals.currency_symbol,currency_thousand_separator:e.totals.currency_thousand_separator},cartCoupons:e.coupons,error:""})}catch(e){console.error("Error fetching cart:",e),t({error:"Failed to fetch cart."})}},applyCoupon:async e=>{console.log(`Applying coupon: ${e}`);try{const r=await u()({path:"/wc/store/v1/cart/apply-coupon",method:"POST",data:{code:e}});console.log(`Coupon ${e} applied.`);const a=await u()({path:"/wc/store/cart"}),o=(await u()({path:"/custom/v1/shipping-methods",method:"GET"})).find((t=>"flat_rate"===t.id)),n=o?parseFloat(o.cost):0,c=wc_free_shipping_data.threshold,i=parseFloat(a.totals.total_items)/100||0,s=parseFloat(a.totals.total_price)/100||0,l=s>=c?0:n,d=Math.max(s-l,0).toFixed(2),p=Math.max(i,0).toFixed(2);return t({triggerUpdateProductDisplayPrices:!0}),setTimeout((()=>{t({triggerUpdateProductDisplayPrices:!1})}),200),t({totalPrice:parseFloat(r.totals.total_items)/100,totalPriceMinusShipping:p,totalSalePrice:parseFloat(r.totals.total_price)/100,totalSalePriceMinusShipping:d,totalDiscountPrice:parseFloat(r.totals.total_discount)/100,currencyData:{currency_code:r.totals.currency_code,currency_decimal_separator:r.totals.currency_decimal_separator,currency_minor_unit:r.totals.currency_minor_unit,currency_prefix:r.totals.currency_prefix,currency_suffix:r.totals.currency_suffix,currency_symbol:r.totals.currency_symbol,currency_thousand_separator:r.totals.currency_thousand_separator},cartCoupons:r.coupons}),r}catch(t){throw console.error(`Error applying coupon ${e}:`,t),t}},wc_price:(t,r=!0)=>{const{currency_code:a,currency_decimal_separator:o,currency_minor_unit:n,currency_prefix:c,currency_suffix:i,currency_symbol:s,currency_thousand_separator:l}=e().currencyData,u=t.toFixed(n),[d,p]=u.split(".");let y=c+d.replace(/\B(?=(\d{3})+(?!\d))/g,l);return p&&(y+=o+p),y+=i,r?`<span class="woocommerce-Price-amount amount"><bdi>${y}</bdi></span>`:y},addToCart:r=>{const a=e().cartAdditions[r]||0;t((t=>({cartAdditions:{...t.cartAdditions,[r]:a+1}}))),y[r]||(y[r]=p((async()=>{t({isLoading:!0});try{const a=e().cartAdditions[r];console.log(`Adding ${a} of product ${r} to cart.`),await u()({path:"/wc/store/cart/add-item",method:"POST",data:{id:r,quantity:a}});const o=new Event("added_to_cart");document.dispatchEvent(o),t((t=>({cartAdditions:{...t.cartAdditions,[r]:0}}))),e().fetchCart()}catch(e){console.error("Error adding item to cart:",e),t({error:"Failed to add item to cart."})}finally{t({isLoading:!1})}}),300)),y[r]()},remFromCart:r=>{const a=e().cartRemovals[r]||0;t((t=>({cartRemovals:{...t.cartRemovals,[r]:a+1}}))),f[r]||(f[r]=p((async()=>{t({isLoading:!0});const a=e().cartProducts.find((t=>t.id===r));if(!a)return console.error("Item not found in cart:",r),void t({isLoading:!1});try{const o={key:a.key,quantity:a.quantity-e().cartRemovals[r]};t((t=>({cartRemovals:{...t.cartRemovals,[r]:0}}))),await u()({path:o.quantity>0?"/wc/store/cart/update-item":"/wc/store/cart/remove-item",method:"POST",data:o}),console.log(`Updated cart for product ${r}.`),e().fetchCart()}catch(e){console.error("Error updating cart:",e),t({error:"Failed to update cart."})}finally{t({isLoading:!1}),e().triggerTotalCartUpdate()}}),300)),f[r]()},triggerTotalCartUpdate:()=>{t((t=>({totalCartUpdate:t.totalCartUpdate+1})))}}))?s(m):s);const h=window.myGlobalStore,_=window.wp.element;console.log("checkout-bar view.js");const g=document.querySelector(".total-cart-data"),w=JSON.parse(g?.textContent||"{}"),v=document.querySelector("#root-checkout-bar");v&&ReactDOM.createRoot(v).render((0,t.createElement)((({data:e})=>{const{shippingTotal:r,totalQuantity:a,totalPrice:o,totalPriceMinusShipping:n,totalSalePrice:c,totalSalePriceMinusShipping:i,wc_price:s}=h((t=>({shippingTotal:t.shippingTotal,totalQuantity:t.totalQuantity,totalPrice:t.totalPrice,totalPriceMinusShipping:t.totalPriceMinusShipping,totalSalePrice:t.totalSalePrice,totalSalePriceMinusShipping:t.totalSalePriceMinusShipping,wc_price:t.wc_price}))),[l,u]=(0,_.useState)("");(0,_.useEffect)((()=>{fetch(`${window.location.origin}/wp-json/wp/v2/pages?slug=checkout`).then((t=>t.json())).then((t=>{t.length>0&&u(t[0].link)})).catch((t=>console.error("Error fetching the Checkout page:",t)))}),[]);const[d,p]=(0,_.useState)(!1);return(0,t.createElement)(t.Fragment,null,d&&(0,t.createElement)("div",{className:"w-full px-4 py-0 mb-2 text-red-500 bg-white border border-blue-500 rounded bottom-full"},"Twój koszyk jest pusty"),i>0&&(0,t.createElement)("div",{className:"flex justify-end px-4 py-0 mb-1 bg-white border border-gray-400 rounded float-end w-fit"},"Wysyłka ",r>0?r+" zł":"BEZPŁATNIE"),(0,t.createElement)("a",{className:"w-full cursor-pointer",href:a>0?l:null,onClick:t=>{0===a?(t.preventDefault(),p(!0),setTimeout((()=>{p(!1)}),2e3)):p(!1)}},(0,t.createElement)("div",{className:"flex items-center justify-between w-full px-4 py-4 text-lg text-white no-underline bg-blue-500 rounded"},(0,t.createElement)("div",{className:"flex items-center"},(0,t.createElement)("span",{className:"flex items-center justify-center w-6 h-6 mr-2 bg-white rounded-full text-sky-900"},a),"Zobacz zamówienie"),(0,t.createElement)("div",null,n!=i?(0,t.createElement)("div",null,(0,t.createElement)("span",{className:"line-through"},n," zł")," ",(0,t.createElement)("span",null,i," zł")):(0,t.createElement)("span",null,i," zł")))))}),{data:w}))})()})();