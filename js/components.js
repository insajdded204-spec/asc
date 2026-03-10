// Импорт функций работы с корзиной
// getCartCount — возвращает количество товаров в корзине
// addToCart — добавляет товар в корзину
import { getCartCount, addToCart } from './cart-store.js';


// =============================
// NAVBAR (верхняя навигация)
// =============================
export function mountNavbar(activePath = '') {

    // Находим элемент header на странице
    const header = document.querySelector('.header');
    if (!header) return;

    // Проверяем есть ли кнопка бокового меню
    const sideMenuButton = document.getElementById('openMenu');

    // Если есть — создаем кнопку меню
    const baseMenu = sideMenuButton
        ? '<button class="menu" id="openMenu" aria-label="Открыть меню">☰</button>'
        : '';

    // Генерируем HTML навигационной панели
    header.innerHTML = `
    ${baseMenu}

    <!-- Логотип -->
    <a class="logo nav-link" href="/">Le désir d’être</a>

    <!-- Навигация -->
    <nav class="header-nav">

      <!-- Каталог -->
      <a class="nav-link ${activePath.startsWith('/catalog') ? 'is-active' : ''}" href="/catalog/">
        Каталог
      </a>
      
      <!-- Корзина -->
      <a class="nav-link cart-link" href="/cart/" aria-label="Корзина">

        <!-- Иконка корзины -->
        <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
          <path d="M6 7h15l-1.5 8.5a2 2 0 0 1-2 1.5H10a2 2 0 0 1-2-1.5L6 4H3" />
          <circle cx="10" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
        </svg>

        Cart

        <!-- Счетчик товаров -->
        <span class="cart-badge" data-cart-count>
          ${getCartCount()}
        </span>

      </a>
    </nav>
  `;

    // Если есть функция инициализации бокового меню — запускаем её
    if (window.initSideMenu) {
        window.initSideMenu();
    }
}


// =============================
// FOOTER (подвал сайта)
// =============================
export function mountFooter() {

    const footer = document.querySelector('.footer');
    if (!footer) return;

    // Добавляем HTML футера
    footer.innerHTML = '<p>© Le désir d’être 2026</p>';
}


// =============================
// ОБНОВЛЕНИЕ СЧЕТЧИКА КОРЗИНЫ
// =============================
export function syncCartBadges() {

    // Находим все элементы со счетчиком корзины
    document.querySelectorAll('[data-cart-count]').forEach((node) => {

        // Обновляем количество товаров
        node.textContent = String(getCartCount());

    });
}


// Подписка на событие обновления корзины
export function setupCartBadgeSync() {

    // Обновляем счетчик сразу
    syncCartBadges();

    // Подписываемся на событие cart:updated
    window.addEventListener('cart:updated', syncCartBadges);

}


// =============================
// ФИЛЬТРЫ КАТАЛОГА
// =============================
export function renderFilters(target, groups, activeCategory, onFilter) {

    // Генерируем список кнопок фильтра
    target.innerHTML = `
    <div class="filters">
      <h3>Категории</h3>

      <div class="filter-list">

        ${groups
        .map(
            (group) =>
                `<button 
                   class="filter-button ${group.key === activeCategory ? 'active' : ''}" 
                   data-filter="${group.key}">
                   ${group.label} <span>(${group.count})</span>
                 </button>`
        )
        .join('')}

      </div>
    </div>
  `;

    // Добавляем обработчики кликов
    target.querySelectorAll('[data-filter]').forEach((button) => {

        button.addEventListener('click', () =>
            onFilter(button.dataset.filter)
        );

    });
}


// =============================
// КАРТОЧКА ТОВАРА
// =============================
export function productCardTemplate(product) {

    // HTML карточки товара
    return `
  <article class="product-card">

    <a class="nav-link" href="/product/[id]/?id=${product.id}">
      <img src="${product.images[0]}" alt="${product.name}">
    </a>

    <div class="product-card__body">

      <p class="product-card__category">${product.category}</p>

      <h3 class="product-card__title">
        <a class="nav-link" href="/product/[id]/?id=${product.id}">
          ${product.name}
        </a>
      </h3>

      <p class="product-card__price">
        ${formatPrice(product.price)}
      </p>

      <!-- Кнопка добавления в корзину -->
      <button class="primary-button" data-add-product="${product.id}">
        Добавить в корзину
      </button>

    </div>
  </article>`;
}


// =============================
// СЕТКА ТОВАРОВ
// =============================
export function renderProductGrid(target, products) {

    // Генерируем сетку карточек
    target.innerHTML =
        `<div class="product-grid">
            ${products.map(productCardTemplate).join('')}
        </div>`;

    // Добавляем обработчик добавления в корзину
    target.querySelectorAll('[data-add-product]').forEach((button) => {

        button.addEventListener('click', () =>
            addToCart(button.dataset.addProduct)
        );

    });
}


// =============================
// ВЫБОР РАЗМЕРА
// =============================
export function renderSizeSelector(target, sizes, selectedSize) {

    target.innerHTML = `
    <div>
      <h4>Размер</h4>

      <div class="size-selector">

        ${sizes
        .map(
            (size) =>
                `<button 
                   class="size-button ${size === selectedSize ? 'active' : ''}" 
                   data-size="${size}">
                   ${size}
                 </button>`
        )
        .join('')}

      </div>

    </div>`;
}


// =============================
// ГАЛЕРЕЯ ТОВАРА
// =============================
export function renderGallery(target, images, activeImage) {

    target.innerHTML = `
    <div class="gallery-main">
      <img src="${activeImage}" alt="Фото товара">
    </div>

    <div class="gallery-thumbs">

      ${images
        .map(
            (image) =>
                `<button 
                   class="${image === activeImage ? 'active' : ''}" 
                   data-image="${image}">
                   <img src="${image}" alt="Миниатюра">
                 </button>`
        )
        .join('')}

    </div>
  `;
}


// =============================
// ТОВАР В КОРЗИНЕ
// =============================
export function cartItemTemplate({ product, item }) {

    return `
    <article 
      class="cart-item"
      data-cart-item="${item.productId}"
      data-cart-size="${item.size || ''}"
    >

      <img src="${product.images[0]}" alt="${product.name}">

      <div>
        <h3>${product.name}</h3>
        <p>Размер: ${item.size || 'One size'}</p>
        <p>${formatPrice(product.price)}</p>
      </div>

      <div>

        <!-- Управление количеством -->
        <div class="qty-control">
          <button data-qty-action="decrease">−</button>
          <span>${item.quantity}</span>
          <button data-qty-action="increase">+</button>
        </div>

        <!-- Удаление товара -->
        <button class="secondary-button" style="margin-top:8px" data-remove-item>
          Удалить
        </button>

      </div>

    </article>
  `;
}


// =============================
// ФОРМА ОФОРМЛЕНИЯ ЗАКАЗА
// =============================
export function checkoutFormTemplate(total) {

    return `
    <form class="checkout-form" id="checkoutForm">

      <h2>Оформление заказа</h2>

      <div class="form-grid">

        <label>
          Имя
          <input required name="name" />
        </label>

        <label>
          Email
          <input required type="email" name="email" />
        </label>

        <label>
          Адрес доставки
          <textarea required rows="4" name="address"></textarea>
        </label>

      </div>

      <p style="margin: 18px 0; font-size: 22px;">
        Итого: ${formatPrice(total)}
      </p>

      <button class="primary-button" type="submit">
        Подтвердить заказ
      </button>

    </form>
  `;
}


// =============================
// ФОРМАТИРОВАНИЕ ЦЕНЫ
// =============================
export function formatPrice(price) {

    // Форматирует число в рубли
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';

}