import { WalletService } from 'src/app/data/service/wallet.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { ManagerService } from 'src/app/data/service/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  accountSubscription: any;
  account: any;
  products: any[] = [];
  cols = [
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'manufacturer', header: 'Manufacturer' },
    { field: 'manufacturingDate', header: 'Manufacturing Date' },
    { field: 'expiryDate', header: 'Expiry Date' },
  ];

  constructor(private managerService: ManagerService, private walletService: WalletService, private ngZone: NgZone) { }

  ngOnInit(): void {
    if (this.walletService.canMakeCalls()) {
      this.accountSubscription = this.walletService.accountChange$.subscribe(
        (account: any) => {
          if (account !== null) {
            this.ngZone.run(() => {
              this.account = account;
              this.getProductUids().then(async (uids: any) => {
                for (const uid of uids) {
                  const product = await this.getProduct(uid);
                  this.products = [...this.products, { uid: uid, name: product.name, category: product.category, manufacturer: product.manufacturer, manufacturingDate: new Date(product.manufacturingDate).toLocaleDateString(), expiryDate: new Date(product.expiryDate).toLocaleDateString(), description: product.description }];
                }
              });
            });
          }
        }
      );
    }
  }

  getProductUids() {
    return this.managerService.getProductUids();
  }

  getProduct(uid: any) {
    return this.managerService.getProduct(uid);
  }
}
