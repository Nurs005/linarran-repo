const Router = require('express');
const router = new Router();
const contractRouter = require('../controler/contractControler');

router.post('/', contractRouter.create)
router.post('/nft', contractRouter.createNFT)
router.get('/', contractRouter.getAll)
router.get('/:id', contractRouter.getOne)
router.post('/nft', contractRouter.createNFT)

module.exports = router

