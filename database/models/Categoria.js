/*
const Sequelize = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize,DataTypes) => {
    const Categoria = sequelize.define(
        'categoria',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: DataTypes.STRING(50)
            },
            descripcion: {
                type: DataTypes.STRING(500)
            }
        },
        {
            tablename: 'Categoria',
            timestamps: false
        }
    );
    return Categoria
}
*/