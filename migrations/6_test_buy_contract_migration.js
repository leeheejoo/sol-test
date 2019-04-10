const TestBuyContract = artifacts.require("TestBuyContract");

module.exports = async function(deployer,network,accounts) {

  if (network == "ganache" || network == "test") {

    //await deployer.deploy(TestBuyContract,{from:accounts[0]});

  } else if(network == "dev"){

  }

};
