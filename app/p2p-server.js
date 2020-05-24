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
        const server = new WebSocket.Server({post: P2P_PORT});
        server.on('connection', socket => this.connectSocket(socket));
        console.log(`Listening for p2p connection on ${P2P_PORT}`)
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log("Socket Connected...")
    }
}