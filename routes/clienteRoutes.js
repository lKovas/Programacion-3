const express = require('express');

const router = express.Router();

const { verifySession } = require('../middlewares/firebaseAuthMiddleware');

const clienteController = require('../controllers/clienteController');

// Todas las rutas del cliente requieren sesión activa
router.use(verifySession);

// GET /cliente/perfil
router.get('/perfil', clienteController.perfil);

// POST /cliente/perfil
router.post('/perfil', clienteController.actualizarPerfil);

// GET /cliente/pedidos
router.get('/pedidos', clienteController.pedidos);

module.exports = router;