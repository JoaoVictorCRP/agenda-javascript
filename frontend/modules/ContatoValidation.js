import validator from "validator";

export default class ContatoVal {
    constructor(formClass) {
        this.form = document.querySelector(formClass);
        console.log('ok')
    }

    init() {
        this.events();
        console.log('init on')
    }

    events() {
        if(!this.form) return;
        this.form.addEventListener('submit', e=> {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) { // Front-End Validation
        console.log('Started....')
        const element = e.target;
        const nomeInput = element.querySelector('input[name="nome"]').value;
        const telefoneInput = element.querySelector('input[name="telefone"]').value;
        const emailInput = element.querySelector('input[name="email"]').value;
        let errors = [];

        if(!nomeInput){
            errors.push('- Nome é um campo obrigatório.')
        }
        
        if(!validator.isEmail(emailInput)) {
            errors.push('- Email inválido.');
        };

        if(/[a-zA-Z]/.test(telefoneInput)) {
            errors.push('- Telefone deve conter apenas números.')
        };

        if(!emailInput && !telefoneInput){
            errors.push('- Pelo menos um dado de contato deve ser inserido (Email ou telefone).')
        }

        if(errors.length>0){
            alert(`Impossível executar ação:\n\n${errors.join("\n")}`);
        } else element.submit();
    }
}