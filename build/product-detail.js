"use strict";window.addEventListener("DOMContentLoaded",()=>{function a(a){const b=a.getBoundingClientRect();return 0<=b.top&&0<=b.left&&b.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&b.right<=(window.innerWidth||document.documentElement.clientWidth)}var b=0,c=0;if(document.getElementById("basket_payments_list")&&document.getElementById("postovne_form2_3035")){let a=document.getElementById("postovne_form2_3035").closest("tr");a.classList.add("trustpay")}if(document.querySelector(".product-detail-container")){function n(){document.getElementById("detail_src_magnifying_small")&&(document.querySelector(".img-sticky img").src=document.getElementById("detail_src_magnifying_small").src),document.querySelector(".name-sticky").innerText=document.querySelector("h1").innerText,document.querySelector(".price-sticky .price_no_vat-sticky").innerText=document.querySelector(".price-novat").innerText,document.querySelector(".price-sticky .price_vat-sticky").innerText=document.querySelector(".price-vat .price-value.def_color").innerText,document.getElementById("buy_btn_container-sticky").appendChild(document.querySelector(".cart-info-btn").cloneNode(!0)),document.querySelector(".basket-sticky").appendChild(document.getElementById("basket_icon").cloneNode(!0)),document.querySelector(".affix-sticky__container").classList.add("affix")}const o=document.getElementById("product-detail-script"),p=o.getAttribute("data-url"),q=o.getAttribute("data-base-url");var d="",e=document.querySelector("input[name='number']"),f=document.querySelector(".price-value.def_color.product-stock-value"),g=document.querySelector(".fright.textright");if(e.length){e=e.value,document.querySelector(".before_variants.stock-line.stock-line-")&&document.querySelector(".before_variants.stock-line.stock-line-").remove(),d=e.trim();var h=encodeURIComponent(e)}var i=p+h,j=!1;d&&fetch(i).then(a=>a.json()).then(a=>{f.querySelector("span").remove();let e=a[d];if(void 0===e&&(e=a[d.toUpperCase()]),b=e.suppAvailability,0<e.disposition&&5>=e.disposition)f.innerHTML=`${e.disposition}ks - Expedujeme ihneď <div class="info-about-delivery"><a href="#"> Viac o dostupnosti ? </a></div>`,f.style.fontSize="18px",f.style.color="#155724",f.style.backgroundColor="#d4edda";else if(5<e.disposition)c=e.disposition,f.innerHTML="Na sklade > 5ks - Expedujeme ihne\u010F <div class=\"info-about-delivery\"><a href=\"#\"> Viac o dostupnosti ?  </a></div>",f.style.fontSize="18px",f.style.color="#155724",f.style.backgroundColor="#d4edda";else if(5>=e.disposition&&"undefined"!=typeof e.allStorages&&"undefined"!=typeof e.allStorages[6]&&0<e.allStorages[6].disposable_quantity)f.innerHTML="Dostupn\xE9 Showroom Liptovsk\xFD Mikul\xE1\u0161 - expedovanie v nasleduj\xFAci pracovn\xFD de\u0148",f.style.fontSize="18px",f.style.color="#155724",f.style.backgroundColor="#d4edda";else if(5>=e.disposition&&"undefined"!=typeof e.allStorages&&"undefined"!=typeof e.allStorages[5]&&0<e.allStorages[5].disposable_quantity){let a=e.allStorages[5].disposable_quantity,b="";b=0<a&&5>=a?`Na sklade ${a}ks`:"Na sklade > 5ks",f.innerHTML=b,f.style.fontSize="18px",f.style.color="#155724",f.style.backgroundColor="#d4edda"}else{let a=parseInt(e.disp_status_flag);var h=parseInt(e.disp_status);if(0===h||9===h)5<parseInt(e.suppAvailability)?(f.innerHTML=e.disp_status_text+" <div class=\"info-about-delivery\"><a href=\"#\" data-text=\""+e.disp_status_description+"\"> Viac o dostupnosti ? </a></div>",f.style.fontSize="18px",f.style.color="#155724",f.style.backgroundColor="#d4edda",j=!1):(f.innerHTML="Tovar je aktu\xE1lne nedostupn\xFD. Dotazuj dostupnos\u0165. <div class=\"info-about-delivery\"><a href=\"#\" data-text=\"Tento tovar nie je dostupn\xFD na na\u0161om sklade ani na sklade dod\xE1vate\u013Ea. V pr\xEDpade z\xE1ujmu n\xE1m odo\u0161lite dotaz,  informujeme V\xE1s o dostupnosti pr\xEDpadne V\xE1m pon\xFAkneme vhodn\xFA variantu.\"> Viac o dostupnosti ? </a></div>",f.style.fontSize="18px",j=!0);else if(2===a){j=!1;let a=e.disp_status_text;e.disp_status_description&&(a+=` <div class="info-about-delivery"><a href="#"  data-text="${e.disp_status_description}"> Viac o dostupnosti ? </a></div>`),f.innerHTML=a,f.style.fontSize="18px"}else if(3===a){j=!0;let a=e.disp_status_text;e.disp_status_description&&(a+=` <div class="info-about-delivery"><a href="#" data-text="${e.disp_status_description}"> Viac o dostupnosti ? </a></div>`),f.innerHTML=a,f.style.fontSize="18px"}if(j){const a=document.getElementById("kusy"),b=document.getElementById("buy_btn"),c=document.querySelector(".product-cart-info-value");if(a&&(a.style.display="none"),b&&b.remove(),c&&c.querySelector(".count")&&c.querySelector(".count").remove(),g){const a=document.createElement("a");a.setAttribute("href",`${q}/geko/5-ZAKAZNICKA-PODPORA/4-Poslat-otazku-predajcovi`),a.innerHTML="<input type=\"button\" class=\"question_btn_custom\" id=\"buy_btn\" name=\"question_sbmt\" value=\"Dotaz\">",g.appendChild(a)}}}}).catch(a=>console.error("Error loading product stock data: ",a)),d&&fetch("https://api.ipify.org?format=jsonp&callback=?").then(a=>a.json()).then(a=>{const b=a.ip,c="URL HERE"+d+"&ip="+b+"&country="+"SK"+"&eshopID=1";fetch(c)}).catch(a=>console.error("Error Get ip from ipify: ",a));const r=document.getElementById("stars_main").dataset.productId,s=o.getAttribute("data-cat-url");fetch(s+r).then(a=>a.json()).then(a=>{if(!0===a.success&&a.categories){let b=` |  <a href="${q}/geko">Úvod</a> <span class="arrow">»</span> `;a.categories.forEach(function(a){b+=`<a href="${a.full_url}">${a.catName}</a> <span class="arrow">»</span> `});const c=document.querySelector("#wherei p");c.querySelector(".active")&&(b+="<span class=\"active\">"+c.querySelector(".active").innerHTML+"</span>"),c&&c.appendChild(b)}}).catch(a=>console.error("Error fetching product categories",a)),document.querySelector("body").addEventListener("click",a=>{if(a.target.classList.contains("info-about-delivery")){let d=a.target.querySelector("a");if(d.preventDefault(),!document.querySelector("td#js-custom-cell")){let a="";"text"in d.dataset?a=d.dataset.text:(a="Plat\xED pre objedn\xE1vky ktor\xE9 obsahuj\xFA v\u0161etky produkty s inform\xE1ciou expedujeme ihne\u010F.<br>",0<c&&20>=c?a+=`<p style="padding-bottom:10px;padding-top:10px;">Dostupnosť u nás ${c}ks</p>`:20<c&&(a+="<p style=\"padding-bottom:10px;padding-top:10px;\">Dostupnos\u0165 u n\xE1s > 20ks</p>"),0<b&&20>=b?a+=`<p style="padding-bottom:10px;padding-top:10px;">Posledná Dostupnosť u dodávateľa ${b}ks</p>`:20<b&&(a+="<p style=\"padding-bottom:10px;padding-top:10px;\">Posledn\xE1 dostupnos\u0165 u dod\xE1vate\u013Ea > 20ks</p>"),a+="<a href=\""+q+"/geko/5-ZAKAZNICKA-PODPORA/4-Poslat-otazku-predajcovi\" target=\"_blank\">Pre inform\xE1cie o objednan\xED viac ako 20 kusov n\xE1s kontaktuje</a>");const e=document.createElement("tr");e.classList.add("before_variants"),e.innerHTML=`</td><td colspan="3" width="65%" style="background-color:#cce5ff;color:#004085;font-weight:bold;" id="js-custom-cell">${a}</td>`,d.parentElement.parentElement.parentElement.parentElement.appendChild(e)}}}),`${q}/`!==window.location.href&&`${q}`!==window.location.href&&(document.querySelector("#expandableMenu .root-eshop-menu > .sub").style.display="block");const t=document.querySelector("table.cart tr.stock-line-stock_no"),u=document.querySelector("table.cart tr.stock-line-stock_yes"),v=document.querySelector(".div.box-spc>div.stock_no");v&&v.remove(),t&&t.remove(),u&&u.remove();var k=!1,l=document.querySelector(".product-cart-info-value .cart-info-btn"),m=document.querySelector(".affix-sticky__container");window.addEventListener("scroll",function(){a(l)||k?a(l)&&m.classList.contains("affix")&&(document.querySelector("#buy_btn_container-sticky .cart-info-btn").remove(),document.querySelector(".basket-sticky #basket_icon").remove(),document.querySelector(".affix-sticky__container").classList.remove("affix"),k=!1):(n(),k=!0)}),document.querySelector("body").addEventListener("click",a=>{if("buy_btn"===a.target.id&&"buy_btn_container-sticky"===a.target.parentElement.parentElement.id){const a=document.querySelector(".product-price-box .product-cart-btn");a&&a.click()}}),document.querySelector("body").addEventListener("touchend",a=>{if("buy_btn"===a.target.id&&"buy_btn_container-sticky"===a.target.parentElement.parentElement.id){const a=document.querySelector(".product-price-box .product-cart-btn");a&&a.click()}})}});