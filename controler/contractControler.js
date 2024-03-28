const { Contract, Nft } = require('../models/models');
const ApiErorr = require('../errors/ApiErorrs');
const uuid = require('uuid');
const path = require('path');

class ContractControler {
    async create(req, res, next) {

        try {
            const { address, abiId, typeId, kindId } = req.body
            const contract = await Contract.create({ address: address, abiId: abiId, typeId: typeId, kindId: kindId })
            return res.json(contract.id);
        } catch (e) {
            next(ApiErorr.badRequest(e.message))
        }

    }

    async getAll(req, res, next) {
        const contract = await Contract.findAll()
        try {
            if (contract) {
                res.json(contract)
            }
        } catch (e) {
            next(ApiErorr.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        const { id } = req.query
        const { address, metadata, abiId, typeId, kindId } = await Contract.findOne({
            where: { id },
        })
        console.log(`
        
        This id your ABi: ${abiId}`)
        try {
            if (address && abi) {
                return res.json({ address, metadata, abi, typeId, kindId });
            }
        } catch (e) {
            next(ApiErorr.badRequest(e.message))
        }
    }
}

module.exports = new ContractControler()