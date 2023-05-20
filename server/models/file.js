const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class File extends Model { }

File.init(
    {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        ext: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        size: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },


    },
    {
        sequelize,
        tableName: "File",
        modelName: "File",
    }
);

module.exports = File;
