const ChainUtil = require('../chain-util');

class Transaction {
    constructor() {
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = []; //Output consist of one output which tells how much currency the sender
        //wants to send to an individual, the second output specifies how much currency the sender
        //the sender would have after the transaction completed.
    }

    update(senderWallet, recipient, amount) {
        //when a sender wants to send money to two recipient in a short time, we can merge
        //these two request into one transaction
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);
        if (amount > senderOutput.amount) {
            console.log(`Amount : ${amount} exceeds sender balance`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({amount, address: recipient});
        Transaction.signTransaction(this, senderWallet);

        return this;
    }

    static newTransaction(senderWallet, recipient, amount) {
        if (amount > senderWallet.balance) {
            console.log(`Amount : ${amount} exceeds balance.`);
            return;
        }
        const transaction = new this();
        transaction.outputs.push(...[
            {amount: senderWallet.balance - amount, address: senderWallet.publicKey},
            {amount, address: recipient}
        ]);
        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }

    static signTransaction(transaction, senderWallet) {
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        };
    }

    static verifyTransaction(transaction) {
        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        );
    }
}

module.exports = Transaction;