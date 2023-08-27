import * as ethers from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
// toUtf8Bytes, keccak256, defaultAbiCoder, getCreate2Address as getC2A
// Convert salt to hex
const saltToHex = (salt: string): string => {
  salt = salt.toLowerCase();
  return salt.indexOf("0x") === -1
    ? ethers.utils.keccak256(ethers.utils.toUtf8Bytes(salt))
    : salt;
};

// Encode parameters
const encodeParams = (dataTypes: any[], data: any[]): string => {
  return ethers.utils.defaultAbiCoder.encode(dataTypes, data);
};

// Build the bytecode
const buildBytecode = (
  constructorTypes: any[],
  constructorArgs: any[],
  contractBytecode: string
): string => {
  return `${contractBytecode}${encodeParams(
    constructorTypes,
    constructorArgs
  ).slice(2)}`;
};

// Calculate the CREATE2 address
export const calculateCreate2 = (
  from: string,
  salt: string,
  byteCode: string,
  constructorArgs?: { types: any[]; params: any[] }
): string => {
  if (!from || !salt || !byteCode) {
    throw new Error("One or more required parameters are null.");
  }

  byteCode = "0x" + byteCode.replace("0x", "");

  if (constructorArgs && byteCode.length === 66) {
    throw new Error(
      "You can't pass in constructor arguments, and byte code as hash!"
    );
  }

  if (constructorArgs) {
    byteCode = buildBytecode(
      constructorArgs.types,
      constructorArgs.params,
      byteCode
    );
  }

  byteCode =
    byteCode.length !== 66 ? ethers.utils.keccak256(byteCode) : byteCode;

  const saltHex = saltToHex(salt);

  console.log({ from, saltHex, byteCode });
  if (from !== null && saltHex !== null && byteCode !== null) {
    return ethers.utils.getCreate2Address(from, saltHex, byteCode);
  } else {
    throw new Error("One or more parameters are null.");
  }
};
