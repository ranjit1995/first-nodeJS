const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const dbConnect = require('../db/connection')
const query = require('../db/query-string')
const mailer = require('../db/mail-config')
const db = require('../db/connection');

const indexed = require('../modal/sequelizer-index')

exports.register = function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    db.authenticate()
        .then(() => {
            console.log("AUTH is success")
            indexed.personal_info.create({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                address: req.body.address,
                city: req.body.city,
                user_type: 'user'
            }).then((result) => {
                console.log(result, "COMING IN SUCCESS")

                if (result) {
                    console.log(result)
                    res.send(JSON.stringify({
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

    // dbConnect.pool.query(`${query.string[0].registerUser} (first_name, last_name, email, address, city,user_type) values ('${req.body.firstName}', '${req.body.lastName}','${req.body.email}','${req.body.address}','${req.body.city}','user'
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
    //         const filePath = path.join(__dirname, '../public/html/email.html');
    //         const source = fs.readFileSync(filePath, 'utf-8').toString();
    //         const template = handlebars.compile(source);
    //         const replacements = {
    //             username: `${req.body.firstName} ${' '} ${req.body.lastName}`
    //         };
    //         const htmlToSend = template(replacements);
    //         const mailOptions = {
    //             from: 'ranjitnode@gmail.com',
    //             to: 'ranjitkumarray25@gmail.com',
    //             subject: 'User registration',
    //             html: htmlToSend
    //         };
    //         mailer.transporter.sendMail(mailOptions, function (error, info) {
    //             if (error) {
    //                 console.log(error);
    //             } else {
    //                 console.log('Email sent: ' + info.response);
    //             }
    //         });
    //     }
    // })
}