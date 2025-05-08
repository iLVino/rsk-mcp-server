const { ethers } = require("hardhat");
const PinataSDK = require("@pinata/sdk");
require("dotenv").config();
const fs = require("fs");

async function main() {
  // Initialize Pinata
  const pinata = new PinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

  // Check image file
  const imagePath = "./images/nft-image.png";
  if (!fs.existsSync(imagePath)) {
    throw new Error("Image file not found!");
  }

  // Upload image to IPFS
  console.log("Uploading image to IPFS...");
  const imageStream = fs.createReadStream(imagePath);
  let imageUpload;
  try {
    imageUpload = await pinata.pinFileToIPFS(imageStream, {
      pinataMetadata: { name: "NFT Image" },
    });
  } catch (error) {
    console.error("Pinata upload error:", error);
    throw error;
  }
  const imageCID = `ipfs://${imageUpload.IpfsHash}`;
  console.log("Image CID:", imageCID);

  // Generate and upload metadata
  const metadata = {
    name: "My Rootstock NFT",
    description: "An NFT minted on Rootstock using IPFS",
    image: imageCID,
    attributes: [],
  };
  console.log("Uploading metadata to IPFS...");
  let metadataUpload;
  try {
    metadataUpload = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: { name: "NFT Metadata" },
    });
  } catch (error) {
    console.error("Pinata upload error:", error);
    throw error;
  }
  const metadataCID = `ipfs://${metadataUpload.IpfsHash}`;
  console.log("Metadata CID:", metadataCID);

  // Deploy contract
  console.log("Deploying NFT contract...");
  const NFT = await ethers.getContractFactory("MyNFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("Contract deployed to:", nft.address);

  // Mint NFT
  console.log("Minting NFT...");
  const wallet = (await ethers.getSigners())[0];
  const tx = await nft.mintNFT(wallet.address, metadataCID);
  const receipt = await tx.wait();
  const tokenId = receipt.events[0].args.tokenId.toString();
  console.log("NFT minted! Transaction hash:", receipt.transactionHash);
  console.log("Token ID:", tokenId);

  // Output results
  console.log("NFT Minting Complete!");
  console.log({
    imageCID,
    metadataCID,
    contractAddress: nft.address,
    txHash: receipt.transactionHash,
    tokenId,
  });
}

main().catch((error) => {
  console.error("Script error:", error);
  process.exit(1);
});