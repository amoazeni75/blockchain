const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const uuid_v1 = require('uuid');

// import {v1 as uuidv1} from 'uuid';

class ChainUtil {

    static genKeyPair() {
        return ec.genKeyPair();
    }

    static id() {
        return uuid_v1.v1();
    }
}

module.exports = ChainUtil;
