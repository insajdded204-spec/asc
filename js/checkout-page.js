// Импорт списка товаров из базы магазина
import { products } from './store-data.js';

// Импорт функций работы с корзиной
// getCart — получить товары из корзины
// clearCart — очистить корзину после оформления заказа
import { getCart, clearCart } from './cart-store.js';

// Импорт компонентов интерфейса
import { mountNavbar, mountFooter, setupCartBadgeSync, checkoutFormTemplate, formatPrice } from './components.js';


// Основная функция инициализации страницы оформления заказа
function initCheckoutPage() {

    // Добавляем навигационную панель
    mountNavbar('/checkout');

    // Добавляем футер
    mountFooter();

    // Обновляем значок количества товаров в корзине
    setupCartBadgeSync();

    // Получаем корневой контейнер страницы
    const root = document.getElementById('checkoutRoot');

    // Получаем текущую корзину
    const cart = getCart();


    // Если корзина пустая — показываем сообщение
    if (!cart.length) {
        root.innerHTML = `
          <div class="empty-state">
            В корзине нет товаров. Добавьте товары перед оформлением заказа.
          </div>
        `;
        return;
    }


    // Считаем итоговую стоимость заказа
    const total = cart.reduce((sum, item) => {

        // Находим товар в каталоге по id
        const product = products.find((entry) => entry.id === item.productId);

        // Если товар найден — добавляем его стоимость
        return sum + (product ? product.price * item.quantity : 0);

    }, 0);


    // Генерируем HTML страницы оформления
    root.innerHTML = `
    <div class="checkout-layout">

      <!-- Форма оформления заказа -->
      ${checkoutFormTemplate(total)}

      <!-- Боковая панель с составом заказа -->
      <aside class="cart-summary">
        <h2>Состав заказа</h2>

        <ul style="list-style:none;display:grid;gap:10px;margin-top:12px;">

          ${cart
        .map((item) => {

            // Находим товар
            const product = products.find((entry) => entry.id === item.productId);

            // Если товара нет — пропускаем
            if (!product) return '';

            // Формируем строку товара в заказе
            return `
              <li>
                ${product.name} × ${item.quantity} — 
                ${formatPrice(product.price * item.quantity)}
              </li>
            `;
        })
        .join('')}

        </ul>
      </aside>

    </div>
  `;


    // Находим форму оформления заказа
    document.getElementById('checkoutForm').addEventListener('submit', (event) => {

        // Отменяем стандартную отправку формы
        event.preventDefault();

        // Очищаем корзину после оформления заказа
        clearCart();

        // Показываем сообщение об успешном заказе
        root.innerHTML = `
          <div class="empty-state">
            Спасибо за заказ! Мы отправили подтверждение на email.
          </div>
        `;
    });
}


// Запускаем инициализацию страницы
initCheckoutPage();