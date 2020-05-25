const WebSocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGE_TYPE = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION'
};

// $ HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

class P2pServer {
    constructor(blockchain, transactionPool) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.sockets = []; //list of sockets which connected to this one
    }

    listen() {
        const server = new WebSocket.Server({port: P2P_PORT});
        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Listening for p2p connection on ${P2P_PORT}`)
    }

    connectSocket(socket) {
        this.sockets.push(socket);

        console.log("Socket Connected...")

        this.messageHandler(socket) //to register message handler to the socket

        this.sendChain(socket);
    }

    connectToPeers() {
        peers.forEach(peer => {
            const socket = new WebSocket(peer);
            //ws:localhost:5002
            socket.on('open', () => {
                this.connectSocket(socket)
            });
        })
    }

    sendChain(socket) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPE.chain,
            chain: this.blockchain.chain
        }));
    }

    messageHandler(socket) {
        //a socket sends a message as an event, so we need message handler (event listener)
        //the first parameter is the name of event that want to handle
        socket.on('message', message => {
            const data = JSON.parse(message); //because the message is the type of string, need to convert it to the js object

            switch (data.type) {
                case MESSAGE_TYPE.chain:
                    this.blockchain.replaceChain(data.chain);
                    break;
                case MESSAGE_TYPE.transaction:
                    this.transactionPool.updateOrAddTransaction(data.transaction);
                    break;
            }
        });
    }

    syncChain() {
        this.sockets.forEach(socket => {
            this.sendChain(socket)
        });
    }

    broadcastTransaction(transaction) {
        this.sockets.forEach(socket => this.sendTransaction(socket, transaction));
    }

    sendTransaction(socket, transaction) {
        socket.send(JSON.stringify({
            type: MESSAGE_TYPE.transaction,
            transaction
        }));
    }
}

module.exports = P2pServer;

