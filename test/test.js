const Test = artifacts.require("../contracts/Test.sol");

contract("Test",  function(accounts) {

    it("basic Test", async () => {
        const contract = await Test.deployed();
        await contract.setValue(154);
        let value2 = await contract.value();
        let value = await contract.getValue();
        assert.equal(value,154);
    });

});