const { where } = require('sequelize');
const ApiError = require('../errors/ApiErorrs')
const { User, UserBascet, ContractBascet, Contract, Abi, Type, Kind } = require('../models/models');


class UserControler {
    async registration(req, res) {
        let { address } = req.body
        address = address.toLowerCase();
        const candidate = await User.findOne({ where: { address: address } });
        if (!candidate) {
            const user = await User.create({ address });
            const bascet = await UserBascet.create({ userId: user.id })
            return res.json({ user, bascet });
        }
        const bascet = await UserBascet.findOne({ userId: candidate.id })
        let message = 'User alredy exist: ';
        return res.json({ message, candidate, bascet });
    }

    async auth(req, res) {
        try {
            const { address } = req.query;
            const user = await User.findOne({ where: { address: address } });
            if (!user) {
                return res.status(404).json('User not found');
            }
            const id = user.id;
            const bascet = await UserBascet.findOne({ where: { userId: id } })
            const bascetId = bascet.id;
            const contract = await ContractBascet.findAll({ where: { userBascetId: bascetId } })
            if (!contract) {
                return res.status(404).json('User do not have any contracts')
            }
            const contractIds = contract.map(c => c.contractId)
            const userContract = await Contract.findAll({ where: { id: contractIds } });
            const userABI = userContract.map(c => c.abiId);
            const userTypeId = userContract.map(c => c.typeId);
            const userKindId = userContract.map(c => c.kindId);
            const userMetadata = userContract.map(c => c.meta);
            const abis = await Abi.findAll({ where: { id: userABI } })
            const resObj = { userMetadata, abis, userTypeId, userKindId };
            return res.json({ resObj });
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports = new UserControler()