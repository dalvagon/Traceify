import { ContractsService } from 'src/app/data/service/contracts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent implements OnInit {

  constructor(private contractsService: ContractsService) { }

  ngOnInit(): void {

  }

  addManager(address: any) {
    this.contractsService.addManager(address);
  }
}
