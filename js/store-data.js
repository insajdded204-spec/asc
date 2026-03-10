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
        name: 'Shirt "Noir"',

        // Категория товара (используется для фильтрации каталога)
        category: 'Коллекция №4',
        // Цена товара (в рублях)
        price: 4500,

        // Описание товара
        description: 'Мягкая хлопковая футболка свободного кроя с фирменным принтом Ballerina.',

        // Доступные размеры
        sizes: ['XS', 'S', 'M', 'L'],

        // Массив изображений товара
        images: [
            "../assets/images/products/Noir.png",
        ]
    },

    {
        id: '2',
        name: '"Ballerina" T-Shirt',
        category: 'Коллекция №4',
        price: 8500,
        description: 'Брюки с акцентной талией и прямым силуэтом для городских образов.',
        sizes: ['S', 'M', 'L'],

        // Несколько изображений используются для галереи на странице товара
        images: [
            "../assets/images/products/Ballerina.png",
        ]
    },

    {
        id: '3',
        name: '"Carset" pants',
        category: 'Коллекция №4',
        price: 7000,
        description: 'Утеплённое худи с объёмным капюшоном и вышивкой BALLET.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            "../assets/images/products/Carset.png",
        ]
    },

    {
        id: '4',
        name: 'HOODIE "BALLET"',
        category: 'Коллекция №4',
        price: 6500,
        description: 'Чёрная рубашка с плотной посадкой и минималистичной фурнитурой.',
        sizes: ['M', 'L', 'XL'],
        images: [
            "../assets/images/products/HOODIE.png",
        ]
    },

    {
        id: '5',
        name: 'Cardigan «Fusion»',
        category: '«СОПРОТИВЛЕНИЕ»’C',
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
        category: '«СОПРОТИВЛЕНИЕ»’C',
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
        category: '«СОПРОТИВЛЕНИЕ»’C',
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
        category: '«СОПРОТИВЛЕНИЕ»’C',
        price: 7500,
        description: 'Фирменное худи бренда из плотного футера, relaxed fit.',
        sizes: ['S', 'M', 'L'],

        // обратите внимание на кавычки из-за апострофа в названии
        images: [
            "/assets/images/products/HOODIE_«Le désir d'être».jpg",
            '/assets/images/products/Hoodie_ballet.jpg'
        ]
    },
    {
        id: '9',
        name: 'T-shirt «Любовные отношения»',
        category: '«Transylvania»’c',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },
    {
        id: '10',
        name: 'T-shirt «Любовные отношения»',
        category: '«Transylvania»’c',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },
    {
        id: '11',
        name: 'T-shirt «Любовные отношения»',
        category: '«Transylvania»’c',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },
    {
        id: '12',
        name: 'T-shirt «Любовные отношения»',
        category: '«Transylvania»’c',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },
    {
        id: '13',
        name: 'T-shirt «Любовные отношения»',
        category: '««HERBIER» collection',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },
    {
        id: '14',
        name: 'T-shirt «Любовные отношения»',
        category: '«HERBIER» collection',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },
    {
        id: '15',
        name: 'T-shirt «Любовные отношения»',
        category: '«HERBIER» collection',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },
    {
        id: '16',
        name: 'T-shirt «Любовные отношения»',
        category: '«HERBIER» collection',
        price: 3500,
        description: 'Футболка с художественным принтом и прямым силуэтом.',
        sizes: ['S', 'M', 'L', 'XL'],
        images: [
            '/assets/images/products/Любовные_отношения_t-shirt.jpg',
            '/assets/images/products/TRANSYLVANIA__T-SHIRT.jpg'
        ]
    },
];