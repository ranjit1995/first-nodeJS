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
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
