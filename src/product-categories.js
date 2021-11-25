window.addEventListener('DOMContentLoaded', (event) => {

    if (document.querySelector(".product-detail-container")) {
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
    }
})
