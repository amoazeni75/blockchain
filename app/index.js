const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');

const HTTP_PORT = process.env.HTTP_PORT || 3000; //USER specify port or use default

const app = express();
app.use(bodyParser.json()); //this is a middleware which convert post request to json format

const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

//end point for getting the chain
//get:localhost:3000/blocks/
app.get('/blocks', (req, res) => {
    res.json(bc.chain)
});

//end point adding block by miners
//post:localhost:3000/blocks/
//{
// 	"data": "new data added by a miner"
// }
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data);
    console.log(`New block added with this data: ${block.toString()}`);

    res.redirect('/blocks'); //to return updated chain
});

app.listen(HTTP_PORT, () => console.log(`Listening on Port ${HTTP_PORT}`));
p2pServer.listen();


//HTTP_PORT=3001 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev