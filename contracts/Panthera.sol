//SPDX-License-Identifier: UNLICENSED
//specify solidity version
pragma solidity ^0.7.3;

import "hardhat/console.sol";

contract Token {
    //TODO:
    //Before deploying to main net:
    //Change name and symbol from test
    //Decide on total supply of currency

    string public name = "Granola_test";
    string public symbol = "GNR";

    uint256 public totalSupply = 100000;

    //create the bank that will deploy the smart contract
    address public owner;

    mapping(address => uint256) balances;

    //contract initialization:

    //Constructor only executed once

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        //check for enough tokens
        //revert transaction if tokens are insufficient

        console.log("Sender balance is %s tokens", balances[msg.sender]);
        console.log("Trying to send %s tokens to %s", amount, to);

        require(
            balances[msg.sender] >= amount,
            "You do not have enough tokens for this transfer"
        );

        //initiate the transfer
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    //viewing the token balances of accounts (read-only)

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
