const dbConnect = require('../db/connection')
const query = require('../db/query-string')
exports.login = function (req, res, next) {
    dbConnect.pool.query(`${query.string[0].selectUser} ${'email'}='${req.body.email}'`, (err, result, fields) => {
        if (err) {
            return console.log(err)
        }
        if (result) {
            console.log(result.toString())
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result[0]));
        }
    })
}