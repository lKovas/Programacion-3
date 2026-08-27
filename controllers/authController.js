const admin = require('../config/firebase');
const Cliente = require('../models/clienteModel');

const authController = {

  // Mostrar página de login
  showLogin: (req, res) => {
    res.render('auth/login');
  },

  // Mostrar página de registro
  showRegister: (req, res) => {
    res.render('auth/register');
  },

  // Verificar token de Firebase y crear sesión
  verifyToken: async (req, res) => {
    try {
      const { token, nombre, telefono, direccion } = req.body;

      // Verificar el token con Firebase Admin
      const decoded = await admin.verifyIdToken(token);
      const { email, uid } = decoded;

      // Determinar rol mediante Custom Claims
      const rol = decoded.admin === true ? 'admin' : 'cliente';

      // Buscar cliente en PostgreSQL
      let cliente = await Cliente.getByCorreo(email);

      // Si no existe, crearlo
      if (!cliente) {
        cliente = await Cliente.create(
          nombre || email,
          email,
          telefono || '',
          direccion || ''
        );
      }

      // Guardar datos del usuario en la sesion
      req.session.usuario = {
        uid,
        email,
        idCliente: cliente.idcliente,
        nombre: cliente.nombre,
        rol
      };

      console.log('Usuario autenticado:', req.session.usuario);

      res.json({
        success: true,
        redirect: '/productos'
      });

    } catch (error) {
      console.error('Error al verificar token:', error);

      res.status(401).json({
        success: false,
        message: 'Token invalido'
      });
    }
  },

  // Cerrar sesión
  logout: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  }

};

module.exports = authController;