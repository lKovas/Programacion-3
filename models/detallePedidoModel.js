const pool = require('../config/db');

const DetallePedido = {

  // Obtener detalles de un pedido (con info del producto)
  getByPedido: async (idPedido) => {
    const result = await pool.query(
      `SELECT 
          dp.*,
          p.nombre,
          p.imagen,
          (dp.cantidad * dp.precioCompra) AS subtotal
       FROM DETALLE_PEDIDO dp
       JOIN PRODUCTO p ON dp.idProducto = p.idProducto
       WHERE dp.idPedido = $1`,
      [idPedido]
    );

    return result.rows;
  },

  // Agregar item al pedido
  create: async (cantidad, precioCompra, idPedido, idProducto) => {
    const result = await pool.query(
      `INSERT INTO DETALLE_PEDIDO 
        (cantidad, precioCompra, idPedido, idProducto) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [cantidad, precioCompra, idPedido, idProducto]
    );

    return result.rows[0];
  }

};

module.exports = DetallePedido;