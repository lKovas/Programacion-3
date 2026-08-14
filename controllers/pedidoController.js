const Pedido = require('../models/Pedido');
const DetallePedido = require('../models/DetallePedido');
const DetalleCarrito = require('../models/DetalleCarrito');
const Carrito = require('../models/Carrito');

const pedidoController = {

  // GET /pedidos  (historial del cliente)
  index: async (req, res) => {
    try {
      const idCliente = req.session.usuario.idCliente;
      const pedidos = await Pedido.getByCliente(idCliente);
      res.render('pedidos/index', { pedidos });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al obtener pedidos' });
    }
  },

  // GET /pedidos/:id  (detalle de un pedido)
  show: async (req, res) => {
    try {
      const pedido = await Pedido.getById(req.params.id);
      const detalles = await DetallePedido.getByPedido(req.params.id);
      if (!pedido) return res.status(404).render('error', { mensaje: 'Pedido no encontrado' });
      res.render('pedidos/detalle', { pedido, detalles });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al cargar pedido' });
    }
  },

  // POST /pedidos/crear  (confirmar compra desde el carrito)
  crear: async (req, res) => {
    try {
      const idCliente = req.session.usuario.idCliente;
      const { direccionEntrega } = req.body;

      // Obtener carrito activo
      const carrito = await Carrito.getByCliente(idCliente);
      if (!carrito) return res.redirect('/carrito');

      const items = await DetalleCarrito.getByCarrito(carrito.idcarrito);
      if (items.length === 0) return res.redirect('/carrito');

      // Calcular total
      const total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

      // Crear el pedido
      const pedido = await Pedido.create(direccionEntrega, total, idCliente);

      // Crear detalles del pedido
      for (const item of items) {
        await DetallePedido.create(item.cantidad, item.precio, pedido.idpedido, item.idproducto);
      }

      // Vaciar el carrito
      await DetalleCarrito.deleteByCarrito(carrito.idcarrito);
      await Carrito.delete(carrito.idcarrito);

      res.redirect(`/pedidos/${pedido.idpedido}`);
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al crear el pedido' });
    }
  },

  // --- ADMIN ---

  // GET /admin/pedidos
  adminIndex: async (req, res) => {
    try {
      const pedidos = await Pedido.getAll();
      res.render('admin/pedidos/index', { pedidos });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al obtener pedidos' });
    }
  },

  // POST /admin/pedidos/:id/estado
  updateEstado: async (req, res) => {
    try {
      const { estado } = req.body;
      await Pedido.updateEstado(req.params.id, estado);
      res.redirect('/admin/pedidos');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al actualizar estado' });
    }
  }

};

module.exports = pedidoController;