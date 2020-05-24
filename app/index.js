const express = require('express');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 3000; //USER specify port or use default

const app = express();
const bc = new Blockchain();

//end point for getting the chain
app.get('/blocks', (req, res) => {
    res.json(bc.chain)
});

app.listen(HTTP_PORT, () => console.log(`Listening on Port ${HTTP_PORT}`));

