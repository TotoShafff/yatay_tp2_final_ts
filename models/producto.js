const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  producto: {
    type: String,
    required: [true, 'El nombre del producto es requerido'],
    trim: true,
    minlength: [1, 'El nombre no puede estar vacío']
  },
  
  stockAmount: {
    type: Number,
    required: [true, 'El stock es requerido'],
    min: [0, 'El stock no puede ser negativo'],
    validate: {
      validator: Number.isInteger,
      message: 'El stock debe ser un número entero'
    }
  },
  
  fechaIngreso: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, {
  timestamps: true,
  versionKey: false
});

productoSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  }
});

module.exports = mongoose.model('Producto', productoSchema);

