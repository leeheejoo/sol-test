const TestInterface = artifacts.require("../contracts/TestInterface.sol");
const TestProxy = artifacts.require("../contracts/TestProxy.sol");

let Ti;
let Tp;
let TLibAddr = "0xB2d9f008ad03E80b256c55A01d9FB05514b6831e";
let TestV1Addr = "0xA35592467426D4C303fd22cc9D1f30E01cAd853F";
let TestV2Addr = "0xC4fC019A197bAe978675F70775d0dFD123429Cb6";
let TestProxyAddr = "0xE756A02dc04a5a6B7437Bb067Ce0cD1f058fF9b6";


contract("Test", async function(accounts) {
    
    before(async function () {

        // get Test Proxy
        Tp = await TestProxy.at(TestProxyAddr, { from: accounts[0] });
        Ti = await TestInterface.at(TestProxyAddr, { from: accounts[0] });

        //const contract = await Test.at("0xe2f7495e2FF54eC6245f55095B47653f4Ad28a06");     //testnet : goerli
    })

    describe('test', function () {
        it("basic Test", async () => {

            //let accounts = await web3.eth.getAccounts();
            //let gasLimit = await web3.eth.estimateGas();

            // Set Target TestV1    
            let aa = await Tp.setTargetAddress(TestV1Addr, { from: accounts[0] });

            let testValue = 222;
            let ret = await Ti.setValue(testValue);
            let multiValue = 1;
            ret = await Ti.setMultiValue(multiValue);
            let multi = await Ti.getMulti();
            multi = multi.toNumber();
            let value = await Ti.calcValue();
            value = value.toNumber();
            assert.equal(value,(testValue+testValue)*multi);
        });

        it("Proxy Test", async () => {

            // Change Target TestV2    

            let aa = await Tp.setTargetAddress(TestV2Addr, { from: accounts[0] });

            let testValue = 222;
            let ret = await Ti.setValue(testValue);
            let multiValue = 1;
            ret = await Ti.setMultiValue(multiValue);
            let multi = await Ti.getMulti();
            multi = multi.toNumber();
            let value = await Ti.calcValue();
            value = value.toNumber();
            assert.equal(value,(testValue+testValue)*multi);
        });
    });

});