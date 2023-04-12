import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IpfsService } from 'src/app/data/service/ipfs.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  form = this.fb.group({
    barcode: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: [''],
    image: [''],
  });

  constructor(private ipfs: IpfsService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  upload() {

  }
}
