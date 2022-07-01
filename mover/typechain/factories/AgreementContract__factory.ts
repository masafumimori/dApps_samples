/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  AgreementContract,
  AgreementContractInterface,
} from "../AgreementContract";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
    ],
    name: "CompleteAgreement",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "moderator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
    ],
    name: "CreateAgreement",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
    ],
    name: "UpdateAgreement",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "review",
        type: "string",
      },
    ],
    name: "completeAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "moderator",
        type: "address",
      },
      {
        internalType: "bytes22",
        name: "daoName",
        type: "bytes22",
      },
      {
        internalType: "uint32",
        name: "startTime",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "endTime",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vestingDuration",
        type: "uint256",
      },
    ],
    name: "createAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
    ],
    name: "getAgreementDetail",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "bytes22",
            name: "daoName",
            type: "bytes22",
          },
          {
            internalType: "uint32",
            name: "startTime",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "endTime",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "isCompleted",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "rewardAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "founder",
            type: "address",
          },
          {
            internalType: "address",
            name: "moderator",
            type: "address",
          },
        ],
        internalType: "struct SharedStructs.Agreement",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "getAllAgreements",
    outputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "id",
            type: "bytes32",
          },
          {
            internalType: "bytes22",
            name: "daoName",
            type: "bytes22",
          },
          {
            internalType: "uint32",
            name: "startTime",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "endTime",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "isCompleted",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "rewardAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "founder",
            type: "address",
          },
          {
            internalType: "address",
            name: "moderator",
            type: "address",
          },
        ],
        internalType: "struct SharedStructs.Agreement[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "holder",
        type: "address",
      },
    ],
    name: "getAllIds",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalAgreements",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_pom",
        type: "address",
      },
      {
        internalType: "address",
        name: "_vesting",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "startTime",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "endTime",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "rewardAmount",
        type: "uint256",
      },
    ],
    name: "updateAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611fe6806100206000396000f3fe608060405234801561001057600080fd5b50600436106101165760003560e01c806391d14854116100a2578063bd933d1b11610071578063bd933d1b14610238578063c2fc392114610240578063ca99f01a14610253578063d547741f14610273578063ffc082b91461028657600080fd5b806391d14854146101ea578063a217fddf146101fd578063aa2b06fb14610205578063b9f666f91461021857600080fd5b80633f4ba83a116100e95780633f4ba83a1461019c578063485cc955146101a45780635c975abb146101b75780637d21a970146101c25780638456cb59146101e257600080fd5b806301ffc9a71461011b578063248a9ca3146101435780632f2ff15d1461017457806336568abe14610189575b600080fd5b61012e610129366004611b7c565b610299565b60405190151581526020015b60405180910390f35b610166610151366004611a49565b60009081526065602052604090206001015490565b60405190815260200161013a565b610187610182366004611a61565b6102d0565b005b610187610197366004611a61565b6102fb565b61018761037e565b6101876101b23660046119a1565b610395565b60975460ff1661012e565b6101d56101d0366004611987565b61049a565b60405161013a9190611dab565b6101876106ab565b61012e6101f8366004611a61565b6106bf565b610166600081565b610187610213366004611b39565b6106ea565b61022b610226366004611987565b610a94565b60405161013a9190611d67565b610166610b36565b61018761024e366004611a83565b610b46565b610266610261366004611a49565b610d4c565b60405161013a9190611ec5565b610187610281366004611a61565b610e2e565b6101876102943660046119d3565b610e54565b60006001600160e01b03198216637965db0b60e01b14806102ca57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6000828152606560205260409020600101546102ec813361141c565b6102f68383611480565b505050565b6001600160a01b03811633146103705760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61037a8282611506565b5050565b600061038a813361141c565b61039261156d565b50565b600054610100900460ff166103b05760005460ff16156103b4565b303b155b6104175760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610367565b600054610100900460ff16158015610439576000805461ffff19166101011790555b610441611600565b610449611641565b610454600033611480565b60c980546001600160a01b038086166001600160a01b03199283161790925560ca80549285169290911691909117905580156102f6576000805461ff0019169055505050565b6001600160a01b038116600090815260cb602090815260408083208054825181850281018501909352808352606094938301828280156104f957602002820191906000526020600020905b8154815260200190600101908083116104e5575b5050505050905060008151116105215760405162461bcd60e51b815260040161036790611e22565b6000815167ffffffffffffffff81111561054b57634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561058457816020015b610571611913565b8152602001906001900390816105695790505b50905060005b82518110156106a35760cc60008483815181106105b757634e487b7160e01b600052603260045260246000fd5b6020908102919091018101518252818101929092526040908101600020815161010081018352815481526001820154605081901b69ffffffffffffffffffff191694820194909452600160b01b840463ffffffff90811693820193909352600160d01b84049092166060830152600160f01b90920460ff1615156080820152600282015460a082015260038201546001600160a01b0390811660c083015260049092015490911660e0820152825183908390811061068557634e487b7160e01b600052603260045260246000fd5b6020026020010181905250808061069b90611f69565b91505061058a565b509392505050565b60006106b7813361141c565b610392611678565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60975460ff161561070d5760405162461bcd60e51b815260040161036790611e50565b600084815260cc602052604090206003015484906001600160a01b031633146107695760405162461bcd60e51b815260206004820152600e60248201526d139bdd08185d5d1a1bdc9a5e995960921b6044820152606401610367565b600085815260cc60205260409020600101548590600160f01b900460ff16156107d45760405162461bcd60e51b815260206004820152601b60248201527f41677265656d656e7420616c726561647920636f6d706c6574656400000000006044820152606401610367565b600086815260cc6020526040902063ffffffff86161561095157428663ffffffff16116108435760405162461bcd60e51b815260206004820152601b60248201527f737461727454696d65206d757374206265206166746572206e6f7700000000006044820152606401610367565b63ffffffff851615801561086a5750600181015463ffffffff808816600160d01b90920416105b156108c35760405162461bcd60e51b8152602060048201526024808201527f737461727454696d65206d757374206265206265666f726520656e6454696d65604482015263081cd95d60e21b6064820152608401610367565b63ffffffff8516158015906108e357508563ffffffff168563ffffffff16105b156109305760405162461bcd60e51b815260206004820181905260248201527f737461727454696d65206d757374206265206265666f726520656e6454696d656044820152606401610367565b60018101805463ffffffff60b01b1916600160b01b63ffffffff8916021790555b63ffffffff8516156109e157600181015463ffffffff808716600160b01b90920416106109c05760405162461bcd60e51b815260206004820152601f60248201527f656e6454696d65206d75737420626520616674657220737461727454696d65006044820152606401610367565b60018101805463ffffffff60d01b1916600160d01b63ffffffff8816021790555b83156109ef57600281018490555b60ca54604051637917445b60e11b8152600481018990526024810186905263ffffffff871660448201526001600160a01b039091169063f22e88b690606401600060405180830381600087803b158015610a4857600080fd5b505af1158015610a5c573d6000803e3d6000fd5b50506040518992507fdbf5c1a8ed6fd0df3643fa747b9a4d21f2e7b0ef4c7f70a982ec36152f1a57ae9150600090a250505050505050565b6001600160a01b038116600090815260cb6020526040902054606090610acc5760405162461bcd60e51b815260040161036790611e22565b6001600160a01b038216600090815260cb602090815260409182902080548351818402810184019094528084529091830182828015610b2a57602002820191906000526020600020905b815481526020019060010190808311610b16575b50505050509050919050565b6000610b4160cd5490565b905090565b60975460ff1615610b695760405162461bcd60e51b815260040161036790611e50565b600082815260cc602052604090206003015482906001600160a01b03163314610bc55760405162461bcd60e51b815260206004820152600e60248201526d139bdd08185d5d1a1bdc9a5e995960921b6044820152606401610367565b600083815260cc60205260409020600101548390600160f01b900460ff1615610c305760405162461bcd60e51b815260206004820152601b60248201527f41677265656d656e7420616c726561647920636f6d706c6574656400000000006044820152606401610367565b600084815260cc6020526040902060010154600160d01b900463ffffffff164211610c925760405162461bcd60e51b815260206004820152601260248201527110dbdb9d1c9858dd081b9bdd08195b99195960721b6044820152606401610367565b600084815260cc60205260409081902060018101805460ff60f01b1916600160f01b17905560c95491516348aa8f0760e11b815290916001600160a01b0316906391551e0e90610ce89088908890600401611dee565b600060405180830381600087803b158015610d0257600080fd5b505af1158015610d16573d6000803e3d6000fd5b50506040518792507f87659aedf8ce2ecf0c5205df4f03764aeabc61947b2c263b7d06ec995cc26db69150600090a25050505050565b610d54611913565b600082815260cc60205260409020600401546001600160a01b0316610d8b5760405162461bcd60e51b815260040161036790611e22565b50600090815260cc6020908152604091829020825161010081018452815481526001820154605081901b69ffffffffffffffffffff191693820193909352600160b01b830463ffffffff90811694820194909452600160d01b83049093166060840152600160f01b90910460ff1615156080830152600281015460a083015260038101546001600160a01b0390811660c08401526004909101541660e082015290565b600082815260656020526040902060010154610e4a813361141c565b6102f68383611506565b60975460ff1615610e775760405162461bcd60e51b815260040161036790611e50565b6001600160a01b038616610ecd5760405162461bcd60e51b815260206004820152601d60248201527f6d6f64657261746f7220697320746865207a65726f20616464726573730000006044820152606401610367565b8363ffffffff164210610f225760405162461bcd60e51b815260206004820152601b60248201527f737461727454696d65206d757374206265206166746572206e6f7700000000006044820152606401610367565b8263ffffffff168463ffffffff1610610f7d5760405162461bcd60e51b815260206004820152601f60248201527f656e6454696d65206d75737420626520616674657220737461727454696d65006044820152606401610367565b81610fca5760405162461bcd60e51b815260206004820152601860248201527f726577617264416d6f756e74206d757374206265203e203000000000000000006044820152606401610367565b6000338742610fda600143611f0b565b6040516bffffffffffffffffffffffff19606095861b811660208301529390941b9092166034840152604883015240606882015260880160408051601f198184030181529181528151602092830120600081815260cc9093529120600401549091506001600160a01b0316156110925760405162461bcd60e51b815260206004820152601a60248201527f61677265656d656e74496420616c7265616479206578697374730000000000006044820152606401610367565b60cb6000336001600160a01b03166001600160a01b0316815260200190815260200160002081908060018154018082558091505060019003906000526020600020016000909190919091505560cb6000886001600160a01b03166001600160a01b031681526020019081526020016000208190806001815401808255809150506001900390600052602060002001600090919091909150556040518061010001604052808281526020018769ffffffffffffffffffff191681526020018663ffffffff1681526020018563ffffffff168152602001600015158152602001848152602001336001600160a01b03168152602001886001600160a01b031681525060cc60008381526020019081526020016000206000820151816000015560208201518160010160006101000a8154816001600160b01b03021916908360501c021790555060408201518160010160166101000a81548163ffffffff021916908363ffffffff160217905550606082015181600101601a6101000a81548163ffffffff021916908363ffffffff160217905550608082015181600101601e6101000a81548160ff02191690831515021790555060a0820151816002015560c08201518160030160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060e08201518160040160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555090505060ca60009054906101000a90046001600160a01b03166001600160a01b03166390156c5882338a8789886040518763ffffffff1660e01b815260040161132b969594939291909586526001600160a01b039485166020870152929093166040850152606084015263ffffffff91909116608083015260a082015260c00190565b600060405180830381600087803b15801561134557600080fd5b505af1158015611359573d6000803e3d6000fd5b505060c954600084815260cc6020526040908190209051630a4cbac560e41b81526001600160a01b03909216935063a4cbac50925061139d918b9190600401611cc2565b600060405180830381600087803b1580156113b757600080fd5b505af11580156113cb573d6000803e3d6000fd5b505050506113dd60cd80546001019055565b60405181906001600160a01b038916907f6eb995d190532ded8fb13a00b7fbbd0bad4e680c32ed94df302c4eefb583e76690600090a350505050505050565b61142682826106bf565b61037a5761143e816001600160a01b031660146116d0565b6114498360206116d0565b60405160200161145a929190611c4d565b60408051601f198184030181529082905262461bcd60e51b825261036791600401611e0f565b61148a82826106bf565b61037a5760008281526065602090815260408083206001600160a01b03851684529091529020805460ff191660011790556114c23390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b61151082826106bf565b1561037a5760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60975460ff166115b65760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610367565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054610100900460ff166116275760405162461bcd60e51b815260040161036790611e7a565b61162f6118b9565b6116376118b9565b61163f6118b9565b565b600054610100900460ff166116685760405162461bcd60e51b815260040161036790611e7a565b6116706118b9565b61163f6118e0565b60975460ff161561169b5760405162461bcd60e51b815260040161036790611e50565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586115e33390565b606060006116df836002611eec565b6116ea906002611ed4565b67ffffffffffffffff81111561171057634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561173a576020820181803683370190505b509050600360fc1b8160008151811061176357634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106117a057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060006117c4846002611eec565b6117cf906001611ed4565b90505b6001811115611863576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061181157634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061183557634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c9361185c81611f52565b90506117d2565b5083156118b25760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610367565b9392505050565b600054610100900460ff1661163f5760405162461bcd60e51b815260040161036790611e7a565b600054610100900460ff166119075760405162461bcd60e51b815260040161036790611e7a565b6097805460ff19169055565b6040805161010081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e081019190915290565b80356001600160a01b038116811461196e57600080fd5b919050565b803563ffffffff8116811461196e57600080fd5b600060208284031215611998578081fd5b6118b282611957565b600080604083850312156119b3578081fd5b6119bc83611957565b91506119ca60208401611957565b90509250929050565b60008060008060008060c087890312156119eb578182fd5b6119f487611957565b9550602087013569ffffffffffffffffffff1981168114611a13578283fd5b9450611a2160408801611973565b9350611a2f60608801611973565b92506080870135915060a087013590509295509295509295565b600060208284031215611a5a578081fd5b5035919050565b60008060408385031215611a73578182fd5b823591506119ca60208401611957565b60008060408385031215611a95578182fd5b82359150602083013567ffffffffffffffff80821115611ab3578283fd5b818501915085601f830112611ac6578283fd5b813581811115611ad857611ad8611f9a565b604051601f8201601f19908116603f01168101908382118183101715611b0057611b00611f9a565b81604052828152886020848701011115611b18578586fd5b82602086016020830137856020848301015280955050505050509250929050565b60008060008060808587031215611b4e578384fd5b84359350611b5e60208601611973565b9250611b6c60408601611973565b9396929550929360600135925050565b600060208284031215611b8d578081fd5b81356001600160e01b0319811681146118b2578182fd5b60008151808452611bbc816020860160208601611f22565b601f01601f19169290920160200192915050565b8051825269ffffffffffffffffffff196020820151166020830152604081015163ffffffff8082166040850152806060840151166060850152505060808101511515608083015260a081015160a083015260018060a01b0360c08201511660c083015260e08101516102f660e08401826001600160a01b03169052565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611c85816017850160208801611f22565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611cb6816028840160208801611f22565b01602801949350505050565b6001600160a01b038316815281546020820152600182015469ffffffffffffffffffff19605082901b16604083015261012082019063ffffffff60b082901c81166060850152611d1f60808501828460d01c1663ffffffff169052565b50611d3460a0840160ff8360f01c1615159052565b50600283015460c083015260038301546001600160a01b0390811660e084015260048401541661010083018190526106a3565b6020808252825182820181905260009190848201906040850190845b81811015611d9f57835183529284019291840191600101611d83565b50909695505050505050565b6020808252825182820181905260009190848201906040850190845b81811015611d9f57611dda838551611bd0565b928401926101009290920191600101611dc7565b828152604060208201526000611e076040830184611ba4565b949350505050565b6020815260006118b26020830184611ba4565b60208082526014908201527341677265656d656e74206e6f742065786973747360601b604082015260600190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b61010081016102ca8284611bd0565b60008219821115611ee757611ee7611f84565b500190565b6000816000190483118215151615611f0657611f06611f84565b500290565b600082821015611f1d57611f1d611f84565b500390565b60005b83811015611f3d578181015183820152602001611f25565b83811115611f4c576000848401525b50505050565b600081611f6157611f61611f84565b506000190190565b6000600019821415611f7d57611f7d611f84565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212201f019cc15f72ad8b3b39ac5c72a94d21a6cd6ffdb5ddb01122ff949a0dadbafc64736f6c63430008040033";

export class AgreementContract__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<AgreementContract> {
    return super.deploy(overrides || {}) as Promise<AgreementContract>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): AgreementContract {
    return super.attach(address) as AgreementContract;
  }
  connect(signer: Signer): AgreementContract__factory {
    return super.connect(signer) as AgreementContract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AgreementContractInterface {
    return new utils.Interface(_abi) as AgreementContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AgreementContract {
    return new Contract(address, _abi, signerOrProvider) as AgreementContract;
  }
}