pragma solidity >=0.4.21 <0.6.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract TestEmergencyStop is Ownable {

    event Deposit(string message);
    event DmergencyWithdraw(string message);

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    function stopContract() public onlyOwner {
        isStopped = true;
    }

    function resumeContract() public onlyOwner {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // Deposit logic happening here
        emit Deposit('call deposit !!');
    }

    function emergencyWithdraw() public onlyOwner onlyWhenStopped {
        // Emergency withdraw happening here
        emit Deposit('call emergencyWithdraw !!');
    }
}