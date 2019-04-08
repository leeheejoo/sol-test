pragma solidity >=0.4.21 <0.6.0;

import "./TLib.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Test is Ownable{

    event SetValue(uint value);

    uint public multi = 1;

    uint public value;

    function setMultiValue(uint _multi) public onlyOwner {
        multi = _multi; 
    }

    function setValue(uint _value) public {
        //require(_value > 0);
        value = _value;
        emit SetValue(value);
    }

    function calcValue() public view returns(uint ret) {
        uint added = TLib.add(value,value);
        return added * multi;
    }
}