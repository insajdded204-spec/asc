
import { products } from './store-data.js';
import { addToCart } from './cart-store.js';
import {
    mountNavbar,
    mountFooter,
    setupCartBadgeSync,
    renderGallery,
    renderSizeSelector,
    renderProductGrid,
    formatPrice
} from './components.js';

function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || '1';
}

function initProductPage() {
    mountNavbar('/catalog');
    mountFooter();
    setupCartBadgeSync();

    const product = products.find((entry) => entry.id === getProductId()) || products[0];
    const state = { selectedSize: product.sizes[0], activeImage: product.images[0] };

    const backLink = document.getElementById('backToCatalog');
    const detailRoot = document.getElementById('productDetail');
    const galleryRoot = document.getElementById('productGallery');
    const sizesRoot = document.getElementById('sizeSelector');
    const similarRoot = document.getElementById('similarProducts');

    backLink.href = product.category === 'men' ? '/catalog/men/' : '/catalog/women/';

    function render() {
        renderGallery(galleryRoot, product.images, state.activeImage);
        galleryRoot.querySelectorAll('[data-image]').forEach((button) => {
            button.addEventListener('click', () => {
                state.activeImage = button.dataset.image;
                render();
            });
        });

        renderSizeSelector(sizesRoot, product.sizes, state.selectedSize);
        sizesRoot.querySelectorAll('[data-size]').forEach((button) => {
            button.addEventListener('click', () => {
                state.selectedSize = button.dataset.size;
                render();
            });
        });

        detailRoot.innerHTML = `
      <p class="product-card__category">${product.collection}</p>
      <h1 style="font-size: clamp(30px,4vw,48px); margin: 8px 0;">${product.name}</h1>
      <p style="font-size: 34px; margin-bottom: 14px;">${formatPrice(product.price)}</p>
      <p style="color:#555; line-height:1.6;">${product.description}</p>
      <button class="primary-button" id="addProductToCart" style="margin-top:20px;">Добавить в корзину</button>
      <p id="addedInfo" style="color:#1b5e20; margin-top:12px; display:none;">✓ Товар добавлен в корзину</p>
    `;

        detailRoot.querySelector('#addProductToCart').addEventListener('click', () => {
            addToCart(product.id, state.selectedSize);
            detailRoot.querySelector('#addedInfo').style.display = 'block';
        });
    }

    render();

    const similar = products.filter((entry) => entry.category === product.category && entry.id !== product.id).slice(0, 3);
    renderProductGrid(similarRoot, similar);
}

initProductPage();