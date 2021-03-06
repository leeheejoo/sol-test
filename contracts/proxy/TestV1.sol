pragma solidity >=0.4.21 <0.6.0;

import "../lib/TLib.sol";

contract TestV1 {

    event SetValue(uint value);
    event SetMultiValue(uint multi);

    uint multi;
    uint value;

    constructor () public {
        init();
    }

    function init() public {
        multi = 1;
        value = 0;
    }

    function setMultiValue(uint _multi) public {
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