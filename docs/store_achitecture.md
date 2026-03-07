# Анализ репозитория и архитектура фронтенда магазина

## 1) Анализ текущего состояния

### Структура проекта
- `index.html` — главная страница.
- `css/style.css` — базовая стилизация главной страницы (header, hero, product cards, side-menu).
- `js/main.js` — поведение бокового меню.
- `assets/images/...` — изображения для hero и каталога.

### Используемый стек
- Статический frontend: **HTML + CSS + Vanilla JavaScript (ES modules)**.
- Без React/Next/TypeScript/Tailwind.
- Шрифты подключаются через Google Fonts (`Cinzel`, `EB Garamond`).

### Существующие компоненты и layout
- Визуально уже есть: `Header`, `SideMenu`, `Hero`, сетка `Product` карточек, `Footer`.
- Основной стиль: монохром, крупная типографика, тонкие границы, много воздуха.

## 2) Предложенная архитектура магазина

### Страницы (роуты)
- `/` — главная (сохранена).
- `/catalog` — общий каталог.
- `/catalog/men` — мужская одежда.
- `/catalog/women` — женская одежда.
- `/product/[id]` — карточка товара (через `id` в query).
- `/cart` — корзина.
- `/checkout` — оформление заказа.
- `/profile` — профиль и история заказов.

### Переиспользуемые компоненты
- `Navbar`, `Footer`
- `ProductCard`, `ProductGrid`
- `ProductGallery`, `SizeSelector`
- `CartItem`
- `Filters`
- `CheckoutForm`

### Данные
- `js/store-data.js`: массив товаров (id, имя, категория, цена, размеры, описание, изображения).
- Дополнительно: мок-история заказов для профиля.

### Состояние корзины
- `js/cart-store.js`: localStorage-based store.
- Методы: `getCart`, `addToCart`, `updateQuantity`, `removeFromCart`, `clearCart`, `getCartCount`.
- Синхронизация через кастомное событие `cart:updated`.

## 3) Предложенная структура папок

```text
.
├── index.html
├── assets/
├── css/
│   ├── style.css
│   └── store.css
├── js/
│   ├── main.js
│   ├── components.js
│   ├── cart-store.js
│   ├── store-data.js
│   ├── catalog-page.js
│   ├── product-page.js
│   ├── cart-page.js
│   ├── checkout-page.js
│   └── profile-page.js
├── catalog/
│   ├── index.html
│   ├── men/index.html
│   └── women/index.html
├── product/
│   └── [id]/index.html
├── cart/index.html
├── checkout/index.html
├── profile/index.html
└── docs/store-architecture.md
```