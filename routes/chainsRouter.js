const Router = require('express');
const router = new Router();
const chainControler = require('../controler/chainIdControler');

router.post('/', chainControler.create);
router.get('/', chainControler.getApi);

module.exports = router