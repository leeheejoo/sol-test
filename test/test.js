const Test = artifacts.require("../contracts/Test.sol");

contract("Test", async function(accounts) {

    it("basic Test", async () => {

        let accounts = await web3.eth.getAccounts();
        //let gasLimit = await web3.eth.estimateGas();

        //const contract = await Test.at("0x20B3eFb515548804D026279475FC4Ac01500fEd1");       //ganache
        const contract = await Test.at("0x9f052Cd54ac0187F42736E4cE31F0757f10e881a");     //testnet : goerli

        let testValue = 222;
        let ret = await contract.setValue(testValue);
        ret = await contract.setMultiValue(2);
        let multi = await contract.multi();
        let value = await contract.calcValue();
        assert.equal(value,(testValue+testValue)*multi);
    });

});