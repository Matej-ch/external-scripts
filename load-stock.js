var supp_availability = 0;
var our_availability = 0;
if (typeof document.getElementsByClassName("product-detail-container")[0] != "undefined") {
    jQuery(document).ready(function () {
        var stock_data = $("input[name='stock']").val();
        var hidden_npt = $("input[name='stock']"); //hidden input

        var product_code = $("input[name='number']"); //hidden input
        var td_for_info = $(".price-value.def_color.product-stock-value");
        var div_for_quest_btn = $(".fright.textright");

        if (product_code.length) {
            product_code = product_code.val();
            $(".before_variants.stock-line.stock-line-").remove();
            var code_trimmed = product_code.trim();
            var encoded_code = encodeURIComponent(product_code);
        } else {
            var code_trimmed = '';
        }
        var url_adr = "URL_HERE" + encoded_code;
        var text_from_warehouse = '';
        var is_dotaz = false;

        if (code_trimmed) {
            $.ajax({
                type: "GET",
                url: url_adr,
                success: function (data) {
                    td_for_info.find('span').remove();
                    var availability_text = $("#warehouse-availability-text");

                    let productData = data[code_trimmed];
                    if (productData === undefined) {
                        productData = data[code_trimmed.toUpperCase()];
                    }

                    supp_availability = productData['supp_availability'];
                    if (productData['disposition'] > 0 && productData['disposition'] <= 5) {
                        td_for_info.html(productData['disposition'] + 'ks - Expedujeme ihneď <div class="info-about-delivery"><a href="#"> Viac o dostupnosti ? </a></div>').css({
                            'font-size': '18px',
                            'color': '#155724',
                            'background-color': '#d4edda'
                        });
                    } else if (productData['disposition'] > 5) {
                        our_availability = productData['disposition'];
                        td_for_info.html('Na sklade > 5ks - Expedujeme ihneď <div class="info-about-delivery"><a href="#"> Viac o dostupnosti ?  </a></div>').css({
                            'font-size': '18px',
                            'color': '#155724',
                            'background-color': '#d4edda'
                        });
                    } else if (productData['disposition'] <= 5 && typeof productData['allStorages'] !== 'undefined' && typeof productData['allStorages'][6] !== 'undefined' && productData['allStorages'][6]['disposable_quantity'] > 0) {
                        td_for_info.html('Dostupné Showroom Liptovský Mikuláš - expedovanie v nasledujúci pracovný deň').css({
                            'font-size': '18px',
                            'color': '#155724',
                            'background-color': '#d4edda'
                        });
                    } else if (productData['disposition'] <= 5 && typeof productData['allStorages'] !== 'undefined' && typeof productData['allStorages'][5] !== 'undefined' && productData['allStorages'][5]['disposable_quantity'] > 0) {
                        let piecesOnStorage = productData['allStorages'][5]['disposable_quantity'];
                        let msg = 'Na sklade';
                        if (piecesOnStorage > 0 && piecesOnStorage <= 5) {
                            msg = 'Na sklade ' + piecesOnStorage + 'ks';
                        } else {
                            msg = 'Na sklade > 5ks';
                        }
                        td_for_info.html(msg).css({
                            'font-size': '18px',
                            'color': '#155724',
                            'background-color': '#d4edda'
                        });
                    } else {
                        let dispStatusFlag = parseInt(productData['disp_status_flag']);
                        var disp_status_id = parseInt(productData['disp_status']);
                        if (disp_status_id === 0 || disp_status_id === 9) {
                            if (parseInt(productData['supp_availability']) > 5) {
                                td_for_info.html(productData['disp_status_text'] + ' <div class="info-about-delivery"><a href="#" data-text="' + productData['disp_status_description'] + '"> Viac o dostupnosti ? </a></div>').css({
                                    'font-size': '18px',
                                    'color': '#155724',
                                    'background-color': '#d4edda'
                                });
                                is_dotaz = false;
                            } else {
                                td_for_info.html('Tovar je aktuálne nedostupný. Dotazuj dostupnosť. <div class="info-about-delivery"><a href="#" data-text="Tento tovar nie je dostupný na našom sklade ani na sklade dodávateľa. V prípade záujmu nám odošlite dotaz,  informujeme Vás o dostupnosti prípadne Vám ponúkneme vhodnú variantu."> Viac o dostupnosti ? </a></div>').css('font-size', '18px');
                                is_dotaz = true;
                            }
                        } else if (dispStatusFlag === 2) {
                            is_dotaz = false;
                            let dispStatusText = productData['disp_status_text'];
                            if (productData['disp_status_description']) {
                                dispStatusText += ' <div class="info-about-delivery"><a href="#"  data-text="' + productData['disp_status_description'] + '"> Viac o dostupnosti ? </a></div>';
                            }
                            td_for_info.html(dispStatusText).css('font-size', '18px');
                        } else if (dispStatusFlag === 3) {
                            is_dotaz = true;
                            let dispStatusText = productData['disp_status_text'];
                            if (productData['disp_status_description']) {
                                dispStatusText += ' <div class="info-about-delivery"><a href="#" data-text="' + productData['disp_status_description'] + '"> Viac o dostupnosti ? </a></div>';
                            }
                            td_for_info.html(dispStatusText).css('font-size', '18px');
                        }
                        if (is_dotaz) {
                            $('#kusy').hide();
                            $('#buy_btn').remove();
                            $('.product-cart-info-value').find('.count').remove();
                            div_for_quest_btn.append('<a href="https://www.mojadielna.sk/geko/5-ZAKAZNICKA-PODPORA/4-Poslat-otazku-predajcovi">' +
                                '<input type="button" class="question_btn_custom" id="buy_btn" name="question_sbmt" value="Dotaz"></a>');
                        }
                    }
                }//end success
            });
        }

//end of ajax

        //tato cast ma na starosti cekovanie na ktory produkt sa uzivatel pozeral
        if (code_trimmed) {
            $.getJSON('https://api.ipify.org?format=jsonp&callback=?', function (data) {
                let ip = data['ip'];
                let country_code = 'SK';
                let visitor_url = "URL HERE" + code_trimmed + "&ip=" + ip + "&country=" + country_code + "&eshopID=1";
                $.ajax({
                    type: "GET", url: visitor_url, success: function (data) {
                    },
                });
            });
        }
    });
}