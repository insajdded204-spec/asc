import { products } from './store-data.js';
import { getCart, clearCart } from './cart-store.js';
import { mountNavbar, mountFooter, setupCartBadgeSync, checkoutFormTemplate, formatPrice } from './components.js';

function initCheckoutPage() {
    mountNavbar('/checkout');
    mountFooter();
    setupCartBadgeSync();

    const root = document.getElementById('checkoutRoot');
    const cart = getCart();

    if (!cart.length) {
        root.innerHTML = '<div class="empty-state">В корзине нет товаров. Добавьте товары перед оформлением заказа.</div>';
        return;
    }

    const total = cart.reduce((sum, item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    root.innerHTML = `
    <div class="checkout-layout">
      ${checkoutFormTemplate(total)}
      <aside class="cart-summary">
        <h2>Состав заказа</h2>
        <ul style="list-style:none;display:grid;gap:10px;margin-top:12px;">
          ${cart
        .map((item) => {
            const product = products.find((entry) => entry.id === item.productId);
            if (!product) return '';
            return `<li>${product.name} × ${item.quantity} — ${formatPrice(product.price * item.quantity)}</li>`;
        })
        .join('')}
        </ul>
      </aside>
    </div>
  `;

    document.getElementById('checkoutForm').addEventListener('submit', (event) => {
        event.preventDefault();
        clearCart();
        root.innerHTML = '<div class="empty-state">Спасибо за заказ! Мы отправили подтверждение на email.</div>';
    });
}

initCheckoutPage();