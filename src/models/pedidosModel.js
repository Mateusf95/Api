const { Model,  DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Pedidos extends Model{ }

Pedidos.init({
    name: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    contact: {
        type: DataTypes.STRING,
    },
    request: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: "pedidos",
    timestamps: false
});

module.exports = Pedidos;