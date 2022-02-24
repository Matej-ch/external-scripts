window.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.product-detail-container')) {
        const productServicesScriptTag = document.getElementById('product-service-script')
        const productDetailUrl = productServicesScriptTag.getAttribute("data-url");

        const productCode = document.querySelector("input[name='number']"); //hidden input
        const productCodeTrimmed = productCode.value.trim();
        const productCodeEncoded = encodeURIComponent(productCode.value);

        const serviceUrl = productDetailUrl + productCodeEncoded;

        const servicesContainer = document.createElement('div');

        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }

        function createServiceModal() {
            const modal = document.createElement('div');
            const modalContent = document.createElement('div');
            const modalHeader = document.createElement('div');

            modal.classList.add('js-ser-modal');
            modal.setAttribute('id','myServiceModal');

            modalContent.classList.add('js-modal-content');
            modalHeader.classList.add('js-modal-header');

            modalHeader.innerHTML = '<span class="js-s-close-modal css-s-close-modal">&times;</span><h2 class="js-service-header" style="font-weight: bold;font-size: 1.5em;padding: 0;"></h2>';
            modalContent.appendChild(modalHeader);

            modalContent.innerHTML += `<div class="modal-body js-service-description" style="padding: 16px 16px;"></div>`;

            modal.appendChild(modalContent);
            document.querySelector('body').appendChild(modal);
        }

        createServiceModal();

        if (productCodeTrimmed) {
            fetch(serviceUrl)
                .then(res => res.json())
                .then(data => {
                    if(data.success && data.success === false) {
                        console.error('Error loading service data: ',data.message);
                    } else {
                        let html = '';
                        let productData = data[productCodeTrimmed];
                        if (productData === undefined) {
                            productData = data[productCodeTrimmed.toUpperCase()];
                        }

                        if(productData['additionalServices']) {
                           const services = productData['additionalServices'];

                            services.forEach(service => {
                                html += `<div style="padding-right: 10px;cursor: pointer">
<img src="${service.icon}" alt='${service.name}' title="${service.name}" style="width: 60px;height: auto;" class="js-s-open-modal"><input type="hidden" class="js-description-value" value="${service.description}"></div>`;
                            })
                            servicesContainer.style.cssText = "display:flex;flex-direction:row;width:100%;flex-wrap";
                            servicesContainer.innerHTML = html;
                        }

                        insertAfter(servicesContainer,document.querySelector('.product-detail-container'));
                    }
                })
                .catch(err => console.error('Error loading service data: ',err))
        }

        document.querySelector('body').addEventListener('click',e => {
            if(e.target.classList.contains('js-s-open-modal')) {
                const modal = document.getElementById("myServiceModal");
                modal.querySelector('.js-service-header').innerText = e.target.getAttribute('alt');
                modal.querySelector('.js-service-description').innerHTML = e.target.parentElement.querySelector('.js-description-value').value;
                modal.style.display = "block";
            }

            if(e.target.classList.contains('js-s-close-modal')) {
                document.getElementById("myServiceModal").style.display = "none";
            }
        })

        // When the user clicks anywhere outside of the serviceModal, close it
        window.onclick = function(event) {
            if (event.target == document.getElementById("myServiceModal")) {
                document.getElementById("myServiceModal").style.display = "none";
            }
        }
    }
})