const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/productoRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1/productos', productoRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: 'Ruta no encontrada'
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    error: err.message || 'Error interno del servidor'
  });
});

module.exports = app;

