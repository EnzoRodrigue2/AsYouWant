
module.exports = (sequelize,DataTypes) => {
    const Unidad = sequelize.define(
        'unidades',
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
                type: DataTypes.STRING(500)
            },
        },
        {
            tablename: 'unidades',
            timestamps: false
        }
    );
    return Unidad
}
