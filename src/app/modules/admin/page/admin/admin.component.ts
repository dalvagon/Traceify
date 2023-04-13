import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/data/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  requests: any[] = [];

  constructor(private adminService: AdminService) { }

  async ngOnInit() {
    const managerRequestAddresses = await this.adminService.getManagerRequestAddresses();

    for (const address of managerRequestAddresses) {
      const request = await this.adminService.getManagerRequest(address);
      this.requests.push({
        address: address,
        name: request[0],
        email: request[1],
        company: request[2],
        purpose: request[3],
      });
    }

    console.log(this.requests);
  }
}
