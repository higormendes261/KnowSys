const Imagem = require('../models/ImagemModel');

exports.index = async(req, res) => {
    res.render('cadastro');
}