import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from 'src/app/data/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  uid: any;
  product: any;
  productParents: any[] = [];
  events: any[] = [];
  showProductDescription: boolean = false;
  showProductQrCode: boolean = false;
  dataLoaded = false;

  constructor(private route: ActivatedRoute, private productService: ProductService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    this.uid = this.route.params.subscribe(async params => {
      this.uid = params['uid'];
      this.productParents = [];

      this.product = await this.productService.getProduct(this.uid);

      if (this.product !== null) {
        this.events = await this.buildEvents();
        await this.getProductParents();
      }

      this.dataLoaded = true;
      this.spinner.hide();
    });
  }

  async buildEvents() {
    let events = [];

    for (let opArr of this.product.operations) {
      const uid = opArr[0];
      const timestamp = new Date(opArr[1] * 1000).toLocaleDateString();
      const op = await this.productService.getOperation(uid);

      events.push({
        title: op.name,
        icon: 'pi pi-circle',
        date: op.date,
        description: op.description,
        timestamp: timestamp,
        showDescription: false
      })
    }

    return events;
  }

  async getProductParents() {
    for (let parent of this.product.parents) {
      const product = await this.productService.getProduct(parent);
      this.productParents.push(product);
    }
  }

  toggleProductDescription() {
    this.showProductDescription = !this.showProductDescription;
  }

  toggleDescription(event: any) {
    event.showDescription = !event.showDescription;
  }

  toggleProductQrCode() {
    this.showProductQrCode = !this.showProductQrCode;
  }
}
