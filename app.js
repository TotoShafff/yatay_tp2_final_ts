const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de salud
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API Stock funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Rutas de la API (las agregaremos después)
// app.use('/api/v1/productos', productosRoutes);

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: 'Ruta no encontrada'
  });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    error: err.message || 'Error interno del servidor'
  });
});

module.exports = app;

