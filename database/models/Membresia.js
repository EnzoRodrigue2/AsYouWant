/*
const Sequelize = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize,DataTypes) => {
    const Membresia = sequelize.define(
        'cursos',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: DataTypes.STRING(50)
            },
            meses: {
                type: DataTypes.INTEGER
            },
            precio: {
                type: DataTypes.INTEGER
            },
            acceso: {
                type: DataTypes.INTEGER
            },
        },
        {
            tablename: 'Membresias',
            timestamps: false
        }
    );
    return Membresia
}
*/