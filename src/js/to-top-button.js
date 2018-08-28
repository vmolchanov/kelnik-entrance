import {smoothScroll} from './smooth-scroll';

export default class ToTopButton {
    constructor(button) {
        this.button = button;

        if (window.pageYOffset > 50) {
            if (this.button.classList.contains('visually-hidden')) {
                this.button.classList.remove('visually-hidden');
            }
        }

        this.init = this.init.bind(this);
    }

    init() {
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll(500);
        });

        window.addEventListener('scroll', (e) => {
            if (window.pageYOffset > 50) {
                if (this.button.classList.contains('visually-hidden')) {
                    this.button.classList.remove('visually-hidden');
                }
            } else {
                if (!this.button.classList.contains('visually-hidden')) {
                    this.button.classList.add('visually-hidden');
                }
            }
        });
    }
}