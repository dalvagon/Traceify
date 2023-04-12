import { ContractsService } from 'src/app/data/service/contracts.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  constructor(private contractsService: ContractsService) { }

  async isManager() {
    return await this.contractsService.hasRole("MANAGER_ROLE");
  }

}
