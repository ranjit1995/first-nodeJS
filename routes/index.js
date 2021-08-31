var express = require('express');
var router = express.Router();
const home = require('../controler/home')
const auth = require('../controler/login')
const register = require('../controler/register')
/* GET home page. */
router.get('/', home.index);
router.get('/login', auth.login);
router.post('/register', register.register);

module.exports = router;
