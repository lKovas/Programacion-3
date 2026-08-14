const pool = require('../config/db');

const Categoria = {

  // Obtener todas las categorías
  getAll: async () => {
    const result = await pool.query('SELECT * FROM CATEGORIA ORDER BY idCategoria ASC');
    return result.rows;
  },

  // Obtener una categoría por ID
  getById: async (id) => {
    const result = await pool.query(
      'SELECT * FROM CATEGORIA WHERE idCategoria = $1', 
      [id]
    );
    return result.rows[0];
  },

  // Crear categoría
  create: async (nombre, descripcion) => {
    const result = await pool.query(
      'INSERT INTO CATEGORIA (nombre, descripcion) VALUES ($1, $2) RETURNING *',
      [nombre, descripcion]
    );
    return result.rows[0];
  },

  // Actualizar categoría
  update: async (id, nombre, descripcion) => {
    const result = await pool.query(
      'UPDATE CATEGORIA SET nombre = $1, descripcion = $2 WHERE idCategoria = $3 RETURNING *',
      [nombre, descripcion, id]
    );
    return result.rows[0];
  },

  // Eliminar categoría
  delete: async (id) => {
    await pool.query('DELETE FROM CATEGORIA WHERE idCategoria = $1', [id]);
  }

};

module.exports = Categoria;