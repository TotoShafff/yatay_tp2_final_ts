const productoService = require('../services/productoService');

class ProductoController {
  async crear(req, res) {
    try {
      const producto = await productoService.crearProducto(req.body);
      res.status(201).json(producto);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.error || error.message || 'Error al crear el producto';
      res.status(statusCode).json({ statusCode, error: message });
    }
  }

  async listar(req, res) {
    try {
      const productos = await productoService.obtenerProductos();
      res.status(200).json(productos);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.error || error.message || 'Error al obtener los productos';
      res.status(statusCode).json({ statusCode, error: message });
    }
  }

  async obtenerPorId(req, res) {
    try {
      const producto = await productoService.obtenerProductoPorId(req.params.id);
      res.status(200).json(producto);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.error || error.message || 'Error al obtener el producto';
      res.status(statusCode).json({ statusCode, error: message });
    }
  }

  async actualizar(req, res) {
    try {
      const producto = await productoService.actualizarProducto(req.params.id, req.body);
      res.status(200).json(producto);
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.error || error.message || 'Error al actualizar el producto';
      res.status(statusCode).json({ statusCode, error: message });
    }
  }

  async eliminar(req, res) {
    try {
      const producto = await productoService.eliminarProducto(req.params.id);
      res.status(200).json({ message: 'Producto eliminado correctamente', producto });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      const message = error.error || error.message || 'Error al eliminar el producto';
      res.status(statusCode).json({ statusCode, error: message });
    }
  }
}

module.exports = new ProductoController();

