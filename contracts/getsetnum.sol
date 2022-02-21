// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract getsetnum {
  uint public num;

  function getNum() public view returns(uint){
    return num;
  }
  function setNum(uint _num) public{
    num = _num;
  }

}
