const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const editarUsuarioController = require('./src/controllers/editarUsuarioController');
const cadastroController = require('./src/controllers/cadastroController');
const duvidasController = require('./src/controllers/duvidasController');
const novaInstrucaoController = require('./src/controllers/novaInstrucaoController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

//Rota de cadastro
route.get('/cadastro/index', cadastroController.index);
route.post('/cadastro/register', cadastroController.register);

// Rotas de editar usuarios
route.get('/editarUsuario/index', loginRequired, editarUsuarioController.index);
route.post('/editarUsuario/register', loginRequired, editarUsuarioController.register);
route.get('/editarUsuario/index/:id', loginRequired, editarUsuarioController.editIndex);
route.post('/editarUsuario/edit/:id', loginRequired, editarUsuarioController.edit);
route.get('/editarUsuario/delete/:id', loginRequired, editarUsuarioController.delete);

// Rotas de dúvidas
route.get('/duvidas/index', duvidasController.index);

//Rota de instrução
route.get('/novaInstrucao/index', loginRequired, novaInstrucaoController.index);
route.post('/novaInstrucao/register', loginRequired, novaInstrucaoController.register);


module.exports = route;
