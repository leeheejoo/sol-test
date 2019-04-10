pragma solidity >=0.4.21 <0.6.0;

import "./lib/TLib.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract TestSingle is Ownable {

    event SetValue(uint value);
    event SetMultiValue(uint multi);
    event DepositEther(address sender, uint amount);
    event TransferEther(address to, uint amount);

    uint multi = 1;
    uint value = 0;
    TLib.Data tdata;

    constructor () public {

    }

    function() external payable { 
        emit DepositEther(msg.sender, msg.value);
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

    function calcValue() public {
        TLib.test1(tdata,value,value);
    }

    function getCalcValue() public view returns (uint) {
        return tdata.testUint * multi;
    }

    function getMulti() public view returns (uint) {
        return multi;
    }

    function transferEther(address _to, uint _amount) public payable onlyOwner {
        require(_to != address(0), "address is 0x0!!");
        require(address(this).balance >= _amount, 'ether is less than amount to send !!!');
        address(uint160(_to)).transfer(_amount);
        emit TransferEther(_to,_amount);
    }

    function getEther() public view returns (uint) {
        return address(this).balance;
    }
}