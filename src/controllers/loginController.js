const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    res.render('login.ejs');
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors); // flash de erros no cadastro.
            req.session.save(function() { // Salvando sessão
                return res.redirect('/login/index'); // Mandando de volta para a página de login
            });
            return;
        };

        req.flash('success', 'Seu usuário foi criado com sucesso!'); // flash de erros no cadastro.
        req.session.save(function() { // Salvando sessão
            return res.redirect('/login/index'); // Mandando de volta para a página de login
        });

    } catch(e) {
        console.log(e);
        res.render('404');
    }
};

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.logar();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors); // flash de erros no cadastro.
            req.session.save(function() { // Salvando sessão
                return res.redirect('/login/index'); // Mandando de volta para a página de login
            });
            return;
        };

        req.flash('success', 'Você entrou no sistema.');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/login/index');
        });

    } catch(e) {
        console.log(e);
        res.render('404');
    }
};

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/')
}