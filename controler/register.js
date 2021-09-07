const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
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
                password: "",
                isRegister: false,
                user_type: 'user'
            }).then((result) => {
                console.log(result, "COMING IN SUCCESS")

                if (result) {
                    console.log(result.id)
                    console.log(JSON.stringify(result))
                    res.send(JSON.stringify({
                        message: "User registered successfully",
                        status_code: 200
                    }));
                    const filePath = path.join(__dirname, '../public/html/email.html');
                    const source = fs.readFileSync(filePath, 'utf-8').toString();
                    const template = handlebars.compile(source);
                    const replacements = {
                        username: `${req.body.firstName} ${' '} ${req.body.lastName}`,
                        link: "http://localhost:3000/set-password/" + result.id
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
                console.log(error, "COMING IN ERROR")

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
}