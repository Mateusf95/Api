const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Usuario extends Model{ }

Usuario.init({
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    senha: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: "usuario",
    timestamps: false
});

module.exports = Usuario;