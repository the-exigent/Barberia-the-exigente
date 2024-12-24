const Contact = require('../models/Contact');


// Obtener todos los servicios
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.render('pages/contact', { contact });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los servicios');
  }
};

// Añadir un nuevo servicio
exports.addContact = async (req, res) => {
  try {
    const { name, email, telefono } = req.body;
    const newContact = new Contact({ name, email, telefono });
    await newContact.save();
    res.redirect('/admin/contact');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el servicio');
  }
};

// Eliminar un servicio
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.redirect('/admin/contact');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el servicio');
  }
};