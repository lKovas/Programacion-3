const express = require('express');
const router = express.Router();
const { verifySession } = require('../middlewares/firebaseAuthMiddleware');
const { isAdmin } = require('../middlewares/adminMiddleware');
const productoController = require('../controllers/productoController');
const categoriaController = require('../controllers/categoriaController');
const pedidoController = require('../controllers/pedidoController');

// Todas las rutas admin requieren sesión + rol admin
router.use(verifySession);
router.use(isAdmin);

// --- DASHBOARD ---
// GET /admin
router.get('/', (req, res) => {
  res.render('admin/dashboard');
});

// --- PRODUCTOS ---
// GET /admin/productos
router.get('/productos', productoController.adminIndex);

// GET /admin/productos/nuevo
router.get('/productos/nuevo', productoController.showCreate);

// POST /admin/productos/nuevo
router.post('/productos/nuevo', productoController.create);

// GET /admin/productos/:id/editar
router.get('/productos/:id/editar', productoController.showEdit);

// POST /admin/productos/:id/editar
router.post('/productos/:id/editar', productoController.update);

// POST /admin/productos/:id/eliminar
router.post('/productos/:id/eliminar', productoController.delete);

// --- CATEGORIAS ---
// GET /admin/categorias
router.get('/categorias', categoriaController.index);

// GET /admin/categorias/nueva
router.get('/categorias/nueva', categoriaController.showCreate);

// POST /admin/categorias/nueva
router.post('/categorias/nueva', categoriaController.create);

// GET /admin/categorias/:id/editar
router.get('/categorias/:id/editar', categoriaController.showEdit);

// POST /admin/categorias/:id/editar
router.post('/categorias/:id/editar', categoriaController.update);

// POST /admin/categorias/:id/eliminar
router.post('/categorias/:id/eliminar', categoriaController.delete);

// --- PEDIDOS ---
// GET /admin/pedidos
router.get('/pedidos', pedidoController.adminIndex);

// POST /admin/pedidos/:id/estado
router.post('/pedidos/:id/estado', pedidoController.updateEstado);

module.exports = router;