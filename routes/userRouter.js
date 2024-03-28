const Router = require('express');
const router = new Router();
const userControler = require('../controler/userControler');

router.post('/registration', userControler.registration)
router.get('/auth', userControler.auth);


module.exports = router

