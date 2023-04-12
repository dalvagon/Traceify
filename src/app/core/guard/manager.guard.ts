import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/data/service/manager.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard {
  constructor(private managerService: ManagerService, private router: Router) {
  }

  async canActivate() {
    const canActivate = await this.managerService.isManager();

    if (!canActivate) {
      this.router.navigate(['/']);
    }

    return canActivate;
  }
}
