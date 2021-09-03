const dbConnect = require('../db/connection')
const query = require('../db/query-string')
const mailer = require('../db/mail-config')

exports.register = function (req, res, next) {
    console.log("mailer",mailer)
    mailer.transporter.sendMail(mailer.mailOptions, function (error, info) {
        console.log("info")
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    // console.log(`'${req.body.firstName}', '${req.body.lastName}', '${req.body.email}','${req.body.address}','${req.body.city}'`)
    // dbConnect.pool.query(`${query.string[0].registerUser} (firstName, lastName, email, address, City) values ('${req.body.firstName}', '${req.body.lastName}','${req.body.email}','${req.body.address}','${req.body.city}'
    //     )`, (err, result, fields) => {
    //     if (err) {
    //         console.log(err.sqlMessage)
    //         res.setHeader('Content-Type', 'application/json');
    //         res.end(JSON.stringify({
    //             message: err.sqlMessage,
    //             status_code: 400
    //         }));
    //     }
    //     if (result) {
    //         console.log(result)
    //         res.setHeader('Content-Type', 'application/json');
    //         res.end(JSON.stringify({
    //             message: "User registered successfully",
    //             status_code: 200
    //         }));
    //     }
    // })
}