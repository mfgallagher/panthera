# panthera


## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple Lorem ipsum dolor generator.

## Technologies
Project is created with:
* Lorem version: 12.3
* Ipsum version: 2.33
* Ament library version: 999


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
