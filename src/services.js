window.addEventListener('DOMContentLoaded', (event) => {
    if (document.querySelector('.product-detail-container')) {
        const productServicesScriptTag = document.getElementById('product-service-script')
        const productDetailUrl = productServicesScriptTag.getAttribute("data-url");

        const productCode = document.querySelector("input[name='number']"); //hidden input
        const productCodeTrimmed = productCode.value.trim();
        const productCodeEncoded = encodeURIComponent(productCode.value);


        console.log('product code: ',productCode);

        console.log('productCodeTrimmed: ',productCodeTrimmed);

        console.log('productCodeEncoded: ',productCodeEncoded);

        const serviceUrl = productDetailUrl + productCodeEncoded;

        console.log(serviceUrl);
    }
})