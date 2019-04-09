const TLib = artifacts.require("TLib");
const Test = artifacts.require("TestV1");
const TestProxy = artifacts.require("TestProxy");

module.exports = async function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {

    await deployer.deploy(TLib, {from:accounts[0]});
    await deployer.link(TLib,Test);
    await deployer.deploy(Test, {from:accounts[0]});
    await deployer.deploy(TestProxy, Test.address, {from:accounts[0]});

  } else if(network == "dev"){

    let migrate = false;
    deployer.deploy(TLib,{overwrite: migrate});
    deployer.link(TLib,Test);
    deployer.deploy(Test,{overwrite: migrate});

  }

};
