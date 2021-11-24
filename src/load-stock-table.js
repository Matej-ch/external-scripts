window.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.product-detail-container')) {
        var product_code = $("input[name='number']"); //hidden input
        if (product_code.length) {
            product_code = product_code.val();
            var code_trimmed = product_code.trim();
        } else {
            var code_trimmed = '';
        }

        if (typeof document.getElementsByClassName("productList")[0] != "undefined") {
            var table_productlist = document.getElementsByClassName("productList")[0].tBodies[0];
            if (table_productlist !== null) {
                var productCodesString = [];
                for (var i = 0, row; row = table_productlist.rows[i]; i++) {
                    var htmlstring = '';
                    for (var j = 0, col; col = row.cells[j]; j++) {
                        if (row.cells[j].className === "product_name_cell") {
                            htmlstring = row.cells[j].getElementsByTagName('a')[0].innerHTML.split('<br>')[0].trim();
                            productCodesString.push('productsCode[]=' + encodeURIComponent(htmlstring.toUpperCase()));
                        }
                        if (row.cells[j].className === "product_stock_cell") {
                            row.cells[j].id = htmlstring.toUpperCase();
                            if (row.cells[j].getElementsByTagName('div')[0].classList.contains('stock_yes')) {
                                row.cells[j].innerHTML = '';
                                row.cells[j].setAttribute("style", "color:#155724; background-color:#d4edda");
                            } else if (row.cells[j].getElementsByTagName('div')[0].classList.contains('stock_no')) {
                                row.cells[j].innerHTML = '';
                            } else {
                                row.cells[j].innerHTML = '';
                            }
                        }
                    }
                }

                async function getDataForProductsTable() {
                    await sleep(500);
                    let urlForProducts = "URL HERE" + productCodesString.join('&');
                    $.ajax({
                        type: "GET",
                        url: urlForProducts,
                        success: function (data) {
                            $.each(data, function (index, value) {
                                let tableCell = document.getElementById(index);

                                if (tableCell === null) {

                                }

                                if (value['disposition'] > 0 && value['disposition'] <= 5) {
                                    tableCell.innerHTML = value['disposition'] + 'ks - Expedujeme ihneď';
                                    tableCell.style.cssText = 'font-size:16px;font-weight:bold;color:#155724;background-color:#d4edda ';
                                } else if (value['disposition'] > 5) {
                                    tableCell.innerHTML = 'Na sklade > 5ks - Expedujeme ihneď';
                                    tableCell.style.cssText = 'font-size:16px;font-weight:bold;color:#155724;background-color:#d4edda ';
                                } else if (value['disposition'] < 5 && typeof value['allStorages'] !== 'undefined' && typeof value['allStorages'][6] !== 'undefined' && value['allStorages'][6]['disposable_quantity'] > 0) {
                                    tableCell.innerHTML = 'Dostupné Showroom Liptovský Mikuláš - expedovanie v nasledujúci pracovný deň';
                                    tableCell.style.cssText = 'font-size:16px;color:#155724;background-color:#d4edda';
                                } else if (value['disposition'] < 5 && typeof value['allStorages'] !== 'undefined' && typeof value['allStorages'][5] !== 'undefined' && value['allStorages'][5]['disposable_quantity'] > 0) {
                                    let piecesOnStorage = value['allStorages'][5]['disposable_quantity'];
                                    let msg = 'Na sklade';
                                    if (piecesOnStorage > 0 && piecesOnStorage <= 5) {
                                        msg = 'Na sklade ' + piecesOnStorage + 'ks';
                                    } else {
                                        msg = 'Na sklade > 5ks';
                                    }
                                    tableCell.innerHTML = msg;
                                    tableCell.style.cssText = 'font-size:16px;color:#155724;background-color:#d4edda';
                                } else {
                                    let dispStatusFlag = parseInt(value['disp_status_flag']);
                                    let disp_status_id = parseInt(value['disp_status']);
                                    if (dispStatusFlag === 1) {
                                        if (parseInt(value['supp_availability']) > 5) {
                                            tableCell.innerHTML = value['disp_status_text'];
                                            tableCell.style.fontSize = '18px';
                                            tableCell.style.cssText = 'font-weight:bold;color:#155724;background-color:#d4edda;';
                                        } else {
                                            tableCell.innerHTML = "Tovar je aktuálne nedostupný. Dotazuj dostupnosť.";
                                            tableCell.style.fontSize = '14px';
                                            tableCell.style.cssText = '';
                                        }
                                    } else if (dispStatusFlag === 2) {
                                        tableCell.innerHTML = value['disp_status_text'];
                                        tableCell.style.fontSize = '16px';
                                        if (disp_status_id === 1) {
                                            tableCell.style.cssText = 'font-weight:bold;color:#155724;background-color:#d4edda;';
                                        }
                                    } else if (dispStatusFlag === 3) {
                                        tableCell.innerHTML = value['disp_status_text'];
                                        tableCell.style.fontSize = '14px';
                                        tableCell.style.cssText = '';
                                    }
                                }
                            });
                        }
                    });
                }

                getDataForProductsTable();
            }
        }

    }
})
