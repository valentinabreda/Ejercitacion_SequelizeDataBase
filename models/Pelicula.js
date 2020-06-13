module.exports = (sequelize, DataTypes) => {
    const alias = 'Peliculas';
    const columnas = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoincrement: true,
        },
        title: {
            type: DataTypes.STRING
        },
        awards: {
            type: DataTypes.INTEGER
        },
        length: {
            type: DataTypes.INTEGER
        },
        release_date: {
            type: DataTypes.INTEGER
        },
        genre_id: {
            type: DataTypes.INTEGER
        }
    };
    const config = {
        tableName: 'movies',
        timestamps: false
    };

    const Pelicula = sequelize.define(alias, columnas, config);
    return Pelicula;
}