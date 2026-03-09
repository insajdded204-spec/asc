// Получаем элементы бокового меню и затемнения (overlay)
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');


// =============================
// ОТКРЫТИЕ БОКОВОГО МЕНЮ
// =============================
function openMenu() {

    // Если элементы не найдены — ничего не делаем
    if (!sideMenu || !overlay) return;

    // Добавляем CSS-класс открытия меню
    sideMenu.classList.add('open');

    // Показываем затемнение
    overlay.classList.add('show');

    // Обновляем aria-атрибуты для доступности
    sideMenu.setAttribute('aria-hidden', 'false');
    overlay.setAttribute('aria-hidden', 'false');
}


// =============================
// ЗАКРЫТИЕ БОКОВОГО МЕНЮ
// =============================
function closeMenu() {

    // Проверяем существование элементов
    if (!sideMenu || !overlay) return;

    // Убираем класс открытия
    sideMenu.classList.remove('open');

    // Убираем затемнение
    overlay.classList.remove('show');

    // Возвращаем aria-атрибуты
    sideMenu.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('aria-hidden', 'true');
}


// =============================
// ИНИЦИАЛИЗАЦИЯ МЕНЮ
// =============================
function initSideMenu() {

    // Кнопка открытия меню (иконка ☰)
    const openMenuButton = document.getElementById('openMenu');

    // Кнопка закрытия меню
    const closeMenuButton = document.getElementById('closeMenu');


    // -------------------------
    // Обработчик открытия меню
    // -------------------------
    if (openMenuButton && !openMenuButton.dataset.boundMenu) {

        openMenuButton.addEventListener('click', openMenu);

        // Помечаем, что обработчик уже добавлен
        openMenuButton.dataset.boundMenu = 'true';
    }


    // -------------------------
    // Обработчик закрытия меню
    // -------------------------
    if (closeMenuButton && !closeMenuButton.dataset.boundMenu) {

        closeMenuButton.addEventListener('click', closeMenu);

        closeMenuButton.dataset.boundMenu = 'true';
    }


    // -------------------------
    // Закрытие при клике на фон
    // -------------------------
    if (overlay && !overlay.dataset.boundMenu) {

        overlay.addEventListener('click', closeMenu);

        overlay.dataset.boundMenu = 'true';
    }
}


// =============================
// ГЛОБАЛЬНЫЙ ДОСТУП
// =============================

// Делаем функцию доступной глобально,
// чтобы её могли вызвать другие файлы
// (например components.js после перерендера navbar)
window.initSideMenu = initSideMenu;


// Запускаем инициализацию меню
initSideMenu();