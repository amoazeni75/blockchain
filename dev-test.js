const Block = require('./block')

const block_instance = new Block('T', 'LH', 'H', 'D');
console.log(block_instance.toString());
console.log(Block.genesis().toString());

// test mine block
const fooBlock = Block.mineBlock(Block.genesis(), 'foo data')
console.log(fooBlock.toString())