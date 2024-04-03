const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const contractRouter = require('./contractRoute');
const typeRouter = require('./typeRouter');
const kindRouter = require('./kindRouter');
const bascetRouter = require('./bascetsRouter');
const abiRouter = require('./abiRouter');
const chainRouter = require('./chainsRouter');
const encodeRouter = require('./encodeRouter');
const sourceCodeRouter = require('./source');

router.use('/user', userRouter)
router.use('/contract', contractRouter)
router.use('/type', typeRouter)
router.use('/kind', kindRouter)
router.use('/profile', bascetRouter)
router.use('/abi', abiRouter)
router.use('/chain', chainRouter);
router.use('/encode', encodeRouter);
router.use('/code', sourceCodeRouter);

module.exports = router

