const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class JWT extends Model { }

JWT.init(
    {
        user: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: "User",
                key: "id",
            },
        },
        refreshToken: {
            allowNull: false,
            type: DataTypes.TEXT('long'),
        },
    },
    {
        sequelize,
        modelName: "JWT",
        tableName: "JWT",
    }
);

module.exports = JWT;
