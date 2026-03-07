import { products } from './store-data.js';
import { getCart, updateQuantity, removeFromCart } from './cart-store.js';
import { mountNavbar, mountFooter, setupCartBadgeSync, cartItemTemplate, formatPrice } from './components.js';

function initCartPage() {
  mountNavbar('/cart');
  mountFooter();
  setupCartBadgeSync();

  const listRoot = document.getElementById('cartList');
  const summaryRoot = document.getElementById('cartSummary');

  function render() {
    const cart = getCart();
    if (!cart.length) {
      listRoot.innerHTML = '<div class="empty-state">Корзина пуста. Добавьте товары из каталога.</div>';
      summaryRoot.innerHTML = '<p>Итого: 0 ₽</p><a class="primary-button nav-link" href="/catalog/" style="display:inline-block;text-align:center;margin-top:10px;">Перейти в каталог</a>';
      return;
    }

    const entries = cart
        .map((item) => ({ item, product: products.find((product) => product.id === item.productId) }))
        .filter((entry) => entry.product);

    listRoot.innerHTML = entries.map(cartItemTemplate).join('');

    const total = entries.reduce((sum, entry) => sum + entry.product.price * entry.item.quantity, 0);
    summaryRoot.innerHTML = `
      <h2>Ваш заказ</h2>
      <p style="font-size:30px;margin:10px 0;">${formatPrice(total)}</p>
      <a class="primary-button nav-link" href="/checkout/" style="display:inline-block;text-align:center;">Перейти к оформлению</a>
    `;

    listRoot.querySelectorAll('[data-cart-item]').forEach((article) => {
      const id = article.dataset.cartItem;
      const size = article.dataset.cartSize || null;
      const quantitySpan = article.querySelector('.qty-control span');
      const current = Number(quantitySpan.textContent);

      article.querySelector('[data-qty-action="increase"]').addEventListener('click', () => {
        updateQuantity(id, size, current + 1);
        render();
      });
      article.querySelector('[data-qty-action="decrease"]').addEventListener('click', () => {
        updateQuantity(id, size, Math.max(1, current - 1));
        render();
      });
      article.querySelector('[data-remove-item]').addEventListener('click', () => {
        removeFromCart(id, size);
        render();
      });
    });
  }

  render();
}

initCartPage();