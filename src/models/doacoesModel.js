const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Doacoes extends Model{ }

Doacoes.init({
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
    modelName: "doacoes",
    timestamps: false
});

module.exports = Doacoes;