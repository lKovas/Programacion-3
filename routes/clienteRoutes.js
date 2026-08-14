const express = require('express');
const router = express.Router();
const { verifySession } = require('../middlewares/firebaseAuthMiddleware');

// Todas las rutas del cliente requieren sesión activa
router.use(verifySession);

// GET /cliente/perfil  (ver perfil)
router.get('/perfil', async (req, res) => {
  try {
    const Cliente = require('../models/Cliente');
    const idCliente = req.session.usuario.idCliente;
    const cliente = await Cliente.getById(idCliente);
    res.render('cliente/perfil', { cliente });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { mensaje: 'Error al cargar perfil' });
  }
});

// POST /cliente/perfil  (actualizar perfil)
router.post('/perfil', async (req, res) => {
  try {
    const Cliente = require('../models/Cliente');
    const idCliente = req.session.usuario.idCliente;
    const { nombre, telefono, direccion } = req.body;
    await Cliente.update(idCliente, nombre, telefono, direccion);

    // Actualizar también la sesión
    req.session.usuario.nombre = nombre;

    res.redirect('/cliente/perfil');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { mensaje: 'Error al actualizar perfil' });
  }
});

// GET /cliente/pedidos  (historial de pedidos del cliente)
router.get('/pedidos', async (req, res) => {
  try {
    const Pedido = require('../models/Pedido');
    const idCliente = req.session.usuario.idCliente;
    const pedidos = await Pedido.getByCliente(idCliente);
    res.render('cliente/pedidos', { pedidos });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { mensaje: 'Error al cargar pedidos' });
  }
});

module.exports = router;