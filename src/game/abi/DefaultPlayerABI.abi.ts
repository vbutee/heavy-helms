export const DefaultPlayerABI = [
  {
    type: "constructor",
    inputs: [
      { name: "skinRegistryAddress", type: "address", internalType: "address" },
      { name: "nameRegistryAddress", type: "address", internalType: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "convertToFighterStats",
    inputs: [
      {
        name: "loadout",
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
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IGameEngine.FighterStats",
        components: [
          { name: "weapon", type: "uint8", internalType: "uint8" },
          { name: "armor", type: "uint8", internalType: "uint8" },
          { name: "stance", type: "uint8", internalType: "uint8" },
          {
            name: "attributes",
            type: "tuple",
            internalType: "struct Fighter.Attributes",
            components: [
              { name: "strength", type: "uint8", internalType: "uint8" },
              { name: "constitution", type: "uint8", internalType: "uint8" },
              { name: "size", type: "uint8", internalType: "uint8" },
              { name: "agility", type: "uint8", internalType: "uint8" },
              { name: "stamina", type: "uint8", internalType: "uint8" },
              { name: "luck", type: "uint8", internalType: "uint8" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCurrentSkin",
    inputs: [{ name: "playerId", type: "uint32", internalType: "uint32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Fighter.SkinInfo",
        components: [
          { name: "skinIndex", type: "uint32", internalType: "uint32" },
          { name: "skinTokenId", type: "uint16", internalType: "uint16" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDefaultPlayer",
    inputs: [{ name: "playerId", type: "uint32", internalType: "uint32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IDefaultPlayer.DefaultPlayerStats",
        components: [
          {
            name: "attributes",
            type: "tuple",
            internalType: "struct Fighter.Attributes",
            components: [
              { name: "strength", type: "uint8", internalType: "uint8" },
              { name: "constitution", type: "uint8", internalType: "uint8" },
              { name: "size", type: "uint8", internalType: "uint8" },
              { name: "agility", type: "uint8", internalType: "uint8" },
              { name: "stamina", type: "uint8", internalType: "uint8" },
              { name: "luck", type: "uint8", internalType: "uint8" },
            ],
          },
          {
            name: "skin",
            type: "tuple",
            internalType: "struct Fighter.SkinInfo",
            components: [
              { name: "skinIndex", type: "uint32", internalType: "uint32" },
              { name: "skinTokenId", type: "uint16", internalType: "uint16" },
            ],
          },
          { name: "firstNameIndex", type: "uint16", internalType: "uint16" },
          { name: "surnameIndex", type: "uint16", internalType: "uint16" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFighterStats",
    inputs: [{ name: "playerId", type: "uint32", internalType: "uint32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IGameEngine.FighterStats",
        components: [
          { name: "weapon", type: "uint8", internalType: "uint8" },
          { name: "armor", type: "uint8", internalType: "uint8" },
          { name: "stance", type: "uint8", internalType: "uint8" },
          {
            name: "attributes",
            type: "tuple",
            internalType: "struct Fighter.Attributes",
            components: [
              { name: "strength", type: "uint8", internalType: "uint8" },
              { name: "constitution", type: "uint8", internalType: "uint8" },
              { name: "size", type: "uint8", internalType: "uint8" },
              { name: "agility", type: "uint8", internalType: "uint8" },
              { name: "stamina", type: "uint8", internalType: "uint8" },
              { name: "luck", type: "uint8", internalType: "uint8" },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isValidId",
    inputs: [{ name: "playerId", type: "uint32", internalType: "uint32" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "nameRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IPlayerNameRegistry",
      },
    ],
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
    name: "setDefaultPlayer",
    inputs: [
      { name: "playerId", type: "uint32", internalType: "uint32" },
      {
        name: "stats",
        type: "tuple",
        internalType: "struct IDefaultPlayer.DefaultPlayerStats",
        components: [
          {
            name: "attributes",
            type: "tuple",
            internalType: "struct Fighter.Attributes",
            components: [
              { name: "strength", type: "uint8", internalType: "uint8" },
              { name: "constitution", type: "uint8", internalType: "uint8" },
              { name: "size", type: "uint8", internalType: "uint8" },
              { name: "agility", type: "uint8", internalType: "uint8" },
              { name: "stamina", type: "uint8", internalType: "uint8" },
              { name: "luck", type: "uint8", internalType: "uint8" },
            ],
          },
          {
            name: "skin",
            type: "tuple",
            internalType: "struct Fighter.SkinInfo",
            components: [
              { name: "skinIndex", type: "uint32", internalType: "uint32" },
              { name: "skinTokenId", type: "uint16", internalType: "uint16" },
            ],
          },
          { name: "firstNameIndex", type: "uint16", internalType: "uint16" },
          { name: "surnameIndex", type: "uint16", internalType: "uint16" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "skinRegistry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IPlayerSkinRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateDefaultPlayerStats",
    inputs: [
      { name: "playerId", type: "uint32", internalType: "uint32" },
      {
        name: "newStats",
        type: "tuple",
        internalType: "struct IDefaultPlayer.DefaultPlayerStats",
        components: [
          {
            name: "attributes",
            type: "tuple",
            internalType: "struct Fighter.Attributes",
            components: [
              { name: "strength", type: "uint8", internalType: "uint8" },
              { name: "constitution", type: "uint8", internalType: "uint8" },
              { name: "size", type: "uint8", internalType: "uint8" },
              { name: "agility", type: "uint8", internalType: "uint8" },
              { name: "stamina", type: "uint8", internalType: "uint8" },
              { name: "luck", type: "uint8", internalType: "uint8" },
            ],
          },
          {
            name: "skin",
            type: "tuple",
            internalType: "struct Fighter.SkinInfo",
            components: [
              { name: "skinIndex", type: "uint32", internalType: "uint32" },
              { name: "skinTokenId", type: "uint16", internalType: "uint16" },
            ],
          },
          { name: "firstNameIndex", type: "uint16", internalType: "uint16" },
          { name: "surnameIndex", type: "uint16", internalType: "uint16" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "DefaultPlayerStatsUpdated",
    inputs: [
      {
        name: "playerId",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
      {
        name: "stats",
        type: "tuple",
        indexed: false,
        internalType: "struct IDefaultPlayer.DefaultPlayerStats",
        components: [
          {
            name: "attributes",
            type: "tuple",
            internalType: "struct Fighter.Attributes",
            components: [
              { name: "strength", type: "uint8", internalType: "uint8" },
              { name: "constitution", type: "uint8", internalType: "uint8" },
              { name: "size", type: "uint8", internalType: "uint8" },
              { name: "agility", type: "uint8", internalType: "uint8" },
              { name: "stamina", type: "uint8", internalType: "uint8" },
              { name: "luck", type: "uint8", internalType: "uint8" },
            ],
          },
          {
            name: "skin",
            type: "tuple",
            internalType: "struct Fighter.SkinInfo",
            components: [
              { name: "skinIndex", type: "uint32", internalType: "uint32" },
              { name: "skinTokenId", type: "uint16", internalType: "uint16" },
            ],
          },
          { name: "firstNameIndex", type: "uint16", internalType: "uint16" },
          { name: "surnameIndex", type: "uint16", internalType: "uint16" },
        ],
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
  { type: "error", name: "BadZeroAddress", inputs: [] },
  { type: "error", name: "InvalidDefaultPlayerRange", inputs: [] },
  {
    type: "error",
    name: "InvalidDefaultPlayerSkinType",
    inputs: [{ name: "skinIndex", type: "uint32", internalType: "uint32" }],
  },
  { type: "error", name: "InvalidNameIndex", inputs: [] },
  {
    type: "error",
    name: "PlayerDoesNotExist",
    inputs: [{ name: "playerId", type: "uint32", internalType: "uint32" }],
  },
] as const;
