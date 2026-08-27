const Categoria = require('../models/categoriaModel')

const categoriaController = {

  // GET /admin/categorias
  index: async (req, res) => {
    try {
      const categorias = await Categoria.getAll();
      res.render('admin/categorias/index', { categorias });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al obtener categorías' });
    }
  },

  // GET /admin/categorias/nueva
  showCreate: (req, res) => {
    res.render('admin/categorias/form', { categoria: null, accion: 'Crear' });
  },

  // POST /admin/categorias/nueva
  create: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      await Categoria.create(nombre, descripcion);
      res.redirect('/admin/categorias');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al crear categoría' });
    }
  },

  // GET /admin/categorias/:id/editar
  showEdit: async (req, res) => {
    try {
      const categoria = await Categoria.getById(req.params.id);
      if (!categoria) return res.status(404).render('error', { mensaje: 'Categoría no encontrada' });
      res.render('admin/categorias/form', { categoria, accion: 'Editar' });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al cargar categoría' });
    }
  },

  // POST /admin/categorias/:id/editar
  update: async (req, res) => {
    try {
      const { nombre, descripcion } = req.body;
      await Categoria.update(req.params.id, nombre, descripcion);
      res.redirect('/admin/categorias');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al actualizar categoría' });
    }
  },

  // POST /admin/categorias/:id/eliminar
  delete: async (req, res) => {
    try {
      await Categoria.delete(req.params.id);
      res.redirect('/admin/categorias');
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { mensaje: 'Error al eliminar categoría' });
    }
  }

};

module.exports = categoriaController;