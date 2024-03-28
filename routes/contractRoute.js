const Router = require('express');
const router = new Router();
const contractRouter = require('../controler/contractControler');
const contractControler = require('../controler/contractControler');

router.post('/', contractRouter.create)
router.get('/', contractRouter.getAll)
router.get('/:id', contractRouter.getOne)

module.exports = router

