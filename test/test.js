const Test = artifacts.require("../contracts/Test.sol");

contract("Test", async function(accounts) {

    it("basic Test", async () => {

        let accounts = await web3.eth.getAccounts();
        //let gasLimit = await web3.eth.estimateGas();

        const contract = await Test.at("0x9F1Ba148C194A3Fb741D554C46Def3268006dd35");       //ganache
        //const contract = await Test.at("0x15588AeD873dB0A5F376d837f38ACEe298d80626");     //testnet

        let ret = await contract.setValue(222);
        //let value2 = await contract.value();
        //let value = value2.toNumber();
        let value = await contract.getValue();
        let nValue = value.toNumber();
        assert.equal(nValue,222*2);
    });

});