import validator from "validator";

export default class LoginVal {
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
            this.validate(e);
        });
    }

    validate(e) { // Front-End Validation
        const element = e.target;
        const emailInput = element.querySelector('input[name="email"]').value;
        const passwordInput = element.querySelector('input[name="password"]').value;
        
        let errors = [];

        if(!validator.isEmail(emailInput)) {
            errors.push('- Email inválido.');
        };

        if(passwordInput.length < 3 || passwordInput.length > 50) {
            errors.push('- A senha precisa ter entre 3 e 50 caracteres.');
        }

        if(errors.length>0){
            alert(`Impossível executar ação:\n\n${errors.join("\n")}`);
        } else element.submit()
    }
}