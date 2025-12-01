const productoRepository = require('../repository/productoRepositoryMongo');

class ProductoService {
  async crearProducto(productoData) {
    const { producto, stockAmount, fechaIngreso } = productoData;

    if (!producto || producto.trim() === '') {
      throw { statusCode: 400, error: 'El nombre del producto es requerido y no puede estar vacío' };
    }

    if (stockAmount === undefined || stockAmount === null) {
      throw { statusCode: 400, error: 'El stock es requerido' };
    }

    if (!Number.isInteger(stockAmount)) {
      throw { statusCode: 400, error: 'El stock debe ser un número entero' };
    }

    if (stockAmount < 0) {
      throw { statusCode: 400, error: 'El stock no puede ser negativo' };
    }

    const nuevoProducto = await productoRepository.create({
      producto: producto.trim(),
      stockAmount,
      fechaIngreso
    });

    return nuevoProducto;
  }

  async obtenerProductos() {
    return await productoRepository.findAll();
  }

  async obtenerProductoPorId(id) {
    const producto = await productoRepository.findById(id);
    
    if (!producto) {
      throw { statusCode: 404, error: 'Producto no encontrado' };
    }

    return producto;
  }

  async actualizarProducto(id, productoData) {
    const productoExistente = await productoRepository.findById(id);
    
    if (!productoExistente) {
      throw { statusCode: 404, error: 'Producto no encontrado' };
    }

    if (productoData.producto !== undefined) {
      if (!productoData.producto || productoData.producto.trim() === '') {
        throw { statusCode: 400, error: 'El nombre del producto no puede estar vacío' };
      }
      productoData.producto = productoData.producto.trim();
    }

    if (productoData.stockAmount !== undefined) {
      if (!Number.isInteger(productoData.stockAmount)) {
        throw { statusCode: 400, error: 'El stock debe ser un número entero' };
      }
      if (productoData.stockAmount < 0) {
        throw { statusCode: 400, error: 'El stock no puede ser negativo' };
      }
    }

    const productoActualizado = await productoRepository.update(id, productoData);
    return productoActualizado;
  }

  async eliminarProducto(id) {
    const producto = await productoRepository.findById(id);
    
    if (!producto) {
      throw { statusCode: 404, error: 'Producto no encontrado' };
    }

    await productoRepository.delete(id);
    return producto;
  }
}

module.exports = new ProductoService();

