const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceControllers');
const contactController = require('../controllers/contactControllers');
const galeriaController = require('../controllers/galeriControllers');
// Página de clientes

router.get('/', (req, res) => res.render('pages/index'));
router.get('/services', serviceController.getServices);
router.get('/contact', contactController.getContact);
router.get('/galeria', galeriaController.getGaleria);

module.exports = router;


