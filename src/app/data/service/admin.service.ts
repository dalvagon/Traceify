import { UtilService } from './util.service';
import { IpfsService } from './ipfs.service';
import { ContractsService } from 'src/app/data/service/contracts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private contractsService: ContractsService, private ipfs: IpfsService, private util: UtilService) { }

  /**
   * Return true if the current user is an admin
   * @returns true if the current user is an admin
   */
  public async isAdmin() {
    return await this.contractsService.hasRole('DEFAULT_ADMIN_ROLE');
  }

  /**
   * Send a request to the contract to add a new manager
   * @param request the request object
   * @returns the result of the transaction
   */
  public async requestManagerRole(request: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const ipfsObj = await this.ipfs.uploadData(JSON.stringify(request));
      const ipfsHash = this.util.getBytes32FromIpfsHash(ipfsObj.path);

      return contract['submitManagerRequest'](ipfsHash);
    }
  }

  /**
   * Get the list of pending manager requests
   * @returns the list of pending manager requests
   */
  public async getPendingManagerRequestAddresses() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['getManagerRequestAddresses']();
    }
  }

  /**
   * Get the list of approved manager requests
   * @returns the list of approved manager requests
   */
  public async getApprovedManagerRequestAddresses() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['getApprovedManagerRequestAddresses']();
    }
  }

  /**
   * Get a manager request by address
   * @param address the address of the manager
   * @returns the manager request
   */
  public async getManagerRequest(address: string) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const requestArr = await contract['getManagerRequest'](address);
      const requestHashBytes = requestArr[1];
      const requestHash = this.util.getIpfsHashFromBytes32(requestHashBytes);
      const request = await this.ipfs.downloadData(requestHash);

      return {
        address: requestArr[0],
        ipfsHash: requestHash,
        name: request.name,
        email: request.email,
        company: request.company,
        role: request.role,
        purpose: request.purpose,
        timestamp: requestArr[2].toNumber() * 1000
      }
    }

    return null;
  }

  /**
   * Approve a manager request
   * @param address the address of the manager
   * @returns the result of the transaction
   */
  public async approveManagerRequest(address: string) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['approveManagerRequest'](address);
    }
  }

  /**
   * Deny a manager request
   * @param address the address of the manager
   * @returns the result of the transaction
   */
  public async denyManagerRequest(address: string) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['rejectManagerRequest'](address);
    }
  }
}
