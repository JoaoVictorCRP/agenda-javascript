const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');  // Algoritmo de hashing para senhas

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

    async logar() {
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ email: this.body.email });

        if(!this.user){
            this.errors.push('Usuário não existe.');
            return;
        };

        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida.')
            this.user = null; // Limpando...
            return;
        };
    }

    async register() {
        this.valida();
        if(this.errors.length > 0) return; // Validação...

        await this.userExists();

        if(this.errors.length > 0) return; //Testando existência do usuário

        const salt = bcryptjs.genSaltSync(); // Salt são dados aleatórios que servem de input adicional para a senha (dificultando o acesso de invasores ao "conteúdo real" da senha)
        this.body.password = bcryptjs.hashSync(this.body.password, salt)

        this.user = await LoginModel.create(this.body);
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
    };   

    cleanUp() {
        for(const key in this.body) { // Validando chaves do body
            
            if (typeof this.body[key] !== 'string') {
                this.body[key] = ''; // Convertendo para uma string vazia caso a chave não seja string
            };
        
            this.body = { // Garantindo que os dados serão apenas email e senha.
                email: this.body.email,
                password: this.body.password
            };

        };
    };
    
    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if(this.user) this.errors.push('Usuário já existe.')
    }
}

module.exports = Login;