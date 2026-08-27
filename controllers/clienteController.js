const Cliente = require('../models/clienteModel');
const Pedido = require('../models/pedidoModel');

const clienteController = {

  // GET /cliente/perfil
  // Mostrar perfil del cliente
  perfil: async (req, res) => {
    try {
      const idCliente = req.session.usuario.idCliente;

      const cliente = await Cliente.getById(idCliente);

      if (!cliente) {
        return res.status(404).render('error', {
          mensaje: 'Cliente no encontrado'
        });
      }

      res.render('cliente/perfil', {
        cliente
      });

    } catch (error) {
      console.error('Error al cargar perfil:', error);

      res.status(500).render('error', {
        mensaje: 'Error al cargar perfil'
      });
    }
  },

  // POST /cliente/perfil
  // Actualizar perfil del cliente
  actualizarPerfil: async (req, res) => {
    try {
      const idCliente = req.session.usuario.idCliente;

      const {
        nombre,
        telefono,
        direccion
      } = req.body;

      await Cliente.update(
        idCliente,
        nombre,
        telefono,
        direccion
      );

      // Actualizar el nombre almacenado en la sesion
      req.session.usuario.nombre = nombre;

      res.redirect('/cliente/perfil');

    } catch (error) {
      console.error('Error al actualizar perfil:', error);

      res.status(500).render('error', {
        mensaje: 'Error al actualizar perfil'
      });
    }
  },

  // GET /cliente/pedidos
  // Mostrar historial de pedidos del cliente
  pedidos: async (req, res) => {
    try {
      const idCliente = req.session.usuario.idCliente;

      const pedidos = await Pedido.getByCliente(idCliente);

      res.render('cliente/pedidos', {
        pedidos
      });

    } catch (error) {
      console.error('Error al cargar pedidos:', error);

      res.status(500).render('error', {
        mensaje: 'Error al cargar pedidos'
      });
    }
  }

};

module.exports = clienteController;