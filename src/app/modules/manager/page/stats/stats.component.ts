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

  constructor(private statsService: StatsService, private walletService: WalletService) { }

  ngOnInit(): void {
    if (this.walletService.canMakeCalls()) {
      this.accountSubscription = this.walletService.accountChange$.subscribe(
        async (account: any) => {
          if (account !== null) {
            this.account = account;
            this.dataLoaded = false;
            this.transactions = [];
            this.getTransactions();
          }
        });
    }
  }

  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

  getTransactions() {
    this.statsService.getTransactions(this.account).pipe(first()).subscribe((res: any) => {
      res.result.forEach((tx: any) => {
        this.statsService.getUsdPrice().subscribe((fee: any) => {
          this.transactions.push({
            timestamp: new Date(tx.timeStamp * 1000).toLocaleString(),
            totalFee: (tx.gasPrice * tx.gasUsed / 1000000000000000000 * fee.USD).toFixed(5),
          })
        });
      });
      this.transactionsOptions = {
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
          text: "Market Capitalization of ACME Corp"
        },
        data: [{
          type: "line",
          dataPoints: this.transactions
        }]
      };
      this.dataLoaded = true;
    });
  }
}
