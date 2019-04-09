pragma solidity >=0.4.21 <0.6.0;

interface TestInterface {

    event SetValue(uint value);
    event SetMultiValue(uint multi);

    // Test 
    function init() external;
    function setMultiValue(uint _multi) external;
    function setValue(uint _value) external;
    function calcValue() external view returns (uint ret);
    function getMulti() external view returns (uint ret);
}