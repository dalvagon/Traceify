import { ContractsService } from 'src/app/data/service/contracts.service';
import { Injectable } from '@angular/core';
import { contract } from 'src/contracts/contract';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private contractsService: ContractsService) { }

  public getContractAddress() {
    return contract.address;
  }

  public getContractAbi() {
    return contract.abi;
  }

  public async isAdmin() {
    return await this.contractsService.isAdmin();
  }
}
