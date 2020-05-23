const BlockChain = require('./blockchain')
const Block = require('./block')

describe('BlockChain', (() => {
    let bc, bc2;
    beforeEach(() => {
        bc = new BlockChain();
        bc2 = new BlockChain();
    })

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    })

    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        bc2.addBlock('foo');
        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = 'Bad Data'
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1].data = 'Bad Data'
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

}))