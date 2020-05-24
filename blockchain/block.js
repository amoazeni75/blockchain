const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY} = require('../config');

class Block {
    constructor(timestamp, lastBlockHash, hash, data, nonce) {
        /**
         * timestamp: we need this for synchronization
         * lastBlockHash: is the hash of previous block
         * hash: it is the hash for the current block
         * data: what we want to store within the block
         */
        this.timestamp = timestamp;
        this.lastBlockHash = lastBlockHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString() {
        return `Block-
            Timestamp: ${this.timestamp},
            Last Block Hash: ${this.lastBlockHash.substring(0, 10)},
            Current Block Hash: ${this.hash.substring(0, 10)},
            Nonce:${this.nonce},
            Stored Data: ${this.data}`;
    }

    static genesis() {
        return new this("Genesis Time", "-----", "f1er56-s4odw", [], 0)
    }

    static mineBlock(lastBlock, data) {
        /**
         * data are what we want to store
         */
        let nonce = 0, hash, timestamp;
        const lastHash = lastBlock.hash;

        //try to find a hash that satisfy proof-of-work condition
        do {
            nonce++;
            timestamp = Date.now();
            hash = Block.generateHash(timestamp, lastHash, data, nonce);
        } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static generateHash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block) {
        const {timestamp, lastBlockHash, data, nonce} = block;
        return Block.generateHash(timestamp, lastBlockHash, data, nonce);
    }
}

module.exports = Block;