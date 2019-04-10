pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/math/SafeMath.sol";

library TLib {

    struct Data {
        uint testUint;
    }

    function mul(uint _a, uint _b) public pure returns (uint ret) {
        return SafeMath.mul(_a,_b);
    }

    function div(uint _a, uint _b) public pure returns (uint ret) {
        return SafeMath.div(_a,_b);
    }

    function sub(uint _a, uint _b) public pure returns (uint ret) {
        return SafeMath.sub(_a,_b);
    }

    function add(uint _a, uint _b) public pure returns (uint ret) {
        return SafeMath.add(_a,_b);
    }

    function mod(uint _a, uint _b) public pure returns (uint ret) {
        return SafeMath.mod(_a,_b);
    }

    function test1(Data storage _d, uint _a, uint _b) public {
        uint temp = add(_a,_b);
        temp = mod(temp,100);
        temp = div(temp,2);
        _d.testUint = div(temp,2);
    }

}