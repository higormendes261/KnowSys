const Instrucao = require('../models/NovaInstrucaoModel');
exports.index = (req, res) => {
    res.render('novaInstrucao');
}

exports.register = async function(req, res) {
    try {
      const instrucao = new Instrucao(req.body);
      await instrucao.register();
  
      if(instrucao.errors.length > 0) {
        req.flash('errors', instrucao.errors);
        req.session.save(function() {
          return res.redirect('back');
        });
        return;
      }
  
      req.flash('success', 'Sua instrução foi criada com sucesso.');
      req.session.save(function() {
        return res.redirect('back');
      });
    } catch(e) {
      console.log(e);
      return res.render('404');
    }
  };