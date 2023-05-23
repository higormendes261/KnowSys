const Usuario = require('../models/CadastroModel');

exports.index = async(req, res) => {
  const usuario = await Usuario.buscaUsuario();
  res.render('usuarios', { usuario });
};


exports.buscarPorNome = async function(req, res) {
  const nome = req.query.pesquisarNome; // Obtém o nome da consulta

  const usuario = await Usuario.buscarPeloNome(nome);

  res.render('usuarios', { usuario });
};
