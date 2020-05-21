const Block = require('./Block')

const block_instance = new Block('T', 'LH', 'H', 'D');
console.log(block_instance.toString());
console.log(Block.genesis().toString());