const Usuario = require('../models/CadastroModel');

exports.index = async(req, res) => {
  const usuario = await Usuario.buscaUsuario();
  res.render('usuarios', { usuario });
};

//Filtros
exports.buscarPorNome = async(req, res) => {
  const nome = req.query.pesquisarNome;
  const email = req.query.pesquisarEmail;
  const matricula = req.query.pesquisarMatricula;

  const usuario = await Usuario.filtrarUsuarios( nome, email, matricula);
  res.render('usuarios', { usuario });
  
};
