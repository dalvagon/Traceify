import { UtilService } from './util.service';
import { IpfsService } from 'src/app/data/service/ipfs.service';
import { ContractsService } from 'src/app/data/service/contracts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private contractsService: ContractsService, private ipfs: IpfsService, private util: UtilService) { }

  /**
   * Check if the current user is a manager
   * @returns true if the current user is a manager or false otherwise
   */
  async isManager() {
    return await this.contractsService.hasRole("MANAGER_ROLE");
  }

  /**
   * Generate a new UID for a product
   * @returns the new UID
   */
  public async generateUid() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return await contract['generateProductUID']()
    }
  }

  /**
   * Register a new product
   * @param product the product object
   * @returns the result of the transaction
   */
  public async createProduct(product: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const ipfsObj = await this.ipfs.uploadData(JSON.stringify(product));
      const ipfsHash = this.util.getBytes32FromIpfsHash(ipfsObj.path);

      return contract['createProduct'](product.uid, ipfsHash);
    }
  }

  /**
   * Get the product operations
   * @param uid the product UID
   * @returns the list of operations
   */
  public async getProductOperations(uid: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const operations = await contract['getOperations'](uid);

      console.log(operations);
    }

    return null;
  }

  /**
   * Add a new operation to a product
   * @param uid the product UID
   * @param op the operation object
   * @returns the result of the transaction
   */
  public async addOperation(uid: any, op: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const ipfsObj = await this.ipfs.uploadData(JSON.stringify(op));
      const ipfsHash = this.util.getBytes32FromIpfsHash(ipfsObj.path);

      return contract['addOperation'](uid, ipfsHash);
    }
  }

  /**
   * Get the list of product UIDs for the current manager
   * @returns the list of product UIDs
   */
  public async getProductUids() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return await contract['getProducts']();
    }
  }

  /**
   * Add a new manager for a product
   * @param uid the product UID
   * @param manager the manager address
   * @returns the result of the transaction
   */
  public async addManager(uid: any, manager: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['addManagerForProduct'](uid, manager);
    }
  }
}
