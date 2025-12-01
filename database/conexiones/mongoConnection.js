const mongoose = require('mongoose');
const config = require('../../config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar aMongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

