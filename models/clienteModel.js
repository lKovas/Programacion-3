const pool = require('../config/db');

const Cliente = {

  // Obtener todos los clientes
  getAll: async () => {
    const result = await pool.query('SELECT * FROM CLIENTE ORDER BY idCliente ASC');
    return result.rows;
  },

  // Obtener cliente por ID
  getById: async (id) => {
    const result = await pool.query(
      'SELECT * FROM CLIENTE WHERE idCliente = $1', 
      [id]
    );
    return result.rows[0];
  },

  // Obtener cliente por correo (útil para Firebase auth)
  getByCorreo: async (correo) => {
    const result = await pool.query(
      'SELECT * FROM CLIENTE WHERE correo = $1', 
      [correo]
    );
    return result.rows[0];
  },

  // Crear cliente
  create: async (nombre, correo, telefono, direccion) => {
    const result = await pool.query(
      `INSERT INTO CLIENTE (nombre, correo, telefono, direccion) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, correo, telefono, direccion]
    );
    return result.rows[0];
  },

  // Actualizar cliente
  update: async (id, nombre, telefono, direccion) => {
    const result = await pool.query(
      `UPDATE CLIENTE SET nombre=$1, telefono=$2, direccion=$3 
       WHERE idCliente=$4 RETURNING *`,
      [nombre, telefono, direccion, id]
    );
    return result.rows[0];
  },

  // Eliminar cliente
  delete: async (id) => {
    await pool.query('DELETE FROM CLIENTE WHERE idCliente = $1', [id]);
  }

};

module.exports = Cliente;