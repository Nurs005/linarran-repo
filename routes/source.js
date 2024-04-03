const Router = require('express');
const router = new Router();
const sourceRouter = require('../controler/sourceCodeControler');

router.post('/', sourceRouter.create);
router.get('/', sourceRouter.getCode);

module.exports = router;