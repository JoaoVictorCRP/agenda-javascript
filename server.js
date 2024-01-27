// CRUD  =>   CREATE,    READ,     UPDATE,    DELETE
//            (POST)     (GET)     (PUT)     (DELETE)

//Requerindo dependências & estabelecendo conexão com o MongoDB
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectionString = mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log("Conectado com sucesso!")
        app.emit("pronto");
    })
    .catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flashMessages = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const { middlewareGlobal, csrfMiddleware, checkCsrf } = require('./src/middlewares/middleware.js');
const csrf = require('csurf');

// Usando dependências, settando cookies e views do ejs
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
const sessionOptions = session({
    secret: 'É segredo, não conto a ninguém',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60  *  60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flashMessages());
app.use(helmet());
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(csrf());
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrf);
app.use(routes);

// Está vivo...
app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Acessar http://localhost:3000')
        console.log('Servidor executando na porta 3000');
    });
})