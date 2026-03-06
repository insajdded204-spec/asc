const sideMenu = document.getElementById('sideMenu');
const openMenuButton = document.getElementById('openMenu');
const closeMenuButton = document.getElementById('closeMenu');
const overlay = document.getElementById('overlay');

function openMenu() {
  sideMenu.classList.add('open');
  overlay.classList.add('show');
  sideMenu.setAttribute('aria-hidden', 'false');
  overlay.setAttribute('aria-hidden', 'false');
}

function closeMenu() {
  sideMenu.classList.remove('open');
  overlay.classList.remove('show');
  sideMenu.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
}

openMenuButton.addEventListener('click', openMenu);
closeMenuButton.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
