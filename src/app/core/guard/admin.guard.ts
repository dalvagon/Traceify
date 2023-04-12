import { AdminService } from './../../data/service/admin.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private adminService: AdminService) {
  }

  async canActivate() {
    return await this.adminService.isAdmin();
  }
}
