const express = require('express');
const cors = require('cors');
const productoRoutes = require('./routes/productoRoutes');
const albumsService = require('./services/albumsService');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/productos', productoRoutes);

app.get('/api/v1/albums/csv', async (req, res) => {
  try {
    const csv = await albumsService.generarCSV();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=albums_15.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ 
      statusCode: 500, 
      error: error.message 
    });
  }
});

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

