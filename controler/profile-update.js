const db = require('../db/connection')
const indexed = require('../modal/sequelizer-index')

exports.update = function (req, res, next) {
    console.log(req.body)
    db.authenticate().then(() => {
        indexed.personal_info.update({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone
        }, {
            where: {
                id: req.params.id
            },
            row: true
        }).then((result) => {
            console.log(result)
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json({
                message: "Profile updated successfully",
                status_code: 200
            });
        }).catch((error) => {
            console.log(error)
            res.status(400).json({
                message: "Server error",
                status_code: 400
            });
        })
    })
}