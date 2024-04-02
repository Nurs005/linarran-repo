const { Contract, Nft } = require('../models/models');
const ApiErorr = require('../errors/ApiErorrs');
const uuid = require('uuid');
const path = require('path');
const { type } = require('os');

class ContractControler {
    async create(req, res, next) {

        try {
            const { address, abiId, typeId, kindId, chainId } = req.body
            const contract = await Contract.create({ address: address, abiId: abiId, typeId: typeId, kindId: kindId, chainId: chainId })
            return res.json(contract.id);
        } catch (e) {
            next(ApiErorr.badRequest(e.message))
        }

    }

    async createNFT(req, res, next) {
        try {
            const { address, meta, abiId, typeId, kindId, chainId } = req.body
            const contract = await Contract.create({ address: address, meta: meta, abiId: abiId, typeId: typeId, kindId: kindId, chainId: chainId })
            return res.json(contract.id);
        } catch (err) {
            next(ApiErorr.badRequest(err.message))
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

    async createNFT(req, res, next) { 
        try { 
            const { address, meta, abiId, typeId, kindId } = req.body 
            const contract = await Contract.create({ address: address, meta: meta, abiId: abiId, typeId: typeId, kindId: kindId }) 
            return res.json(contract.id); 
        } catch (err) { 
            next(ApiErorr.badRequest(err.message)) 
        } 
    }

}

module.exports = new ContractControler()