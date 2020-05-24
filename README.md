<h1>Blockchain</h1>
<h3>Goal</h3>
<p>Design an application with the underlaying like bitcoin</p>
<h3>Road Map</h3>
<ol>
  <li>Code the core blockchain, create block and blockchain objects in OOP style</li>
  <li>Build an API around the blockchain</li>
  <li>Create a dynamic peer-to-peer server for multiple contributors</li>
  <li>Implement a proof-of-work system to balance users (a huge number of users)</li>
  <li>Create a transaction system for a cryptocurrency on the top of blockchain core which we have created</li>
  <li>Use NodeJS for the implementation of projects</li>
</ol>
<h3>What is the Blockchain?</h3>
<p>The Blockchain is a distributed and decentralized ledger that stores data such as transactions, and that is publicly shared across all the nodes of its networks
The storage itself consists of multiple blocks of data chained together like the links of a physical chain
</p>
<h4>Ledger</h4>
<p>A ledger is a record-keeping book that stores all the transactions of an organization for example, payments, movements of assets, etc.A blockchain is a distribured ledger. The ledger is shared with all nodes that use the chain network, in this network multiple nodes connect to the blockchain core and each of them get a complete copy of blockchain ledger, moreover every nodes get update when the ledger changed by others; this concept make a blockchain decentralized.</p>
<h4>Difference between Centralized and Decentralized</h4>
<h5>Centralized</h5>
<ul>
  <li>One entity records all data</li>
  <li>The central entity has a lot of power.</li>
  <li>Full authority to fine or reward.</li>
  <li>Complete trust with the entity</li>
 </ul>
 <h5>Decentralized</h5>
<ul>
  <li>Everyone records the data</li>
  <li>Everyone has equal power.</li>
  <li>Fair and transparent.</li>
  <li>Trustless</li>
 </ul>
 <h3>Why Use the Blockchain?</h3>
 <ul>
  <li>Decentralization leads to a trustless system, in the sense that you don't place all the power of recording transations within one organization.</li>
  <li>No middle men and fees, trade with each other directly without having to rely on a bank or an acountant to officially document the transaction.</li>
  <li>Highly secure and no central point of failure, in this system an attacker needs to take over thousands if not millions of nodes and computers to hijack the network.</li>
  <li>Dependable data</li>
  </ul>
<h3>Where Use the Blockchain?</h3>
<p>the first usecase is cryptocurrency. A cryptocurrency has a blockchain as one piece in its puzzle.</p>
<h4>Cryptocurrency</h4>
<ul>
  <li>Cryptocurrency itself is a digital medium of exchange.</li>
  <li>It has three main features: a secure blockchain, wallets, and mining.</li>
  </ul>
  <h5>How it is Secure?</h5>
  <p>Although everyone has access to the data, a cryptocurrency use cryptography to add a layer of security to the blockchain. Each endividual has a digital signiture ( a private and public key). Each nodes use its private key to sign the data, so other nodes will noticed if any change happen in the signed data.</p>
  <h5>Wallets</h5>
<ul>
  <li>Objects that stores the private and public key of an individual.</li>
  <li>The public key is the address of the wallet.</li>
  <li>Help sign transactions data.</li>
</ul>
<h5>Mining</h5>
<p>miners do the work of adding transactions to the blockchain.</p>
<ul>
  <li>Transactions are temporarily "unconfirmed", when each node submits a transaction, it takes a time to add in the blockchain</li>
  <li>Include blocks of transactions by solving a "proof of work" algorithm. Miners will take a group of unconfirmed transactions and include them within a block in the chain.</li>
 </ul>
 <h5>Proof of Work System</h5>
  <ul>
  <li>A system that requires miners to do computational work to add blocks. This has the benefit of dettering dishonest peers from replacing blockchain with corrupt and invalid data.</li>
  <li>Any peer can replace the blockchain.</li>
  <li>The proof-of-work make it expensive to generate corrupt chains.</li>
  <li>Manageable to submit one block, unproductive to generate an entire chain.</li>
  <li>Hashcash was a proof-of-work system to prevent email spamming. for any given level it has a difficulty which is equal to the
    number of zeros must be placed in the front of hash, for example if we have difficulty = 6, the 000000sakjdkjfsf would be valid</li>
  <li>Generate hashes until a one with the matching leading 0's is found.</li>
  <li>A "nonce" value adjusts in order to generate new hashes.</li>
  <li>This computational work is "mining".</li>
  <li>The difficulty sets a rate of mining.</li>
 </ul>
 <h5>51% Attack</h5>
 <ul>
  <li>A dishonest miner has more than at least 51% of the network's power.</li>
  <li>A 51% attack for bitcoin would be more than $6 billion (start of 2018)</li>
 </ul>
<h3>Configuring the Project</h3>
<ul>
  <li> Install NodeJs</li>
  <li>Create a folder, for example "blockchain" and inside it execute command line then enter: <code> npm init -y</code></li>
  <li>Install "nodemon" for live development dependancy for our project, inside project's folder enter: <code> npm i nodemon --save-dev</code></li>
  <li>To run the "dev-test.js" addd the following code inside "script" section in the config.js file: <code>"dev-test" : "nodemon dev-test.js"</code>
    then enter this in the command line: <code>npm run dev-test</code></li>
  <li>To use SHA-256 hash function, we will install crypto-js, <code> npm i crypto-js --save</code></li>
  <li>For testing purpose, we should install jest, <code> npm i jest --save-dev</code></li>
  <li>To run tests, <code> npm run test </code></li>
  <li>For API section, we need Express module, <code> npm i express --save</code></li>
  <li>To handle post requests in json format, <code> npm i body-parser --save</code></li>
  <li>For implementing the peer-to-peer server, <code> npm i ws --save</code></li>
 </ul>
 <h4>Genesis Block</h4>
 <p>For the first block, we must have some initial data, to solve this subject we design a genesis block to seed the information into the first block.</h4>
