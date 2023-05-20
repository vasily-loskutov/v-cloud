const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class User extends Model { }

User.init(
    {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
        },
        isActivated: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        activationLink: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        files: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
        },
        deleteFiles: {
            allowNull: false,
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: []
        },
        totalSize: {
            allowNull: false,
            type: DataTypes.REAL,
            defaultValue: 0
        },
        allFilesSize: {
            allowNull: false,
            type: DataTypes.REAL,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: "User",
        modelName: "User",
    }
);

module.exports = User;
