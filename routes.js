const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const cadastroController = require('./src/controllers/cadastroController');
const duvidasController = require('./src/controllers/duvidasController');
const novaInstrucaoController = require('./src/controllers/novaInstrucaoController');
const editarUsuariosController = require('./src/controllers/editarUsuariosController');

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

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

// Rotas de dúvidas
route.get('/duvidas/index', duvidasController.index);

//Rota de instrução
route.get('/novaInstrucao/index', novaInstrucaoController.index);

//Rota de editar usuarios
route.get('/editarUsuarios/index', editarUsuariosController.index);

module.exports = route;
