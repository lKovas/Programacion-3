const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { verifySession } = require('../middlewares/firebaseAuthMiddleware');

// Todas las rutas de pedidos requieren sesión activa
router.use(verifySession);

// GET /pedidos  (historial del cliente)
router.get('/', pedidoController.index);

// GET /pedidos/:id  (detalle de un pedido)
router.get('/:id', pedidoController.show);

// POST /pedidos/crear  (confirmar compra)
router.post('/crear', pedidoController.crear);

module.exports = router;