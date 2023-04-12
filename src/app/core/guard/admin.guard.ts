import { Router } from '@angular/router';
import { AdminService } from './../../data/service/admin.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private adminService: AdminService, private router: Router) {
  }

  async canActivate() {
    const canActivate = await this.adminService.isAdmin();

    if (!canActivate) {
      this.router.navigate(['/manager']);
    }

    return canActivate;
  }
}
