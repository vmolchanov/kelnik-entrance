export default class Catalog {
    constructor(catalog) {
        this.catalog = catalog;
        this.priceSortButton = catalog.querySelector('#price-sort');
        this.roomsSortButton = catalog.querySelector('#rooms-sort');
        this.catalogList = catalog.querySelector('.catalog__apartment-list');
        this.moreButton = catalog.querySelector('.catalog__more .button');

        this.init = this.init.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.sort = this.sort.bind(this);
        this.render = this.render.bind(this);
    }

    init() {
        const classes = [
            'catalog__sort-type--active',
            'catalog__sort-type--inc',
            'catalog__sort-type--dec'
        ];

        this.priceSortButton.addEventListener('click', (e) => {
            e.preventDefault();

            classes.forEach((cls) => {
                if (this.roomsSortButton.classList.contains(cls)) {
                    this.roomsSortButton.classList.remove(cls);
                }
            });

            this.toggleState(e.target);

            const sortConfig = {
                type: 'price',
                direction: e.target.classList.contains('catalog__sort-type--inc') ? 'inc' : 'dec'
            };
            this.sort(sortConfig);
        });

        this.roomsSortButton.addEventListener('click', (e) => {
            e.preventDefault();

            classes.forEach((cls) => {
                if (this.priceSortButton.classList.contains(cls)) {
                    this.priceSortButton.classList.remove(cls);
                }
            });

            this.toggleState(e.target);

            const sortConfig = {
                type: 'rooms',
                direction: e.target.classList.contains('catalog__sort-type--inc') ? 'inc' : 'dec'
            };
            this.sort(sortConfig);
        });

        this.moreButton.addEventListener('click', (e) => {
            e.preventDefault();
            const xhr = new XMLHttpRequest;
            xhr.open('GET', 'http://localhost:3010/apartments/20');
            xhr.addEventListener('readystatechange', (e) => {
                if (xhr.readyState === xhr.DONE) {
                    const items = JSON.parse(xhr.response).items;
                    
                    this.render(items);
                }
            });
            xhr.send(null);
        });
    }

    toggleState(element) {
        if (element.classList.contains('catalog__sort-type--active')) {
            if (element.classList.contains('catalog__sort-type--inc')) {
                element.classList.remove('catalog__sort-type--inc');
                element.classList.add('catalog__sort-type--dec');
            } else {
                element.classList.remove('catalog__sort-type--dec');
                element.classList.add('catalog__sort-type--inc');
            }
        } else {
            element.classList.add('catalog__sort-type--active');
            element.classList.add('catalog__sort-type--inc');
        }
    }

    sort(config) {
        const catalogItemElements = Array.prototype.slice.call(this.catalogList.querySelectorAll('.apartment-item'));
        const catalogItems = [];

        catalogItemElements.forEach((item) => {
            catalogItems.push({
                image: item.querySelector('.apartment-item__image img').src,
                title: item.querySelector('.apartment-item__title').innerText,
                finish: item.querySelector('.apartment-item__property--finish').innerText,
                square: item.querySelector('.apartment-item__property--square').innerText.match(/\d+/)[0],
                floor: item.querySelector('.apartment-item__property--floor').innerText.match(/\d+\/\d+/)[0],
                price: parseInt(item.querySelector('.apartment-item__price').innerText.replace(/\s/g, '')),
                status: item.querySelector('.apartment-item__status').innerText,
                roomsCount: Number(item.dataset.roomsCount)
            });
        });

        catalogItems.sort((a, b) => {
            if (config.type === 'price') {
                return config.direction === 'inc' ? a.price - b.price : b.price - a.price;
            }
            if (config.type === 'rooms') {
                return config.direction === 'inc' ? a.roomsCount - b.roomsCount : b.roomsCount - a.roomsCount;
            }
        });

        catalogItems.forEach((item) => {
            item.price = String(item.price);
            let str = '';
            let count = 0;
            for (let i = item.price.length - 1; i >= 0; i--) {
                str = item.price[i] + str;
                if (count === 2 && i !== item.price.length) {
                    str = " " + str;
                    count = 0;
                } else {
                    count++;
                }
            }
            item.price = str;
        });

        this.catalogList.innerHTML = '';
        this.render(catalogItems);
    }

    render(catalogItems) {
        const fragment = document.createDocumentFragment();

        const template = document.querySelector('#apartment-item-template').innerHTML;
        Mustache.parse(template);
        
        catalogItems.forEach(((item) => {
            const rendered = Mustache.render(template, item);
            const li = document.createElement('li');
            li.classList.add('catalog__apartment-item');
            li.innerHTML = rendered;
            switch (item.status) {
                case "Забронировано": 
                    li.querySelector('.apartment-item').classList.add('apartment-item--booked');
                    li.querySelector('.apartment-item__status').classList.add('apartment-item__status--booked');
                    break;
                case "Свободно":
                    li.querySelector('.apartment-item').classList.add('apartment-item--free');
                    li.querySelector('.apartment-item__status').classList.add('apartment-item__status--free');
                    break;
                case "Продано":
                    li.querySelector('.apartment-item').classList.add('apartment-item--sold-out');
                    li.querySelector('.apartment-item__status').classList.add('apartment-item__status--sold-out');
                    break;
            }
            fragment.appendChild(li);
        }));

        this.catalogList.appendChild(fragment);
    }
}