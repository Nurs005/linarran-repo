
const { Kind } = require('../models/models');
const ApiErorr = require('../errors/ApiErorrs');

class KindControler {
    async create(req, res) {
        const { name, typeId } = await req.body
        const kind = await Kind.create({ name, typeId })
        return res.json(kind);
    }

    async get(req, res) {
        try {
            const { id } = req.query;
            const kind = await Kind.findOne({ where: { id: id } });
            if (!kind) {
                return res.json('Kind is doesnt exist');
            }
            const kindName = kind.name;
            return res.json(kindName);
        } catch (e) {
            res.json(e.message);
        }


    }
}

module.exports = new KindControler()