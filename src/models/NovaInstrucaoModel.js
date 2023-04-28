const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const InstrucaoSchema = new mongoose.Schema({
  categoriaInstrucao: { type: String, required: true },
  temaInstrucao: { type: String, required: true },
  descricaoInstrucao: { type: String, required: true}
});

const InstrucaoModel = mongoose.model('Instrucao', InstrucaoSchema);

class Instrucao {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.tema = null;
  }

  async register() {
    this.valida();
    if(this.errors.length > 0) return;

    await this.userExists();

    if(this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.tema = await InstrucaoModel.create(this.body);
  }

  async userExists() {
    this.tema = await InstrucaoModel.findOne({ temaInstrucao: this.body.temaInstrucao });
    if(this.tema) this.errors.push('O título ja existe, favor editar-lo caso necessário.');
  }

  valida() {
    // Validação

    this.cleanUp();
    if(this.body.categoriaInstrucao.length < 4){
      this.errors.push('A categoria não pode ter menos de 4 caracteres.');
    }
    
    
    if(this.body.temaInstrucao.length < 8){
        this.errors.push('O título não pode ter menos de 8 caracteres.');
    }

    if(this.body.descricaoInstrucao.length < 20){
        this.errors.push('O título não pode ter menos de 20 caracteres.');
    }
  }
  
  cleanUp() {
    for(const key in this.body) {
      if(typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      categoriaInstrucao: this.body.categoriaInstrucao,
      temaInstrucao: this.body.temaInstrucao,
      descricaoInstrucao: this.body.descricaoInstrucao
    };
  }
}

module.exports = Instrucao;
