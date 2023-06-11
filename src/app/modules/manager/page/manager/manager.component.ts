import { WalletService } from 'src/app/data/service/wallet.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { ManagerService } from 'src/app/data/service/manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/data/service/product.service';
import { MessageService } from 'primeng/api';

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
  dataLoaded = false;
  addManagerDialogVisible = false;
  loading = false;
  submitted = false;
  form = this.fb.group({
    manager: new FormControl('', [Validators.required]),
  });

  constructor(private managerService: ManagerService, private messageServie: MessageService, private productService: ProductService, private fb: FormBuilder, private walletService: WalletService, private ngZone: NgZone, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();

    if (this.walletService.canMakeCalls()) {
      this.accountSubscription = this.walletService.accountChange$.subscribe(
        (account: any) => {
          if (account !== null) {
            this.ngZone.run(() => {
              this.account = account;
              this.products = [];
              this.getProductUids().then(async (uids: any) => {
                for (const uid of uids) {
                  const product = await this.getProduct(uid);

                  if (product !== null) {
                    const parents = [];
                    for (const parentUid of product.parentUids) {
                      const parent = await this.getProduct(parentUid);
                      parents.push(parent);
                    }

                    this.products.push({
                      uid: product.uid,
                      name: product.name,
                      category: product.category,
                      manufacturer: product.manufacturer,
                      manufacturingDate: product.manufacturingDate ?? 'N/A',
                      expiryDate: product.expiryDate ?? 'N/A',
                      description: product.description,
                      parents: parents,
                    });
                  }
                }

                this.dataLoaded = true;
                this.spinner.hide();
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
    return this.productService.getProduct(uid);
  }

  addManager() {
    this.addManagerDialogVisible = true;
  }

  confirmAddManager(uid: any) {
    if (this.form.valid) {
      const manager = this.form.controls['manager'].value?.trim().toLocaleLowerCase();
      this.loading = true;
      this.submitted = true;
      this.managerService.addManager(uid, manager).then((result: any) => {
        console.log(result);
        this.loading = false;
        this.submitted = false;
        this.addManagerDialogVisible = false;
      }).catch((error: any) => {
        this.messageServie.add({ severity: 'error', summary: 'Error', detail: error.reason });
        this.loading = false;
      });
    }
  }
}
