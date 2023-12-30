const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true },
    password: {type: String, required: true },
})

const LoginModel = mongoose.model('Login', LoginSchema) // Exportando...

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];  // Erros irão ficar nesse array
        this.user = null;
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return;

        try {
            this.user = await LoginModel.create(this.body);
        } catch(e) {
            console.log(e);
        }
    };

    valida() {
        // Limpando a requisição para validar somente os dados que desejamos:
        this.cleanUp();
        // Email precisa ser válido
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido.') // Se o email não for válido, o array de erros sofre uma incrementação
        // senha precisa ter entre 3 e 50 caracteres
        if(this.body.password.length < 3 || this.body.password.length > 50){
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
        };
    }   

    cleanUp() {
        for(const key in this.body) { // Validando chaves do body
            
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''; // Convertendo para uma string vazia caso a chave não seja string
            };
        
            this.body = { // Garantindo que os dados serão apenas email e senha.
                email: this.body.email,
                password: this.body.password
            }

        }
    }
}

module.exports = Login;