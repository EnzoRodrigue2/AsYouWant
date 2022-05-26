
module.exports = (sequelize,DataTypes) => {
    const CategoriaCursos = sequelize.define(
        'categoriaCursos',
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
    return CategoriaCursos
}
