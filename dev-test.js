// const Block = require('./blockchain/block')
//
// const block_instance = new Block('T', 'LH', 'H', 'D');
// console.log(block_instance.toString());
// console.log(Block.genesis().toString());
//
// // test mine block
// const fooBlock = Block.mineBlock(Block.genesis(), 'foo data')
// console.log(fooBlock.toString())

const Blockchain = require('./blockchain');
const bc = new Blockchain();

for (let i = 0; i < 10; ++i) {
    console.log(bc.addBlock(`data ${i}`).toString());
}