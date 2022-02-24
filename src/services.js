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
                                html = `<div><img src="${service.icon}" alt='${service.name}' style="width: 60px;height: 60px;"></div>`;
                            })
                            servicesContainer.style.cssText = "display:flex;flex-direction:row;width:100%;";
                            servicesContainer.innerHTML = html;
                        }

                        insertAfter(servicesContainer,document.querySelector('.product-detail-container'));
                    }
                })
                .catch(err => console.error('Error loading service data: ',err))
        }
    }
})