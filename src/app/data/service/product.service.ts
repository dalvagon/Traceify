import { Injectable } from '@angular/core';
import { ContractsService } from './contracts.service';
import { IpfsService } from './ipfs.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private contractsService: ContractsService, private ipfs: IpfsService, private util: UtilService) { }

  /**
   * Get the product details from IPFS
   * @param uid the product UID
   * @returns the product details
   */
  public async getProduct(uid: any) {
    const contract = await this.contractsService.getContractInstanceWithoutSigner();

    if (typeof contract !== 'undefined') {
      const product = await contract['getProduct'](uid);
      const ipfsHash = this.util.getIpfsHashFromBytes32(product[1]);
      const ipfsObj = await this.ipfs.downloadData(ipfsHash);

      const productOperations = await contract['getOperations'](uid);

      return {
        uid: ipfsObj.uid,
        name: ipfsObj.name,
        category: ipfsObj.category,
        manufacturer: ipfsObj.manufacturer,
        manufacturingDate: ipfsObj.manufacturingDate ? new Date(ipfsObj.manufacturingDate).toDateString() : null,
        expiryDate: ipfsObj.expiryDate ? new Date(ipfsObj.expiryDate).toDateString() : null,
        description: ipfsObj.description,
        parentUids: ipfsObj.parentUids,
        operations: productOperations,
        timestamp: new Date(product[2] * 1000).toDateString(),
      }
    }

    return null;
  }

  /**
   * Get an operation from IPFS
   * @param bytes the operation bytes
   * @returns
   */
  public async getOperation(bytes: any) {
    const ipfsHash = this.util.getIpfsHashFromBytes32(bytes);
    const ipfsObj = await this.ipfs.downloadData(ipfsHash);

    return {
      name: ipfsObj.name,
      category: ipfsObj.category,
      date: new Date(ipfsObj.date).toDateString(),
      description: ipfsObj.description,
      operationProducts: ipfsObj.operationProductUids,
    };
  }
}
