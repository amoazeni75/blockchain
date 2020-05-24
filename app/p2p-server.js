const WebSocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

// $ HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
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

        socket.send(JSON.stringify(this.blockchain.chain));
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

    messageHandler(socket) {
        //a socket sends a message as an event, so we need message handler (event listener)
        //the first parameter is the name of event that want to handle
        socket.on('message', message => {
            const data = JSON.parse(message); //because the message is the type of string, need to convert it to the js object
            console.log('data', data);
        });
    }
}

module.exports = P2pServer;

