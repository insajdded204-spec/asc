// Логика страницы товара: загрузка по ID и добавление в корзину
(function () {
  renderHeader();
  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id'));
  const product = products.find((p) => p.id === id);

  const wrap = document.getElementById('product-content');
  if (!product) {
    wrap.innerHTML = '<p>Product not found.</p>';
    return;
  }

  wrap.innerHTML = `
    <div>
      <img class="product-image" src="${product.image}" alt="${product.name}">
    </div>
    <div>
      <span class="badge">${product.category}</span>
      <h1 class="page-title">${product.name}</h1>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <p>${product.description}</p>
      <button class="btn btn-primary" id="add-product-btn">Add to Cart</button>
      <p class="success-msg" id="success-msg">✓ Product added to cart</p>
    </div>
  `;

  document.getElementById('add-product-btn').addEventListener('click', () => {
    addToCart(product, 1);
    document.getElementById('success-msg').classList.add('show');
    setTimeout(() => document.getElementById('success-msg').classList.remove('show'), 1600);
  });
})();
