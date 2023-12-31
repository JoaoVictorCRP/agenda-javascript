const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index); // PÁG. INICIAL DA ROTA SEMPRE CHAMAMOS DE "INDEX"
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);


module.exports = route