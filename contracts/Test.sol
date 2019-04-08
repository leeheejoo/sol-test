pragma solidity >=0.4.21 <0.6.0;

import "./TLib.sol";

contract Test {

    event SetValue(uint value);

    uint public value;

    function setValue(uint _value) public {
        //require(_value > 0);
        value = _value;
        emit SetValue(value);
    }

    function getValue() public view returns(uint ret) {
        return TLib.add(value,value);
    }
}