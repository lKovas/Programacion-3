const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const { verifySession } = require('../middlewares/firebaseAuthMiddleware');

// Todas las rutas del carrito requieren sesión activa
router.use(verifySession);

// GET /carrito
router.get('/', carritoController.index);

// POST /carrito/agregar
router.post('/agregar', carritoController.agregar);

// POST /carrito/actualizar/:idDetalle
router.post('/actualizar/:idDetalle', carritoController.actualizar);

// POST /carrito/eliminar/:idDetalle
router.post('/eliminar/:idDetalle', carritoController.eliminar);

// POST /carrito/vaciar
router.post('/vaciar', carritoController.vaciar);

module.exports = router;