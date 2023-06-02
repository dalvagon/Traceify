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

  constructor(private statsService: StatsService, private walletService: WalletService) { }

  ngOnInit(): void {
    if (this.walletService.canMakeCalls()) {
      this.accountSubscription = this.walletService.accountChange$.subscribe(
        async (account: any) => {
          if (account !== null) {
            this.account = account;
            this.getTransactions();
          }
        });
    }

    this.transactionsOptions = {
      data: this.transactions,
      columns: [
        { data: 'timestamp' },
        { data: 'totalFee' }
      ],
    };
  }

  ngOnDestroy(): void {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }

  getTransactionsChart(chart: any) {
    this.transactionsChart = chart;
  }

  getTransactions() {
    this.statsService.getTransactions(this.account).pipe(first()).subscribe((res: any) => {
      this.transactions = [];
      res.result.forEach((tx: any) => {
        this.statsService.getUsdPrice().subscribe((fee: any) => {
          this.transactions.push({
            timestamp: new Date(tx.timeStamp * 1000).toLocaleString(),
            totalFee: (tx.gasPrice * tx.gasUsed / 1000000000000000000 * fee.USD).toFixed(5),
          })
        });
      });
    });
  }
}
