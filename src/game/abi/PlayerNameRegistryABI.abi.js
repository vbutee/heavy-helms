export const PlayerNameRegistryABI = [{"type":"constructor","inputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"MAX_BATCH_SIZE","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"MAX_NAME_LENGTH","inputs":[],"outputs":[{"name":"","type":"uint256","internalType":"uint256"}],"stateMutability":"view"},{"type":"function","name":"SET_A_START","inputs":[],"outputs":[{"name":"","type":"uint16","internalType":"uint16"}],"stateMutability":"view"},{"type":"function","name":"SET_B_MAX","inputs":[],"outputs":[{"name":"","type":"uint16","internalType":"uint16"}],"stateMutability":"view"},{"type":"function","name":"addNamesToSetA","inputs":[{"name":"names","type":"string[]","internalType":"string[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addNamesToSetB","inputs":[{"name":"names","type":"string[]","internalType":"string[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"addSurnames","inputs":[{"name":"names","type":"string[]","internalType":"string[]"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"getFullName","inputs":[{"name":"firstNameIndex","type":"uint16","internalType":"uint16"},{"name":"surnameIndex","type":"uint16","internalType":"uint16"}],"outputs":[{"name":"firstName","type":"string","internalType":"string"},{"name":"surname","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"getNameSetALength","inputs":[],"outputs":[{"name":"","type":"uint16","internalType":"uint16"}],"stateMutability":"view"},{"type":"function","name":"getNameSetBLength","inputs":[],"outputs":[{"name":"","type":"uint16","internalType":"uint16"}],"stateMutability":"view"},{"type":"function","name":"getSurnamesLength","inputs":[],"outputs":[{"name":"","type":"uint16","internalType":"uint16"}],"stateMutability":"view"},{"type":"function","name":"isValidFirstNameIndex","inputs":[{"name":"index","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"bool","internalType":"bool"}],"stateMutability":"view"},{"type":"function","name":"nameSetA","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"nameSetB","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"},{"type":"function","name":"surnames","inputs":[{"name":"","type":"uint256","internalType":"uint256"}],"outputs":[{"name":"","type":"string","internalType":"string"}],"stateMutability":"view"},{"type":"function","name":"transferOwnership","inputs":[{"name":"newOwner","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"event","name":"NameAdded","inputs":[{"name":"nameType","type":"uint8","indexed":false,"internalType":"uint8"},{"name":"index","type":"uint16","indexed":false,"internalType":"uint16"},{"name":"name","type":"string","indexed":false,"internalType":"string"}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"name":"user","type":"address","indexed":true,"internalType":"address"},{"name":"newOwner","type":"address","indexed":true,"internalType":"address"}],"anonymous":false},{"type":"error","name":"BatchTooLarge","inputs":[]},{"type":"error","name":"EmptyBatch","inputs":[]},{"type":"error","name":"InvalidNameIndexSetA","inputs":[]},{"type":"error","name":"InvalidNameIndexSetB","inputs":[]},{"type":"error","name":"InvalidNameLength","inputs":[]},{"type":"error","name":"InvalidSurnameIndex","inputs":[]},{"type":"error","name":"MaxNamesReached","inputs":[]},{"type":"error","name":"MaxSetBNamesReached","inputs":[]},{"type":"error","name":"MaxSurnamesReached","inputs":[]}]