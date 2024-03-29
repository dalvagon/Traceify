import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/data/service/admin.service';
import { ManagerService } from 'src/app/data/service/manager.service';
import { WalletService } from 'src/app/data/service/wallet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  connectWalletButtonVisible = true;
  accountSubscription: any;
  account: any;
  isAdmin = false;
  isManager = false;

  constructor(
    private walletService: WalletService,
    private adminService: AdminService,
    private managerService: ManagerService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  /**
   * On init, check if can make calls to the ethereum object
   * If can make calls, try to connect to the wallet
   * Subscribe to the account change observable
   * If the account is not null, set the account and hide the connect wallet button
   * If the account is null, set the account to null and show the connect wallet button
   */
  ngOnInit(): void {
    if (this.walletService.canMakeCalls()) {
      this.accountSubscription = this.walletService.accountChange$.subscribe(
        async (account: any) => {
          if (account !== null) {
            this.isAdmin = await this.adminService.isAdmin();
            this.isManager = await this.managerService.isManager();
            if (!this.isAdmin && !this.isManager && (this.router.url.includes('/manager') || this.router.url.includes('/admin'))) {
              this.router.navigate(['/']);
            }

            if (this.isAdmin && this.router.url === '/request') {
              this.router.navigate(['/admin']);
            }

            if (this.isManager && this.router.url === '/request') {
              this.router.navigate(['/manager']);
            }

            if (this.isAdmin && this.router.url.includes('/manager')) {
              this.router.navigate(['/admin']);
            }

            if (this.isManager && this.router.url.includes('/admin')) {
              this.router.navigate(['/manager']);
            }
          } else {
            this.isAdmin = false;
            this.isManager = false;
          }

          this.ngZone.run(() => {
            this.account = account;
            this.connectWalletButtonVisible = account === null;
          });
        }
      );
    }
  }

  /**
   * On destroy, unsubscribe from the account change observable
   */
  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }

  /**
   * Request the wallet to connect
   */
  requestWallet(): void {
    if (this.walletService.canMakeCalls()) {
      this.walletService.requestWallet();
    } else {
      window.open('https://metamask.io/', '_blank');
    }
  }

  /**
   * Open the sepolia website in a new tab
   */
  goToSepoliaWebsite() {
    window.open('https://sepolia.dev/', '_blank');
  }
}
