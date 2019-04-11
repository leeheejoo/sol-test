pragma solidity >=0.4.21 <0.6.0;

contract TestChecksEffectsInteractions {

    mapping(address => uint) balances;
    address[] addresses;
    uint[] values;

    function deposit() public payable {
        balances[msg.sender] = msg.value;
        addresses.push(msg.sender);
        values.push(msg.value);
    }

    function balance() public view returns (uint) {
        return balances[msg.sender];
    }

    // get dynamic array
    function balanceArray() public view returns (address[] memory, uint[] memory) {

        address[] memory arrAddr = new address[](addresses.length);
        uint[] memory arrValues = new uint[](values.length);

        for (uint i = 0; i < addresses.length; i++){
            arrAddr[i] = addresses[i];
            arrValues[i] = values[i];
        }

        return (arrAddr, arrValues);
    }

    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount, 'The balance is less than withdraw amount!!');

        balances[msg.sender] -= amount;

        // will be reverted;
        msg.sender.transfer(amount*10);
    }
}