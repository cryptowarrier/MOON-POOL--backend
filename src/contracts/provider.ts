import { ethers } from 'ethers';
import { network } from '../constants/network';

const privateKey = process.env.PRIVATE_KEY;
export const provider = new ethers.providers.JsonRpcProvider(network.rpcUrls[0]);

export const signer = new ethers.Wallet(privateKey, provider);
