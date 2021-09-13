const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const mailer = require('../db/mail-config')
const pdfTemplate = require('./pdf');
const pdf = require('html-pdf');

exports.mailAttached = function (req, res, next) {
    pdf.create(pdfTemplate({ name: "ranjit", price1: 12, price2: 12, receiptId: 14 }), {}).toFile('order.pdf', (err) => {
        if (err) {
            return console.log('error');
        }
        const filePath = path.join(__dirname, '../public/html/email.html');
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = handlebars.compile(source);
        const replacements = {
            username: "ranjit kumar ray",
            link: "http://localhost:3000/set-password/2"
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
            from: 'ranjitnode@gmail.com',
            to: 'ranjitkumarray25@gmail.com',
            subject: 'User registration',
            attachments: [{
                filename: 'order.pdf',
                path: path.join(__dirname, '../order.pdf')
            }],
            html: htmlToSend

        };
        mailer.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send(JSON.stringify({
            message: "Payment details sent successfully",
            status_code: 200
        }));
    });

}