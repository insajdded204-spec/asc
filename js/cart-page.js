// Импорт списка товаров из файла с данными магазина
import { products } from './store-data.js';

// Импорт функций для работы с корзиной
import { getCart, updateQuantity, removeFromCart } from './cart-store.js';

// Импорт компонентов интерфейса
import { mountNavbar, mountFooter, setupCartBadgeSync, cartItemTemplate, formatPrice } from './components.js';


// Основная функция инициализации страницы корзины
function initCartPage() {

  // Добавляем навигацию
  mountNavbar('/cart');

  // Добавляем футер
  mountFooter();

  // Обновляем счетчик товаров в иконке корзины
  setupCartBadgeSync();

  // Получаем элементы страницы
  const listRoot = document.getElementById('cartList'); // список товаров
  const summaryRoot = document.getElementById('cartSummary'); // блок с итоговой суммой


  // Функция рендера (перерисовки) корзины
  function render() {

    // Получаем текущую корзину
    const cart = getCart();

    // Если корзина пустая
    if (!cart.length) {

      // Показываем сообщение
      listRoot.innerHTML = '<div class="empty-state">Корзина пуста. Добавьте товары из каталога.</div>';

      // Показываем итог и кнопку перехода в каталог
      summaryRoot.innerHTML = `
        <p>Итого: 0 ₽</p>
        <a class="primary-button nav-link" href="/catalog/" 
           style="display:inline-block;text-align:center;margin-top:10px;">
           Перейти в каталог
        </a>
      `;
      return;
    }

    // Создаем массив объектов:
    // item — товар в корзине
    // product — данные товара из каталога
    const entries = cart
        .map((item) => ({
          item,
          product: products.find((product) => product.id === item.productId)
        }))
        .filter((entry) => entry.product); // убираем товары, которых нет в каталоге


    // Генерируем HTML для всех товаров корзины
    listRoot.innerHTML = entries.map(cartItemTemplate).join('');


    // Считаем общую стоимость
    const total = entries.reduce(
        (sum, entry) => sum + entry.product.price * entry.item.quantity,
        0
    );


    // Выводим блок итогового заказа
    summaryRoot.innerHTML = `
      <h2>Ваш заказ</h2>
      <p style="font-size:30px;margin:10px 0;">${formatPrice(total)}</p>
      <a class="primary-button nav-link" href="/checkout/" 
         style="display:inline-block;text-align:center;">
         Перейти к оформлению
      </a>
    `;


    // Добавляем обработчики кнопок для каждого товара
    listRoot.querySelectorAll('[data-cart-item]').forEach((article) => {

      // Получаем id товара
      const id = article.dataset.cartItem;

      // Получаем выбранный размер
      const size = article.dataset.cartSize || null;

      // Элемент количества
      const quantitySpan = article.querySelector('.qty-control span');

      // Текущее количество
      const current = Number(quantitySpan.textContent);


      // Кнопка увеличения количества
      article.querySelector('[data-qty-action="increase"]').addEventListener('click', () => {
        updateQuantity(id, size, current + 1);
        render(); // перерисовываем корзину
      });


      // Кнопка уменьшения количества
      article.querySelector('[data-qty-action="decrease"]').addEventListener('click', () => {
        updateQuantity(id, size, Math.max(1, current - 1));
        render();
      });


      // Кнопка удаления товара
      article.querySelector('[data-remove-item]').addEventListener('click', () => {
        removeFromCart(id, size);
        render();
      });
    });
  }

  // Первый запуск рендера
  render();
}


// Запуск страницы корзины
initCartPage();