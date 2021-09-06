const db = require('../db/connection');
const indexed = require('../modal/sequelizer-index')
exports.index = function (req, res, next) {
    db.authenticate()
        .then(() => {
            indexed.findAll({
                where: {
                    last_name: 'ray'
                }, raw: true
            }).then((result) => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
            console.log('connected to DB');
            res.render('index', { title: 'Express' });

        });
}
