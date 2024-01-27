import 'core-js/stable';
import 'regenerator-runtime/runtime';

import LoginValidation from './modules/LoginValidation';
import ContatoValidation from './modules/ContatoValidation';

const cadastro = new LoginValidation('.form-cadastro');
const login = new LoginValidation('.form-login');

const contato = new ContatoValidation('.form-contato');

login.init();
cadastro.init();
contato.init();