window.addEventListener('DOMContentLoaded', (event) => {
    var suppAvailability = 0;
    var ourAvailability = 0;

    if (document.getElementById('basket_payments_list') && document.getElementById('postovne_form2_3035')) {
        let trustPayRow = document.getElementById('postovne_form2_3035').closest('tr');
        trustPayRow.classList.add('trustpay');
    }

    function isInViewport(elem) {
        const bounding = elem.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth));
    }

    if (document.querySelector('.product-detail-container')) {

        const productDetailScriptTag = document.getElementById('product-detail-script')
        const productDetailUrl = productDetailScriptTag.getAttribute("data-url");
        const baseUrl = productDetailScriptTag.getAttribute("data-base-url");
        const visitorUrl = productDetailScriptTag.getAttribute("data-visitor-url");

        var codeTrimmed = '';

        var productCode = document.querySelector("input[name='number']"); //hidden input

        var tdForInfo = document.querySelector(".price-value.def_color.product-stock-value");
        var divForQuestBtn = document.querySelector(".fright.textright");

        if (productCode.length) {
            productCode = productCode.value;
            if (document.querySelector(".before_variants.stock-line.stock-line-")) {
                document.querySelector(".before_variants.stock-line.stock-line-").remove();
            }

            codeTrimmed = productCode.trim();
            var codeEncoded = encodeURIComponent(productCode);
        }

        var urlAdr = productDetailUrl + codeEncoded;
        var isDotaz = false;

        if (codeTrimmed) {

            fetch(urlAdr)
                .then(res => res.json())
                .then(data => {
                    tdForInfo.querySelector('span').remove();

                    let productData = data[codeTrimmed];
                    if (productData === undefined) {
                        productData = data[codeTrimmed.toUpperCase()];
                    }

                    suppAvailability = productData['suppAvailability'];

                    if (productData['disposition'] > 0 && productData['disposition'] <= 5) {
                        tdForInfo.innerHTML = `${productData['disposition']}ks - Expedujeme ihneď <div class="info-about-delivery"><a href="#"> Viac o dostupnosti ? </a></div>`;
                        tdForInfo.style.fontSize = '18px';
                        tdForInfo.style.color = '#155724';
                        tdForInfo.style.backgroundColor = '#d4edda';
                    } else if (productData['disposition'] > 5) {
                        ourAvailability = productData['disposition'];
                        tdForInfo.innerHTML = 'Na sklade > 5ks - Expedujeme ihneď <div class="info-about-delivery"><a href="#"> Viac o dostupnosti ?  </a></div>';
                        tdForInfo.style.fontSize = '18px';
                        tdForInfo.style.color = '#155724';
                        tdForInfo.style.backgroundColor = '#d4edda';
                    } else if (productData['disposition'] <= 5 && typeof productData['allStorages'] !== 'undefined' && typeof productData['allStorages'][6] !== 'undefined' && productData['allStorages'][6]['disposable_quantity'] > 0) {
                        tdForInfo.innerHTML = 'Dostupné Showroom Liptovský Mikuláš - expedovanie v nasledujúci pracovný deň';
                        tdForInfo.style.fontSize = '18px';
                        tdForInfo.style.color = '#155724';
                        tdForInfo.style.backgroundColor = '#d4edda';
                    } else if (productData['disposition'] <= 5 && typeof productData['allStorages'] !== 'undefined' && typeof productData['allStorages'][5] !== 'undefined' && productData['allStorages'][5]['disposable_quantity'] > 0) {
                        let piecesOnStorage = productData['allStorages'][5]['disposable_quantity'];
                        let msg = '';
                        if (piecesOnStorage > 0 && piecesOnStorage <= 5) {
                            msg =`Na sklade ${piecesOnStorage}ks`;
                        } else {
                            msg = 'Na sklade > 5ks';
                        }
                        tdForInfo.innerHTML = msg;
                        tdForInfo.style.fontSize = '18px';
                        tdForInfo.style.color = '#155724';
                        tdForInfo.style.backgroundColor = '#d4edda';
                    } else {
                        let dispStatusFlag = parseInt(productData['disp_status_flag']);
                        var disp_status_id = parseInt(productData['disp_status']);
                        if (disp_status_id === 0 || disp_status_id === 9) {
                            if (parseInt(productData['suppAvailability']) > 5) {
                                tdForInfo.innerHTML = productData['disp_status_text'] + ' <div class="info-about-delivery"><a href="#" data-text="' + productData['disp_status_description'] + '"> Viac o dostupnosti ? </a></div>';
                                tdForInfo.style.fontSize ='18px';
                                tdForInfo.style.color ='#155724';
                                tdForInfo.style.backgroundColor ='#d4edda';
                                isDotaz = false;
                            } else {
                                tdForInfo.innerHTML = 'Tovar je aktuálne nedostupný. Dotazuj dostupnosť. <div class="info-about-delivery"><a href="#" data-text="Tento tovar nie je dostupný na našom sklade ani na sklade dodávateľa. V prípade záujmu nám odošlite dotaz,  informujeme Vás o dostupnosti prípadne Vám ponúkneme vhodnú variantu."> Viac o dostupnosti ? </a></div>';
                                tdForInfo.style.fontSize = '18px';
                                isDotaz = true;
                            }
                        } else if (dispStatusFlag === 2) {
                            isDotaz = false;
                            let dispStatusText = productData['disp_status_text'];
                            if (productData['disp_status_description']) {
                                dispStatusText += ` <div class="info-about-delivery"><a href="#"  data-text="${productData['disp_status_description']}"> Viac o dostupnosti ? </a></div>`;
                            }
                            tdForInfo.innerHTML = dispStatusText;
                            tdForInfo.style.fontSize = '18px';
                        } else if (dispStatusFlag === 3) {
                            isDotaz = true;
                            let dispStatusText = productData['disp_status_text'];
                            if (productData['disp_status_description']) {
                                dispStatusText += ` <div class="info-about-delivery"><a href="#" data-text="${productData['disp_status_description']}"> Viac o dostupnosti ? </a></div>`;
                            }
                            tdForInfo.innerHTML = dispStatusText;
                            tdForInfo.style.fontSize = '18px';
                        }
                        if (isDotaz) {
                            const kusyEl = document.getElementById('kusy');
                            const buyBtnEl = document.getElementById('buy_btn');
                            const cartInfoEl = document.querySelector('.product-cart-info-value');

                            if(kusyEl) {
                                kusyEl.style.display = 'none';
                            }
                            if(buyBtnEl) {
                                buyBtnEl.remove();
                            }
                            if(cartInfoEl && cartInfoEl.querySelector('.count')) {
                                cartInfoEl.querySelector('.count').remove();
                            }

                            if(divForQuestBtn) {
                                const aTag = document.createElement('a');

                                aTag.setAttribute('href',`${baseUrl}/geko/5-ZAKAZNICKA-PODPORA/4-Poslat-otazku-predajcovi`);
                                aTag.innerHTML = '<input type="button" class="question_btn_custom" id="buy_btn" name="question_sbmt" value="Dotaz">';
                                divForQuestBtn.appendChild(aTag);
                            }
                        }
                    }

                })
                .catch(err => console.error('Error loading product stock data: ',err))
        }


        //tato cast ma na starosti cekovanie na ktory produkt sa uzivatel pozeral
        if (codeTrimmed) {
            fetch('https://api.ipify.org?format=jsonp&callback=?')
                .then(res => res.json())
                .then(data => {
                    const ip = data['ip'];
                    const country_code = 'SK';
                    fetch(`${visitorUrl}${codeTrimmed}&ip=${ip}&country=${country_code}&eshopID=1`);

                }).catch(err => console.error('Error Get ip from ipify: ', err))
        }

        const productID = document.getElementById('stars_main').dataset.productId;

        const productCategoriesUrl = productDetailScriptTag.getAttribute("data-cat-url");

        fetch(productCategoriesUrl + productID)
            .then(res => res.json())
            .then(data => {
                if (data['success'] === true && data['categories']) {
                    let catHtml = ` |  <a href="${baseUrl}/geko">Úvod</a> <span class="arrow">»</span> `;
                    data['categories'].forEach(function (element) {
                        catHtml += `<a href="${element['full_url']}">${element['catName']}</a> <span class="arrow">»</span> `;
                    });
                    const whereIEl = document.querySelector('#wherei p');

                    if(whereIEl.querySelector('.active')) {
                        catHtml += '<span class="active">' + whereIEl.querySelector('.active').innerHTML + '</span>';
                    }

                    if(whereIEl) {
                        whereIEl.appendChild(catHtml)
                    }
                }
            })
            .catch(err => console.error('Error fetching product categories',err))


        document.querySelector('body').addEventListener('click',e => {
            if(e.target.classList.contains('info-about-delivery')) {
                let targetTag = e.target.querySelector('a');
                targetTag.preventDefault();

                if(!document.querySelector('td#js-custom-cell')) {
                    let infoText = '';

                    if (("text" in targetTag.dataset)) {
                        infoText = targetTag.dataset.text;
                    } else {
                        infoText = 'Platí pre objednávky ktoré obsahujú všetky produkty s informáciou expedujeme ihneď.<br>';

                        if (ourAvailability > 0 && ourAvailability <= 20) {
                            infoText += `<p style="padding-bottom:10px;padding-top:10px;">Dostupnosť u nás ${ourAvailability}ks</p>`;
                        } else if (ourAvailability > 20) {
                            infoText += '<p style="padding-bottom:10px;padding-top:10px;">Dostupnosť u nás > 20ks</p>';
                        }

                        if (suppAvailability > 0 && suppAvailability <= 20) {
                            infoText += `<p style="padding-bottom:10px;padding-top:10px;">Posledná Dostupnosť u dodávateľa ${suppAvailability}ks</p>`;
                        } else if (suppAvailability > 20) {
                            infoText += '<p style="padding-bottom:10px;padding-top:10px;">Posledná dostupnosť u dodávateľa > 20ks</p>';
                        }


                        infoText += '<a href="'+baseUrl+'/geko/5-ZAKAZNICKA-PODPORA/4-Poslat-otazku-predajcovi" target="_blank">Pre informácie o objednaní viac ako 20 kusov nás kontaktuje</a>'
                    }

                    const rowEl = document.createElement('tr');
                    rowEl.classList.add('before_variants');
                    rowEl.innerHTML = `</td><td colspan="3" width="65%" style="background-color:#cce5ff;color:#004085;font-weight:bold;" id="js-custom-cell">${infoText}</td>`;
                    targetTag.parentElement.parentElement.parentElement.parentElement.appendChild(rowEl);
                }
            }
        })

        if (window.location.href !== `${baseUrl}/` && window.location.href !== `${baseUrl}`) {
            document.querySelector('#expandableMenu .root-eshop-menu > .sub').style.display = 'block';
        }

        const stockNoEl = document.querySelector('table.cart tr.stock-line-stock_no');
        const stockYesEl = document.querySelector('table.cart tr.stock-line-stock_yes');
        const stockNoDivEl = document.querySelector('.div.box-spc>div.stock_no');
        if(stockNoDivEl) { stockNoDivEl.remove(); }
        if(stockNoEl) { stockNoEl.remove() }
        if(stockYesEl) { stockYesEl.remove(); }

        function fillSticky() {
            if (document.getElementById('detail_src_magnifying_small')) {
                document.querySelector('.img-sticky img').src = document.getElementById('detail_src_magnifying_small').src;
            }

            document.querySelector('.name-sticky').innerText = document.querySelector('h1').innerText;
            document.querySelector('.price-sticky .price_no_vat-sticky').innerText = document.querySelector('.price-novat').innerText;
            document.querySelector('.price-sticky .price_vat-sticky').innerText = document.querySelector('.price-vat .price-value.def_color').innerText;
            document.getElementById('buy_btn_container-sticky').appendChild(document.querySelector('.cart-info-btn').cloneNode(true));
            document.querySelector('.basket-sticky').appendChild(document.getElementById('basket_icon').cloneNode(true));
            document.querySelector('.affix-sticky__container').classList.add('affix');
        }

        var wasScrolled = false;
        var elementTarget = document.querySelector(".product-cart-info-value .cart-info-btn");
        var stickyContainer = document.querySelector('.affix-sticky__container');

        window.addEventListener("scroll", function () {
            if (!isInViewport(elementTarget) && !wasScrolled) {
                fillSticky();
                wasScrolled = true;
            } else if (isInViewport(elementTarget) && stickyContainer.classList.contains('affix')) {
                document.querySelector('#buy_btn_container-sticky .cart-info-btn').remove();
                document.querySelector('.basket-sticky #basket_icon').remove();
                document.querySelector('.affix-sticky__container').classList.remove('affix');
                wasScrolled = false;
            }
        });

        document.querySelector('body').addEventListener('click', (e) => {
            if (e.target.id === 'buy_btn' && e.target.parentElement.parentElement.id === 'buy_btn_container-sticky') {
                const cartBtnEl = document.querySelector('.product-price-box .product-cart-btn');
                if(cartBtnEl) {
                    cartBtnEl.click();
                }
            }
        });

        document.querySelector('body').addEventListener('touchend', (e) => {
            if (e.target.id === 'buy_btn' && e.target.parentElement.parentElement.id === 'buy_btn_container-sticky') {
                const cartBtnEl = document.querySelector('.product-price-box .product-cart-btn');
                if(cartBtnEl) {
                    cartBtnEl.click();
                }
            }
        });

        if (document.querySelector('.header-slider2') && document.querySelector('.header-slider2').classList.contains('active')) {
            function showContinueBtn() {
                let divEl = document.createElement('div');
                let input = document.createElement('input');
                divEl.classList.add('submit_btn_container-sticky');
                divEl.id = 'submit_btn_container_sticky';
                input.id = 'sticky_submit_btn';
                input.setAttribute('type', 'submit');
                input.setAttribute('name', 'send_order_submit');
                input.setAttribute('value', 'Pokračovať');
                divEl.appendChild(input);
                document.querySelector('.continue-sticky__container').classList.add('affix');
                document.querySelector('.continue-sticky__container').appendChild(divEl);
            }

            var deliveryInfoWasScrolled = false;
            var continueElementTarget = document.querySelector(".buttons .fright.finish_order_bottom_right");
            var continueStickyContainer = document.querySelector('.continue-sticky__container');
            window.addEventListener("scroll", function () {
                showFixedBtn();
            });
            showFixedBtn();

            function showFixedBtn() {
                if (!isInViewport(continueElementTarget) && !deliveryInfoWasScrolled) {
                    showContinueBtn();
                    deliveryInfoWasScrolled = true;
                } else if (isInViewport(continueElementTarget) && continueStickyContainer.classList.contains('affix')) {
                    deliveryInfoWasScrolled = false;
                    document.querySelector('.continue-sticky__container').classList.remove('affix');
                    document.querySelector('.continue-sticky__container').innerHTML = '';
                }
            }

            document.querySelector('body').addEventListener('click', (e) => {
                if (e.target.id === 'sticky_submit_btn') {
                    document.querySelector('.order_data_form').submit();
                }
            });
            document.querySelector('body').addEventListener('touchend', (e) => {
                if (e.target.id === 'sticky_submit_btn') {
                    document.querySelector('.order_data_form').submit();
                }
            });
        }
    }
});

