import { WalletService } from 'src/app/data/service/wallet.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { ManagerService } from 'src/app/data/service/manager.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
  transferOwnershipDialogVisisble = false;
  loading = false;
  submitted = false;
  form = this.fb.group({
    newOwner: new FormControl('', [Validators.required]),
  });

  constructor(private managerService: ManagerService, private fb: FormBuilder, private walletService: WalletService, private ngZone: NgZone, private spinner: NgxSpinnerService) { }

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
                    for (const parent of product.parents) {
                      const parentProduct = await this.getProduct(parent);
                      parents.push(parentProduct);
                    }

                    this.products.push({
                      uid: product.uid,
                      name: product.name,
                      category: product.category,
                      manufacturer: product.manufacturer,
                      manufacturingDate: product.manufacturingDate,
                      expiryDate: product.expiryDate,
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
    return this.managerService.getProduct(uid);
  }

  transferOwnership() {
    this.transferOwnershipDialogVisisble = true;
  }

  confirmTransferOwnership(uid: any) {
    if (this.form.valid) {
      const newOwner = this.form.controls['newOwner'].value?.trim().toLocaleLowerCase();
      this.loading = true;
      this.submitted = true;
      this.managerService.transferOwnership(uid, newOwner).then((result: any) => {
        console.log(result);
        this.loading = false;
        this.submitted = false;
        this.transferOwnershipDialogVisisble = false;
      }).catch((error: any) => {
        console.log(error);
        this.loading = false;
      });
    }
  }
}
