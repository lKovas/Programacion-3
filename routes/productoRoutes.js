const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { verifySession } = require('../middlewares/firebaseAuthMiddleware');

// GET /productos  (catálogo público, cualquiera lo ve)
router.get('/', productoController.index);

// GET /productos/:id  (detalle del producto)
router.get('/:id', productoController.show);

module.exports = router;