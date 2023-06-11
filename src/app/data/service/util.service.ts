import { Injectable } from '@angular/core';
import bs58 from 'bs58';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor() { }

  /**
   * Convert an IPFS hash to a bytes32 hex string
   * @param ipfsListing the IPFS hash
   * @returns the bytes32 hex string
   */
  getBytes32FromIpfsHash(ipfsListing: any) {
    const bytes = bs58.decode(ipfsListing);
    return "0x" + Buffer.from(bytes.slice(2)).toString('hex');
  }

  /**
   * Convert a bytes32 hex string to an IPFS hash
   * @param bytes32Hex the bytes32 hex string
   * @returns the IPFS hash
   */
  getIpfsHashFromBytes32(bytes32Hex: string) {
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr;
  }
}
