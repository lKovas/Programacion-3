const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET || 'marketgo_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 
  }
}));
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  res.locals.esAdmin = req.session.usuario?.rol === 'admin' || false;
  next();
});
app.use('/auth',      require('./routes/authRoutes'));
app.use('/productos', require('./routes/productoRoutes'));
app.use('/carrito',   require('./routes/carritoRoutes'));
app.use('/pedidos',   require('./routes/pedidoRoutes'));
app.use('/cliente',   require('./routes/clienteRoutes'));
app.use('/admin',     require('./routes/adminRoutes'));
app.get('/', (req, res) => {
  res.redirect('/productos');
});
app.use((req, res) => {
  res.status(404).render('error', { mensaje: 'Página no encontrada' });
});
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});