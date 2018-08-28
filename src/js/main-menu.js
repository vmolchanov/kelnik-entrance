export default class MainMenu {
    constructor(menu) {
        this.menu = menu;
        this.hamburger = menu.querySelector('.main-menu__hamburger');
        this.menuList = menu.querySelector('.main-menu__list');

        this.init = this.init.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    init() {
        this.hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
    }

    toggleMenu() {
        this.menuList.classList.toggle('main-menu__list--show');
    }
}