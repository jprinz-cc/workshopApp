var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');

/* GET users  */
router.get('/', authenticateToken, userController.getAllUsers);
/* POST createUser */
router.post('/', userController.createUser);
/* GET login */
router.get('/login', userController.login);

module.exports = router;
