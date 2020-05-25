const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuid_v1 = require('uuid');
const SHA256 = require('crypto-js/sha256');

class ChainUtil {

    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuid_v1.v1();
    }

    static hash(data) {
        return SHA256(JSON.stringify(data)).toString();
    }
}

module.exports = ChainUtil;
