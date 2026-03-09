// Универсальная логика корзины на localStorage
const CART_KEY = 'fastapi-shop-cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCounter();
}

function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === product.id);
  if (existing) existing.quantity += qty;
  else cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty });
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter((i) => i.id !== id));
}

function increaseQuantity(id) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.quantity += 1;
  saveCart(cart);
}

function decreaseQuantity(id) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.quantity -= 1;
  if (item.quantity <= 0) removeFromCart(id);
  else saveCart(cart);
}

function getCartTotal() {
  return getCart().reduce((acc, i) => acc + i.price * i.quantity, 0);
}

// Обновляет числовой индикатор в шапке
function updateCartCounter() {
  const count = getCart().reduce((acc, i) => acc + i.quantity, 0);
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = count;
  });
}

// Рисует переиспользуемую шапку и синхронизирует счётчик
function renderHeader() {
  const slot = document.getElementById('header-slot');
  if (!slot) return;
  slot.innerHTML = `
    <header class="site-header">
      <div class="container site-header__inner">
        <a class="brand" href="${typeof routePath === 'function' ? routePath('home') : 'index.html'}">FastAPI Shop</a>
        <nav class="header-nav">
          <a class="nav-link" href="${typeof routePath === 'function' ? routePath('catalog') : 'catalog.html'}">Catalog</a>
          <a class="cart-link" href="${typeof routePath === 'function' ? routePath('cart') : 'cart.html'}" aria-label="Cart">
            🛒 <span class="cart-count" data-cart-count>0</span>
          </a>
        </nav>
      </div>
    </header>
  `;
  updateCartCounter();
}
