window.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.product-detail-container')) {

        function waitForProductCodesParsing(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        if (document.querySelector('.productList')) {
            const tableProductList = document.querySelectorAll(".productList")[0].tBodies[0];
            if (tableProductList !== null) {
                var productCodesString = [];
                for (var i = 0; i < tableProductList.rows.length ; i++) {
                    let row = tableProductList.rows[i];
                    let htmlString = '';
                    for (var j = 0; j < row.cells.length ; j++) {
                        let cell = row.cells[j];
                        if (cell.className === "product_name_cell") {
                            htmlString = cell.getElementsByTagName('a')[0].innerHTML.split('<br>')[0].trim();
                            productCodesString.push('productsCode[]=' + encodeURIComponent(htmlString.toUpperCase()));
                        }
                        if (cell.className === "product_stock_cell") {
                            cell.id = htmlString.toUpperCase();
                            if (cell.getElementsByTagName('div')[0].classList.contains('stock_yes')) {
                                cell.innerHTML = '';
                                cell.setAttribute("style", "color:#155724; background-color:#d4edda");
                            } else if (cell.getElementsByTagName('div')[0].classList.contains('stock_no')) {
                                cell.innerHTML = '';
                            } else {
                                cell.innerHTML = '';
                            }
                        }
                    }
                }

                async function getDataForProductsTable() {
                    await waitForProductCodesParsing(500);
                    let urlForProducts = "URL HERE" + productCodesString.join('&');

                    fetch(urlForProducts)
                        .then(res => res.json())
                        .then(data => {
                            data.forEach((value, index) => {
                                let tableCell = document.getElementById(index);

                                if (value['disposition'] > 0 && value['disposition'] <= 5) {
                                    tableCell.innerHTML = value['disposition'] + 'ks - Expedujeme ihneď';
                                    tableCell.style.cssText = 'font-size:16px;font-weight:bold;color:#155724;background-color:#d4edda';
                                } else if (value['disposition'] > 5) {
                                    tableCell.innerHTML = 'Na sklade > 5ks - Expedujeme ihneď';
                                    tableCell.style.cssText = 'font-size:16px;font-weight:bold;color:#155724;background-color:#d4edda ';
                                } else if (value['disposition'] < 5 && typeof value['allStorages'] !== 'undefined' && typeof value['allStorages'][6] !== 'undefined' && value['allStorages'][6]['disposable_quantity'] > 0) {
                                    tableCell.innerHTML = 'Dostupné Showroom Liptovský Mikuláš - expedovanie v nasledujúci pracovný deň';
                                    tableCell.style.cssText = 'font-size:16px;color:#155724;background-color:#d4edda';
                                } else if (value['disposition'] < 5 && typeof value['allStorages'] !== 'undefined' && typeof value['allStorages'][5] !== 'undefined' && value['allStorages'][5]['disposable_quantity'] > 0) {
                                    let piecesOnStorage = value['allStorages'][5]['disposable_quantity'];
                                    let msg;
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

                            })
                        })
                        .catch(err => console.error('Error in loading data for products table',err))
                }

                getDataForProductsTable();
            }
        }

    }
})
