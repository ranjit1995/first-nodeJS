const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const dbConnect = require('../db/connection')
const query = require('../db/query-string')
const mailer = require('../db/mail-config')


exports.register = function (req, res, next) {
    console.log("mailer", mailer)
    dbConnect.pool.query(`${query.string[0].registerUser} (first_name, last_name, email, address, city,user_type) values ('${req.body.firstName}', '${req.body.lastName}','${req.body.email}','${req.body.address}','${req.body.city}','user'
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
            const filePath = path.join(__dirname, '../public/html/email.html');
            const source = fs.readFileSync(filePath, 'utf-8').toString();
            const template = handlebars.compile(source);
            const replacements = {
                username: `${req.body.firstName} ${' '} ${req.body.lastName}`
            };
            const htmlToSend = template(replacements);
            const mailOptions = {
                from: 'ranjitnode@gmail.com',
                to: 'ranjitkumarray25@gmail.com',
                subject: 'User registration',
                html: htmlToSend
            };
            mailer.transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    })
}