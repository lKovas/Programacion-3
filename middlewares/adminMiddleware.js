const adminMiddleware = (req, res, next) => {

  if (req.session && req.session.usuario?.rol === 'admin') {
    return next();
  }

  return res.redirect('/productos');
};

module.exports = adminMiddleware;