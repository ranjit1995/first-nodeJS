const dbConnect = require('../db/connection')
const query = require('../db/query-string')
exports.register = function (req, res, next) {
    console.log(`'${req.body.firstName}', '${req.body.lastName}', '${req.body.email}','${req.body.address}','${req.body.city}'`)
    dbConnect.pool.query(`${query.string[0].registerUser} (firstName, lastName, email, address, City) values ('${req.body.firstName}', '${req.body.lastName}','${req.body.email}','${req.body.address}','${req.body.city}'
        )`, (err, result, fields) => {
        if (err) {
            console.log(err.sqlMessage)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                message: err.sqlMessage,
                status_code: 400
            }));
        }
        if (result) {
            console.log(result)
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                message: "User registered successfully",
                status_code: 200
            }));
        }
    })
}