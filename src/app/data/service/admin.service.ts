import { ContractsService } from 'src/app/data/service/contracts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private contractsService: ContractsService) { }

  public async isAdmin() {
    return await this.contractsService.hasRole('DEFAULT_ADMIN_ROLE');
  }

  public async requestManagerRole(request: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      const name = request.name;
      const email = request.email;
      const company = request.company;
      const purpose = request.purpose;

      return contract['submitManagerRequest'](name, email, company, purpose);
    }
  }

  public async getManagerRequestAddresses() {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['getManagerRequestAddresses']();
    }
  }

  public async getManagerRequest(address: string) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      return contract['getManagerRequest'](address);
    }
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
      return contract['denyManagerRequest'](address);
    }
  }

}
