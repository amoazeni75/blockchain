const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY, MINE_RATE} = require('../config');

class Block {
    constructor(timestamp, lastBlockHash, hash, data, nonce, difficulty) {
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
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block-
            Timestamp: ${this.timestamp},
            Last Block Hash: ${this.lastBlockHash.substring(0, 10)},
            Current Block Hash: ${this.hash.substring(0, 10)},
            Nonce:${this.nonce},
            Difficulty:${this.difficulty},
            Stored Data: ${this.data}`;
    }

    static genesis() {
        return new this(
            "Genesis Time",
            "-----",
            "f1er56-s4odw",
            [],
            0,
            DIFFICULTY);
    }

    static mineBlock(lastBlock, data) {
        /**
         * data are what we want to store
         */
        let nonce = 0, hash, timestamp;
        const lastHash = lastBlock.hash;
        let {difficulty} = lastBlock;
        //try to find a hash that satisfy proof-of-work condition
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.generateHash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static generateHash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const {timestamp, lastBlockHash, data, nonce, difficulty} = block;
        return Block.generateHash(timestamp, lastBlockHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let {difficulty} = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;