const mongoose = require('mongoose');

const FiltroSchema = new mongoose.Schema({
  pesquisarNome: String,
  pesquisarMatricula: String,
  pesquisarEmail: String


});

const FiltroModel = mongoose.model('Filtro', FiltroSchema);

class Filtro {
  constructor(body){
    this.body = body
  }
}


module.exports = Filtro;
