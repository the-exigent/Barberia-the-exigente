const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Registro de administrador (solo para desarrollo)
router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', authController.registerAdmin);

// Inicio de sesión
router.get('/login', authController.showLoginPage);
router.post('/login', authController.loginAdmin);

// Cierre de sesión
router.get('/logout', authController.logoutAdmin);

module.exports = router;
