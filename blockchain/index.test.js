const BlockChain = require('./index')
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

    it('replace the chain with a valid chain', () => {
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toEqual(bc2.chain);
    });

    it('it dos not replace the chain with a chain that has equal or less length', () => {
        bc.addBlock('goo');
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });

}))