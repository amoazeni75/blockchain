const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index')

describe('TransactionPool', () => {
    let tp, wallet, transaction;
    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = wallet.createTransaction('edfkdk-fsfsf', 50, tp);
    });

    it('adds a transaction to the pool', () => {
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it('updates a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'foo-354cs-e', 40);
        tp.updateOrAddTransaction(newTransaction);
        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction);
    });

    it('clear transactions', ()=>{
        tp.clear();
        expect(tp.transactions).toEqual([]);
    })

    describe('mixing valid and corrupt transactions', () => {
        let validTransaction;
        beforeEach(() => {
            validTransaction = [...tp.transactions];
            for (let i = 0; i < 6; ++i) {
                wallet = new Wallet();
                transaction = wallet.createTransaction('ssfsfd-sdfs', 42, tp);
                if (i % 2 == 0) {
                    transaction.input.amount = 234324;
                } else {
                    validTransaction.push(transaction);
                }
            }
        });

        it('shows the difference between valid and corrupt transaction', () => {
            expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransaction));
        });

        it('grabs valid transactions', () => {
            expect(tp.validTransactions()).toEqual(validTransaction);
        });
    });
});