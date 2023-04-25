import { Injectable } from '@angular/core';
import { ContractsService } from './contracts.service';
import { IpfsService } from './ipfs.service';
import { UtilService } from './util.service';
import { formatBytes32String } from 'ethers/lib/utils';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private contractsService: ContractsService, private ipfs: IpfsService, private util: UtilService) { }

  public async getProduct(uid: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const product = await contract['getProduct'](uid);

      if (product[0] === formatBytes32String('')) return null;

      const ipfsHash = this.util.getIpfsHashFromBytes32(product[0]);
      const ipfsObj = await this.ipfs.downloadData(ipfsHash);

      return {
        uid: uid,
        name: ipfsObj.name,
        category: ipfsObj.category,
        manufacturer: ipfsObj.manufacturer,
        manufacturingDate: new Date(ipfsObj.manufacturingDate).toLocaleDateString(),
        expiryDate: new Date(ipfsObj.expiryDate).toLocaleDateString(),
        description: ipfsObj.description,
        parents: product[1],
        operations: product[2],
        timestamp: new Date(product[3] * 1000).toLocaleDateString()
      }
    }

    return null;
  }

  public async getOperation(bytes: any) {
    const ipfsHash = this.util.getIpfsHashFromBytes32(bytes);
    const ipfsObj = await this.ipfs.downloadData(ipfsHash);

    return {
      name: ipfsObj.name,
      category: ipfsObj.category,
      date: new Date(ipfsObj.date).toLocaleDateString(),
      description: ipfsObj.description,
    };
  }
}