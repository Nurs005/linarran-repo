const { types } = require('pg');
const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING, unique: true }
})

const UserBascet = sequelize.define('userBascet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const ContractBascet = sequelize.define('contractBascet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Contract = sequelize.define('contract', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING, unique: true },
    meta: { type: DataTypes.TEXT, defaultValue: 'https://ipfs.io/ipfs/QmT21PxS5a4qzSk87V8kfZ7vYJ55KXV4DDrzT9xWmB3ET8' }
})

const Abi = sequelize.define('abi', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    interface: { type: DataTypes.JSON, allowNull: false }
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
})

const Kind = sequelize.define('kind', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
})

const Chains = sequelize.define('chains', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    chainId: { type: DataTypes.STRING }
})


User.hasOne(UserBascet)
UserBascet.belongsTo(User);

UserBascet.hasMany(ContractBascet);
ContractBascet.belongsTo(UserBascet);

Contract.hasMany(ContractBascet);
ContractBascet.belongsTo(Contract);

Chains.hasMany(Contract);
Contract.belongsTo(Chains);

Abi.hasMany(Contract);
Contract.belongsTo(Abi);

Type.hasMany(Contract);
Contract.belongsTo(Type);

Kind.hasMany(Contract);
Contract.belongsTo(Kind);

Type.hasMany(Kind);
Kind.belongsTo(Type);



module.exports = {
    User,
    UserBascet,
    Contract,
    ContractBascet,
    Type,
    Kind,
    Abi,
    Chains
}