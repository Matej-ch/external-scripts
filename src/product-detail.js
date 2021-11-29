window.addEventListener('DOMContentLoaded', (event) => {
    var supp_availability = 0;
    var our_availability = 0;

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

        var codeTrimmed = '';

        var productCode = document.querySelector("input[name='number']"); //hidden input

        var td_for_info = document.querySelector(".price-value.def_color.product-stock-value");
        var div_for_quest_btn = document.querySelector(".fright.textright");

        if (productCode.length) {
            productCode = productCode.value;
            if (document.querySelector(".before_variants.stock-line.stock-line-")) {
                document.querySelector(".before_variants.stock-line.stock-line-").remove();
            }

            codeTrimmed = productCode.trim();
            var codeEncoded = encodeURIComponent(productCode);
        }

        var url_adr = productDetailUrl + codeEncoded;
        var isDotaz = false;

        if (codeTrimmed) {

            fetch(url_adr)
                .then(res => res.json())
                .then(data => {
                    td_for_info.querySelector('span').remove();

                    let productData = data[codeTrimmed];
                    if (productData === undefined) {
                        productData = data[codeTrimmed.toUpperCase()];
                    }

                    supp_availability = productData['supp_availability'];

                    if (productData['disposition'] > 0 && productData['disposition'] <= 5) {
                        td_for_info.innerHTML = productData['disposition'] + 'ks - Expedujeme ihneď <div class="info-about-delivery"><a href="#"> Viac o dostupnosti ? </a></div>';
                        td_for_info.style.fontSize = '18px';
                        td_for_info.style.color = '#155724';
                        td_for_info.style.backgroundColor = '#d4edda';
                    } else if (productData['disposition'] > 5) {
                        our_availability = productData['disposition'];
                        td_for_info.innerHTML = 'Na sklade > 5ks - Expedujeme ihneď <div class="info-about-delivery"><a href="#"> Viac o dostupnosti ?  </a></div>';
                        td_for_info.style.fontSize = '18px';
                        td_for_info.style.color = '#155724';
                        td_for_info.style.backgroundColor = '#d4edda';
                    } else if (productData['disposition'] <= 5 && typeof productData['allStorages'] !== 'undefined' && typeof productData['allStorages'][6] !== 'undefined' && productData['allStorages'][6]['disposable_quantity'] > 0) {
                        td_for_info.innerHTML = 'Dostupné Showroom Liptovský Mikuláš - expedovanie v nasledujúci pracovný deň';
                        td_for_info.style.fontSize = '18px';
                        td_for_info.style.color = '#155724';
                        td_for_info.style.backgroundColor = '#d4edda';
                    } else if (productData['disposition'] <= 5 && typeof productData['allStorages'] !== 'undefined' && typeof productData['allStorages'][5] !== 'undefined' && productData['allStorages'][5]['disposable_quantity'] > 0) {
                        let piecesOnStorage = productData['allStorages'][5]['disposable_quantity'];
                        let msg = '';
                        if (piecesOnStorage > 0 && piecesOnStorage <= 5) {
                            msg = 'Na sklade ' + piecesOnStorage + 'ks';
                        } else {
                            msg = 'Na sklade > 5ks';
                        }
                        td_for_info.innerHTML = msg;
                        td_for_info.style.fontSize = '18px';
                        td_for_info.style.color = '#155724';
                        td_for_info.style.backgroundColor = '#d4edda';
                    } else {
                        let dispStatusFlag = parseInt(productData['disp_status_flag']);
                        var disp_status_id = parseInt(productData['disp_status']);
                        if (disp_status_id === 0 || disp_status_id === 9) {
                            if (parseInt(productData['supp_availability']) > 5) {
                                td_for_info.innerHTML = productData['disp_status_text'] + ' <div class="info-about-delivery"><a href="#" data-text="' + productData['disp_status_description'] + '"> Viac o dostupnosti ? </a></div>';
                                td_for_info.style.fontSize ='18px';
                                td_for_info.style.color ='#155724';
                                td_for_info.style.backgroundColor ='#d4edda';
                                isDotaz = false;
                            } else {
                                td_for_info.innerHTML = 'Tovar je aktuálne nedostupný. Dotazuj dostupnosť. <div class="info-about-delivery"><a href="#" data-text="Tento tovar nie je dostupný na našom sklade ani na sklade dodávateľa. V prípade záujmu nám odošlite dotaz,  informujeme Vás o dostupnosti prípadne Vám ponúkneme vhodnú variantu."> Viac o dostupnosti ? </a></div>';
                                td_for_info.style.fontSize = '18px';
                                isDotaz = true;
                            }
                        } else if (dispStatusFlag === 2) {
                            isDotaz = false;
                            let dispStatusText = productData['disp_status_text'];
                            if (productData['disp_status_description']) {
                                dispStatusText += ' <div class="info-about-delivery"><a href="#"  data-text="' + productData['disp_status_description'] + '"> Viac o dostupnosti ? </a></div>';
                            }
                            td_for_info.innerHTML = dispStatusText;
                            td_for_info.style.fontSize = '18px';
                        } else if (dispStatusFlag === 3) {
                            isDotaz = true;
                            let dispStatusText = productData['disp_status_text'];
                            if (productData['disp_status_description']) {
                                dispStatusText += ' <div class="info-about-delivery"><a href="#" data-text="' + productData['disp_status_description'] + '"> Viac o dostupnosti ? </a></div>';
                            }
                            td_for_info.innerHTML = dispStatusText;
                            td_for_info.style.fontSize = '18px';
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

                            if(div_for_quest_btn) {
                                const aTag = document.createElement('a');
                                aTag.setAttribute('href','https://www.mojadielna.sk/geko/5-ZAKAZNICKA-PODPORA/4-Poslat-otazku-predajcovi');
                                aTag.innerHTML = '<input type="button" class="question_btn_custom" id="buy_btn" name="question_sbmt" value="Dotaz">';
                                div_for_quest_btn.appendChild(aTag);
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
                    const visitor_url = "URL HERE" + codeTrimmed + "&ip=" + ip + "&country=" + country_code + "&eshopID=1";
                    fetch(visitor_url);

                }).catch(err => console.error('Get ip from ipify: ', err))
        }

        const productID = document.getElementById('stars_main').dataset.productId;

        fetch("URL FOR CATEGORIES HERE" + productID)
            .then(res => res.json())
            .then(data => {
                if (data['success'] === true && data['categories']) {
                    let catHtml = ' |  <a href="//www.mojadielna.sk/geko">Úvod</a> <span class="arrow">»</span> ';
                    data['categories'].forEach(function (element) {
                        catHtml += '<a href="' + element['full_url'] + '">' + element['catName'] + '</a> <span class="arrow">»</span> ';
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

                        if (our_availability > 0 && our_availability <= 20) {
                            infoText += '<p style="padding-bottom:10px;padding-top:10px;">Dostupnosť u nás ' + our_availability + 'ks</p>';
                        } else if (our_availability > 20) {
                            infoText += '<p style="padding-bottom:10px;padding-top:10px;">Dostupnosť u nás > ' + 20 + 'ks</p>';
                        }

                        if (supp_availability > 0 && supp_availability <= 20) {
                            infoText += '<p style="padding-bottom:10px;padding-top:10px;">Posledná Dostupnosť u dodávateľa ' + supp_availability + 'ks</p>';
                        } else if (supp_availability > 20) {
                            infoText += '<p style="padding-bottom:10px;padding-top:10px;">Posledná dostupnosť u dodávateľa > ' + 20 + 'ks</p>';
                        }

                        infoText += '<a href="https://www.mojadielna.sk/geko/5-ZAKAZNICKA-PODPORA/4-Poslat-otazku-predajcovi" target="_blank">Pre informácie o objednaní viac ako 20 kusov nás kontaktuje</a>'
                    }

                    const rowEl = document.createElement('tr');
                    rowEl.classList.add('before_variants');
                    rowEl.innerHTML = '</td><td colspan="3" width="65%" style="background-color:#cce5ff;color:#004085;font-weight:bold;" id="js-custom-cell">' + infoText + '</td>';
                    targetTag.parentElement.parentElement.parentElement.parentElement.appendChild(rowEl);
                }
            }
        })

        if (window.location.href !== 'https://www.mojadielna.sk/' && window.location.href !== 'https://www.mojadielna.sk') {
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
                $('.product-price-box .product-cart-btn').trigger('click');
            }
        });
        document.querySelector('body').addEventListener('touchend', (e) => {
            if (e.target.id === 'buy_btn' && e.target.parentElement.parentElement.id === 'buy_btn_container-sticky') {
                $('.product-price-box .product-cart-btn').trigger('click');
            }
        });
    }
});

