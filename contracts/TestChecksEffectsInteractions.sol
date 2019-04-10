pragma solidity >=0.4.21 <0.6.0;

contract TestChecksEffectsInteractions {

    mapping(address => uint) balances;

    function deposit() public payable {
        balances[msg.sender] = msg.value;
    }

    function balance() public view returns (uint) {
        return balances[msg.sender];
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, 'The balance is less than withdraw amount!');

        balances[msg.sender] -= amount;

        // will be reverted;
        msg.sender.transfer(amount*10);
    }
}