const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const contractRouter = require('./contractRoute');
const typeRouter = require('./typeRouter');
const kindRouter = require('./kindRouter');
const bascetRouter = require('./bascetsRouter');
const abiRouter = require('./abiRouter');
const chainRouter = require('./chainsRouter');

router.use('/user', userRouter)
router.use('/contract', contractRouter)
router.use('/type', typeRouter)
router.use('/kind', kindRouter)
router.use('/profile', bascetRouter)
router.use('/abi', abiRouter)
router.use('/chain', chainRouter);

module.exports = router

