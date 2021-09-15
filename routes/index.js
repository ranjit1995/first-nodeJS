var express = require('express');
var router = express.Router();
const home = require('../controler/home')
const auth = require('../controler/login')
const register = require('../controler/register')
const users = require('../controler/users')
const newPassword = require('../controler/change-password')
const profile = require('../controler/profile-update')
const payment = require('../controler/payment')
const mail = require('../controler/email-attachment')
const file = require('../controler/read-xl')
/* GET home page. */
router.get('/', home.index);
router.get('/login', auth.login);
router.post('/register', register.register);
router.get('/userlist', users.userList);
router.get('/get-password/:id', newPassword.getPassword);
router.put('/set-password/:id', newPassword.setPassword);
router.put('/update-profile/:id', profile.update);
router.post('/payment/:id', payment.pay)
router.post('/attachment', mail.mailAttached)
router.get('/read-xl', file.xlsx)
module.exports = router;
