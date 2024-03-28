const Router = require('express');
const router = new Router();
const abiControler = require('../controler/abiControler');


router.post('/', abiControler.create);
router.get('/', abiControler.getOne);

module.exports = router;