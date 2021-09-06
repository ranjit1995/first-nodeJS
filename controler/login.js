var crypto = require("crypto");
const db = require('../db/connection');
const indexed = require('../modal/sequelizer-auth')
exports.login = function (req, res, next) {
    console.log(req.body)
    res.setHeader('Content-Type', 'application/json');
    if (req.body.email && req.body.password) {
        console.log(req.body.password)
        const secret = 'abcdefg';
        const hash = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex');
        console.log(hash, "this is hash password");
        db.authenticate()
            .then(() => {
                indexed.auth.findOne({
                    where: {
                        email: req.body.email,
                        password: hash
                    }, raw: true
                }).then((result) => {
                    console.log(result, "COMING IN SUCCESS")
                    if (result) {
                        res.end(JSON.stringify(result));
                    } else {
                        indexed.auth.findOne({
                            where: {
                                email: req.body.email
                            }, raw: true
                        }).then((result) => {
                            console.log(result)
                            if (result) {
                                res.status(400).json({
                                    message: "Password is wrong",
                                    status_code: 400
                                });
                            } else {
                                res.status(400).json({
                                    message: "Email is not registered",
                                    status_code: 400
                                });
                            }
                        })

                    }
                }).catch(function (error) {
                    console.log(error.sqlMessage, "COMING IN ERROR")

                    let err = JSON.stringify(error)
                    let errors = JSON.parse(err).parent
                    if (errors.code === 'ER_DUP_ENTRY') {
                        res.status(400).json({
                            message: "Email already exits",
                            status_code: 400
                        });
                    }
                })
            });
    } else {
        res.end(JSON.stringify({
            message: "Enter login ID and Password",
            status_code: 400
        }));
    }
}