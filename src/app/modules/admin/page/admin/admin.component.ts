import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/data/service/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pendingRequests: any[] = [];
  approvedRequests: any[] = [];
  showPedingRequests = true;
  showApprovedRequests = false;

  constructor(private adminService: AdminService) { }

  async ngOnInit() {
    const managerRequestAddresses = await this.adminService.getManagerRequestAddresses();

    for (const address of managerRequestAddresses) {
      const request = await this.adminService.getManagerRequest(address);
      this.pendingRequests.push({
        address: request[0],
        name: request[1],
        email: request[2],
        company: request[3],
        purpose: request[4],
        timestamp: request[5].toNumber() * 1000
      });
    }

    this.pendingRequests.sort((a, b) => b.timestamp - a.timestamp);
  }

  switchToPendingRequests() {
    this.showPedingRequests = true;
    this.showApprovedRequests = false;
  }

  switchToApprovedRequests() {
    this.showPedingRequests = false;
    this.showApprovedRequests = true;
  }

  approveRequest(address: any) {
    this.adminService.approveManagerRequest(address).then(() => {
      window.location.reload();
    }
    ).catch((error) => {
      console.log(error);
    });

  }

  rejectRequest(address: any) {
    this.adminService.denyManagerRequest(address).then(() => {
      window.location.reload();
    }
    ).catch((error) => {
      console.log(error);
    });
  }

  differenceInSeconds(timestamp: number) {
    const diff = Date.now() - timestamp;
    return Math.floor(diff / 1000);
  }

  differenceInMinutes(timestamp: number) {
    const diff = Date.now() - timestamp;
    return Math.floor(diff / 1000 / 60);
  }

  differenceInHours(timestamp: number) {
    const diff = Date.now() - timestamp;
    return Math.floor(diff / 1000 / 60 / 60);
  }

  differenceInDays(timestamp: number) {
    const diff = Date.now() - timestamp;
    return Math.floor(diff / 1000 / 60 / 60 / 24);
  }

  differenceInWeeks(timestamp: number) {
    const diff = Date.now() - timestamp;
    return Math.floor(diff / 1000 / 60 / 60 / 24 / 7);
  }

  difference(timestamp: number) {
    const seconds = this.differenceInSeconds(timestamp);
    if (seconds < 60) {
      return seconds + ' seconds ago';
    }

    const minutes = this.differenceInMinutes(timestamp);
    if (minutes < 60) {
      return minutes + ' minutes ago';
    }

    const hours = this.differenceInHours(timestamp);
    if (hours < 24) {
      return hours + ' hours ago';
    }

    const days = this.differenceInDays(timestamp);
    if (days < 7) {
      return days + ' days ago';
    }

    const weeks = this.differenceInWeeks(timestamp);
    return weeks + ' weeks ago';
  }
}
