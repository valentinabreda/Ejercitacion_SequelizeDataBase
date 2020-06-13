var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

router.get('/', moviesController.listado);
router.get('/detail/:id', moviesController.detalle);





module.exports = router;