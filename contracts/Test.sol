pragma solidity >=0.4.21 <0.6.0;

contract Test {

    uint public value;

    function setValue(uint _value) public {
        value = _value;
    }

    function getValue() public view returns(uint) {
        return value;
    }
}