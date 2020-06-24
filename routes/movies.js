var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

router.get('/', moviesController.listado);

router.get('/detail/:id', moviesController.detalle);

router.get('/edit/:id', moviesController.buscarParaEditar);
router.post('/edit/:id', moviesController.editarPelicula);

router.get('/delete/:id', moviesController.comenzarEliminacion);
router.delete('/delete/:id', moviesController.eliminarPelicula);

router.get('/new', moviesController.ultimasCinco);

router.get('/recommended', moviesController.recomendadas);

router.get('/search', moviesController.formularioBusqueda);
router.post('/search', moviesController.buscar);

router.get('/create', moviesController.formularioCrearPelicula);
router.post('/create', moviesController.crearPelicula);






module.exports = router;