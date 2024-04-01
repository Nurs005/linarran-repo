const { Chains } = require('../models/models');

class ChainsControler {
    async create(req, res) {
        const { chainId } = req.body;
        const chain = Chains.create({ chainId: chainId });
        return res.json(chain);
    }
}

module.exports = new ChainsControler();