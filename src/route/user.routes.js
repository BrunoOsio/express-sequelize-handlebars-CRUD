//TODO - set routes for user

let express = require('express');
let router = express.Router();
 
const user = require('../controller/user.controller');

router.post('/register', user.register);
router.post('/login', user.login);
router.get('/logout', user.logout);
router.get('/', user.findAll);
router.delete('/deleteAll', user.deleteAll);

module.exports = router;