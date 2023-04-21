import { ManagerService } from 'src/app/data/service/manager.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form = this.fb.group({
    uid: new FormControl({ value: '', disabled: false }, { validators: [Validators.required], updateOn: 'change' }),
    name: new FormControl('', [Validators.required, this.emptyStringValidator]),
    description: new FormControl('', [Validators.required, this.emptyStringValidator]),
    image: new FormControl('', [Validators.required, this.emptyStringValidator]),
  });

  constructor(private fb: FormBuilder, private managerService: ManagerService) { }

  ngOnInit(): void {
    this.managerService.generateUid().then((uid: string) => {
      this.form.controls['uid'].setValue(uid);
    });
  }

  submit() {
    console.log(this.form.value);
  }

  emptyStringValidator(control: FormControl) {
    return (control.value || '').trim().length === 0 ? { 'emptyString': true } : null;
  }
}
