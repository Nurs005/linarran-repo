const Router = require('express');
const router = new Router();
const bascets = require('../controler/bascetsControler');


router.post('/', bascets.create);

module.exports = router 