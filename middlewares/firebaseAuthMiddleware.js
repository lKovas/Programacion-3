const admin = require('../config/firebase');

const verifySession = async (req, res, next) => {
  try {
    if (req.session && req.session.usuario) {
      return next();
    }

    return res.status(401).json({
      mensaje: 'No autorizado. Debes iniciar sesión.'
    });

  } catch (error) {
    console.error('Error al verificar sesión:', error);

    return res.status(401).json({
      mensaje: 'Sesión inválida.'
    });
  }
};

module.exports = { verifySession };