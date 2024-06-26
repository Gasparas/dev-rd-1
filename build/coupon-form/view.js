(()=>{"use strict";var t={63:(t,e,r)=>{var o=r(609),a="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},n=o.useState,c=o.useEffect,s=o.useLayoutEffect,i=o.useDebugValue;function u(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!a(t,r)}catch(t){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(t,e){var r=e(),o=n({inst:{value:r,getSnapshot:e}}),a=o[0].inst,l=o[1];return s((function(){a.value=r,a.getSnapshot=e,u(a)&&l({inst:a})}),[t,r,e]),c((function(){return u(a)&&l({inst:a}),t((function(){u(a)&&l({inst:a})}))}),[t]),i(r),r};e.useSyncExternalStore=void 0!==o.useSyncExternalStore?o.useSyncExternalStore:l},940:(t,e,r)=>{var o=r(609),a=r(888),n="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},c=a.useSyncExternalStore,s=o.useRef,i=o.useEffect,u=o.useMemo,l=o.useDebugValue;e.useSyncExternalStoreWithSelector=function(t,e,r,o,a){var d=s(null);if(null===d.current){var p={hasValue:!1,value:null};d.current=p}else p=d.current;d=u((function(){function t(t){if(!i){if(i=!0,c=t,t=o(t),void 0!==a&&p.hasValue){var e=p.value;if(a(e,t))return s=e}return s=t}if(e=s,n(c,t))return e;var r=o(t);return void 0!==a&&a(e,r)?e:(c=t,s=r)}var c,s,i=!1,u=void 0===r?null:r;return[function(){return t(e())},null===u?void 0:function(){return t(u())}]}),[e,r,o,a]);var y=c(t,d[0],d[1]);return i((function(){p.hasValue=!0,p.value=y}),[y]),l(y),y}},888:(t,e,r)=>{t.exports=r(63)},242:(t,e,r)=>{t.exports=r(940)},609:t=>{t.exports=window.React}},e={};function r(o){var a=e[o];if(void 0!==a)return a.exports;var n=e[o]={exports:{}};return t[o](n,n.exports,r),n.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var o in e)r.o(e,o)&&!r.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=r(609);const e=window.wp.element,o=window.wp.apiFetch;var a=r.n(o);const n=t=>{let e;const r=new Set,o=(t,o)=>{const a="function"==typeof t?t(e):t;if(!Object.is(a,e)){const t=e;e=(null!=o?o:"object"!=typeof a||null===a)?a:Object.assign({},e,a),r.forEach((r=>r(e,t)))}},a=()=>e,n={setState:o,getState:a,getInitialState:()=>c,subscribe:t=>(r.add(t),()=>r.delete(t)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}},c=e=t(o,a,n);return n};var c=r(242);const{useDebugValue:s}=t,{useSyncExternalStoreWithSelector:i}=c;let u=!1;const l=t=>t,d=t=>{"function"!=typeof t&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e="function"==typeof t?(t=>t?n(t):n)(t):t,r=(t,r)=>function(t,e=l,r){r&&!u&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),u=!0);const o=i(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,r);return s(o),o}(e,t,r);return Object.assign(r,e),r},p=window.lodash;function y(t,e){let r;return function(...o){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),t(...o)}),e)}}void 0===window.throttle&&(window.throttle=p.throttle),void 0===window.debounce&&(window.debounce=y);const m={},f={};var h;window.myGlobalStore=window.myGlobalStore||((h=(t,e)=>({totalCartUpdate:0,cartProducts:[],totalQuantity:0,totalPrice:0,totalSalePrice:0,totalDiscountPrice:0,currencyData:{currency_code:"EUR",currency_decimal_separator:".",currency_minor_unit:2,currency_prefix:"",currency_suffix:"€",currency_symbol:"€",currency_thousand_separator:""},isLoading:!1,error:"",isAddingToCart:!1,cartAdditions:{},cartRemovals:{},cartCoupons:[],triggerUpdateProductDisplayPrices:!1,fetchCart:async()=>{try{const e=await a()({path:"/wc/store/cart"}),r=(await a()({path:"/wc/v3/shipping/zones/1/methods",method:"GET"})).find((t=>"flat_rate"===t.method_id)),o=r?parseFloat(r.settings.cost.value):0,n=wc_free_shipping_data.threshold,c=parseFloat(e.totals.total_items)/100||0,s=parseFloat(e.totals.total_price)/100||0,i=s>=n?0:o,u=Math.max(c,0).toFixed(2),l=Math.max(s-i,0).toFixed(2);(t=>{for(const[e,r]of Object.entries(t))console.log(`${e}:`,r)})({shippingTotal:i,totalPriceMinusShipping:u,totalSalePriceMinusShipping:l,totalItems:c,totalPrice:s}),t({cartProducts:e.items,totalQuantity:e.items.reduce(((t,e)=>t+e.quantity),0),totalPrice:c,totalPriceMinusShipping:u,totalSalePrice:s,totalSalePriceMinusShipping:l,shippingTotal:i,currencyData:{currency_code:e.totals.currency_code,currency_decimal_separator:e.totals.currency_decimal_separator,currency_minor_unit:e.totals.currency_minor_unit,currency_prefix:e.totals.currency_prefix,currency_suffix:e.totals.currency_suffix,currency_symbol:e.totals.currency_symbol,currency_thousand_separator:e.totals.currency_thousand_separator},cartCoupons:e.coupons,error:""})}catch(e){console.error("Error fetching cart:",e),t({error:"Failed to fetch cart."})}},wc_price:(t,r=!0)=>{const{currency_code:o,currency_decimal_separator:a,currency_minor_unit:n,currency_prefix:c,currency_suffix:s,currency_symbol:i,currency_thousand_separator:u}=e().currencyData,l=t.toFixed(n),[d,p]=l.split(".");let y=c+d.replace(/\B(?=(\d{3})+(?!\d))/g,u);return p&&(y+=a+p),y+=s,r?`<span class="woocommerce-Price-amount amount"><bdi>${y}</bdi></span>`:y},addToCart:r=>{const o=e().cartAdditions[r]||0;t((t=>({cartAdditions:{...t.cartAdditions,[r]:o+1}}))),m[r]||(m[r]=y((async()=>{t({isLoading:!0});try{const o=e().cartAdditions[r];console.log(`Adding ${o} of product ${r} to cart.`),await a()({path:"/wc/store/cart/add-item",method:"POST",data:{id:r,quantity:o}});const n=new Event("added_to_cart");document.dispatchEvent(n),t((t=>({cartAdditions:{...t.cartAdditions,[r]:0}}))),e().fetchCart()}catch(e){console.error("Error adding item to cart:",e),t({error:"Failed to add item to cart."})}finally{t({isLoading:!1})}}),300)),m[r]()},remFromCart:r=>{const o=e().cartRemovals[r]||0;t((t=>({cartRemovals:{...t.cartRemovals,[r]:o+1}}))),f[r]||(f[r]=y((async()=>{t({isLoading:!0});const o=e().cartProducts.find((t=>t.id===r));if(!o)return console.error("Item not found in cart:",r),void t({isLoading:!1});try{const n={key:o.key,quantity:o.quantity-e().cartRemovals[r]};t((t=>({cartRemovals:{...t.cartRemovals,[r]:0}}))),await a()({path:n.quantity>0?"/wc/store/cart/update-item":"/wc/store/cart/remove-item",method:"POST",data:n}),console.log(`Updated cart for product ${r}.`),e().fetchCart()}catch(e){console.error("Error updating cart:",e),t({error:"Failed to update cart."})}finally{t({isLoading:!1}),e().triggerTotalCartUpdate()}}),300)),f[r]()},applyCoupon:async e=>{console.log(`Applying coupon: ${e}`);try{const r=await a()({path:"/wc/store/v1/cart/apply-coupon",method:"POST",data:{code:e}});return console.log(`Coupon ${e} applied.`),t({triggerUpdateProductDisplayPrices:!0}),setTimeout((()=>{t({triggerUpdateProductDisplayPrices:!1})}),200),t({totalPrice:parseFloat(r.totals.total_items)/100,totalSalePrice:parseFloat(r.totals.total_price)/100,totalDiscountPrice:parseFloat(r.totals.total_discount)/100,currencyData:{currency_code:r.totals.currency_code,currency_decimal_separator:r.totals.currency_decimal_separator,currency_minor_unit:r.totals.currency_minor_unit,currency_prefix:r.totals.currency_prefix,currency_suffix:r.totals.currency_suffix,currency_symbol:r.totals.currency_symbol,currency_thousand_separator:r.totals.currency_thousand_separator},cartCoupons:r.coupons}),r}catch(t){throw console.error(`Error applying coupon ${e}:`,t),t}},triggerTotalCartUpdate:()=>{t((t=>({totalCartUpdate:t.totalCartUpdate+1})))}}))?d(h):d);const g=window.myGlobalStore;var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const w=((e,r)=>{const o=(0,t.forwardRef)((({color:o="currentColor",size:a=24,strokeWidth:n=2,absoluteStrokeWidth:c,className:s="",children:i,...u},l)=>{return(0,t.createElement)("svg",{ref:l,..._,width:a,height:a,stroke:o,strokeWidth:c?24*Number(n)/Number(a):n,className:["lucide",`lucide-${d=e,d.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,s].join(" "),...u},[...r.map((([e,r])=>(0,t.createElement)(e,r))),...Array.isArray(i)?i:[i]]);var d}));return o.displayName=`${e}`,o})("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);console.log("coupon-code js"),document.querySelector("#root-coupon-form")&&ReactDOM.createRoot(document.querySelector("#root-coupon-form")).render((0,t.createElement)((function(){const{applyCoupon:r,cartCoupons:o}=g((t=>({applyCoupon:t.applyCoupon,cartCoupons:t.cartCoupons}))),[a,n]=(0,e.useState)(""),[c,s]=(0,e.useState)(!1),[i,u]=(0,e.useState)(""),l=o.map((t=>t.code));return(0,t.createElement)("div",{className:"p-2 rounded bg-amber-200"},(0,t.createElement)("form",{className:"flex justify-center gap-x-2",onSubmit:async t=>{t.preventDefault(),u(""),r(a).then((t=>{t&&s(!0)})).catch((t=>{u(t.message)}))}},c||l.length?(0,t.createElement)(t.Fragment,null,(0,t.createElement)("p",{className:"text-base uppercase text-sky-900"},"Kod rabatowy: ",l.join(", ")),(0,t.createElement)(w,{color:"#0c4a6e"})):(0,t.createElement)(t.Fragment,null,(0,t.createElement)("input",{className:"px-1 text-base font-light rounded basis-4/6",type:"text",placeholder:"Wprowadź kod rabatowy",value:a,onChange:t=>{n(t.target.value)}}),(0,t.createElement)("button",{className:"px-2 text-base font-medium text-center uppercase transition-all bg-white hover:text-white hover:bg-sky-700 w-3/8 rounded-xl text-sky-900 basis-2/6",type:"submit"},"Aktywuj"))))}),null))})()})();