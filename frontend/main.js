import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/login.js' // NÃO TÁ EXECUTANDO

const login = new Login('.form-login');
const cadastro = new Login('.form-register');

login.init()
cadastro.init()