/*
const Sequelize = require('sequelize');
const sequelize = require('../database');

module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: DataTypes.STRING(50)
            },
            apellidos: {
                type: DataTypes.STRING(50)
            },
            email: {
                type: DataTypes.STRING(50)
            },
            password: {
                type: DataTypes.STRING(50)
            },
            administrador: {
                type: DataTypes.BOOLEAN
            },
            membresias_ID: {
                type: DataTypes.INTEGER
            }
        },
        {
            tablename: 'users',
            timestamps: false
        }
    );
    return User
}
*/