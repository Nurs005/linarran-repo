const { ContractBascet } = require('../models/models');


class BascetControler {
    async create(req, res) {
        try {
            const { userBascetId, contractId } = req.body
            const contractBascet = await ContractBascet.create({ userBascetId: userBascetId, contractId: contractId });
            return res.json(contractBascet)
        } catch (error) {
            res.json(error.message);
        }
    }
}

module.exports = new BascetControler;