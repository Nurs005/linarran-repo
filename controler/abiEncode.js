const { Web3 } = require('web3');
const web3 = new Web3('https://eth-sepolia.g.alchemy.com/v2/tVqa21l0eXw8VMMgQ5kI-GUM-o8RHG3N');


function encode(req, res) {
    try {
        const request = req.body;
        const types = request.types
        const params = request.params;
        let encodedParams = web3.eth.abi.encodeParameters(types, params)
        encodedParams = encodedParams.startsWith("0x") ? encodedParams.slice(2) : encodedParams;
        return res.json(encodedParams);
    } catch (e) {
        res.json(e.message);
    }
}


module.exports = encode