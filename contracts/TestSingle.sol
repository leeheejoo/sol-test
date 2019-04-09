pragma solidity >=0.4.21 <0.6.0;

import "./TLib.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract TestSingle is Ownable {

    event SetValue(uint value);
    event SetMultiValue(uint multi);

    uint multi = 1;
    uint value = 0;

    constructor () public {

    }

    function setMultiValue(uint _multi) public onlyOwner {
        multi = _multi; 
        emit SetMultiValue(_multi);
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

    function getMulti() public view returns (uint ret) {
        return multi;
    }
}