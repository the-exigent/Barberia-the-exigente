const Galeria = require('../models/Galeria');


// Obtener todos los servicios
exports.getGaleria = async (req, res) => {
  try {
    const galeria = await Galeria.find();
    res.render('pages/galeri', { galeria });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los servicios');
  }
};

// Añadir un nuevo servicio
exports.addGaleria = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newGaleria = new Galeria({ title, description, image });
    await newGaleria.save();
    res.redirect('/admin/galeria');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el servicio');
  }
};

// Eliminar un servicio
exports.deleteGaleria = async (req, res) => {
  try {
    const { id } = req.params;
    await Galeria.findByIdAndDelete(id);
    res.redirect('/admin/galeria');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el servicio');
  }
};