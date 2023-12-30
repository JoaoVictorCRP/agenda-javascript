const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
    titulo: {type: String, required: true },
    descricao: String
})

const HomeModel = mongoose.model('Home', HomeSchema) // Exportando...

class Home { // classse que validará os dados a serem inseridos.

}

module.exports = Home;