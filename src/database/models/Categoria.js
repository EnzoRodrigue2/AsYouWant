
module.exports = (sequelize,DataTypes) => {
    const Categoria = sequelize.define(
        'Categoria',
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
            tablename: 'categoria',
            timestamps: false
        }
    );

    Categoria.associate = function(models) {
        Categoria.hasMany(models.Usuario, {
            as: "usuarios",
            foreignKey: "categoria_ID"
        });
    }

    return Categoria
}
