const { SourceCode } = require('../models/models');

class SourceCodeController {
    async create(req, res) {
        try {
            const { codes } = req.body;
            const sourceCode = await SourceCode.create({ sourceCode: codes });
            return res.json(sourceCode);
        } catch (error) {
            return res.json(error.message);
        }
    }
    async getCode(req, res) {
        try {
            const { id } = req.query;
            const sourceCode = await SourceCode.findOne({ where: { id: id } });
            return res.json(sourceCode.sourceCode);
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = new SourceCodeController();