// Импорт истории заказов пользователя из базы данных магазина
import { profileOrders } from './store-data.js';

// Импорт UI-компонентов
import {
    mountNavbar,        // добавляет верхнее меню сайта
    mountFooter,        // добавляет футер
    setupCartBadgeSync, // синхронизирует счетчик товаров в корзине
    formatPrice         // форматирует цену
} from './components.js';


// ======================================
// ИНИЦИАЛИЗАЦИЯ СТРАНИЦЫ ПРОФИЛЯ
// ======================================
function initProfilePage() {

    // Отрисовываем навигационную панель
    mountNavbar('/profile');

    // Отрисовываем футер
    mountFooter();

    // Обновляем счетчик товаров в корзине
    setupCartBadgeSync();


    // Получаем корневой контейнер страницы профиля
    const root = document.getElementById('profileRoot');


    // Генерируем HTML страницы
    root.innerHTML = `
    <div class="profile-layout">

      <!-- Блок информации о профиле -->
      <section class="profile-orders">
        <h2>Профиль пользователя</h2>

        <p style="margin-top:10px;color:#666;">
          Добро пожаловать в личный кабинет Le désir d’être.
        </p>
      </section>


      <!-- Блок истории заказов -->
      <section class="profile-orders">

        <h3>История заказов</h3>

        <ul class="orders-list">

          ${profileOrders
        .map(
            (order) =>
                `
                <li>
                  <strong>${order.id}</strong><br>
                  Дата: ${order.date}<br>
                  Сумма: ${formatPrice(order.total)}<br>
                  Статус: ${order.status}
                </li>
                `
        )
        .join('')}

        </ul>

      </section>

    </div>
  `;
}


// Запуск страницы профиля
initProfilePage();