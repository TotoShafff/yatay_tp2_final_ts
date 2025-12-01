require('dotenv').config();
const app = require('./app');
const connectDB = require('./database/conexiones/mongoConnection');
const config = require('./config');

connectDB();

app.listen(config.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
  console.log(`Entorno: ${config.NODE_ENV}`);
  console.log(`Base de datos: ${config.DB_PROVIDER}`);
});
