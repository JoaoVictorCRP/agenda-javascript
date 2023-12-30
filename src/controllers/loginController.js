const Login = require('../models/LoginModel');

exports.index = (req, res) => {
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
}