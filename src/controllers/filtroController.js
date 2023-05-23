const Filtro = require('../models/FiltroModel');

exports.index = (req, res) => {
  res.render('usuarios');
}

exports.register =  function(req, res) {
  const filtro = new Filtro(req.body);
  //res.send(filtro.body.pesquisarNome + " " + filtro.body.pesquisarEmail );

}