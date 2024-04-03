const { Chains } = require('../models/models');

class ChainsControler {
    async create(req, res) {
        const { chainId } = req.body;
        const chain = await Chains.create({ chainId: chainId });
        return res.json(chain);
    }
    async getApi(req, res) {
        try {
            const { id } = req.query;
            const apiKey = await Chains.findOne({ where: { id } });
            if (!apiKey) {
                return res.json('Chain id not found')
            }
            return res.json(apiKey.apiKey);
        } catch (error) {
            return res.json(error)
        }
    }
}

module.exports = new ChainsControler();