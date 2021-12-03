window.addEventListener('DOMContentLoaded', (event) => {

    const categoriesScriptTag = document.getElementById('categories-products-script')
    const categoriesProductsUrl = categoriesScriptTag.getAttribute("data-url");

    async function loadProductData(ids, isWebareal = 0) {
        let url = categoriesProductsUrl + ids.join('&') + `&isWebareal=${isWebareal}`;
        let response = {error: 0, data: null, success: false};
        await fetch(url).then(res => res.json()).then(data => {
            response = {error: 0, data: data, success: true};
        }).catch(err => {
            console.log('Error in loadProductData',err);
            response = {error: 1, data: null, success: false};
        });
        return response;
    }

    async function loadStoragesForCategories() {
        let productEls = document.querySelectorAll('.product.tab_img160');
        let ids = [];
        let cleanIDs = [];
        productEls.forEach(function (el) {
            cleanIDs.push(el.dataset.id);
            ids.push(`productsCode[]=${el.dataset.id}`);
        });

        let loadPromise = loadProductData(ids, 1);
        loadPromise.then(response => {
            cleanIDs.forEach(function (id) {
                let productEl = document.querySelector(`.product.tab_img160[data-id="${id}"]`);
                let el;
                if (productEl.querySelector('.stock_yes')) {
                    el = productEl.querySelector('.stock_yes');
                    el.classList.remove('stock_yes');
                }
                if (productEl.querySelector('.stock_no')) {
                    el = productEl.querySelector('.stock_no');
                    el.classList.remove('stock_no');
                }

                if (response.data[id]) {
                    let product = response.data[id];

                    if (product['disposition'] > 0 && product['disposition'] <= 5) {
                        el.innerHTML = product['disposition'] + 'ks - Expedujeme ihneď';
                        el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda';
                    } else if (product['disposition'] > 5) {
                        el.innerHTML = 'Na sklade > 5ks - Expedujeme ihneď';
                        el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda';
                    } else if (product['disposition'] <= 5 && typeof product['allStorages'] !== 'undefined' && typeof product['allStorages'][6] !== 'undefined' && product['allStorages'][6]['disposable_quantity'] > 0) {
                        el.innerHTML = 'Dostupné Showroom Liptovský Mikuláš - expedovanie v nasledujúci pracovný deň';
                        el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda';
                    } else if (product['disposition'] <= 5 && typeof product['allStorages'] !== 'undefined' && typeof product['allStorages'][5] !== 'undefined' && product['allStorages'][5]['disposable_quantity'] > 0) {
                        let piecesOnStorage = product['allStorages'][5]['disposable_quantity'];
                        let msg = '';
                        if (piecesOnStorage > 0 && piecesOnStorage <= 5) {
                            msg =`Na sklade ${piecesOnStorage}ks`;
                        } else {
                            msg = 'Na sklade > 5ks';
                        }
                        el.innerHTML = msg;
                        el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda';
                    } else {
                        let dispStatusFlag = parseInt(product['disp_status_flag']);
                        if (dispStatusFlag === 1) {
                            if (parseInt(product['supp_availability']) > 5) {
                                el.innerHTML = "U dodávateľa. Dodanie 7-10 dní.";
                                el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda';
                            } else {
                                el.innerHTML = "Tovar je aktuálne nedostupný. Dotazuj dostupnost.";
                                el.style.cssText = 'font-size:18px';
                            }
                        } else if (dispStatusFlag === 2) {
                            el.innerHTML = product['disp_status_text'];
                            el.style.cssText = 'font-size:18px';
                        } else if (dispStatusFlag === 3) {
                            el.innerHTML = product['disp_status_text'];
                            el.style.cssText = 'font-size:18px';
                        }
                    }
                }
            })
        });
    }

    function waitForLoad(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    if (document.querySelector('.product.tab_img160')) {
        loadStoragesForCategories();
    }

    const centerPageEl = document.getElementById('centerpage');
    if(centerPageEl) {
        centerPageEl.querySelector('a[data-page]').addEventListener('click', async function () {
            await waitForLoad(1000);
            await loadStoragesForCategories();
        })

        centerPageEl.querySelector('a[data-sorting]').addEventListener('click', async function () {
            await waitForLoad(1000);
            await loadStoragesForCategories();
        })

        centerPageEl.querySelector('input.filter_values').addEventListener('click', async function () {
            await waitForLoad(1000);
            await loadStoragesForCategories();
        })

        centerPageEl.querySelector('.cancel_filter_button').addEventListener('click', async function () {
            await waitForLoad(1000);
            await loadStoragesForCategories();
        })
    }
});