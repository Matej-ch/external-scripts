document.addEventListener('DOMContentLoaded', () => {

    if (document.querySelector('.cart.cart-items')) {

        async function loadProductData(ids, isWebareal = 0) {
            let url = "URL PRODUCT DATA LOADING HERE" + ids.join('&') + '&isWebareal=' + isWebareal;
            let response = {error: 0, data: null, success: false};
            await fetch(url).then(res => res.json()).then(data => {
                response = {error: 0, data: data, success: true};
            }).catch(err => {
                console.log('Error in loadProductData',err);
                response = {error: 1, data: null, success: false};
            });
            return response;
        }

        let notes = document.querySelectorAll('.product_note');
        let ids = [];
        let cleanIDs = [];
        notes.forEach(function (element) {
            let trNode = document.createElement("tr");
            trNode.innerHTML = "<td colspan='7'></td>";
            let name = element.name;
            let closestTrEl = element.closest('tr.leave-note');
            let found = name.match(/\\\[(.*?)\\\]/g);
            let id = encodeURIComponent(found[1].replace('[', '').replace(']', ''));
            closestTrEl.id = 'leave-note-' + id;
            trNode.id = "availability-" + id;
            element.closest('tbody').insertBefore(trNode, document.getElementById('leave-note-' + id));
            if (found[1]) {
                ids.push('productsCode[]=' + id);
                cleanIDs.push(id);
            }
        });

        let loadPromise = loadProductData(ids, 1);
        loadPromise.then(response => {
            cleanIDs.forEach(function (id) {
                let el = document.querySelector('#availability-' + id + ' > td');
                let product = response.data[id];
                if (product['disposition'] > 0 && product['disposition'] <= 5) {
                    el.innerHTML = product['disposition'] + 'ks - Expedujeme ihneď';
                    el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda !important;display:table-cell';
                } else if (product['disposition'] > 5) {
                    el.innerHTML = 'Na sklade > 5ks - Expedujeme ihneď';
                    el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda !important;display:table-cell';
                } else if (product['disposition'] <= 5 && typeof product['allStorages'] !== 'undefined' && typeof product['allStorages'][6] !== 'undefined' && product['allStorages'][6]['disposable_quantity'] > 0) {
                    el.innerHTML = 'Dostupné Showroom Liptovský Mikuláš - expedovanie v nasledujúci pracovný deň';
                    el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda !important;display:table-cell';
                } else if (product['disposition'] <= 5 && typeof product['allStorages'] !== 'undefined' && typeof product['allStorages'][5] !== 'undefined' && product['allStorages'][5]['disposable_quantity'] > 0) {
                    let piecesOnStorage = product['allStorages'][5]['disposable_quantity'];
                    let msg = '';
                    if (piecesOnStorage > 0 && piecesOnStorage <= 5) {
                        msg = 'Na sklade ' + piecesOnStorage + 'ks';
                    } else {
                        msg = 'Na sklade > 5ks';
                    }
                    el.innerHTML = msg;
                    el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda !important;display:table-cell';
                } else {
                    let dispStatusFlag = parseInt(product['disp_status_flag']);
                    if (dispStatusFlag === 1) {
                        if (parseInt(product['supp_availability']) > 5) {
                            el.innerHTML = product['disp_status_text'];
                            el.style.cssText = 'font-size:18px;color:#155724;background-color:#d4edda !important;display:table-cell';
                        } else {
                            el.innerHTML = "Tovar je aktuálne nedostupný. Dotazuj dostupnost.";
                            el.style.cssText = 'font-size:18px;display:table-cell';
                        }
                    } else if (dispStatusFlag === 2) {
                        el.innerHTML = product['disp_status_text'];
                        el.style.cssText = 'font-size:18px;display:table-cell';
                    } else if (dispStatusFlag === 3) {
                        el.innerHTML = product['disp_status_text'];
                        el.style.cssText = 'font-size:18px;display:table-cell';
                    }
                }
            });
        });
    }
});