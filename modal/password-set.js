const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db/connection');
exports.setPassword = db.define("personal_info",
    {

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
        password: {
            type: DataTypes.CHAR
        },
        isRegister: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        freezeTableName: true,
        // timestamps: false,
    }
)