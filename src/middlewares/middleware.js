// Injetar conteúdo em múltiplos ejs
exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors'); // Var. erros disponível em todas as páginas!
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

//Mandando token CSRF para cada uma das páginas
exports.csrfMiddleware = (req, res, next) => { 
    res.locals.csrfToken = req.csrfToken();
    next();
}

// Checando erro de token do CSRF
exports.checkCsrf = (err, req, res, next) => {
    if(err){
        return res.render('404')
    };

    next();
}