export default class SubscribtionForm {
    constructor(form) {
        this.form = form;
        this.email = form.querySelector('.subscribtion-form__email');

        this.isValid = this.isValid.bind(this);
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.isValid()) {
                e.preventDefault();
                alert('Некорректный E-mail');
            }
        });
    }

    isValid() {
        const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = regexp.test(this.email.value);
        return isValidEmail;
    }
}