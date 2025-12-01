const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', productoController.crear);
router.get('/', productoController.listar);
router.get('/:id', productoController.obtenerPorId);
router.put('/:id', authMiddleware, productoController.actualizar);
router.delete('/:id', authMiddleware, productoController.eliminar);

module.exports = router;

