export const PracticeGameABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_gameEngine", type: "address", internalType: "address" },
      { name: "_playerContract", type: "address", internalType: "address" },
      {
        name: "_defaultPlayerContract",
        type: "address",
        internalType: "address",
      },
      { name: "_monsterContract", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "defaultPlayerContract",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IDefaultPlayer" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "gameEngine",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IGameEngine" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "monsterContract",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IMonster" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "play",
    inputs: [
      {
        name: "player1",
        type: "tuple",
        internalType: "struct Fighter.PlayerLoadout",
        components: [
          { name: "playerId", type: "uint32", internalType: "uint32" },
          {
            name: "skin",
            type: "tuple",
            internalType: "struct Fighter.SkinInfo",
            components: [
              { name: "skinIndex", type: "uint32", internalType: "uint32" },
              { name: "skinTokenId", type: "uint16", internalType: "uint16" },
            ],
          },
        ],
      },
      {
        name: "player2",
        type: "tuple",
        internalType: "struct Fighter.PlayerLoadout",
        components: [
          { name: "playerId", type: "uint32", internalType: "uint32" },
          {
            name: "skin",
            type: "tuple",
            internalType: "struct Fighter.SkinInfo",
            components: [
              { name: "skinIndex", type: "uint32", internalType: "uint32" },
              { name: "skinTokenId", type: "uint16", internalType: "uint16" },
            ],
          },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "playerContract",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IPlayer" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setDefaultPlayerContract",
    inputs: [
      { name: "_newContract", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGameEngine",
    inputs: [{ name: "_newEngine", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMonsterContract",
    inputs: [
      { name: "_newContract", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPlayerContract",
    inputs: [
      { name: "_newContract", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CombatResult",
    inputs: [
      {
        name: "player1Data",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "player2Data",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "winningPlayerId",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
      {
        name: "packedResults",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DefaultPlayerContractUpdated",
    inputs: [
      {
        name: "oldContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GameEngineUpdated",
    inputs: [
      {
        name: "oldEngine",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newEngine",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MonsterContractUpdated",
    inputs: [
      {
        name: "oldContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      { name: "user", type: "address", indexed: true, internalType: "address" },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PlayerContractUpdated",
    inputs: [
      {
        name: "oldContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "ZeroAddress", inputs: [] },
] as const;
