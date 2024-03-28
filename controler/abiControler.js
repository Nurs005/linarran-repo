const { Abi } = require('../models/models');

class AbiControler {
    async create(req, res) {
        try {
            const { name, interfaceAbi } = req.body;
            const abi = await Abi.create({ name: name, interface: interfaceAbi })
            return res.json({ abi });
        } catch (error) {
            return res.json(error.message);
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.query;
            const abi = await Abi.findOne({ where: { id: id } });
            return res.json(abi);
        } catch (error) {
            return res.json(error.message);
        }
    }
}


module.exports = new AbiControler;