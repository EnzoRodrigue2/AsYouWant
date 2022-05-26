
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
                type: DataTypes.STRING(100),
                unique: true
            },
            administrador: {
                type: DataTypes.INTEGER
            },
            membresias_ID: {
                type: DataTypes.INTEGER
            },
            password: {
                type: DataTypes.STRING(200)
            }
        },
        {
            tablename: 'users',
            timestamps: false
        }
    );
    return User
}
