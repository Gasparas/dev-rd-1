(()=>{"use strict";var r,t={17:()=>{const r=window.wp.blocks,t=window.React,e=(window.wp.i18n,window.wp.blockEditor),o=JSON.parse('{"UU":"create-block/rd-shop-product-2"}');(0,r.registerBlockType)(o.UU,{attributes:{productId:{type:"string",default:"Product IDs"}},edit:function({attributes:r,setAttributes:o}){return(0,t.createElement)("div",null,(0,t.createElement)(e.PlainText,{value:r.productId.toString(),onChange:r=>o({productId:r}),placeholder:"Enter Product ID"}))}})}},e={};function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,o),i.exports}o.m=t,r=[],o.O=(t,e,n,i)=>{if(!e){var a=1/0;for(p=0;p<r.length;p++){for(var[e,n,i]=r[p],c=!0,d=0;d<e.length;d++)(!1&i||a>=i)&&Object.keys(o.O).every((r=>o.O[r](e[d])))?e.splice(d--,1):(c=!1,i<a&&(a=i));if(c){r.splice(p--,1);var l=n();void 0!==l&&(t=l)}}return t}i=i||0;for(var p=r.length;p>0&&r[p-1][2]>i;p--)r[p]=r[p-1];r[p]=[e,n,i]},o.o=(r,t)=>Object.prototype.hasOwnProperty.call(r,t),(()=>{var r={57:0,350:0};o.O.j=t=>0===r[t];var t=(t,e)=>{var n,i,[a,c,d]=e,l=0;if(a.some((t=>0!==r[t]))){for(n in c)o.o(c,n)&&(o.m[n]=c[n]);if(d)var p=d(o)}for(t&&t(e);l<a.length;l++)i=a[l],o.o(r,i)&&r[i]&&r[i][0](),r[i]=0;return o.O(p)},e=globalThis.webpackChunkrd_shop_product=globalThis.webpackChunkrd_shop_product||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))})();var n=o.O(void 0,[350],(()=>o(17)));n=o.O(n)})();