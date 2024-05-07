(()=>{"use strict";var t={63:(t,e,r)=>{var a=r(609),o="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},c=a.useState,n=a.useEffect,s=a.useLayoutEffect,i=a.useDebugValue;function u(t){var e=t.getSnapshot;t=t.value;try{var r=e();return!o(t,r)}catch(t){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(t,e){var r=e(),a=c({inst:{value:r,getSnapshot:e}}),o=a[0].inst,l=a[1];return s((function(){o.value=r,o.getSnapshot=e,u(o)&&l({inst:o})}),[t,r,e]),n((function(){return u(o)&&l({inst:o}),t((function(){u(o)&&l({inst:o})}))}),[t]),i(r),r};e.useSyncExternalStore=void 0!==a.useSyncExternalStore?a.useSyncExternalStore:l},940:(t,e,r)=>{var a=r(609),o=r(888),c="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},n=o.useSyncExternalStore,s=a.useRef,i=a.useEffect,u=a.useMemo,l=a.useDebugValue;e.useSyncExternalStoreWithSelector=function(t,e,r,a,o){var d=s(null);if(null===d.current){var p={hasValue:!1,value:null};d.current=p}else p=d.current;d=u((function(){function t(t){if(!i){if(i=!0,n=t,t=a(t),void 0!==o&&p.hasValue){var e=p.value;if(o(e,t))return s=e}return s=t}if(e=s,c(n,t))return e;var r=a(t);return void 0!==o&&o(e,r)?e:(n=t,s=r)}var n,s,i=!1,u=void 0===r?null:r;return[function(){return t(e())},null===u?void 0:function(){return t(u())}]}),[e,r,a,o]);var m=n(t,d[0],d[1]);return i((function(){p.hasValue=!0,p.value=m}),[m]),l(m),m}},888:(t,e,r)=>{t.exports=r(63)},242:(t,e,r)=>{t.exports=r(940)},609:t=>{t.exports=window.React}},e={};function r(a){var o=e[a];if(void 0!==o)return o.exports;var c=e[a]={exports:{}};return t[a](c,c.exports,r),c.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var a in e)r.o(e,a)&&!r.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t=r(609);const e=window.wp.apiFetch;var a=r.n(e);const o=window.wp.url,c=window.wp.element,n=t=>{let e;const r=new Set,a=(t,a)=>{const o="function"==typeof t?t(e):t;if(!Object.is(o,e)){const t=e;e=(null!=a?a:"object"!=typeof o||null===o)?o:Object.assign({},e,o),r.forEach((r=>r(e,t)))}},o=()=>e,c={setState:a,getState:o,getInitialState:()=>n,subscribe:t=>(r.add(t),()=>r.delete(t)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),r.clear()}},n=e=t(a,o,c);return c};var s=r(242);const{useDebugValue:i}=t,{useSyncExternalStoreWithSelector:u}=s;let l=!1;const d=t=>t,p=t=>{"function"!=typeof t&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e="function"==typeof t?(t=>t?n(t):n)(t):t,r=(t,r)=>function(t,e=d,r){r&&!l&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),l=!0);const a=u(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,r);return i(a),a}(e,t,r);return Object.assign(r,e),r},m=window.lodash;function y(t,e){let r;return function(...a){clearTimeout(r),r=setTimeout((()=>{clearTimeout(r),t(...a)}),e)}}void 0===window.throttle&&(window.throttle=m.throttle),void 0===window.debounce&&(window.debounce=y);const f={},g={};var h;window.myGlobalStore=window.myGlobalStore||((h=(t,e)=>({totalCartUpdate:0,cartProducts:[],totalQuantity:0,totalPrice:0,totalSalePrice:0,totalDiscountPrice:0,currencyData:{currency_code:"EUR",currency_decimal_separator:".",currency_minor_unit:2,currency_prefix:"",currency_suffix:"€",currency_symbol:"€",currency_thousand_separator:""},isLoading:!1,error:"",isAddingToCart:!1,cartAdditions:{},cartRemovals:{},triggerUpdateProductDisplayPrices:!1,fetchCart:async()=>{try{const e=await a()({path:"/wc/store/cart"});t({cartProducts:e.items,totalQuantity:e.items.reduce(((t,e)=>t+e.quantity),0),totalPrice:parseFloat(e.totals.total_items)/100,totalSalePrice:parseFloat(e.totals.total_price)/100,totalDiscountPrice:parseFloat(e.totals.total_discount)/100,currencyData:{currency_code:e.totals.currency_code,currency_decimal_separator:e.totals.currency_decimal_separator,currency_minor_unit:e.totals.currency_minor_unit,currency_prefix:e.totals.currency_prefix,currency_suffix:e.totals.currency_suffix,currency_symbol:e.totals.currency_symbol,currency_thousand_separator:e.totals.currency_thousand_separator},error:""})}catch(e){console.error("Error fetching cart:",e),t({error:"Failed to fetch cart."})}},wc_price:(t,r=!0)=>{const{currency_code:a,currency_decimal_separator:o,currency_minor_unit:c,currency_prefix:n,currency_suffix:s,currency_symbol:i,currency_thousand_separator:u}=e().currencyData,l=t.toFixed(c),[d,p]=l.split(".");let m=n+d.replace(/\B(?=(\d{3})+(?!\d))/g,u);return p&&(m+=o+p),m+=s,r?`<span class="woocommerce-Price-amount amount"><bdi>${m}</bdi></span>`:m},addToCart:r=>{const o=e().cartAdditions[r]||0;t((t=>({cartAdditions:{...t.cartAdditions,[r]:o+1}}))),f[r]||(f[r]=y((async()=>{t({isLoading:!0});try{const o=e().cartAdditions[r];console.log(`Adding ${o} of product ${r} to cart.`),await a()({path:"/wc/store/cart/add-item",method:"POST",data:{id:r,quantity:o}}),t((t=>({cartAdditions:{...t.cartAdditions,[r]:0}}))),e().fetchCart()}catch(e){console.error("Error adding item to cart:",e),t({error:"Failed to add item to cart."})}finally{t({isLoading:!1})}}),300)),f[r]()},remFromCart:r=>{const o=e().cartRemovals[r]||0;t((t=>({cartRemovals:{...t.cartRemovals,[r]:o+1}}))),g[r]||(g[r]=y((async()=>{t({isLoading:!0});const o=e().cartProducts.find((t=>t.id===r));if(!o)return console.error("Item not found in cart:",r),void t({isLoading:!1});try{const c={key:o.key,quantity:o.quantity-e().cartRemovals[r]};t((t=>({cartRemovals:{...t.cartRemovals,[r]:0}}))),await a()({path:c.quantity>0?"/wc/store/cart/update-item":"/wc/store/cart/remove-item",method:"POST",data:c}),console.log(`Updated cart for product ${r}.`),e().fetchCart()}catch(e){console.error("Error updating cart:",e),t({error:"Failed to update cart."})}finally{t({isLoading:!1}),e().triggerTotalCartUpdate()}}),300)),g[r]()},applyCoupon:async e=>{console.log(`Applying coupon: ${e}`);try{const r=await a()({path:"/wc/store/v1/cart/apply-coupon",method:"POST",data:{code:e}});return console.log(`Coupon ${e} applied.`),t({triggerUpdateProductDisplayPrices:!0}),setTimeout((()=>{t({triggerUpdateProductDisplayPrices:!1})}),200),t({totalPrice:parseFloat(r.totals.total_items)/100,totalSalePrice:parseFloat(r.totals.total_price)/100,totalDiscountPrice:parseFloat(r.totals.total_discount)/100,currencyData:{currency_code:r.totals.currency_code,currency_decimal_separator:r.totals.currency_decimal_separator,currency_minor_unit:r.totals.currency_minor_unit,currency_prefix:r.totals.currency_prefix,currency_suffix:r.totals.currency_suffix,currency_symbol:r.totals.currency_symbol,currency_thousand_separator:r.totals.currency_thousand_separator}}),r}catch(t){throw console.error(`Error applying coupon ${e}:`,t),t}},triggerTotalCartUpdate:()=>{t((t=>({totalCartUpdate:t.totalCartUpdate+1})))}}))?p(h):p);const w=window.myGlobalStore;var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const v=(e,r)=>{const a=(0,t.forwardRef)((({color:a="currentColor",size:o=24,strokeWidth:c=2,absoluteStrokeWidth:n,className:s="",children:i,...u},l)=>{return(0,t.createElement)("svg",{ref:l,..._,width:o,height:o,stroke:a,strokeWidth:n?24*Number(c)/Number(o):c,className:["lucide",`lucide-${d=e,d.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,s].join(" "),...u},[...r.map((([e,r])=>(0,t.createElement)(e,r))),...Array.isArray(i)?i:[i]]);var d}));return a.displayName=`${e}`,a},b=v("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]),E=v("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);function S({selectedProductId:e,productsData:r}){const a=r.find((t=>t.id===e)),[o,n]=(0,c.useState)(a?.imageUrls[0]||"");return(0,c.useEffect)((()=>{n(a?.imageUrls[0]||"")}),[e,a]),a?(0,t.createElement)("div",{className:"image-viewer-wrapper"},(0,t.createElement)("div",{className:"full-size-wrapper"},(0,t.createElement)("img",{src:o,alt:"Selected"}))):(0,t.createElement)("div",null,"No product selected")}function P({selectedProductTitle:e,selectedProductPrice:r}){return(0,t.createElement)("div",{className:"flex items-center w-full mt-2 gap-x-4 h-14"},(0,t.createElement)("div",{className:"text-xl basis-1/5"},(0,t.createElement)((({html:e})=>(0,t.createElement)("span",{dangerouslySetInnerHTML:{__html:e}})),{html:r})),(0,t.createElement)("div",{className:"leading-snug basis-4/5"},e))}function x({products:e,onProductSelect:r,selectedProductId:a}){return(0,t.createElement)("div",{className:"flex gap-x-3"},e.map((e=>(0,t.createElement)("button",{className:"w-11 h-11",key:e.id,onClick:()=>r(e.id),style:{background:e.color,borderRadius:"50%",color:"white",margin:"1em 0",fontWeight:"bold",outline:e.id===a?"2px solid #3c82f6":"none",outlineOffset:"3px"}},0===e.counterValue?" ":e.counterValue))))}function C({productId:e,initialValue:r,togglerValueChange:a,resetProductsData:o}){const{fetchCart:n,addToCart:s,remFromCart:i,totalQuantity:u,totalPrice:l,isLoading:d,error:p}=w((t=>({fetchCart:t.fetchCart,addToCart:t.addToCart,remFromCart:t.remFromCart,totalQuantity:t.totalQuantity,totalPrice:t.totalPrice,error:t.error,isLoading:t.isLoading}))),[m,y]=(0,c.useState)(r);(0,c.useEffect)((()=>{y(r)}),[r]),(0,c.useEffect)((()=>{n()}),[m]),throttle((t=>{window.myGlobalStore.getState().addToCart(t),console.log("t")}),1e4);const f=debounce((async()=>{n().then((()=>{o()}))}),500);return(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:"py-3 shadow-md rounded-md flex items-center justify-around w-44 font-bold bg-gray-300 [&>button]:bg-white [&>button]:rounded-full [&>button>svg]:m-auto [&>button]:h-8 [&>button]:w-8"},(0,t.createElement)("button",{onClick:()=>{if(m>0){const t=m-1;y(t),a(t),i(e),f()}},disabled:d},(0,t.createElement)(b,{size:20,strokeWidth:3})),(0,t.createElement)("span",null,m),(0,t.createElement)("button",{onClick:()=>{const t=m+1;y(t),a(t),s(e),f()},disabled:d},(0,t.createElement)(E,{size:20,strokeWidth:3}))))}function D({productsSkus:e}){const[r,n]=(0,c.useState)([]),[s,i]=(0,c.useState)(null),[u,l]=(0,c.useState)(0),{triggerUpdateProductDisplayPrices:d}=w((t=>({triggerUpdateProductDisplayPrices:t.triggerUpdateProductDisplayPrices}))),p=()=>{a()({path:(0,o.addQueryArgs)("/rd-shop-product/v1/block-product-display-data",{skus:e}),method:"GET"}).then((t=>{t?.data&&(n(t.data),t.data.length>0&&!s&&i(t.data[0].id))}))};(0,c.useEffect)((()=>{const t=r.find((t=>t.id===s));l(t?t.counterValue:0)}),[r,s]),(0,c.useEffect)((()=>{p()}),[e]),(0,c.useEffect)((()=>{d&&p()}),[d]);const m=r.find((t=>t.id===s)),y=m?m.title:"",f=m?m.price:"";return s?(0,t.createElement)("div",{className:"mb-14 product-wrapper",style:{display:"flex",flexDirection:"column",alignItems:"center"}},(0,t.createElement)(S,{selectedProductId:s,productsData:r}),(0,t.createElement)(P,{selectedProductId:s,selectedProductTitle:y,selectedProductPrice:f}),(0,t.createElement)(x,{products:r,onProductSelect:t=>{i(t)},selectedProductId:s}),(0,t.createElement)(C,{productId:s,initialValue:u,togglerValueChange:t=>{const e=r.map((e=>e.id===s?{...e,counterValue:t}:e));n(e)},resetProductsData:p})):(0,t.createElement)("div",null)}document.querySelectorAll(".react-container").forEach((e=>{const r=JSON.parse(e.dataset?.products_skus||"[]");ReactDOM.createRoot(e).render((0,t.createElement)(D,{productsSkus:r}))}))})()})();