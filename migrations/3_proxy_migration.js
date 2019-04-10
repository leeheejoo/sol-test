const TLib = artifacts.require("TLib");
const Test = artifacts.require("TestV2");


module.exports = async function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {

    // await deployer.deploy(TLib,{from:accounts[0],overwrite: false});
    // await deployer.link(TLib,Test);
    // await deployer.deploy(Test, {from:accounts[0]});

  } else if(network == "dev"){


  }

};
