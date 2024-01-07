const Contato = require('../models/ContatoModel');

exports.index = (req,res) => {
    res.render('contato'), {
        contato: {} //Campos de contato vazio ao entrar na pagina de cadastro
    };
}

exports.register = async (req,res) => {
    try {
        const contato = new Contato(req.body);
        await contato.register(); // Salvando na BD
        
        if (contato.errors.length >0) {
            req.flash('errors', contato.errors)
            req.session.save( () => res.redirect('back'))
            return;
        }
    
        req.flash('success', 'Contato registrado com sucesso!');
        req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`)); //Acessando o id do registro do contato no MongoDB. 
        return;
    } catch(e) {
        console.log(e);
        return res.render('404');
    };
};

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404'); // Se não há parametros

    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato){
        res.render('404');
    };

    res.render('contato', { contato })
}