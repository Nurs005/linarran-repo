const { Type } = require('../models/models');
const ApiErorr = require('../errors/ApiErorrs.js');

class TypeControler {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({ name })
        return res.json(type)
    }

    async get(req, res) {
        try {
            const { id } = req.query;
            const type = await Type.findOne({ where: { id: id } });
            if (!type) {
                console.log('Type is not exist')
            }
            let typeName = type.name;
            return res.json(typeName);
        } catch (e) {
            return res.json(e);
        }

    }
}

module.exports = new TypeControler()