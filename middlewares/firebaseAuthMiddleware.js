const admin = require('../config/firebase');

const firebaseAuthMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        mensaje: 'No autorizado. Token no enviado.'
      });
    }

    const token = authorizationHeader.split('Bearer ')[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.firebaseUser = {
      uid: decodedToken.uid,
      correo: decodedToken.email,
      nombre: decodedToken.name || null
    };

    next();
  } catch (error) {
    console.error('Error al verificar token de Firebase:', error);

    return res.status(401).json({
      mensaje: 'Token inválido o expirado.'
    });
  }
};

module.exports = firebaseAuthMiddleware;