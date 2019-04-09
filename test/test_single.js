
const TestSingle = artifacts.require("../contracts/TestSingle.sol");

let Ts;
let TLibAddr = "0xC68a7d5F48899BbB819dCa4680b94BB4e9788030";
let TestSingleAddr = "0x0953E2b41B2B7AcB5a439a7fbA2829565Fa57477";

contract("Test Single", async function(accounts) {
    
    before(async function () {

        // get Test Proxy
        Ts = await TestSingle.at(TestSingleAddr, { from: accounts[0] })

    })

    describe('test single', function () {
        it("basic Test", async () => {

            let multi = await Ts.getMulti();
            multi = multi.toNumber();
            let value = await Ts.calcValue();
            value = value.toNumber();

            let testValue = 222;
            let ret = await Ts.setValue(testValue, { from: accounts[0] });
            let multiValue = 1;
            ret = await Ts.setMultiValue(multiValue, { from: accounts[0] });
            multi = await Ts.getMulti();
            multi = multi.toNumber();
            value = await Ts.calcValue();
            value = value.toNumber();
            assert.equal(value,(testValue+testValue)*multi);
        });

    });

});