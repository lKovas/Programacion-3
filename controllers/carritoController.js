const Carrito = require('../models/carritoModel')
const DetalleCarrito = require('../models/detalleCarritoModel');
const Producto = require('../models/productoModel');

const carritoController = {

  // GET /carrito  (ver carrito del cliente)
  index: async (req, res) => {
    try {
      const idCliente = req.session.usuario.idCliente;
      const carrito = await Carrito.getByCliente(idCliente);

      if (!carrito) {
        return res.render('carrito/index', { items: [], total: 0 });
      }

      const items = await DetalleCarrito.getByCarrito(carrito.idcarrito);

      // Calcular total
      const total = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

      res.render('carrito/index', { items, total, idCarrito: carrito.idcarrito });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al cargar el carrito' });
    }
  },

  // POST /carrito/agregar
  agregar: async (req, res) => {
    try {

      const idCliente = req.session.usuario.idCliente;
      const { idProducto, cantidad } = req.body;

      // Verificar que el producto existe
      const producto = await Producto.getById(idProducto);

      if (!producto) {
        return res.status(404).render('error', {
          mensaje: 'Producto no encontrado'
        });
      }

      // Verificar stock
      if (producto.stock < cantidad) {
        return res.status(400).render('error', {
          mensaje: 'Stock insuficiente'
        });
      }

      // Obtener o crear carrito
      let carrito = await Carrito.getByCliente(idCliente);

      if (!carrito) {
        carrito = await Carrito.create(idCliente);
      }

      // Agregar producto
      await DetalleCarrito.add(
        carrito.idcarrito,
        idProducto,
        cantidad
      );

      // Ir al carrito
      res.redirect('/carrito');

    } catch (error) {

      console.error('========== ERROR CARRITO ==========');
      console.error(error);
      console.error('===================================');

      res.status(500).render('error', {
        mensaje: 'Error al agregar al carrito'
      });
    }
  },

  // POST /carrito/actualizar/:idDetalle
  actualizar: async (req, res) => {
    try {
      const { cantidad } = req.body;
      await DetalleCarrito.updateCantidad(req.params.idDetalle, cantidad);
      res.redirect('/carrito');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al actualizar carrito' });
    }
  },

  // POST /carrito/eliminar/:idDetalle
  eliminar: async (req, res) => {
    try {
      await DetalleCarrito.delete(req.params.idDetalle);
      res.redirect('/carrito');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al eliminar item del carrito' });
    }
  },

  // POST /carrito/vaciar
  vaciar: async (req, res) => {
    try {
      const idCliente = req.session.usuario.idCliente;
      const carrito = await Carrito.getByCliente(idCliente);
      if (carrito) {
        await DetalleCarrito.deleteByCarrito(carrito.idcarrito);
      }
      res.redirect('/carrito');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al vaciar el carrito' });
    }
  }

};

module.exports = carritoController;