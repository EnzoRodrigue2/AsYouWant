
module.exports = (sequelize,DataTypes) => {
    const Profesor = sequelize.define(
        'profesores',
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
            calificacion: {
                type: DataTypes.STRING(50)
            },
            descripcion: {
                type: DataTypes.STRING(500)
            }
        },
        {
            tablename: 'Profesores',
            timestamps: false
        }
    );
    return Profesor
}
