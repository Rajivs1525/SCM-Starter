// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    
    uint256 public balance;

    constructor(uint initBalance) payable {
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function cubeSeries(uint256 _amount) public payable {
        if (_amount == 0) {
            balance = 0;
        } else {
            uint256 sum = 0;

            for (uint256 i = 1; i <= _amount; i++) {
                sum += i**3;
            }

            balance = sum;
        }
    }
}

