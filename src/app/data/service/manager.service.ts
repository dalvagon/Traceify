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

  public async createProduct(product: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const ipfsObj = await this.ipfs.uploadData(JSON.stringify(product));
      const ipfsHash = this.util.getBytes32FromIpfsHash(ipfsObj.path);

      return contract['createProduct'](product.uid, ipfsHash);
    }
  }

  public async getProductOperations(uid: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const operations = await contract['getOperations'](uid);

      console.log(operations);
    }

    return null;
  }

  public async addOperation(uid: any, op: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const ipfsObj = await this.ipfs.uploadData(JSON.stringify(op));
      const ipfsHash = this.util.getBytes32FromIpfsHash(ipfsObj.path);

      return contract['addOperation'](uid, ipfsHash);
    }
  }

  public async getProductUids() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return await contract['getProducts']();
    }
  }

  public async addManager(uid: any, manager: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['addManagerForProduct'](uid, manager);
    }
  }
}
