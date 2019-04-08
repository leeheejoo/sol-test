exports.abi1 = [{
    "constant": true,
    "inputs": [],
    "name": "value",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3fa4f245"
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
    "name": "getValue",
    "outputs": [
      {
        "name": "ret",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x20965255"
  }
];
