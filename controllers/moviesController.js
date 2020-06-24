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
    
    buscarParaEditar: (req, res) => {
        db.Peliculas.findByPk(req.params.id)
        .then((peliculas) => {
            return res.render('peliculaEditar', {
                title: 'detail',
                peliculas:peliculas
            });
        })
    },

    editarPelicula: (req, res) => {
        const idPelicula = req.params.id;
        db.Peliculas.update({
            title: req.body.title,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date,
            revenue: req.body.revenue
        }, {
            where: {
                id: idPelicula
            }
        }).then(() => {
            return res.redirect(`/movies/detail/${idPelicula}`);
        }).catch((error) => {
            return res.send('Ocurrió un error');
        });
    },

    comenzarEliminacion: (req, res) => {
        const idPelicula = req.params.id;
        db.Peliculas.findByPk(idPelicula)
        .then((peliculas) => {
            return res.render('eliminarPelicula', {
                peliculas:peliculas
            })
        })
        .catch((error) => {
            return res.send('Ocurrió un error')
        })
    },

    eliminarLaPelicula: (req, res) => {
        const idPelicula = req.params.id;
        db.Peliculas.destroy({
            where: {
                id: idPelicula
            }
        })
        .then(() => {
            return res.redirect('/movies');
        })
        .catch((error) =>{
            return res.send("Ocurrió un error")
        })
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
        })
        .then( (peliculas) => {
            return res.render('recomendadas', {peliculas: peliculas});
        })
        .catch( (error) => {
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
        })
        .then( (peliculas) => {
            if(peliculas.length == 0) {
                return res.send('No se encontraron resultados para su busqueda');
            };
            return res.render('resultadoPeliculaBuscada',{
                title: 'Peliculas Encontradas',
                peliculas: peliculas
            });
        })
        .catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },
    formularioCrearPelicula: (req, res) => {
        return res.render('crearPelicula', {
            title: 'Creacion de pelicula'
        });
    },

    crearPelicula: (req, res) => {
        db.Peliculas.create({
            title: req.body.title,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length: req.body.length,
            revenue: req.body.revenue,
        })
        .then(()=>{
            return res.redirect('/movies')
        })
        .catch(()=> {
            res.send('Ocurrió un error')
        })
    }
};
    




module.exports = moviesController;