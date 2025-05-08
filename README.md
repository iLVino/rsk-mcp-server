[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/rsksmart/rsk-mcp-server/badge)](https://scorecard.dev/viewer/?uri=github.com/rsksmart/rsk-mcp-server)
[![CodeQL](https://github.com/rsksmart/rsk-mcp-server/workflows/CodeQL/badge.svg)](https://github.com/rsksmart/rsk-mcp-server/actions?query=workflow%3ACodeQL)
<img src="img/rootstock-docs.png" alt="Rootstock Logo" style="width:100%; height: auto;" />

# Rootstock NFT Minting Platform

This project is a full-stack solution for minting Non-Fungible Tokens (NFTs) on the Rootstock (RSK) blockchain, leveraging decentralized storage via IPFS and seamless smart contract deployment.

## Key Features

- **NFT Minting on Rootstock:**  
  Users can mint ERC-721 compliant NFTs directly on the Rootstock testnet, ensuring compatibility with the broader Ethereum ecosystem while benefiting from Rootstock's security and low fees.

- **IPFS-Powered Media Storage:**  
  Images and metadata associated with each NFT are uploaded to the InterPlanetary File System (IPFS) using the Pinata service. This guarantees that NFT assets are stored in a decentralized, tamper-proof manner, independent of any single server.

- **Automated Metadata Generation:**  
  The platform automatically generates ERC-721 standard metadata for each NFT, including name, description, image link (IPFS CID), and customizable attributes.

- **Smart Contract Deployment:**  
  The system deploys a new NFT smart contract (based on OpenZeppelin's ERC-721 implementation) to the Rootstock testnet, allowing for unique collections and ownership management.

- **User-Friendly CLI Workflow:**  
  The project includes a command-line interface that guides users through the process of uploading images, generating metadata, deploying contracts, and minting NFTs—all with simple prompts.

## Typical Workflow

1. **Image Upload:**  
   The user provides a path to an image file, which is uploaded to IPFS via Pinata.

2. **Metadata Creation:**  
   The system generates a metadata JSON file referencing the uploaded image and uploads this metadata to IPFS.

3. **Contract Deployment:**  
   A new ERC-721 contract is deployed to the Rootstock testnet.

4. **NFT Minting:**  
   The NFT is minted to the user's address, with the token URI pointing to the IPFS-hosted metadata.

5. **Result Output:**  
   The user receives the IPFS CIDs, contract address, transaction hash, and token ID for their minted NFT.

## Technologies Used

- **Rootstock (RSK) Blockchain**
- **Hardhat (for contract deployment and scripting)**
- **Pinata SDK (for IPFS uploads)**
- **Node.js (CLI and scripting)**
- **OpenZeppelin Contracts (ERC-721 standard)**

## Use Cases

- Digital art and collectibles
- Tokenized real-world assets
- Decentralized identity and certificates
- Any application requiring unique, verifiable digital ownership

## Features

- Call contract functions on Rootstock Network
- Get ERC20 token balances
- Transfer ERC20 tokens
- Get current gas prices

## Installation

1. Clone this repository:
```bash
git clone https://github.com/rsksmart/rsk-mcp-server
cd rootstock-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
SEED_PHRASE="your twelve word seed phrase here"
```

## Usage

### Running the server

```bash
npm start
```

### Using with Claude

```json
{
  "mcpServers": {
    "rootstock": {
      "command": "node",
      "args": ["/path/to/rootstock-mcp/build/index.js"],
      "env": {
        "SEED_PHRASE": "your twelve word seed phrase here"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Available Tools

### call_contract

Call a contract function on Rootstock Network.

Parameters:
- `contractAddress`: The address of the contract to call
- `functionName`: The name of the function to call
- `functionArgs`: The arguments to pass to the function
- `abi`: The ABI of the contract
- `value` (optional): The value of RBTC to send with the transaction

### erc20_balance

Get the balance of an ERC20 token on Rootstock Network.

Parameters:
- `contractAddress`: The address of the contract to get the balance of

### erc20_transfer

Transfer an ERC20 token on Rootstock Network.

Parameters:
- `contractAddress`: The address of the contract to transfer the token from
- `toAddress`: The address of the recipient
- `amount`: The amount of tokens to transfer

### get_gas_price

Get the current gas price on Rootstock Network.

## License

MIT

# Disclaimer
The software provided in this GitHub repository is offered "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement.
- **Testing:** The software has not undergone testing of any kind, and its functionality, accuracy, reliability, and suitability for any purpose are not guaranteed.
- **Use at Your Own Risk:** The user assumes all risks associated with the use of this software. The author(s) of this software shall not be held liable for any damages, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of or inability to use this software, even if advised of the possibility of such damages.
- **No Liability:** The author(s) of this software are not liable for any loss or damage, including without limitation, any loss of profits, business interruption, loss of information or data, or other pecuniary loss arising out of the use of or inability to use this software.
- **Sole Responsibility:** The user acknowledges that they are solely responsible for the outcome of the use of this software, including any decisions made or actions taken based on the software's output or functionality.
- **No Endorsement:** Mention of any specific product, service, or organization does not constitute or imply endorsement by the author(s) of this software.
- **Modification and Distribution:** This software may be modified and distributed under the terms of the license provided with the software. By modifying or distributing this software, you agree to be bound by the terms of the license.
- **Assumption of Risk:** By using this software, the user acknowledges and agrees that they have read, understood, and accepted the terms of this disclaimer and assumes all risks associated with the use of this software.
