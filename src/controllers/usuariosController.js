const Usuario = require('../models/UsuarioModel');

exports.index = async(req, res) => {
  const usuario = await Usuario.buscaUsuario();
  res.render('usuarios', { usuario });
};

