import { profileOrders } from './store-data.js';
import { mountNavbar, mountFooter, setupCartBadgeSync, formatPrice } from './components.js';

function initProfilePage() {
    mountNavbar('/profile');
    mountFooter();
    setupCartBadgeSync();

    const root = document.getElementById('profileRoot');
    root.innerHTML = `
    <div class="profile-layout">
      <section class="profile-orders">
        <h2>Профиль пользователя</h2>
        <p style="margin-top:10px;color:#666;">Добро пожаловать в личный кабинет Le désir d’être.</p>
      </section>
      <section class="profile-orders">
        <h3>История заказов</h3>
        <ul class="orders-list">
          ${profileOrders
        .map(
            (order) =>
                `<li><strong>${order.id}</strong><br>Дата: ${order.date}<br>Сумма: ${formatPrice(order.total)}<br>Статус: ${order.status}</li>`
        )
        .join('')}
        </ul>
      </section>
    </div>
  `;
}

initProfilePage();