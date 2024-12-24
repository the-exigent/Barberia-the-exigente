const Service = require('../models/Service');

// Obtener todos los servicios
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.render('pages/services', { services });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los servicios');
  }
};

// Añadir un nuevo servicio
exports.addService = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const newService = new Service({ title, description, price, image });
    await newService.save();
    res.redirect('/admin/services');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el servicio');
  }
};

// Eliminar un servicio
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.redirect('/admin/services');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el servicio');
  }
};
