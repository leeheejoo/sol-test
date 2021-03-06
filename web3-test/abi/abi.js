exports.TestVABI = [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SetValue",
    "type": "event",
    "signature": "0xed8b07065ef0737c0cfb1bf1e23ccc881d797ec9804f74230a360b84982938ab"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "multi",
        "type": "uint256"
      }
    ],
    "name": "SetMultiValue",
    "type": "event",
    "signature": "0xb03d1c32084198c13732e46d3e173999e5311cd931aff5ccea60d0bf63227a8c"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "init",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe1c7392a"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_multi",
        "type": "uint256"
      }
    ],
    "name": "setMultiValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x5f7d7516"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x55241077"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "calcValue",
    "outputs": [
      {
        "name": "ret",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xdd3c9854"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getMulti",
    "outputs": [
      {
        "name": "ret",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf3c66284"
  }
];

exports.TestInterfaceABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SetValue",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "multi",
        "type": "uint256"
      }
    ],
    "name": "SetMultiValue",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "init",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_multi",
        "type": "uint256"
      }
    ],
    "name": "setMultiValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "calcValue",
    "outputs": [
      {
        "name": "ret",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getMulti",
    "outputs": [
      {
        "name": "ret",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

exports.TestProxyABI = [
  {
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setTargetAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xfd8b2370"
  }
];


///////////////////////////////////

exports.TestSingleABI =  [
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x715018a6"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8f32d59b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf2fde38b"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "SetValue",
    "type": "event",
    "signature": "0xed8b07065ef0737c0cfb1bf1e23ccc881d797ec9804f74230a360b84982938ab"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "multi",
        "type": "uint256"
      }
    ],
    "name": "SetMultiValue",
    "type": "event",
    "signature": "0xb03d1c32084198c13732e46d3e173999e5311cd931aff5ccea60d0bf63227a8c"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DepositEther",
    "type": "event",
    "signature": "0xe628a607143b255f52afd0900e0d9630dd009c2f2635cd1e28c7aeeeff940802"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TransferEther",
    "type": "event",
    "signature": "0xb3b1161e7ca4497d76487715c8809b3ceacaf2159449df2f44a4d29cb609a008"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event",
    "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_multi",
        "type": "uint256"
      }
    ],
    "name": "setMultiValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x5f7d7516"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "setValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x55241077"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "calcValue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xdd3c9854"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCalcValue",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xd8b24a38"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getMulti",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf3c66284"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transferEther",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0x05b1137b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getEther",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xde0ff7c5"
  }
];