import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AdminService } from 'src/app/data/service/admin.service';
import { ManagerService } from 'src/app/data/service/manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {
  constructor(private adminService: AdminService, private managerService: ManagerService, private router: Router) { }

  async canActivate() {
    const isAdmin = await this.adminService.isAdmin();
    const isManager = await this.managerService.isManager();

    if (isManager) {
      this.router.navigate(['/manager']);
    }

    if (isAdmin) {
      this.router.navigate(['/admin']);
    }

    return !isAdmin && !isManager;
  }
}
