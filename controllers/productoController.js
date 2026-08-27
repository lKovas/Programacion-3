const Producto = require('../models/productoModel');
const Categoria = require('../models/categoriaModel');

const productoController = {

  // GET /productos  (vista pública del catálogo)
  index: async (req, res) => {
    try {
      const productos = await Producto.getAll();
      const categorias = await Categoria.getAll();
      res.render('productos/catalogo', {
        productos,
        categorias,
        title: 'Catalogo'
      });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al obtener productos' });
    }
  },

  // GET /productos/:id  (detalle de un producto)
  show: async (req, res) => {
    try {
      const producto = await Producto.getById(req.params.id);
      if (!producto) return res.status(404).render('error', { mensaje: 'Producto no encontrado' });
      res.render('productos/detalle', { producto });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al cargar producto' });
    }
  },

  // GET /admin/productos  (gestión admin)
  adminIndex: async (req, res) => {
    try {
      const productos = await Producto.getAll();

      res.render('admin/productos', {
        productos,
        title: 'Gestion de Productos'
      });

    } catch (error) {
      console.error(error);

      res.status(500).render('error', {
        mensaje: 'Error al obtener productos'
      });
    }
  },

  // GET /admin/productos/nuevo
  showCreate: async (req, res) => {
    try {
      const categorias = await Categoria.getAll();
      res.render('admin/productos/form', { producto: null, categorias, accion: 'Crear' });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al cargar formulario' });
    }
  },

  // POST /admin/productos/nuevo
  create: async (req, res) => {
    try {
      const {
        nombre,
        precio,
        imagen,
        stock,
        idCategoria,
        descripcion
      } = req.body;

      await Producto.create(
        nombre,
        precio,
        imagen,
        stock,
        idCategoria,
        descripcion
      );
      res.redirect('/admin/productos');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al crear producto' });
    }
  },

  // GET /admin/productos/:id/editar
  showEdit: async (req, res) => {
    try {
      const producto = await Producto.getById(req.params.id);
      const categorias = await Categoria.getAll();
      if (!producto) return res.status(404).render('error', { mensaje: 'Producto no encontrado' });
      res.render('admin/productos/form', { producto, categorias, accion: 'Editar' });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al cargar producto' });
    }
  },

  // POST /admin/productos/:id/editar
  update: async (req, res) => {
    try {
      const {
        nombre,
        precio,
        imagen,
        stock,
        idCategoria,
        descripcion
      } = req.body;

      await Producto.update(
        req.params.id,
        nombre,
        precio,
        imagen,
        stock,
        idCategoria,
        descripcion
      );
      res.redirect('/admin/productos');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al actualizar producto' });
    }
  },

  // POST /admin/productos/:id/eliminar
  delete: async (req, res) => {
    try {
      await Producto.delete(req.params.id);
      res.redirect('/admin/productos');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al eliminar producto' });
    }
  }

};

module.exports = productoController;