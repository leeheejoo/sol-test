pragma solidity >=0.4.21 <0.6.0;

contract TestInterface {

    event SetValue(uint value);
    event SetMultiValue(uint multi);

    // Test 
    function setMultiValue(uint _multi) public;
    function setValue(uint _value) public;
    function calcValue() public view returns (uint ret);
    function getMulti() public view returns (uint ret);
}