const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const CadastroSchema = new mongoose.Schema({
  email: { type: String, required: true },
  inputNomeEmpresa: { type: String, required: true},
  inputCnpjEmpresa: { type: String, required: true},
  inputEmailEmpresa: { type: String, requered: true},
  password: { type: String, required: true },
  inputConfirmacaoSenhaModerador: {type: String, requered: true},
  tipoUsuario: {type: String, requered: true}
});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.valida();
    if(this.errors.length > 0) return;

    await this.userExists();

    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await CadastroModel.create(this.body);
  }

  async userExists() {
    this.user = await CadastroModel.findOne({ email: this.body.email });
    if(this.user) this.errors.push('Usuário já existe.');
  }

  valida() {
    // Validação

    this.cleanUp();
    if(this.body.inputNomeEmpresa.length < 1){
      this.errors.push('O nome da empresa não pode ser vazio.');
    }
    
    
    if(this.body.inputCnpjEmpresa.length < 18){
      this.errors.push('CNPJ inválido.');
    }
    
    if(!validator.isEmail(this.body.inputEmailEmpresa)) this.errors.push('E-mail da empresa inválido.');
    
    // O e-mail precisa ser válido
    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail do moderador inválido.');
    // A senha precisa ter entre 3 e 50
    if(this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
    }

    if(this.body.password !== this.body.inputConfirmacaoSenhaModerador){
      this.errors.push('As senhas não coincidem.');
    }
    
  }
  
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      inputNomeEmpresa: this.body.inputNomeEmpresa,
      inputCnpjEmpresa: this.body.inputCnpjEmpresa,
      inputEmailEmpresa: this.body.inputEmailEmpresa,
      inputConfirmacaoSenhaModerador: this.body.inputConfirmacaoSenhaModerador,
      tipoUsuario: this.body.tipo
    };
  }
}

module.exports = Cadastro;
