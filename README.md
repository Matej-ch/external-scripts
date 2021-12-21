Collection of scripts used for third party eshops, for pulling data about stock

test script

https://cdn.jsdelivr.net/npm/@mtjch/eshop_ext_scripts@latest/build/test.js

script needs to have id and `data-url`

product-detail-table.js needs `data-url` attribute and id `products-table-script`

cart.js needs `data-url` attribute and id `cart-products-script`

categories.js needs `data-url` attribute and id `categories-products-script`

product-detail.js needs `data-url` attribute and `data-cat-url`, `data-base-url` and `data-visitor-url` and id `product-detail-script`

```JS

<script src="https://cdn.jsdelivr.net/npm/@mtjch/eshop_ext_scripts@1.0.12/build/product-detail.js" id="product-detail-script"
        data-url=""
        data-cat-url=""
        data-base-url=""
        data-visitor-url=""></script>

```

```JS

<script src="https://cdn.jsdelivr.net/npm/@mtjch/eshop_ext_scripts@2.0.0/build/cart.js" id="cart-products-script" data-url=""></script>
<script src="https://cdn.jsdelivr.net/npm/@mtjch/eshop_ext_scripts@2.0.0/build/categories.js" id="categories-products-script" data-url=""></script>
<script src="https://cdn.jsdelivr.net/npm/@mtjch/eshop_ext_scripts@2.0.0/build/product-detail-table.js" id="products-table-script" data-url=""></script>

```

<script src="https://cdn.jsdelivr.net/npm/@mtjch/eshop_ext_scripts@2.0.5/src/categories.js" id="categories-products-script" data-url="https://storehouse.megakupa.sk/product/data-for-multiple-products?"></script>