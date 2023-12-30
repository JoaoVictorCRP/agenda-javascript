// Injetar conteúdo em múltiplos ejs
exports.middlewareGlobal = (req, res, next) => {
    res.locals.variavelLocal = 'Sou uma var. disponível em todas as páginas! '; 

    if(req.body.cliente) {
        console.log();
        console.log(`Vi que você postou ${req.body.cliente}`);
        console.log();
    }
    next();
};

//Mandando token CSRF para cada uma das páginas
exports.csrfMiddleware = (req, res, next) => { 
    res.locals.csrfToken = req.csrfToken();
    next();
}

// Checando erro de token do CSRF
exports.checkCsrf = (err, req, res, next) => {
    if(err){ // Caso qualquer erro ocorra, a página do 404 será renderizada.
        return res.render('404')
    };

    next();
}