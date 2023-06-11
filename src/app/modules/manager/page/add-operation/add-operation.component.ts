import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/data/service/manager.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/data/service/product.service';
import { NgxScannerQrcodeComponent, ScannerQRCodeConfig } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.scss']
})
export class AddOperationComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    uid: new FormControl({ value: '', disabled: true }, { validators: [Validators.required], updateOn: 'change' }),
    name: new FormControl('', [Validators.required, this.emptyStringValidator]),
    category: new FormControl('', [Validators.required, this.emptyStringValidator]),
    date: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, this.emptyStringValidator]),
    operationProductuid: new FormControl(''),
  });
  operationProducts: any[] = [];
  operationProductUids: string[] = [];
  uid: any;
  loading = false;
  submitted = false;

  @ViewChild('action')
  action!: NgxScannerQrcodeComponent;
  public config: ScannerQRCodeConfig = {
    vibrate: 400,
    deviceActive: 1,
    constraints: {
      facingMode: "environment",
      audio: false,
      video: {
        width: window.innerWidth
      }
    }
  };
  showVideo = false;

  constructor(private route: ActivatedRoute, private managreService: ManagerService, private productService: ProductService, private fb: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.form.controls['uid'].setValue(this.uid);
  }

  ngOnDestroy(): void {
    this.action.stop();
  }

  getOperaionProductUid() {
    const operationProductUid = this.form.controls['operationProductuid'].value?.toLocaleLowerCase().trim();

    if (operationProductUid) {
      this.addOperationProduct(operationProductUid);
      this.form.controls['operationProductuid'].setValue('');
    }
  }

  addOperationProduct(uid: string) {
    this.productService.getProduct(uid).then((product: any) => {
      if (product && !this.operationProductUids.includes(uid)) {
        this.operationProductUids.push(uid);
        this.operationProducts.push({ uid: uid, name: product.name });
      }
    }).catch((error: any) => {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.reason });
    });
  }

  removeOperationProduct(operationProductUid: string) {
    this.operationProductUids = this.operationProductUids.filter((operationProductUid_: string) => operationProductUid_ !== operationProductUid);
    this.operationProducts = this.operationProducts.filter((operationProduct: any) => operationProduct.uid !== operationProductUid);
  }

  startAction() {
    this.showVideo = true;
    this.action.start();
  }

  onEvent(event: any) {
    const productOperationUid = event[0].value.trim().toLowerCase();

    if (productOperationUid) {
      this.addOperationProduct(productOperationUid);

      this.showVideo = false;
      this.action.stop();
    }
  }

  submit() {
    this.submitted = true;

    if (this.form.valid) {
      const uid = this.form.controls['uid'].value;
      const operation = {
        name: this.form.controls['name'].value?.trim(),
        category: this.form.controls['category'].value?.trim(),
        date: this.form.controls['date'].value,
        description: this.form.controls['description'].value?.trim(),
        operationProductUids: this.operationProductUids
      }
      this.loading = true;
      this.managreService.addOperation(uid, operation).then(() => {
        this.loading = false;
        this.form.reset();
        this.form.controls['uid'].setValue(this.uid);
        this.submitted = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Operation added successfully. It will appear in the product\'s history after the transaction is complete.' });
      }).catch((error: any) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.reason });
      });
    }
  }

  emptyStringValidator(control: FormControl): ValidationErrors | null {
    return (control.value || '').trim().length === 0 ? { 'emptyString': true } : null;
  }
}
