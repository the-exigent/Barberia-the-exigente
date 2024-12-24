const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Crear aplicación de Express
const app = express();

// Configuración de sesiones
app.use(
  session({
    secret: process.env.KEY_SECRET, // Cambia esto por una clave segura
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
  })
);

// Configuración de vistas y middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas públicas
app.use('/', require('./routes/pages')); // Rutas para la página pública

// Rutas de autenticación
app.use('/', require('./routes/auth')); // Login, logout y registro

// Rutas protegidas del panel de administración
const authMiddleware = require('./middlewares/authMiddleware');
app.use('/admin', authMiddleware.isAuthenticated, require('./routes/admin'));

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || '3000';
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
