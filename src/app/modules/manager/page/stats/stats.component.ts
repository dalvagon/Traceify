import { Component, OnDestroy, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { StatsService } from 'src/app/data/service/stats.service';
import { WalletService } from 'src/app/data/service/wallet.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  account: any;
  accountSubscription: any;
  transactions: any = [];
  transactionsOptions: any;
  transactionsChart: any;
  dataLoaded = false;
  balance = 0;

  constructor(private statsService: StatsService, private walletService: WalletService) { }

  ngOnInit(): void {
    if (this.walletService.canMakeCalls()) {
      this.accountSubscription = this.walletService.accountChange$.subscribe(
        async (account: any) => {
          if (account !== null) {
            this.account = account;
            this.dataLoaded = false;
            this.transactions = [];
            this.getTransactions(account);
            this.getBalance(account);
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

  getTransactions(account: string) {
    this.statsService.getTransactions().pipe(first()).subscribe((res: any) => {
      res.result.forEach((tx: any) => {
        if (tx.from === account || tx.to === account) {
          console.log(tx);
          this.statsService.getUsdPrice().subscribe((fee: any) => {
            this.transactions.push({
              timestamp: new Date(tx.timeStamp * 1000).toLocaleString(),
              totalFee: (tx.gasPrice * tx.gasUsed / 1000000000000000000 * fee.USD).toFixed(5),
            })
          });
        }
      });
      this.dataLoaded = true;
    });
  }

  getBalance(account: string) {
    this.statsService.getBalance(account).pipe(first()).subscribe((res: any) => {
      console.log(res);
      this.statsService.getUsdPrice().subscribe((usd: any) => {
        this.balance = res.result / 1000000000000000000 * usd.USD;
      });
    });
  }
}
