
const TestSingle = artifacts.require("../contracts/TestSingle.sol");

let Ts;
let TLibAddr = "0x5ffd14b5Cd0efba05Ecc27BFa9dAC6A022a36Df9";
let TestSingleAddr = "0x9aEdbdb33621f93f2FA1124E8214c3301fdcd02A";

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