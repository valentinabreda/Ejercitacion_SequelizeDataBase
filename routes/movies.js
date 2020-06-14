var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

router.get('/', moviesController.listado);
router.get('/detail/:id', moviesController.detalle);
router.get('/new', moviesController.ultimasCinco);
router.get('/recommended', moviesController.recomendadas);
router.get('/search', moviesController.formularioBusqueda);
router.post('/search', moviesController.buscar);






module.exports = router;