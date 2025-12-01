const Producto = require('../models/producto');

class ProductoRepositoryMongo {
  async findAll() {
    return await Producto.find();
  }

  async findById(id) {
    return await Producto.findById(id);
  }

  async create(productoData) {
    const producto = new Producto(productoData);
    return await producto.save();
  }

  async update(id, productoData) {
    return await Producto.findByIdAndUpdate(
      id,
      productoData,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    return await Producto.findByIdAndDelete(id);
  }
}

module.exports = new ProductoRepositoryMongo();

