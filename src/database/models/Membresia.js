
module.exports = (sequelize,DataTypes) => {
    const Membresia = sequelize.define(
        'Membresia',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: DataTypes.STRING
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
            tablename: 'membresia',
            timestamps: false
        }
    );

    // Membresia.associate = function(models) {
    //     Membresia.hasMany(models.Usuarios, {
    //         as: 'usuarios',
    //         foreignKey: 'membresia_ID'
    //     });
    // }

    return Membresia
}
