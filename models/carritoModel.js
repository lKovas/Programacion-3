const pool = require('../config/db');

const Carrito = {

  // Obtener carrito activo de un cliente
  getByCliente: async (idCliente) => {
    const result = await pool.query(
      'SELECT * FROM CARRITO WHERE idCliente = $1 ORDER BY fechaCreacion DESC LIMIT 1',
      [idCliente]
    );
    return result.rows[0];
  },

  // Crear un carrito nuevo para un cliente
  create: async (idCliente) => {
    const result = await pool.query(
      'INSERT INTO CARRITO (idCliente) VALUES ($1) RETURNING *',
      [idCliente]
    );
    return result.rows[0];
  },

  // Eliminar carrito (cuando se convierte en pedido)
  delete: async (id) => {
    await pool.query('DELETE FROM CARRITO WHERE idCarrito = $1', [id]);
  }

};

module.exports = Carrito;