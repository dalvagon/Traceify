import { UtilService } from './util.service';
import { IpfsService } from './ipfs.service';
import { ContractsService } from 'src/app/data/service/contracts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private contractsService: ContractsService, private ipfs: IpfsService, private util: UtilService) { }

  public async isAdmin() {
    return await this.contractsService.hasRole('DEFAULT_ADMIN_ROLE');
  }

  public async requestManagerRole(request: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const ipfsObj = await this.ipfs.uploadData(JSON.stringify(request));
      const ipfsHash = this.util.getBytes32FromIpfsHash(ipfsObj.path);

      return contract['submitManagerRequest'](ipfsHash);
    }
  }

  public async getPendingManagerRequestAddresses() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['getManagerRequestAddresses']();
    }
  }

  public async getApprovedManagerRequestAddresses() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['getApprovedManagerRequestAddresses']();
    }
  }

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

  public async approveManagerRequest(address: string) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['approveManagerRequest'](address);
    }
  }

  public async denyManagerRequest(address: string) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['rejectManagerRequest'](address);
    }
  }
}
