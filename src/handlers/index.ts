import { isAddress } from "viem";
import { constructRskScanUrl } from "../utils/index.js";
import { rootstock } from "viem/chains";
import { PropertyNFT } from "../contracts/PropertyNFT.js";
// Use require for Pinata SDK to allow 'new' instantiation
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PinataSDK = require("@pinata/sdk");
import fs from "fs";

// Initialize Pinata with environment variables from MCP settings
const pinata = new PinataSDK(process.env.PINATA_API_KEY!, process.env.PINATA_API_SECRET!);

export async function mintNFTWithIPFSHandler(wallet: any, args: any) {
  // Validate args
  if (!args.contractAddress || !isAddress(args.contractAddress)) {
    throw new Error(`Invalid PropertyNFT address: ${args.contractAddress}`);
  }
  if (!args.filePath) {
    throw new Error("File path required for upload");
  }
  if (!fs.existsSync(args.filePath)) {
    throw new Error(`File not found: ${args.filePath}`);
  }

  try {
    // Upload image to IPFS
    console.log("Uploading image to IPFS...");
    const fileStream = fs.createReadStream(args.filePath);
    const imageUpload = await pinata.pinFileToIPFS(fileStream, {
      pinataMetadata: { name: args.fileName || "NFT Image" },
    });
    const imageCID = `ipfs://${imageUpload.IpfsHash}`;
    console.log("Image CID:", imageCID);

    // Generate and upload metadata
    const metadata = {
      name: args.name || "Property NFT",
      description: args.description || "A tokenized property on Rootstock",
      image: imageCID,
      attributes: args.attributes || [],
    };
    console.log("Uploading metadata to IPFS...");
    const metadataUpload = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: { name: args.metadataName || "NFT Metadata" },
    });
    const metadataCID = `ipfs://${metadataUpload.IpfsHash}`;
    console.log("Metadata CID:", metadataCID);

    // Mint NFT
    console.log("Minting NFT...");
    const tx = await wallet.simulateContract({
      account: wallet.account,
      abi: PropertyNFT.abi,
      address: args.contractAddress,
      functionName: "mintNFT",
      args: [wallet.account.address, metadataCID],
    });
    const txHash = await wallet.writeContract(tx.request);
    console.log("NFT minted! Transaction hash:", txHash);

    return JSON.stringify({
      imageCID,
      metadataCID,
      hash: txHash,
      url: constructRskScanUrl(wallet.chain ?? rootstock, txHash),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`NFT minting failed: ${error.message}`);
    } else {
      throw new Error(`NFT minting failed: ${String(error)}`);
    }
  }
}