const DataTypes = require('sequelize');
const db = require('../db/connection');

const newData = db.define("personal_info",
    {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        }
    },
    {
        freezeTableName: true,
        // timestamps: false,
    }
)
module.exports = newData