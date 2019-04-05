const Test = artifacts.require("../contracts/Test.sol");

contract("Test",  function(accounts) {

    it("basic Test", async () => {
        const contract = await Test.at("0xaD017f5f4B3De785e9c048C5F43eE8db5a9bdf58");
        await contract.setValue(154);
        let value2 = await contract.value();
        let value = await contract.getValue();
        assert.equal(value,154*2);
    });

});