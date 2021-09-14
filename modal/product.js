const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/connection');
exports.products = db.define("product", {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    product_name: {
        type: DataTypes.STRING,
        required: true,
    },
    description: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.BLOB
    },
    offer: {
        type: DataTypes.INTEGER
    },
    createdBy: {
        type: DataTypes.STRING
    },
    published: {
        type: DataTypes.TINYINT
    },
},
    {
        freezeTableName: true,
        // timestamps: false,
    }
)