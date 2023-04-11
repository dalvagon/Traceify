import { BehaviorSubject } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WalletService implements OnDestroy {
  private ethereum: any;
  private accountChange = new BehaviorSubject<any>(null);

  constructor() {
    this.connectToWeb3();
  }

  ngOnDestroy(): void {
    this.ethereum.removeAllListeners();
    this.accountChange.complete();
  }

  /**
   * Connect to web3 using the ethereum object injected by metamask
   */
  private connectToWeb3() {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum !== 'undefined') {
      this.ethereum = ethereum;
      this.createListeners();
    } else {
      console.log('No web3? You should consider trying MetaMask!');
    }
  }

  /**
   * Create listeners for the ethereum object injected by metamask
   */
  private createListeners() {
    this.ethereum.on('accountsChanged', (accounts: any) => {
      if (accounts.length > 0) {
        this.accountChange.next(accounts[0]);
      } else {
        this.accountChange.next(null);
      }
    });
  }

  /**
   * Get the account change observable
   * @returns the account change observable
   */
  get accountChange$() {
    return this.accountChange.asObservable();
  }

  /**
   * Check if can make calls to the ethereum object
   * @returns true if can make calls, false otherwise
   */
  canMakeCalls() {
    return this.ethereum && this.ethereum.isConnected();
  }

  /**
   * Request the wallet to connect
   */
  requestWallet() {
    this.ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then((accounts: any) => {
        if (accounts.length > 0) {
          this.accountChange.next(accounts[0]);
        } else {
          this.accountChange.next(null);
        }
      });
  }

  /**
   * Request the current wallet to connect
   */
  connectWallet() {
    this.ethereum
      .request({
        method: 'eth_accounts',
      })
      .then((accounts: any) => {
        if (accounts.length > 0) {
          this.accountChange.next(accounts[0]);
        } else {
          this.accountChange.next(null);
        }
      });
  }
}
