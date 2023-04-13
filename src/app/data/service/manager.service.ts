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

  public async createProduct(barcode: any, informationHash: any, parentBarcodes: any) {
    const contract = await this.contractsService.getContractInstance();

    if (typeof contract !== 'undefined') {
      contract.on("ProductCreated", (barcode: any, informationHash: any, parentBarcodes: any) => {
        console.log(barcode, informationHash, parentBarcodes);
      });

      await contract['createProduct'](barcode, informationHash, parentBarcodes)
        .then(() => {
          console.log("Product created successfully");
        }
        ).catch((error: any) => {
          console.log(error);
        });
    }
  }
}
