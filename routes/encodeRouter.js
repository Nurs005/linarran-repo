const Router = require('express');
const router = new Router();
const encode = require('../controler/abiEncode');

router.post('/', encode);

module.exports = router;