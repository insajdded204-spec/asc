// ======================================
// БАЗА ТОВАРОВ МАГАЗИНА
// ======================================

// Массив товаров, которые отображаются в каталоге
// Каждый объект — отдельный товар
export const products = [

    {
        // Уникальный идентификатор товара
        id: '1',

        // Название товара
        name: '«BALLERINA» T-SHIRT',

        // Категория товара (используется для фильтрации каталога)
        category: 'women',

        // Коллекция товара
        collection: 'New Collection',

        // Цена товара (в рублях)
        price: 4500,

        // Описание товара
        description: 'Мягкая хлопковая футболка свободного кроя с фирменным принтом Ballerina.',

        // Доступные размеры
        sizes: ['XS', 'S', 'M', 'L'],

        // Массив изображений товара
        images: [
            '/assets/images/products/Ballerina_t-shirt.jpg',
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },

    {
        id: '2',
        name: '«Carset» Pants',
        category: 'women',
        collection: 'Tailoring',
        price: 8500,
        description: 'Брюки с акцентной талией и прямым силуэтом для городских образов.',
        sizes: ['S', 'M', 'L'],

        // Несколько изображений используются для галереи на странице товара
        images: [
            '/assets/images/products/Carset_pants.jpg',
            '/assets/images/products/Cardigan_fusion.jpg'
        ]
    },

    {
        id: '3',
        name: 'Hoodie «BALLET»',
        category: 'women',
        collection: 'Street Couture',
        price: 7000,
        description: 'Утеплённое худи с объёмным капюшоном и вышивкой BALLET.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Hoodie_ballet.jpg',
            '/assets/images/products/Ballerina_t-shirt.jpg'
        ]
    },

    {
        id: '4',
        name: 'Shirt «Noir»',
        category: 'men',
        collection: 'Classic Noir',
        price: 6500,
        description: 'Чёрная рубашка с плотной посадкой и минималистичной фурнитурой.',
        sizes: ['M', 'L', 'XL'],
        images: [
            '/assets/images/products/Shirt_Noir.jpg',
            '/assets/images/products/Carset_pants.jpg'
        ]
    },

    {
        id: '5',
        name: 'Cardigan «Fusion»',
        category: 'men',
        collection: 'Layering',
        price: 6000,
        description: 'Тёплый кардиган с глубоким V-вырезом и фактурной вязкой.',
        sizes: ['M', 'L', 'XL'],
        images: [
            '/assets/images/products/Cardigan_fusion.jpg',
            '/assets/images/products/Shirt_Noir.jpg'
        ]
    },

    {
        id: '6',
        name: 'T-shirt «Любовные отношения»',
        category: 'men',
        collection: 'Graphic Tee',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },

    {
        id: '7',
        name: '«TRANSYLVANIA» T-SHIRT',
        category: 'men',
        collection: 'Graphic Tee',
        price: 3500,
        description: 'Футболка с контрастным принтом для layered-образов.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg',
            '/assets/images/products/Любовные_отношения_t-shirt.jpg'
        ]
    },

    {
        id: '8',
        name: 'HOODIE «Le désir d\'être»',
        category: 'women',
        collection: 'Street Couture',
        price: 7500,
        description: 'Фирменное худи бренда из плотного футера, relaxed fit.',
        sizes: ['S', 'M', 'L'],

        // обратите внимание на кавычки из-за апострофа в названии
        images: [
            "/assets/images/products/HOODIE_«Le désir d'être».jpg",
            '/assets/images/products/Hoodie_ballet.jpg'
        ]
    }

];


// ======================================
// ИСТОРИЯ ЗАКАЗОВ ПОЛЬЗОВАТЕЛЯ
// ======================================

// Используется на странице профиля
export const profileOrders = [

    {
        id: 'LD-1001',      // номер заказа
        date: '2026-02-12', // дата заказа
        total: 13500,       // сумма заказа
        status: 'Доставлен' // статус
    },

    {
        id: 'LD-1002',
        date: '2026-02-28',
        total: 7000,
        status: 'В пути'
    },

    {
        id: 'LD-1003',
        date: '2026-03-04',
        total: 4500,
        status: 'Собирается'
    }

];