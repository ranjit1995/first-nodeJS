const db = require('../db/connection');
const indexed = require('../modal/sequelizer-index')
exports.index = function (req, res, next) {
    db.authenticate()
        .then(() => {
            indexed.personal_info.findAll({
                where: {
                    first_name: 'ranjit'
                }, raw: true
            }).then((result) => {
                console.log(result)
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result))
            }).catch(error => {
                console.log(error)
            })
        });
}
