const db = require('../models')


let moviesController = {
    listado: function(req,res){
        db.Peliculas.findAll()
        .then(function(peliculas){
            res.render('movies', {peliculas:peliculas})
        });
    },
    detalle: function(req, res){
        db.Peliculas.findByPk(req.params.id)
        .then(function(pelicula) {
            res.render('moviesdetail', {pelicula:pelicula})
        });
    }
}



module.exports = moviesController;