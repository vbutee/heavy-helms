export const SkinRegistryABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "collect",
    inputs: [
      { name: "tokenAddress", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getSkin",
    inputs: [{ name: "index", type: "uint32", internalType: "uint32" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IPlayerSkinRegistry.SkinCollectionInfo",
        components: [
          { name: "contractAddress", type: "address", internalType: "address" },
          { name: "isVerified", type: "bool", internalType: "bool" },
          {
            name: "skinType",
            type: "uint8",
            internalType: "enum IPlayerSkinRegistry.SkinType",
          },
          {
            name: "requiredNFTAddress",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVerifiedSkins",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct IPlayerSkinRegistry.SkinCollectionInfo[]",
        components: [
          { name: "contractAddress", type: "address", internalType: "address" },
          { name: "isVerified", type: "bool", internalType: "bool" },
          {
            name: "skinType",
            type: "uint8",
            internalType: "enum IPlayerSkinRegistry.SkinType",
          },
          {
            name: "requiredNFTAddress",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nextSkinRegistryId",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
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
    name: "registerSkin",
    inputs: [
      { name: "contractAddress", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "registrationFee",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setRegistrationFee",
    inputs: [{ name: "newFee", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRequiredNFT",
    inputs: [
      { name: "registryId", type: "uint32", internalType: "uint32" },
      { name: "requiredNFTAddress", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSkinType",
    inputs: [
      { name: "registryId", type: "uint32", internalType: "uint32" },
      {
        name: "skinType",
        type: "uint8",
        internalType: "enum IPlayerSkinRegistry.SkinType",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSkinVerification",
    inputs: [
      { name: "registryId", type: "uint32", internalType: "uint32" },
      { name: "isVerified", type: "bool", internalType: "bool" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "skins",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "contractAddress", type: "address", internalType: "address" },
      { name: "isVerified", type: "bool", internalType: "bool" },
      {
        name: "skinType",
        type: "uint8",
        internalType: "enum IPlayerSkinRegistry.SkinType",
      },
      { name: "requiredNFTAddress", type: "address", internalType: "address" },
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
    name: "validateSkinOwnership",
    inputs: [
      {
        name: "skin",
        type: "tuple",
        internalType: "struct Fighter.SkinInfo",
        components: [
          { name: "skinIndex", type: "uint32", internalType: "uint32" },
          { name: "skinTokenId", type: "uint16", internalType: "uint16" },
        ],
      },
      { name: "owner", type: "address", internalType: "address" },
    ],
    outputs: [],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "validateSkinRequirements",
    inputs: [
      {
        name: "skin",
        type: "tuple",
        internalType: "struct Fighter.SkinInfo",
        components: [
          { name: "skinIndex", type: "uint32", internalType: "uint32" },
          { name: "skinTokenId", type: "uint16", internalType: "uint16" },
        ],
      },
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
        name: "equipmentRequirements",
        type: "address",
        internalType: "contract IEquipmentRequirements",
      },
    ],
    outputs: [],
    stateMutability: "view",
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
    name: "RegistrationFeeUpdated",
    inputs: [
      {
        name: "newFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RequiredNFTUpdated",
    inputs: [
      {
        name: "registryId",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
      {
        name: "requiredNFTAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SkinRegistered",
    inputs: [
      {
        name: "registryId",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
      {
        name: "skinContract",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SkinTypeUpdated",
    inputs: [
      {
        name: "registryId",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
      {
        name: "skinType",
        type: "uint8",
        indexed: false,
        internalType: "enum IPlayerSkinRegistry.SkinType",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SkinVerificationUpdated",
    inputs: [
      {
        name: "registryId",
        type: "uint32",
        indexed: true,
        internalType: "uint32",
      },
      {
        name: "isVerified",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokensCollected",
    inputs: [
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  { type: "error", name: "EquipmentRequirementsNotMet", inputs: [] },
  { type: "error", name: "InsufficientRegistrationFee", inputs: [] },
  { type: "error", name: "InvalidSkinType", inputs: [] },
  { type: "error", name: "NoTokensToCollect", inputs: [] },
  {
    type: "error",
    name: "RequiredNFTNotOwned",
    inputs: [{ name: "nftAddress", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "SkinNotOwned",
    inputs: [
      { name: "skinContract", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint16", internalType: "uint16" },
    ],
  },
  { type: "error", name: "SkinRegistryDoesNotExist", inputs: [] },
  { type: "error", name: "ZeroAddressNotAllowed", inputs: [] },
] as const;
