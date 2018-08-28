import SubscribtionForm from './subscribtion-form';
import MainMenu from './main-menu';
import ToTopButton from './to-top-button';
import Catalog from './catalog';

const mainMenuElement = document.querySelector('.main-menu');
const mainMenu = new MainMenu(mainMenuElement);
mainMenu.init();

const subscribtionFormElement = document.querySelector('.subscribtion-form');
const subscribtionForm = new SubscribtionForm(subscribtionFormElement);
subscribtionForm.init();

const toTopButtonElement = document.querySelector('.to-top-button');
const toTopButton = new ToTopButton(toTopButtonElement);
toTopButton.init();

const catalogElement = document.querySelector('.catalog');
const catalog = new Catalog(catalogElement);
catalog.init();