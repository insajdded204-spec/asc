import { products } from './store-data.js';
import { mountNavbar, mountFooter, setupCartBadgeSync, renderProductGrid } from './components.js';

const CATEGORY_LABEL = 'Все товары';

function initCatalogPage() {
    mountNavbar('/catalog');
    mountFooter();
    setupCartBadgeSync();

    const gridRoot = document.getElementById('gridRoot');
    const summary = document.getElementById('catalogSummary');

    function render() {
        const filtered = products;

        summary.textContent = `${CATEGORY_LABEL} — найдено ${filtered.length} товаров`;

        renderProductGrid(gridRoot, filtered);
    }

    render();
}

initCatalogPage();