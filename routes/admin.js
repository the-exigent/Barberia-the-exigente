const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceControllers');
const contactController = require('../controllers/contactControllers');
const galeriaController = require('../controllers/galeriControllers');
const authMiddleware = require('../middlewares/authMiddleware');

// Proteger rutas del panel de administración
router.use(authMiddleware.isAuthenticated);
// Panel de administración para servicios
router.get('/services', async (req, res) => {
  const services = await require('../models/Service').find();
  res.render('admin/services', { services });
});

router.get('/contact', async (req, res) => {
  const contact = await require('../models/Contact').find();
  res.render('admin/contact', { contact });
});

router.get('/galeria', async (req, res) => {
  const galeria = await require('../models/Galeria').find();
  res.render('admin/galeri', { galeria });
});

router.get('/', (req, res) => res.render('admin/index'));
router.post('/services/add', serviceController.addService);
router.post('/services/delete/:id', serviceController.deleteService);
router.post('/contact/add', contactController.addContact);
router.post('/contact/delete/:id', contactController.deleteContact);
router.post('/galeria/add', galeriaController.addGaleria);
router.post('/galeria/delete/:id', galeriaController.deleteGaleria);

module.exports = router;
