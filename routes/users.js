var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users  */
router.get('/', userController.getAllUsers);
/* POST createUser */
router.post('/', userController.createUser);

module.exports = router;
