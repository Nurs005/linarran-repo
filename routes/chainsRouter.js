const Router = require('express');
const router = new Router();
const chainControler = require('../controler/chainIdControler');

router.post('/', chainControler.create);

module.exports = router