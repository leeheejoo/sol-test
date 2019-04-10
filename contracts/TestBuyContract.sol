pragma solidity >=0.4.21 <0.6.0;

contract TestBuyContract {

    address public owner = msg.sender;
    uint public lastOwnerChange = now;
    
    modifier onlyBy(address _account) {
        require(msg.sender == _account);
        _;
    }
    
    modifier onlyAfter(uint _time) {
        require(now >= _time, 'It is not the contract purchase time.');
        _;
    }
    
    modifier costs(uint _amount) {
        require(msg.value >= _amount,'The purchase amount is less than one ether');
        _;
        if (msg.value > _amount) {
            msg.sender.transfer(msg.value - _amount);
        }
    }
    
    function changeOwner(address _newOwner) public onlyBy(owner) {
        owner = _newOwner;
    }
    
    // 구입후 3분이 지나후 살 수 있음
    function buyContract() public payable onlyAfter(lastOwnerChange + 3 minutes) costs(1 ether) {
        owner = msg.sender;
        lastOwnerChange = now;
    }
}