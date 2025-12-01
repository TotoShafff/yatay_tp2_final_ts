const jwt = require('jsonwebtoken');
const config = require('../config');

const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const authHeader = req.headers['authorization'];

  if (apiKey) {
    if (apiKey === config.API_KEY) {
      return next();
    } else {
      return res.status(403).json({
        statusCode: 403,
        error: 'API Key inválida'
      });
    }
  }

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.user = decoded;
      return next();
    } catch (error) {
      return res.status(403).json({
        statusCode: 403,
        error: 'Token inválido o expirado'
      });
    }
  }

  return res.status(401).json({
    statusCode: 401,
    error: 'Autenticación requerida. Indique la x-api-key o el token JWT'
  });
};

module.exports = authMiddleware;

