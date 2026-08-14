const pool = require('../config/db');

const Producto = {

  // Obtener todos los productos (con nombre de categoría)
  getAll: async () => {
    const result = await pool.query(`
      SELECT p.*, c.nombre AS nombreCategoria 
      FROM PRODUCTO p
      JOIN CATEGORIA c ON p.idCategoria = c.idCategoria
      ORDER BY p.idProducto ASC
    `);
    return result.rows;
  },

  // Obtener producto por ID
  getById: async (id) => {
    const result = await pool.query(
      `SELECT p.*, c.nombre AS nombreCategoria 
       FROM PRODUCTO p
       JOIN CATEGORIA c ON p.idCategoria = c.idCategoria
       WHERE p.idProducto = $1`,
      [id]
    );
    return result.rows[0];
  },

  // Obtener productos por categoría
  getByCategoria: async (idCategoria) => {
    const result = await pool.query(
      'SELECT * FROM PRODUCTO WHERE idCategoria = $1',
      [idCategoria]
    );
    return result.rows;
  },

  // Crear producto
  create: async (nombre, precio, imagen, stock, idCategoria) => {
    const result = await pool.query(
      `INSERT INTO PRODUCTO (nombre, precio, imagen, stock, idCategoria) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, precio, imagen, stock, idCategoria]
    );
    return result.rows[0];
  },

  // Actualizar producto
  update: async (id, nombre, precio, imagen, stock, idCategoria) => {
    const result = await pool.query(
      `UPDATE PRODUCTO 
       SET nombre=$1, precio=$2, imagen=$3, stock=$4, idCategoria=$5 
       WHERE idProducto=$6 RETURNING *`,
      [nombre, precio, imagen, stock, idCategoria, id]
    );
    return result.rows[0];
  },

  // Eliminar producto
  delete: async (id) => {
    await pool.query('DELETE FROM PRODUCTO WHERE idProducto = $1', [id]);
  }

};

module.exports = Producto;