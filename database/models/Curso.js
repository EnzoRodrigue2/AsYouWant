
const Sequelize = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize,DataTypes) => {
    const Curso = sequelize.define(
        'cursos',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            titulo: {
                type: DataTypes.STRING(50)
            },
            descripcion: {
                type: DataTypes.STRING(1000)
            },
            descripcion_corta: {
                type: DataTypes.STRING(500)
            },
            precio: {
                type: DataTypes.INTEGER
            },
            unidades: {
                type: DataTypes.STRING(50)
            },
            audio: {
                type: DataTypes.TINYINTEGER
            },
            video: {
                type: DataTypes.TINYINTEGER
            },
            lectura: {
                type: DataTypes.TINYINTEGER
            },
            clases: {
                type: DataTypes.INTEGER
            },
            duracion: {
                type: DataTypes.INTEGER
            },
            categoria_ID: {
                type: DataTypes.INTEGER
            },
            profesor_ID: {
                type: DataTypes.INTEGER
            },
            unidades_ID: {
                type: DataTypes.INTEGER
            }
        },
        {
            tablename: 'Cursos',
            timestamps: false
        }
    );
    return Curso
}

