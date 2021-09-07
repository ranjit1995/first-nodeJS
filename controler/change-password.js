const db = require('../db/connection')
const indexed = require('../modal/sequelizer-index')
const password_indexed = require('../modal/password-set')
var crypto = require("crypto");
var express = require('express')
var app = express()

exports.getPassword = function (req, res, callback) {
    console.log(req.params.id)
    res.setHeader('Content-Type', 'application/json')
    db.authenticate().then(() => {
        indexed.personal_info.findOne({
            where: { id: req.params.id },
            row: true
        }
        ).then((result) => {
            console.log(result)
            res.send(JSON.stringify(result))
        }).catch((error => {
            console.log(error)
        }))
    })
}
exports.setPassword = function (req, res, callback) {
    console.log(req.params.id)
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('hex');
    console.log(hash)
    db.authenticate().then(() => {
        password_indexed.setPassword.update(
            {
                password: hash,
                isRegister: true
            },
            {
                where: { id: req.params.id },
                row: true
            },

        ).then((result) => {
            console.log(result)
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json({
                message: "Password updated successfully",
                status_code: 200
            });
        }).catch((error => {
            console.log(error)
            res.status(200).json({
                message: "Server error",
                status_code: 400
            });
        }))
    })
}

