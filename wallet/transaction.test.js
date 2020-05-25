const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
    let transaction, wallet, amount, recipient;

    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3slol3mcc';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance.', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });


    it('outputs the `amount` added to the recipient.', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });

    it('inputs the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    describe('transaction with the amount that exceeds the balance', () => {
        beforeEach(() => {
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });
        it('does not create transaction', () => {
            expect(transaction).toEqual(undefined);
        });
    });
});