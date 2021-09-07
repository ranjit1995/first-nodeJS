
const db = require('../db/connection');
const indexed = require('../modal/sequelizer-index')

exports.userList = function (req, res, callback) {
    res.setHeader('Content-Type', 'application/json');
    db.authenticate().then(() => {
        indexed.personal_info.findAll(
            {
                where: {
                    isRegister: true
                }
                , raw: true
            }).then((result) => {
                res.end(JSON.stringify(result))
            }).catch((error) => {
                console.log(error)
            })
    })
}