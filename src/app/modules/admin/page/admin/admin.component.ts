import { MessageService } from 'primeng/api';
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

  constructor(private adminService: AdminService, private messageService: MessageService) { }

  ngOnInit() {
    this.getPendingRequests();
    this.getApprovedRequests();
  }

  getPendingRequests() {
    this.adminService.getPendingManagerRequestAddresses().then(async (addresses) => {
      for (const address of addresses) {
        const request = await this.adminService.getManagerRequest(address);
        if (request !== null) {
          this.pendingRequests.push({ address: request.address, name: request.name, email: request.email, purpose: request.purpose, timestamp: request.timestamp, company: request.company, role: request.role, showCompanyAndRole: false });
        }
      }

      this.pendingRequests.sort((a, b) => b.timestamp - a.timestamp);
    });
  }

  getApprovedRequests() {
    this.adminService.getApprovedManagerRequestAddresses().then(async (addresses) => {
      for (const address of addresses) {
        const request = await this.adminService.getManagerRequest(address);
        if (request !== null) {
          this.approvedRequests.push(request);
        }
      }
      this.approvedRequests.sort((a, b) => b.timestamp - a.timestamp);
    });
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
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Request approved. The request may still appear in the inbox until the transaction is completed.' });
      this.pendingRequests = this.pendingRequests.filter((request) => request.address !== address);
    }
    ).catch((error) => {
      console.log(error);
    });
  }

  rejectRequest(address: any) {
    this.adminService.denyManagerRequest(address).then(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The request may still appear in the inbox until the transaction is completed.' });
      this.pendingRequests = this.pendingRequests.filter((request) => request.address !== address);
    }
    ).catch((error) => {
      console.log(error);
    });
  }

  switchShowCompnayAndRoleForPendingRequests(address: any) {
    this.pendingRequests.forEach((request) => {
      if (request.address === address) {
        request.showCompanyAndRole = !request.showCompanyAndRole;
      }
    });
  }

  switchShowCompnayAndRoleForApprovedRequests(address: any) {
    this.approvedRequests.forEach((request) => {
      if (request.address === address) {
        request.showCompanyAndRole = !request.showCompanyAndRole;
      }
    });
  }

  getAorAn(role: string) {
    role = role.toLowerCase();
    if (role.startsWith('a') || role.startsWith('e') || role.startsWith('i') || role.startsWith('o') || role.startsWith('u')) {
      return 'an ' + role;
    } else {
      return 'a ' + role;
    }
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
    if (weeks < 4) {
      return weeks + ' weeks ago';
    }

    return new Date(timestamp).toLocaleDateString();
  }
}
