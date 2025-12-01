require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Db
  DB_PROVIDER: process.env.DB_PROVIDER || 'mongo',
  MONGODB_URL: process.env.MONGODB_URL,
  
  // Seguridad y claves
  API_KEY: process.env.API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '24h'
};
