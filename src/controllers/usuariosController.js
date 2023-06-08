const Usuario = require('../models/CadastroModel');

exports.index = async(req, res) => {
  const usuario = await Usuario.buscaUsuario();
  res.render('usuarios', { usuario });
};

//Filtros
exports.buscarPorNome = async(req, res) => {
  const nome = req.query.pesquisarNome.toUpperCase();

  const usuario = await Usuario.filtrarUsuarios( nome);
  res.render('usuarios', { usuario });

  console.log(usuario)
  
};
