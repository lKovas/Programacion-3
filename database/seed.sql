-- ============================================
-- MARKETGO - DATABASE SEED
-- PostgreSQL
-- ============================================


-- ============================================
-- CATEGORIAS
-- ============================================

INSERT INTO CATEGORIA (nombre, descripcion) VALUES
(
    'Electronica',
    'Dispositivos, gadgets y tecnologia de consumo.'
),
(
    'Ropa y Calzado',
    'Prendas de vestir y zapatos para toda ocasion.'
),
(
    'Hogar y Cocina',
    'Muebles, decoracion y utensilios de cocina.'
),
(
    'Deportes y Fitness',
    'Equipamiento deportivo y accesorios.'
),
(
    'Libros y Papeleria',
    'Novelas, cuadernos y articulos de oficina.'
);


-- ============================================
-- PRODUCTOS
-- ============================================

INSERT INTO PRODUCTO
    (nombre, precio, imagen, stock, idCategoria)
VALUES
(
    'Smartphone Pro Max',
    999.99,
    '/img/productos/smartphone.jpg',
    50,
    1
),
(
    'Audifonos Bluetooth',
    149.50,
    '/img/productos/audifonos.jpg',
    120,
    1
),
(
    'Teclado Mecanico RGB',
    89.99,
    '/img/productos/teclado.jpg',
    45,
    1
),
(
    'Mouse Gamer Inalambrico',
    49.99,
    '/img/productos/mouse.jpg',
    85,
    1
),
(
    'Soporte para Laptop de Aluminio',
    35.50,
    '/img/productos/soporte-laptop.jpg',
    40,
    1
),
(
    'Foco LED de Alta Potencia',
    18.99,
    '/img/productos/foco-led.jpg',
    90,
    1
),
(
    'Foco de Cabeza Recargable',
    16.00,
    '/img/productos/foco-cabeza.jpg',
    110,
    1
),
(
    'Zapatillas Running',
    79.90,
    '/img/productos/zapatillas.jpg',
    80,
    2
),
(
    'Chaqueta de Mezclilla',
    65.00,
    '/img/productos/chaqueta.jpg',
    70,
    2
),
(
    'Sudadera con Capucha',
    35.00,
    '/img/productos/sudadera.jpg',
    110,
    2
),
(
    'Botas de Hule Impermeables',
    22.50,
    '/img/productos/botas.jpg',
    80,
    2
),
(
    'Camiseta de Algodon',
    19.99,
    '/img/productos/camiseta.jpg',
    200,
    2
),
(
    'Juego de Sabana de Algodon Egipcio',
    85.50,
    '/img/productos/sabanas.jpg',
    40,
    3
),
(
    'Cafetera de Goteo',
    45.00,
    '/img/productos/cafetera.jpg',
    35,
    3
),
(
    'Hamaca de Algodon Artesanal',
    45.00,
    '/img/productos/hamaca.jpg',
    35,
    3
),
(
    'Almohada Ergonomica',
    34.99,
    '/img/productos/almohada.jpg',
    65,
    3
),
(
    'Sarten Antiadherente 24cm',
    28.50,
    '/img/productos/sarten.jpg',
    60,
    3
),
(
    'Paquete de Cafe Tarrazu 1kg',
    24.00,
    '/img/productos/cafe-tarrazu.jpg',
    150,
    3
),
(
    'Lampara de Escritorio LED',
    22.99,
    '/img/productos/lampara.jpg',
    55,
    3
),
(
    'Sombrilla Reforzada',
    15.00,
    '/img/productos/sombrilla.jpg',
    150,
    3
),
(
    'Cafe Chorreado Gourmet 500g',
    12.50,
    '/img/productos/cafe-chorreado.jpg',
    200,
    3
),
(
    'Mancuernas 10kg',
    45.99,
    '/img/productos/mancuernas.jpg',
    30,
    4
),
(
    'Maletin Deportivo',
    39.99,
    '/img/productos/maletin.jpg',
    75,
    4
),
(
    'Balon de Futbol Profesional',
    32.00,
    '/img/productos/balon.jpg',
    95,
    4
),
(
    'Bolsa Impermeable Seca 20L',
    25.00,
    '/img/productos/bolsa-seca.jpg',
    60,
    4
),
(
    'Bloqueador Solar Biodegradable',
    14.99,
    '/img/productos/bloqueador.jpg',
    140,
    4
),
(
    'Cuerda para Saltar Rapida',
    12.99,
    '/img/productos/cuerda.jpg',
    180,
    4
),
(
    'Termo de Acero Inoxidable 1L',
    24.50,
    '/img/productos/termo.jpg',
    120,
    4
),
(
    'Repelente de Insectos Natural Extra Fuerte',
    9.50,
    '/img/productos/repelente.jpg',
    300,
    4
),
(
    'Cuaderno Inteligente Reutilizable',
    32.99,
    '/img/productos/cuaderno.jpg',
    75,
    5
),
(
    'Set de Marcadores de Arte',
    24.99,
    '/img/productos/marcadores.jpg',
    130,
    5
),
(
    'Organizador de Escritorio de Madera',
    19.50,
    '/img/productos/organizador.jpg',
    90,
    5
),
(
    'Libro Habitos Atomicos',
    18.00,
    '/img/productos/habitos-atomicos.jpg',
    40,
    5
);