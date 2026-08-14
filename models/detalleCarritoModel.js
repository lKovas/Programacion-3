const pool = require('../config/db');

const DetalleCarrito = {

  // Obtener todos los items de un carrito (con info del producto)
  getByCarrito: async (idCarrito) => {
    const result = await pool.query(
      `SELECT dc.*, p.nombre, p.precio, p.imagen 
       FROM DETALLE_CARRITO dc
       JOIN PRODUCTO p ON dc.idProducto = p.idProducto
       WHERE dc.idCarrito = $1`,
      [idCarrito]
    );
    return result.rows;
  },

  // Agregar producto al carrito
  add: async (idCarrito, idProducto, cantidad) => {
    const result = await pool.query(
      `INSERT INTO DETALLE_CARRITO (idCarrito, idProducto, cantidad) 
       VALUES ($1, $2, $3) RETURNING *`,
      [idCarrito, idProducto, cantidad]
    );
    return result.rows[0];
  },

  // Actualizar cantidad de un item en el carrito
  updateCantidad: async (idDetalle, cantidad) => {
    const result = await pool.query(
      `UPDATE DETALLE_CARRITO SET cantidad = $1 
       WHERE idDetalle = $2 RETURNING *`,
      [cantidad, idDetalle]
    );
    return result.rows[0];
  },

  // Eliminar un item del carrito
  delete: async (idDetalle) => {
    await pool.query(
      'DELETE FROM DETALLE_CARRITO WHERE idDetalle = $1', 
      [idDetalle]
    );
  },

  // Vaciar todo el carrito
  deleteByCarrito: async (idCarrito) => {
    await pool.query(
      'DELETE FROM DETALLE_CARRITO WHERE idCarrito = $1', 
      [idCarrito]
    );
  }

};

module.exports = DetalleCarrito;