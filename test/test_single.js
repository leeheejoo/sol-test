
const TestSingle = artifacts.require("../contracts/TestSingle.sol");

let Ts;
let TLibAddr = "0x37D710b601b7430F335b3aFfF6Cf16899B55c4d1";
let TestSingleAddr = "0x886279D880B09914544C9774AA89fD3c8bCaf28E";

contract("Test Single", async function(accounts) {
    
    before(async function () {

        // get Test Proxy
        Ts = await TestSingle.at(TestSingleAddr, { from: accounts[0] })

    })

    /*
    describe('test basic', function () {
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
*/
    
    describe('test transfer', function () {
        it("basic Test", async () => {

            let amount = web3.utils.toWei("1", "ether");
            let ret = await Ts.send(amount,{ from: accounts[0] });
            let balance = await web3.eth.getBalance(Ts.address);
            let balance2 = await Ts.getEther({ from: accounts[0] });

            assert.equal(balance,balance2);

            let to = "0x90d02CC8Aa547BeF1F7A27F83507327EBbeee7C7";
            amount = web3.utils.toWei("1", "ether");
            ret = await Ts.transferEther(to, amount, { from: accounts[0] });

            balance = await web3.eth.getBalance(Ts.address);
            console.log(`       contract balance is ${balance2.toString()}`);
        });

    });

});