const WOMEN_PRODUCTS_PATH = '../../../assets/images/products/women/';

const productsGrid = document.getElementById('productsGrid');
const productsCount = document.getElementById('productsCount');
const sortBy = document.getElementById('sortBy');

const getProductCards = () => Array.from(productsGrid.querySelectorAll('.product-card'));

const updateCount = (count) => {
    productsCount.textContent = `${count} Products`;
};

const countRenderedProducts = () => {
    updateCount(getProductCards().length);
};

const countProductsFromWomenFolder = async () => {
    try {
        const response = await fetch(WOMEN_PRODUCTS_PATH, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Directory listing is not available.');
        }

        const directoryHtml = await response.text();
        const parser = new DOMParser();
        const directoryDocument = parser.parseFromString(directoryHtml, 'text/html');
        const files = Array.from(directoryDocument.querySelectorAll('a'))
            .map((link) => link.getAttribute('href') || '')
            .filter((href) => /\.(png|jpe?g|webp|gif|avif)$/i.test(href));

        if (files.length > 0) {
            updateCount(files.length);
            return;
        }
    } catch (error) {
        // Fall back to rendered card count.
    }

    countRenderedProducts();
};

const sortProducts = (direction) => {
    const cards = getProductCards();

    if (direction === 'default') {
        cards
            .sort((a, b) => Number(a.dataset.originalIndex) - Number(b.dataset.originalIndex))
            .forEach((card) => productsGrid.appendChild(card));
        return;
    }

    const multiplier = direction === 'asc' ? 1 : -1;

    cards
        .sort((a, b) => multiplier * (Number(a.dataset.price) - Number(b.dataset.price)))
        .forEach((card) => productsGrid.appendChild(card));
};

getProductCards().forEach((card, index) => {
    card.dataset.originalIndex = String(index);
});

sortBy.addEventListener('change', (event) => {
    sortProducts(event.target.value);
});

countProductsFromWomenFolder();