"use strict";window.addEventListener("DOMContentLoaded",()=>{async function a(a,b=0){let c=e+a.join("&")+`&isWebareal=${b}`,d={error:0,data:null,success:!1};return await fetch(c).then(a=>a.json()).then(a=>{d={error:0,data:a,success:!0}}).catch(a=>{console.log("Error in loadProductData",a),d={error:1,data:null,success:!1}}),d}async function b(){let b=document.querySelectorAll(".product.tab_img160"),c=[],d=[];b.forEach(function(a){d.push(a.dataset.id),c.push(`productsCode[]=${a.dataset.id}`)});let e=a(c,1);e.then(a=>{d.forEach(function(b){let c,d=document.querySelector(`.product.tab_img160[data-id="${b}"]`);if(d.querySelector(".stock_yes")&&(c=d.querySelector(".stock_yes"),c.classList.remove("stock_yes")),d.querySelector(".stock_no")&&(c=d.querySelector(".stock_no"),c.classList.remove("stock_no")),a.data[b]){let d=a.data[b];if(0<d.disposition&&5>=d.disposition)c.innerHTML=d.disposition+"ks - Expedujeme ihne\u010F",c.style.cssText="font-size:14px;color:#155724";else if(5<d.disposition)c.innerHTML="Na sklade > 5ks - Expedujeme ihne\u010F",c.style.cssText="font-size:14px;color:#155724";else if(5>=d.disposition&&"undefined"!=typeof d.allStorages&&"undefined"!=typeof d.allStorages[6]&&0<d.allStorages[6].disposable_quantity)c.innerHTML="Dostupn\xE9 Showroom Liptovsk\xFD Mikul\xE1\u0161 - expedovanie v nasleduj\xFAci pracovn\xFD de\u0148",c.style.cssText="font-size:14px;color:#155724";else if(5>=d.disposition&&"undefined"!=typeof d.allStorages&&"undefined"!=typeof d.allStorages[5]&&0<d.allStorages[5].disposable_quantity){let a=d.allStorages[5].disposable_quantity,b="";b=0<a&&5>=a?`Na sklade ${a}ks`:"Na sklade > 5ks",c.innerHTML=b,c.style.cssText="font-size:14px;color:#155724"}else{let a=parseInt(d.disp_status_flag);1===a?5<parseInt(d.supp_availability)?(c.innerHTML="U dod\xE1vate\u013Ea. Dodanie 7-10 dn\xED.",c.style.cssText="font-size:14px;color:#155724"):(c.innerHTML="Tovar je aktu\xE1lne nedostupn\xFD. Dotazuj dostupnost.",c.style.cssText="font-size:14px"):2===a?(c.innerHTML=d.disp_status_text,c.style.cssText="font-size:14px"):3===a&&(c.innerHTML=d.disp_status_text,c.style.cssText="font-size:14px")}}})})}function c(a){return new Promise(b=>setTimeout(b,a))}const d=document.getElementById("categories-products-script"),e=d.getAttribute("data-url");document.querySelector(".product.tab_img160")&&setTimeout(()=>{b()},500);const f=document.getElementById("centerpage");if(f){let a=f.querySelectorAll("input.filter_values"),d=f.querySelectorAll(".cancel_filter_button");document.querySelector("#centerpage").addEventListener("click",async function(a){(a.target.classList.contains("sorting_item")||a.target.hasAttribute("data-sorting")||a.target.hasAttribute("data-page"))&&(await c(1e3),await b())}),a&&a.forEach(a=>{a.addEventListener("click",async function(){await c(1e3),await b()})}),d&&d.forEach(a=>{a.addEventListener("click",async function(){await c(1e3),await b()})})}});