# panthera


## Table of contents
* [General info](#general-info)
* [Setup](#setup)
* [Usage](#technologies)

## General info
Panthera is a decentralized rewards system designed for use in the Middlebury
College community. Rewards Programs incentivize users to make consistent
purchases and stay loyal to businesses. Until recently, the rewards associated
with these programs have been limited to the business's industry, which can
prove to be unreliable over time (especially when a global pandemic hits). By
transitioning rewards programs to be focused around a decentralized blockchain
network, consumers are able to accumulate points through normal retail
purchasing while having more agency with redeeming their rewards. As of now,
there is no existing rewards program at Middlebury to encourage on-campus
purchases. By having a rewards system with digital currency, members of the
Middlebury College community will be encouraged to shop on-campus more
consistently, helping to fuel the local economy while participating in the
excitement of the cryptocurrency world.

## Setup

### Launch
If you are setting up this project in a new environment, or want to change
anything about the Granola contract,  you will need to deploy the contract. For
our purposes, we are deploying the contract to the Ropsten testnet of the
Ethereum ecosystem. In order to do this, you will need to use an Infura API key
as well as an existing crypto web wallet to store the initial supply of tokens.
Both of these things can be configured on your own, or you can use the accounts
that the developers set up for this purpose by reaching out to them for the
private keys.

To launch the project, run the following code:
```
$ cd ../project_root
$ npx hardhat
$ npx hardhat deploy
```

### Run
To run this project, install the necessary dependencies in the root folder

```
$ cd ../project_root
$ npm install
```

Then, change directories to the frontend, install the frontend dependencies, and
run the start script, which will load the website in a new browser tab.

```
$ cd ../project_root/frontend
$ npm install
$ npm start
```

In order to access the website, you will need to be signed in to a crypto
web-wallet; we recommend MetaMask.


## Usage
Panthera currently has three main uses: processing retail transactions (for
retail workers), sending tokens to other users of the network, and redeeming
tokens.


#### Processing Retail Transactions
Retail workers are able to use our interface to process transactions that are
made and send the appropriate amount of rewards tokens to the purchaser. Our
interface takes in a dollar amount (presumably, the user will make a purchase
in a traditional way, and then the retail employee will be able to quickly log
the amount spent in our application) and prompts a transaction to send the
converted Granola amount to the purchaser. To get the blockchain address of the
purchaser, our application will open the device's camera to scan a QR code.
Purchasers will be expected to have a mobile MetaMask application, where they
can display their account's QR code.

#### Sending Tokens
Users on the network are also able to send tokens to other users. This functions
similarly to processing transactions, except users are able to directly enter
the amount of Granola that they want to send.

#### Redeeming Tokens
When users have accumulated enough tokens, we expect that they will be able to
redeem these tokens at retail locations for goods and/or services. To facilitate
this, our website contains functionality to send a quantity of Granola back
to the contract, recirculating the amount in the network. 
