const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastBlockHash, hash, data) {
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
    }

    toString() {
        return `Block-
            Timestamp: ${this.timestamp},
            Last Block Hash: ${this.lastBlockHash.substring(0, 10)},
            Current Block Hash: ${this.hash.substring(0, 10)},
            Stored Data: ${this.data}`;
    }

    static genesis() {
        return new this("Genesis Time", "-----", "f1er56-s4odw", [])
    }

    static mineBlock(lastBlock, data) {
        /**
         * data are what we want to store
         */
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.generateHash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }

    static generateHash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    static blockHash(block){
        const {timestamp, lastBlockHash, data} = block;
        return Block.generateHash(timestamp, lastBlockHash, data);
    }
}

module.exports = Block;