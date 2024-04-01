const { where } = require('sequelize');
const ApiError = require('../errors/ApiErorrs')
const { User, UserBascet, ContractBascet, Contract, Abi, Chains } = require('../models/models');


class UserControler {
    async registration(req, res) {
        let { address } = req.body
        address = address.toLowerCase();
        const candidate = await User.findOne({ where: { address: address } });
        if (!candidate) {
            const user = await User.create({ address: address });
            const bascet = await UserBascet.create({ userId: user.id })
            return res.json({ user, bascet });
        }
        const bascet = await UserBascet.findOne({ where: { userId: candidate.id } })
        let message = 'User already exists: ';
        return res.json({ message, candidate, bascet });
    }


    async auth(req, res, next) {
        try {
            const { address } = req.query;
            if (!address) {
                return res.status(400).json('Address parameter is missing');
            }
            const user = await User.findOne({ where: { address: address } });
            if (!user) {
                return res.status(404).json('User not found');
            }
            const id = user.id;
            const bascet = await UserBascet.findOne({ where: { userId: id } })
            if (!bascet) {
                return res.status(404).json('User basket not found');
            }
            const bascetId = bascet.id;
            const contract = await ContractBascet.findAll({ where: { userBascetId: bascetId } })
            if (!contract.length) {
                return res.status(404).json('User do not have any contracts')
            }
            const contractIds = contract.map(c => c.contractId)
            const userContract = await Contract.findAll({ where: { id: contractIds } });
            const userContractAddress = userContract.map(c => c.address);
            const userABI = userContract.map(c => c.abiId);
            const userTypeId = userContract.map(c => c.typeId);
            const userKindId = userContract.map(c => c.kindId);
            const userMetadata = userContract.map(c => c.meta);
            const userChainId = userContract.map(c => c.chainId);
            let abis = [];
            for (const c of userABI) {
                let abi = await Abi.findOne({ where: { id: c } })
                abis.push(abi);
            }
            const userAbi = abis.map(a => a.interface);
            let chainsArray = [];
            for (const e of userChainId) {
                const chain = await Chains.findOne({ where: { id: e } });
                if (!chain) {
                    return res.status(404).json(`chains not found`)
                }
                chainsArray.push(chain);
            }
            const userChains = chainsArray.map(c => c.chainId);
            const resObj = { userContractAddress, userMetadata, userAbi, userTypeId, userKindId, userChains };
            return res.json({ resObj });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new UserControler()