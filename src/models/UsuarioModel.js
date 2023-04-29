const mongoose = require('mongoose');
const validator = require('validator');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  matricula: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: '' },
  senha: { type: String, required: false, default: '' },
  criadoEm: { type: Date, default: Date.now },
});

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);

function Usuario(body) {
  this.body = body;
  this.errors = [];
  this.usuario = null;
}


Usuario.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.usuario = await UsuarioModel.create(this.body);
};

Usuario.prototype.valida = function() {
  this.cleanUp();

  // Validação
  // O e-mail precisa ser válido
  if(!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
  if(!this.body.matricula) this.errors.push('Matrícula é um campo obrigatório.');
  if(!this.body.email) this.errors.push('Email é um campo obrigatório.');
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');
  if(!this.body.senha) this.errors.push('Senha é um campo obrigatório.');
};

Usuario.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    nome: this.body.nome,
    matricula: this.body.matricula,
    email: this.body.email,
    senha: this.body.senha,
  };
};

Usuario.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.usuario = await UsuarioModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
Usuario.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const usuario = await UsuarioModel.findById(id);
  return usuario;
};

Usuario.buscaUsuario = async function() {
  const usuario = await UsuarioModel.find()
    .sort({ criadoEm: -1 });
  return usuario;
};

Usuario.delete = async function(id) {
  if(typeof id !== 'string') return;
  const usuario = await UsuarioModel.findOneAndDelete({_id: id});
  return usuario;
};


module.exports = Usuario;