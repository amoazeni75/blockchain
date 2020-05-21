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
}

module.exports = Block;