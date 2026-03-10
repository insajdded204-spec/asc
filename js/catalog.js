// Логика страницы каталога: фильтрация, рендер карточек и добавление в корзину
(function () {
  renderHeader();

  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('products-count');
  const buttons = document.querySelectorAll('[data-category]');
  let active = 'All Categories';

  function render() {
    const filtered = active === 'All Categories' ? products : products.filter((p) => p.category === active);
    countEl.textContent = `${filtered.length} products found`;
    grid.innerHTML = filtered.map((p) => `
      <article class="card product-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <div class="product-card__body">
          <span class="badge">${p.category}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-price">${p.price}₽</p>
          <button class="btn btn-primary" data-add="${p.id}">Add to Cart</button>
        </div>
      </article>
    `).join('');
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      active = btn.dataset.category;
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });

  grid.addEventListener('click', (e) => {
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      e.stopPropagation();
      const id = Number(addBtn.dataset.add);
      const product = products.find((p) => p.id === id);
      if (product) addToCart(product, 1);
      return;
    }
    const card = e.target.closest('.product-card');
    if (!card) return;
    location.href = `product.html?id=${card.dataset.id}`;
  });

  render();
})();
