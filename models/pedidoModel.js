const pool = require('../config/db');

const Pedido = {

  // Obtener todos los pedidos (admin)
  getAll: async () => {
    const result = await pool.query(`
      SELECT p.*, c.nombre AS nombreCliente 
      FROM PEDIDO p
      JOIN CLIENTE c ON p.idCliente = c.idCliente
      ORDER BY p.fecha DESC
    `);
    return result.rows;
  },

  // Obtener pedidos de un cliente
  getByCliente: async (idCliente) => {
    const result = await pool.query(
      'SELECT * FROM PEDIDO WHERE idCliente = $1 ORDER BY fecha DESC',
      [idCliente]
    );
    return result.rows;
  },

  // Obtener pedido por ID
  getById: async (id) => {
    const result = await pool.query(
      `SELECT p.*, c.nombre AS nombreCliente 
       FROM PEDIDO p
       JOIN CLIENTE c ON p.idCliente = c.idCliente
       WHERE p.idPedido = $1`,
      [id]
    );
    return result.rows[0];
  },

  // Crear pedido
  create: async (direccionEntrega, total, idCliente) => {
    const result = await pool.query(
      `INSERT INTO PEDIDO (direccionEntrega, total, idCliente) 
       VALUES ($1, $2, $3) RETURNING *`,
      [direccionEntrega, total, idCliente]
    );
    return result.rows[0];
  },

  // Actualizar estado del pedido
  updateEstado: async (id, estado) => {
    const result = await pool.query(
      'UPDATE PEDIDO SET estado = $1 WHERE idPedido = $2 RETURNING *',
      [estado, id]
    );
    return result.rows[0];
  },

  // Eliminar pedido
  delete: async (id) => {
    await pool.query('DELETE FROM PEDIDO WHERE idPedido = $1', [id]);
  }

};

module.exports = Pedido;