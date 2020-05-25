const Transaction = require('../wallet/transaction')

class TransactionPool {
    constructor() {
        this.transactions = [];
    }

    updateOrAddTransaction(transaction) {
        let transactionWithID = this.transactions.find(t => t.id === transaction.id);
        if (transactionWithID) {
            this.transactions[this.transactions.indexOf(transactionWithID)] = transaction;
        } else {
            this.transactions.push(transaction);
        }
    }

    existingTransaction(address) {
        return this.transactions.find(t => t.input.address === address);
    }

    validTransactions() {
        return this.transactions.filter(transaction => {
            const outputTotal = transaction.outputs.reduce((total, output) => {
                return total + output.amount;
            }, 0);

            if (transaction.input.amount !== outputTotal) {
                console.log(`Invalid Transaction from ${transaction.input.address}`);
                return;
            }
            if (!Transaction.verifyTransaction(transaction)) {
                console.log(`Invalid Signature from ${transaction.input.address}`);
                return;
            }
            return transaction;
        })
    }
}


module.exports = TransactionPool;