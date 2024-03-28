const Router = require('express');
const router = new Router();
const KindControler = require('../controler/kindControler');


router.post('/', KindControler.create)
router.get('/', KindControler.get)

module.exports = router

