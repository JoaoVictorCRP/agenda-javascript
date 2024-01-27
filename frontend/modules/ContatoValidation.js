import validator from "validator";

export default class ContatoVal {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
    }

    init() {
        this.events();
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e=> {
            e.preventDefault();
        });
    }
}