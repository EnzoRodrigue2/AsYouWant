
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
            }
        },
        {
            tablename: 'usuarios',
            timestamps: false
        }
    );
    return Usuario
}
