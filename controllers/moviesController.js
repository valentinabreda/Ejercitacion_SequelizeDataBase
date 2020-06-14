const db = require('../models')


let moviesController = {
    listado: (req,res) => {
        db.Peliculas.findAll()
        .then(function(peliculas){
            res.render('movies', {peliculas:peliculas})
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },

    detalle: (req, res) => {
        db.Peliculas.findByPk(req.params.id)
        .then(function(peliculas) {
            res.render('moviesdetail', {peliculas:peliculas})
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },

    ultimasCinco: (req, res) => {
        db.Peliculas.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
        .then(function(peliculas) {
            res.render('ultimasCinco', {peliculas: peliculas})
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },

    recomendadas: (req, res) => {
        db.Peliculas.findAll({
            where: {
                awards: {[db.Sequelize.Op.gte]: 8}
            }
        }).then( (peliculas) => {
            return res.render('recomendadas', {peliculas: peliculas});
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },

    formularioBusqueda: (req, res) => {
        return res.render('buscarPeliculas', {
            title: 'Buscador'
        });
    },

    buscar: (req, res) => {
        const busqueda = req.body.buscar;
        db.Peliculas.findAll({
            where:{
                title: {[db.Sequelize.Op.like]: `%${busqueda}%`}
            }
        }).then( (peliculas) => {
            if(peliculas.length == 0) {
                return res.send('No se encontraron resultados para su busqueda');
            };
            return res.render('resultadoPeliculaBuscada',{
                title: 'Peliculas Encontradas',
                peliculas: peliculas
            });
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    }
};
    




module.exports = moviesController;