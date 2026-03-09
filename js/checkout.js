// Логика checkout: вывод резюме заказа и оформление
(function () {
  renderHeader();

  const list = document.getElementById('checkout-list');
  const total = document.getElementById('checkout-total');

  function renderSummary() {
    const cart = getCart();
    list.innerHTML = cart.map((item) => `<li>${item.name} × ${item.quantity} — $${(item.price * item.quantity).toFixed(2)}</li>`).join('');
    total.textContent = `$${getCartTotal().toFixed(2)}`;
  }

  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.removeItem(CART_KEY);
    location.href = 'order-success.html';
  });

  renderSummary();
})();
