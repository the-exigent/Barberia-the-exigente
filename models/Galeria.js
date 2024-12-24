const mongoose = require('mongoose');

const galeriaSchema = new mongoose.Schema({  
  title: { type: String, required: true },
  description:{type: String, requiered: true},
  image: { type: String, required: true },
});

module.exports = mongoose.model('Galeria', galeriaSchema);