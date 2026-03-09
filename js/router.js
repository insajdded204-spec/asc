// Роутинг по HTML-страницам проекта (без фреймворков)
const ROUTES = {
  home: 'index.html',
  catalog: 'catalog.html',
  product: 'product.html',
  cart: 'cart.html',
  checkout: 'checkout.html',
  success: 'order-success.html'
};

// Возвращает URL страницы с query-параметрами (например product.html?id=1)
function routePath(name, query = {}) {
  const page = ROUTES[name] || ROUTES.catalog;
  const url = new URL(page, window.location.origin + window.location.pathname.replace(/[^/]*$/, ''));
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  });
  return `${url.pathname}${url.search}`;
}

// Программный переход между html-файлами
function goToRoute(name, query = {}) {
  window.location.href = routePath(name, query);
}
