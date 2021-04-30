var Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/310967b8570b43659180bfbc81452dbb')

const deployerAccount ='0x418bdD8ecFC2E2ADfaC56cb6E57e68032c4bd9e9'

//in reality you never want to set your private key publicly
//use an environment variable to set your key then call it here using a buffer
const privateKey = Buffer.from('15d7eb2b174ed286fedd14629b26d893597f3bdd0a69ac96db5670890c35dd6a','hex')

//After sending out our smart contract via testDeploy.js, we read account details from the compiled smart contract

const contractAddress = '0x418bdD8ecFC2E2ADfaC56cb6E57e68032c4bd9e9'
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[],"stateMutability":"nonpayable","type":"function"}];

var pantheraContract = new web3.eth.Contract(contractABI, contractAddress)
console.log(pantheraContract)


pantheraContract.methods.name().call((err, result) => {console.log("Contract name: " + result)})

pantheraContract.methods.symbol().call((err, result) => {console.log("Contract symbol: " + result)})

pantheraContract.methods.totalSupply().call((err, result) => {console.log("Total supply of currency: " + result)})

pantheraContract.methods.balanceOf(deployerAccount).call((err, result) => {console.log("Deployer account balance: " + result)})