const Usuario = require('../models/UsuarioModel');

exports.index = (req, res) => {
  res.render('editarUsuario', {
    usuario: {}
  });
};

exports.register = async(req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.register();

    if(usuario.errors.length > 0) {
      req.flash('errors', usuario.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Contato registrado com sucesso.');
    req.session.save(() => res.redirect(`/editarUsuario/index/${usuario.usuario._id}`));
    return;
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const usuario = await Usuario.buscaPorId(req.params.id);
  if(!usuario) return res.render('404');

  res.render('editarUsuario', { usuario });
};

exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const usuario = new Usuario(req.body);
    await usuario.edit(req.params.id);

    if(usuario.errors.length > 0) {
      req.flash('errors', usuario.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Usuario editado com sucesso.');
    req.session.save(() => res.redirect(`/editarUsuario/index/${usuario.usuario._id}`));
    return;
  } catch(e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const usuario = await Usuario.delete(req.params.id);
  if(!usuario) return res.render('404');

  req.flash('success', 'Usuario apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
