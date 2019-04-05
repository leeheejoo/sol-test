const Test = artifacts.require("../contracts/Test.sol");

contract("Test", async function(accounts) {

    it("basic Test", async () => {

        let accounts = await web3.eth.getAccounts();
        //let gasLimit = await web3.eth.estimateGas();

        const contract = await Test.at("0x20B3eFb515548804D026279475FC4Ac01500fEd1");       //ganache
        //const contract = await Test.at("0xf70A7F4cb3FDE6AEc3E7E9509e0F02c636c62a62");     //testnet

        let gas = await contract.setValue(222);
        //let value2 = await contract.value();
        //let value = value2.toNumber();
        let value = await contract.getValue();
        let nValue = value.toNumber();
        assert.equal(nValue,222*2);
    });

});