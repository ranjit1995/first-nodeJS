const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/connection');
exports.personal_info = db.define("personal_info",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true

        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            primaryKey: {
                args: true,
                msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
                fields: [Sequelize.fn('lower', Sequelize.col('email'))]
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'The email you entered is invalid or is already in our system.'
                },
                max: {
                    args: 254,
                    msg: 'The email you entered is invalid or longer than 254 characters.'
                }
            }
        },
        address: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        },
        user_type: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.INTEGER
        }
    },
    {
        freezeTableName: true,
        // timestamps: false,
    }
)