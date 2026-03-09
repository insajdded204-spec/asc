// Ключ, под которым корзина хранится в localStorage браузера
const STORAGE_KEY = 'asc_store_cart_v1';


// Функция чтения корзины из localStorage
function readCart() {
    try {
        // Получаем строку из localStorage
        // Если там ничего нет — используем пустой массив
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        // Если JSON поврежден или произошла ошибка — возвращаем пустую корзину
        return [];
    }
}


// Функция сохранения корзины
function writeCart(cart) {

    // Сохраняем корзину в localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

    // Отправляем событие, чтобы другие части сайта
    // (например значок корзины в navbar) обновились
    window.dispatchEvent(
        new CustomEvent('cart:updated', { detail: cart })
    );
}


// Получить всю корзину
export function getCart() {
    return readCart();
}


// Получить общее количество товаров в корзине
export function getCartCount() {

    // Складываем количество каждого товара
    return readCart().reduce(
        (sum, item) => sum + item.quantity,
        0
    );
}


// Добавить товар в корзину
export function addToCart(productId, size = null) {

    // Получаем текущую корзину
    const cart = readCart();

    // Проверяем, есть ли уже такой товар с этим размером
    const existing = cart.find(
        (item) => item.productId === productId && item.size === size
    );

    if (existing) {
        // Если товар уже есть — увеличиваем количество
        existing.quantity += 1;
    } else {
        // Если товара нет — добавляем новый объект
        cart.push({
            productId,
            size,
            quantity: 1
        });
    }

    // Сохраняем обновленную корзину
    writeCart(cart);
}


// Изменить количество товара в корзине
export function updateQuantity(productId, size, quantity) {

    const cart = readCart().map((item) => {

        // Ищем нужный товар
        if (item.productId === productId && item.size === size) {

            // Обновляем количество
            return {
                ...item,
                quantity: Math.max(1, quantity) // минимум 1
            };
        }

        return item;
    });

    // Сохраняем корзину
    writeCart(cart);
}


// Удалить товар из корзины
export function removeFromCart(productId, size) {

    // Фильтруем массив, убирая нужный товар
    const updatedCart = readCart().filter(
        (item) => !(item.productId === productId && item.size === size)
    );

    writeCart(updatedCart);
}


// Полностью очистить корзину
export function clearCart() {

    // Просто сохраняем пустой массив
    writeCart([]);
}