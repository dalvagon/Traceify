import { UtilService } from './util.service';
import { IpfsService } from 'src/app/data/service/ipfs.service';
import { ContractsService } from 'src/app/data/service/contracts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private contractsService: ContractsService, private ipfs: IpfsService, private util: UtilService) { }

  async isManager() {
    return await this.contractsService.hasRole("MANAGER_ROLE");
  }

  public async generateUid() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return await contract['generateProductUID']()
    }
  }

  public async createProduct(uid: any, product: any, parentUids: any[]) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const ipfsObj = await this.ipfs.uploadData(JSON.stringify(product));
      const ipfsHash = this.util.getBytes32FromIpfsHash(ipfsObj.path);

      return contract['addProduct'](uid, ipfsHash, parentUids);
    }
  }

  public async getProduct(uid: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const product = await contract['getProduct'](uid);
      const ipfsHash = this.util.getIpfsHashFromBytes32(product[0]);
      const ipfsObj = await this.ipfs.downloadData(ipfsHash);

      return {
        uid: uid,
        name: ipfsObj.name,
        category: ipfsObj.category,
        manufacturer: ipfsObj.manufacturer,
        manufacturingDate: new Date(ipfsObj.manufacturingDate).toDateString(),
        expiryDate: new Date(ipfsObj.expiryDate).toDateString(),
        description: ipfsObj.description,
        parents: product[1],
        operations: product[2],
        timestamp: new Date(product[3] * 1000).toDateString()
      }
    }

    return null;
  }

  public async addOperation(uid: any, op: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const ipfsObj = await this.ipfs.uploadData(JSON.stringify(op));
      const ipfsHash = this.util.getBytes32FromIpfsHash(ipfsObj.path);

      return contract['updateProduct'](uid, ipfsHash);
    }
  }

  public async getProductUids() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return await contract['getManagerProducts']();
    }
  }
}
