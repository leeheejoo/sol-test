const TLib = artifacts.require("TLib");
const TestSingle = artifacts.require("TestSingle");


module.exports = async function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {

    // await deployer.deploy(TLib,{from:accounts[0]});
    // await deployer.link(TLib,TestSingle);
    // await deployer.deploy(TestSingle, {from:accounts[0]});

  } else if(network == "dev"){


  }

};
