const hamburger = document.querySelector('.main-menu__hamburger');
const mainMenuList = document.querySelector('.main-menu__list');

hamburger.addEventListener('click', (e) => {
    mainMenuList.classList.toggle('main-menu__list--show');
});