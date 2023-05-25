const Usuario = require('../models/CadastroModel');

exports.index = async(req, res) => {
  const usuario = await Usuario.buscaUsuario();
  res.render('usuarios', { usuario });
};

//Filtros

exports.buscarPorNome = async function(req, res) {

  if(req.query.pesquisarNome.length > 0){
    const nome = req.query.pesquisarNome; // Obtém o nome da consulta

    const usuario = await Usuario.buscarPeloNome(nome);
  
    res.render('usuarios', { usuario });
  }

  if(req.query.pesquisarEmail.length > 0){

    const email = req.query.pesquisarEmail; // Obtém o email da consulta

    const usuario = await Usuario.buscarPeloEmail(email);
  
    res.render('usuarios', { usuario });
  }

  if(req.query.pesquisarMatricula.length > 0){

    const matricula = req.query.pesquisarMatricula; // Obtém o matricula da consulta

    const usuario = await Usuario.buscarPelaMatricula(matricula);
  
    res.render('usuarios', { usuario });



  }
};
