import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private walletService: WalletService,
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
      this.walletService.connectWallet();

      this.accountSubscription = this.walletService.accountChange$.subscribe(
        (account: any) => {
          this.ngZone.run(() => {
            this.account = account;
            this.connectWalletButtonVisible = account === null;
            // if (this.account !== null) {
            //   this.router.navigate(['/add-manager']);
            // }
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
