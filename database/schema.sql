-- ============================================
-- TABLA: CATEGORIA
-- ============================================

CREATE TABLE CATEGORIA (
    idCategoria SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);


-- ============================================
-- TABLA: PRODUCTO
-- ============================================

CREATE TABLE PRODUCTO (
    idProducto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    imagen TEXT,
    stock INTEGER DEFAULT 0,
    idCategoria INTEGER NOT NULL,

    CONSTRAINT fk_producto_categoria
        FOREIGN KEY (idCategoria)
        REFERENCES CATEGORIA(idCategoria)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_producto_precio
        CHECK (precio >= 0),

    CONSTRAINT chk_producto_stock
        CHECK (stock >= 0)
);


-- ============================================
-- TABLA: CLIENTE
-- ============================================

CREATE TABLE CLIENTE (
    idCliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT
);


-- ============================================
-- TABLA: CARRITO
-- ============================================

CREATE TABLE CARRITO (
    idCarrito SERIAL PRIMARY KEY,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idCliente INTEGER NOT NULL,

    CONSTRAINT fk_carrito_cliente
        FOREIGN KEY (idCliente)
        REFERENCES CLIENTE(idCliente)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- ============================================
-- TABLA: DETALLE_CARRITO
-- ============================================

CREATE TABLE DETALLE_CARRITO (
    idDetalle SERIAL PRIMARY KEY,
    cantidad INTEGER NOT NULL,
    idCarrito INTEGER NOT NULL,
    idProducto INTEGER NOT NULL,

    CONSTRAINT fk_detalle_carrito_carrito
        FOREIGN KEY (idCarrito)
        REFERENCES CARRITO(idCarrito)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detalle_carrito_producto
        FOREIGN KEY (idProducto)
        REFERENCES PRODUCTO(idProducto)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_detalle_carrito_cantidad
        CHECK (cantidad > 0)
);


-- ============================================
-- TABLA: PEDIDO
-- ============================================

CREATE TABLE PEDIDO (
    idPedido SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    direccionEntrega TEXT NOT NULL,
    estado VARCHAR(50) DEFAULT 'Pendiente',
    total DECIMAL(10,2) NOT NULL,
    idCliente INTEGER NOT NULL,

    CONSTRAINT fk_pedido_cliente
        FOREIGN KEY (idCliente)
        REFERENCES CLIENTE(idCliente)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_pedido_total
        CHECK (total >= 0)
);


-- ============================================
-- TABLA: DETALLE_PEDIDO
-- ============================================

CREATE TABLE DETALLE_PEDIDO (
    idDetallePedido SERIAL PRIMARY KEY,
    cantidad INTEGER NOT NULL,
    precioCompra DECIMAL(10,2) NOT NULL,
    idPedido INTEGER NOT NULL,
    idProducto INTEGER NOT NULL,

    CONSTRAINT fk_detalle_pedido_pedido
        FOREIGN KEY (idPedido)
        REFERENCES PEDIDO(idPedido)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_detalle_pedido_producto
        FOREIGN KEY (idProducto)
        REFERENCES PRODUCTO(idProducto)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_detalle_pedido_cantidad
        CHECK (cantidad > 0),

    CONSTRAINT chk_detalle_pedido_precio
        CHECK (precioCompra >= 0)
);