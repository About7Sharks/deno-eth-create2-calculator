import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.114.0/testing/asserts.ts";
import { calculateCreate2 } from "./mod.ts"; // Adjust the import path
import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";

const from = "0x28D25E70819140daF65b724158D00c373D1a18ee";
const address = "0xd72A6BE6eC0Bd9675B2044Ac1bA0d89230A7F9C0";
const salt = "0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658";
const bytecode = "0x60806040523480156200001157600080fd5b50604051620012ec380380620012ec833981810160405260208110156200003757600080fd5b8101908080519060200190929190505050620000606301ffc9a760e01b6200018560201b60201c565b6000620000726200028e60201b60201c565b905080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508073ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a350620001216200029660201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161462000166576200016581620002c060201b60201c565b5b6200017e6344c028fe60e01b6200018560201b60201c565b50620004db565b63ffffffff60e01b817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916141562000222576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601c8152602001807f4552433136353a20696e76616c696420696e746572666163652069640000000081525060200191505060405180910390fd5b6001600080837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600033905090565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b620002d06200028e60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161462000393576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156200041b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180620012c66026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b610ddb80620004eb6000396000f3fe60806040526004361061004a5760003560e01c806301ffc9a71461004f57806344c028fe146100c1578063715018a61461016e5780638da5cb5b14610185578063f2fde38b146101dc575b600080fd5b34801561005b57600080fd5b506100a76004803603602081101561007257600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019092919050505061022d565b604051808215151515815260200191505060405180910390f35b61016c600480360360808110156100d757600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291908035906020019064010000000081111561012857600080fd5b82018360208201111561013a57600080fd5b8035906020019184600183028401116401000000008311171561015c57600080fd5b9091929391929390505050610294565b005b34801561017a57600080fd5b5061018361062c565b005b34801561019157600080fd5b5061019a6107b7565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101e857600080fd5b5061022b600480360360208110156101ff57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506107e1565b005b6000806000837bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916815260200190815260200160002060009054906101000a900460ff169050919050565b61029c6109f1565b73ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461035e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b828473ffffffffffffffffffffffffffffffffffffffff16867f1f920dbda597d7bf95035464170fa58d0a4b57f13a1c315ace6793b9f63688b8858560405180806020018281038252848482818152602001925080828437600081840152601f19601f820116905080830192505050935050505060405180910390a460006109c45a03905060008614156104425761043c858585858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050846109f9565b50610624565b600386141561049f576104998484848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050610a12565b50610623565b60028614156105b45760006104fe84848080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505060208686905003610b0a565b9050606061055885858080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050600060208888905003610b32565b90506000610567878484610bbe565b90508073ffffffffffffffffffffffffffffffffffffffff167fcf78cf0d6f3d8371e1075c69c492ab4ec5d8cf23a1a239b6a51a1d00be7ca31260405160405180910390a2505050610622565b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260148152602001807f57726f6e67206f7065726174696f6e207479706500000000000000000000000081525060200191505060405180910390fd5b5b5b505050505050565b6106346109f1565b73ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146106f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6107e96109f1565b73ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146108ab576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657281525060200191505060405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610931576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401808060200182810382526026815260200180610d806026913960400191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a380600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600033905090565b6000806000845160208601878987f19050949350505050565b600081516020830184f09050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610ac1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f436f756c64206e6f74206465706c6f7920636f6e74726163740000000000000081525060200191505060405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff167fcf78cf0d6f3d8371e1075c69c492ab4ec5d8cf23a1a239b6a51a1d00be7ca31260405160405180910390a292915050565b60006020820183511015610b1d57600080fd5b60008260208501015190508091505092915050565b606081830184511015610b4457600080fd5b6060821560008114610b6157604051915060208201604052610bb2565b6040519150601f8416801560200281840101858101878315602002848b0101015b81831015610b9f5780518352602083019250602081019050610b82565b50868552601f19601f8301166040525050505b50809150509392505050565b600080843073ffffffffffffffffffffffffffffffffffffffff16311015610c4e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252601d8152602001807f437265617465323a20696e73756666696369656e742062616c616e636500000081525060200191505060405180910390fd5b600083511415610cc6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260208152602001807f437265617465323a2062797465636f6465206c656e677468206973207a65726f81525060200191505060405180910390fd5b8383516020850187f59050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610d74576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260198152602001807f437265617465323a204661696c6564206f6e206465706c6f790000000000000081525060200191505060405180910390fd5b80915050939250505056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a2646970667358221220e810537de0bde6978a2e0dd264ce7b13e91d74687e55deca28f7acc4d8b322bd64736f6c634300060100334f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373";
const encodedParams = "0000000000000000000000005b38da6a701c568545dcfcb03fcb875f56beddc4";

Deno.test("with salt being 32 bytes hex", () => {
  assertEquals(calculateCreate2(from, salt, bytecode + encodedParams), address);
});

Deno.test("with salt being string 'test'", () => {
  assertEquals(
    calculateCreate2(from, "test", bytecode + encodedParams),
    address
  );
});

Deno.test("with params as object", () => {
  assertEquals(
    calculateCreate2(from, "test", bytecode, {
      params: ["0x5b38da6a701c568545dcfcb03fcb875f56beddc4"],
      types: ["address"],
    }),
    address
  );
});

Deno.test("with bytecode being a hash", () => {
  assertEquals(
    calculateCreate2(
      from,
      salt,
      ethers.utils.keccak256(bytecode + encodedParams)
    ),
    address
  );
});

Deno.test(
  "and fail with bytecode being a hash and constructor arguments",
  () => {
    assertThrows(() => {
      calculateCreate2(
        from,
        salt,
        ethers.utils.keccak256(bytecode + encodedParams),
        {
          params: ["0x5b38da6a701c568545dcfcb03fcb875f56beddc4"],
          types: ["address"],
        }
      );
    });
  }
);
