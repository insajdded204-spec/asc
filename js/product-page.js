// Импорт базы товаров
import { products } from './store-data.js';

// Импорт функции добавления товара в корзину
import { addToCart } from './cart-store.js';

// Импорт UI-компонентов
import {
    mountNavbar,        // навигационная панель
    mountFooter,        // футер
    setupCartBadgeSync, // синхронизация счетчика корзины
    renderGallery,      // галерея изображений товара
    renderSizeSelector, // выбор размера
    renderProductGrid,  // сетка товаров (для похожих товаров)
    formatPrice         // форматирование цены
} from './components.js';


// ======================================
// ПОЛУЧЕНИЕ ID ТОВАРА ИЗ URL
// ======================================
function getProductId() {

    // Получаем параметры URL
    const params = new URLSearchParams(window.location.search);

    // Возвращаем id товара
    // если параметра нет — используем "1"
    return params.get('id') || '1';
}


// ======================================
// ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ ТОВАРА
// ======================================
function initProductPage() {

    // Добавляем navbar
    mountNavbar('/catalog');

    // Добавляем footer
    mountFooter();

    // Синхронизируем счетчик корзины
    setupCartBadgeSync();


    // Находим товар по id
    const product =
        products.find((entry) => entry.id === getProductId())
        || products[0];


    // Состояние страницы
    const state = {
        selectedSize: product.sizes[0], // выбранный размер
        activeImage: product.images[0]  // активное изображение
    };


    // Получаем элементы страницы
    const backLink = document.getElementById('backToCatalog');
    const detailRoot = document.getElementById('productDetail');
    const galleryRoot = document.getElementById('productGallery');
    const sizesRoot = document.getElementById('sizeSelector');
    const similarRoot = document.getElementById('similarProducts');


    // Настраиваем ссылку "назад в каталог"
    backLink.href =
        product.category === 'men'
            ? '/catalog/men/'
            : '/catalog/women/';


    // ======================================
    // ФУНКЦИЯ РЕНДЕРА СТРАНИЦЫ
    // ======================================
    function render() {

        // -------------------------
        // ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ
        // -------------------------
        renderGallery(galleryRoot, product.images, state.activeImage);

        // Переключение изображений
        galleryRoot.querySelectorAll('[data-image]').forEach((button) => {

            button.addEventListener('click', () => {

                // Меняем активное изображение
                state.activeImage = button.dataset.image;

                // Перерисовываем страницу
                render();
            });

        });


        // -------------------------
        // ВЫБОР РАЗМЕРА
        // -------------------------
        renderSizeSelector(sizesRoot, product.sizes, state.selectedSize);

        sizesRoot.querySelectorAll('[data-size]').forEach((button) => {

            button.addEventListener('click', () => {

                // Меняем выбранный размер
                state.selectedSize = button.dataset.size;

                render();
            });

        });


        // -------------------------
        // БЛОК ИНФОРМАЦИИ О ТОВАРЕ
        // -------------------------
        detailRoot.innerHTML = `
      <p class="product-card__category">${product.collection}</p>

      <h1 style="font-size: clamp(30px,4vw,48px); margin: 8px 0;">
        ${product.name}
      </h1>

      <p style="font-size: 34px; margin-bottom: 14px;">
        ${formatPrice(product.price)}
      </p>

      <p style="color:#555; line-height:1.6;">
        ${product.description}
      </p>

      <button class="primary-button" id="addProductToCart" style="margin-top:20px;">
        Добавить в корзину
      </button>

      <p id="addedInfo" style="color:#1b5e20; margin-top:12px; display:none;">
        ✓ Товар добавлен в корзину
      </p>
    `;


        // -------------------------
        // КНОПКА "ДОБАВИТЬ В КОРЗИНУ"
        // -------------------------
        detailRoot
            .querySelector('#addProductToCart')
            .addEventListener('click', () => {

                // Добавляем товар в корзину
                addToCart(product.id, state.selectedSize);

                // Показываем сообщение
                detailRoot.querySelector('#addedInfo').style.display = 'block';

            });

    }


    // Первый рендер страницы
    render();


    // ======================================
    // ПОХОЖИЕ ТОВАРЫ
    // ======================================

    const similar =
        products
            .filter(
                (entry) =>
                    entry.category === product.category &&
                    entry.id !== product.id
            )
            .slice(0, 3);


    // Отрисовываем похожие товары
    renderProductGrid(similarRoot, similar);
}


// Запуск страницы товара
initProductPage();