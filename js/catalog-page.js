import { products } from './store-data.js';
import { mountNavbar, mountFooter, setupCartBadgeSync, renderFilters, renderProductGrid } from './components.js';

const CATEGORY_LABELS = {
    all: 'Все товары',
    men: 'Мужская одежда',
    women: 'Женская одежда'
};

function getInitialCategory() {
    const pathname = window.location.pathname;
    if (pathname.includes('/catalog/men')) return 'men';
    if (pathname.includes('/catalog/women')) return 'women';
    return 'all';
}

function initCatalogPage() {
    mountNavbar('/catalog');
    mountFooter();
    setupCartBadgeSync();

    const state = { category: getInitialCategory() };
    const filtersRoot = document.getElementById('filtersRoot');
    const gridRoot = document.getElementById('gridRoot');
    const summary = document.getElementById('catalogSummary');

    const groups = [
        { key: 'all', label: 'Все товары', count: products.length },
        { key: 'men', label: 'Мужская одежда', count: products.filter((product) => product.category === 'men').length },
        { key: 'women', label: 'Женская одежда', count: products.filter((product) => product.category === 'women').length }
    ];

    function render() {
        const filtered = state.category === 'all' ? products : products.filter((product) => product.category === state.category);
        renderFilters(filtersRoot, groups, state.category, (nextCategory) => {
            state.category = nextCategory;
            render();
        });
        summary.textContent = `${CATEGORY_LABELS[state.category]} — найдено ${filtered.length} товаров`;
        renderProductGrid(gridRoot, filtered);
    }

    render();
}

initCatalogPage();