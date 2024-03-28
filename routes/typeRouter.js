const Router = require('express');
const router = new Router();
const TypeControler = require('../controler/typeControler');

router.post('/', TypeControler.create)
router.get('/', TypeControler.get)

module.exports = router

