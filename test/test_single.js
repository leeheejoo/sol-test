
const TestSingle = artifacts.require("../contracts/TestSingle.sol");

let Ts;
let TLibAddr = "0x1c3d6fb5cE79B1E20218260411Fae2Ca89013E85";
let TestSingleAddr = "0xb47FD51463fAB33B7E7fE79770bC56c4cFfa787B";

contract("Test Single", async function(accounts) {
    
    before(async function () {

        // get Test Proxy
        Ts = await TestSingle.at(TestSingleAddr, { from: accounts[0] })

    })

    describe('test single', function () {
        it("basic Test", async () => {

            let multi = await Ts.getMulti();
            multi = multi.toNumber();
            let ret = await Ts.calcValue({ from: accounts[0] });
            let value =  await Ts.getCalcValue();
            value = value.toNumber();

            let testValue = 222;
            ret = await Ts.setValue(testValue, { from: accounts[0] });
            let multiValue = 1;
            ret = await Ts.setMultiValue(multiValue, { from: accounts[0] });
            multi = await Ts.getMulti();
            multi = multi.toNumber();
            ret = await Ts.calcValue({ from: accounts[0] });
            value =  await Ts.getCalcValue();
            value = value.toNumber();

            assert.equal(value,11);
        });

    });

});