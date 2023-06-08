import { MessageService } from 'primeng/api';
import { ManagerService } from 'src/app/data/service/manager.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProductService } from 'src/app/data/service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  @ViewChild("qr")
  qr: any;

  form = this.fb.group({
    uid: new FormControl({ value: '', disabled: true }, { validators: [Validators.required], updateOn: 'change' }),
    name: new FormControl('', [Validators.required, this.emptyStringValidator]),
    category: new FormControl('', [Validators.required, this.emptyStringValidator]),
    manufacturer: new FormControl('', [Validators.required, this.emptyStringValidator]),
    manufacturingDate: new FormControl(''),
    expiryDate: new FormControl(''),
    description: new FormControl('', [Validators.required, this.emptyStringValidator]),
    parentUid: new FormControl(''),
  });
  parentUids: string[] = [];
  parents: any[] = [];
  submitted = false;
  loading = false;
  expiryMinDate: Date = new Date();
  confirmDialogVisible = false;

  constructor(private fb: FormBuilder, private managerService: ManagerService, private productService: ProductService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.managerService.generateUid().then((uid: string) => {
      this.form.controls['uid'].setValue(uid);
    });
  }

  addParentUid() {
    const parentUid = this.form.controls['parentUid'].value?.toLocaleLowerCase().trim();

    if (parentUid && !this.parentUids.includes(parentUid)) {
      this.productService.getProduct(parentUid).then((product: any) => {
        if (product) {
          this.parentUids.push(parentUid);
          this.parents.push({ uid: parentUid, name: product.name });
          this.form.controls['parentUid'].setValue('');
        }
      }).catch((error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Encountered an error while fetching the product. Please try again." });
      });
    }
  }

  removeParentUid(parentUid: string) {
    this.parentUids = this.parentUids.filter((uid: string) => uid !== parentUid);
    this.parents = this.parents.filter((product: any) => product.uid !== parentUid);
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      this.confirmDialogVisible = true;
    }
  }

  confirm() {
    if (this.form.valid) {
      const uid = this.form.controls['uid'].value;
      const product = {
        uid: uid,
        name: this.form.controls['name'].value,
        category: this.form.controls['category'].value,
        manufacturer: this.form.controls['manufacturer'].value,
        manufacturingDate: this.form.controls['manufacturingDate'].value,
        expiryDate: this.form.controls['expiryDate'].value,
        description: this.form.controls['description'].value,
        parentUids: this.parentUids
      }
      this.loading = true;
      this.managerService.createProduct(product).then(() => {
        this.loading = false;
        this.submitted = false;
        this.form.reset();
        this.parentUids = [];
        this.parents = [];
        this.confirmDialogVisible = false;
        this.managerService.generateUid().then((uid: string) => {
          this.form.controls['uid'].setValue(uid);
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product created successfully. It will appear in your dashboard after the transaction is complete.' });
      }).catch((error: any) => {
        console.log(error);
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Encountered an error while creating the product. Please try again." });
      });
    }
  }

  saveQr() {
    const dataUrl = this.qr.context.canvas.toDataURL("image/png", 1.0);
    const filename = this.form.controls['uid'].value + '.png';

    var a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }

  manufacturingDateSelected() {
    const manufacturingDate = this.form.controls['manufacturingDate'].value;
    if (manufacturingDate) {
      this.expiryMinDate = new Date(manufacturingDate);
      this.form.controls['expiryDate'].setValue(null);
    }
  }

  emptyStringValidator(control: FormControl): ValidationErrors | null {
    return (control.value || '').trim().length === 0 ? { 'emptyString': true } : null;
  }
}
