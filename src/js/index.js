const hamburger = document.querySelector('.main-menu__hamburger');
const mainMenuList = document.querySelector('.main-menu__list');
const subscribtionForm = document.querySelector('.subscribtion-form');
const emailInput = subscribtionForm.querySelector('.subscribtion-form__email');
const toTopButton = document.querySelector('.to-top-button');

const smoothScroll = (duration) => {
    const intervalTime = 16;
    const end = 0;
    const distance = -window.pageYOffset;
    const increment = distance / (duration / intervalTime);
    let stopAnimation;

    const animateScroll = () => {
        window.scrollBy(0, increment);
        stopAnimation();
    };

    if (increment >= 0) {
        stopAnimation = () => {
            const offset = window.pageYOffset;
            if ((offset >= (end - increment)) || ((window.innerHeight + offset) >= document.body.offsetHeight)) {
                clearInterval(interval);
            }
        };
    } else {
        stopAnimation = () => {
            const offset = window.pageYOffset;
            if (offset <= end) {
                clearInterval(interval);
            }
        };
    }

    const interval = setInterval(animateScroll, intervalTime);
}

if (window.pageYOffset > 50) {
    if (toTopButton.classList.contains('visually-hidden')) {
        toTopButton.classList.remove('visually-hidden');
    }
}

hamburger.addEventListener('click', (e) => {
    mainMenuList.classList.toggle('main-menu__list--show');
});

subscribtionForm.addEventListener('submit', (e) => {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = regexp.test(emailInput.value);
});

toTopButton.addEventListener('click', (e) => {
    smoothScroll(500);
});

window.addEventListener('scroll', (e) => {
    if (window.pageYOffset > 50) {
        if (toTopButton.classList.contains('visually-hidden')) {
            toTopButton.classList.remove('visually-hidden');
        }
    } else {
        if (!toTopButton.classList.contains('visually-hidden')) {
            toTopButton.classList.add('visually-hidden');
        }
    }
});