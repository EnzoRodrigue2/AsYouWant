
module.exports = (sequelize,DataTypes) => {
    const Usuario = sequelize.define(
        'Usuario',
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
                type: DataTypes.STRING(100),
                unique: true
            },
            categoria_ID: {
                type: DataTypes.INTEGER
            },
            membresia_ID: {
                type: DataTypes.INTEGER
            },
            password: {
                type: DataTypes.STRING(200)
            },
            imagen: {
                type: DataTypes.STRING(1000)
            }
        },
        {
            tablename: 'usuarios',
            timestamps: false
        }
    );

    Usuario.associate = function(models) {
        Usuario.belongsTo(models.Categoria, {
            as: 'categoria',
            foreignKey: 'categoria_ID'
        });
        // Usuario.belongsTo(models.Membresia, {
        //     as: 'membresia',
        //     foreignKey: 'membresia_ID'
        // });
    }

    return Usuario
}
