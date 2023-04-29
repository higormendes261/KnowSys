const Instrucao = require('../models/InstrucaoModel');

exports.index = (req, res) => {
    res.render('novaInstrucao', {
      instrucao: {}
    });
  };

exports.register = async function(req, res) {
    try {
      const instrucao = new Instrucao(req.body);
      await instrucao.register();
  
      if(instrucao.errors.length > 0) {
        req.flash('errors', instrucao.errors);
        req.session.save(() => res.redirect('back'));
        return;
      }
  
      req.flash('success', 'Instrução registrada com sucesso.');
      req.session.save(() => res.redirect(`/instrucao/index/`));
      return;
    } catch(e) {
      console.log(e);
      return res.render('404');
    }
  };