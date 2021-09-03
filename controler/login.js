const dbConnect = require('../db/connection')
const query = require('../db/query-string')
var crypto = require("crypto");

exports.login = function (req, res, next) {
    console.log(req.body)
    if (req.body.email && req.body.password) {
        console.log("COMING INSIDE")
        dbConnect.pool.query(`${query.string[0].userCheck} ${'email'}='${req.body.email}'`, (err, result, fields) => {
            if (err) {
                return console.log(err)
            }
            if (result) {
                console.log(result)
                if (result.length > 0) {
                    let searchResult = JSON.stringify(result[0])
                    const secret = 'abcdefg';
                    const hash = crypto.createHmac('sha256', secret)
                        .update(req.body.password)
                        .digest('hex');
                    console.log(hash, "this is hash password");
                    if (hash === (JSON.parse(searchResult).password)) {
                        console.log("Password matched")
                        dbConnect.pool.query(`${query.string[0].selectUser} ${'email'}='${req.body.email}'`, (err, result, fields) => {
                            if (err) {
                                res.send({ success: false, message: 'database error', error: err });
                                return console.log(err)
                            }
                            if (result) {
                                console.log(result)
                                res.setHeader('Content-Type', 'application/json');
                                dbConnect.pool.query(`${query.string[0].inserSession} (email, token) values ('${req.body.email}', '${Math.floor(Math.random() * 1E16)}')`, (err, results, fields) => {
                                    res.end(JSON.stringify(result[0]));
                                })
                            }
                        })
                    } else {
                        res.end(JSON.stringify({
                            message: "Password not matched",
                            status_code: 400
                        }));
                    }
                } else {
                    res.end(JSON.stringify({
                        message: "User not registered",
                        status_code: 400
                    }));
                }
            }
        })
    } else {
        res.end(JSON.stringify({
            message: "Enter login ID and Password",
            status_code: 400
        }));
    }
}