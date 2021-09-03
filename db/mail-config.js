const nodemailer = require('nodemailer');
exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ranjitnode@gmail.com',
        pass: 'r8358955597'
    }
});
exports.mailOptions = {
    from: 'ranjitnode@gmail.com',
    to: 'ranjitkumarray25@gmail.com',
    subject: 'User registration',
    html: "<p><b>HI</b>, </p><p>thank you for being a part of go school platform </p>"

};
