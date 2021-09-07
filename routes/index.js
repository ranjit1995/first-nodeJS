var express = require('express');
var router = express.Router();
const home = require('../controler/home')
const auth = require('../controler/login')
const register = require('../controler/register')
const users = require('../controler/users')
const newPassword = require('../controler/create-password')
/* GET home page. */
router.get('/', home.index);
router.get('/login', auth.login);
router.post('/register', register.register);
router.get('/userlist', users.userList);
router.get('/get-password/:id', newPassword.getPassword);
router.put('/set-password/:id', newPassword.setPassword);

module.exports = router;
