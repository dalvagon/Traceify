import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
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

  constructor(private route: ActivatedRoute, private messageService: MessageService, private productService: ProductService, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.spinner.show();

    this.uid = this.route.params.subscribe(async params => {
      this.uid = params['uid'];
      this.productParents = [];

      this.product = await this.productService.getProduct(this.uid).catch((error) => {
        this.router.navigate(['/products']);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.reason });
      });

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
      const timestamp = new Date(opArr[2] * 1000).toLocaleDateString();
      const op = await this.productService.getOperation(opArr[1]);
      const operationProducts = await this.getOperationProducts(op.operationProducts);

      events.push({
        title: op.name,
        icon: 'pi pi-circle',
        date: op.date,
        description: op.description,
        operationProducts: operationProducts,
        showDescription: false,
        timestamp: timestamp,
      })
    }

    events.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return events;
  }

  async getOperationProducts(operationProductsIds: any[]) {
    let products = [];

    for (let uid of operationProductsIds) {
      const product = await this.productService.getProduct(uid);
      products.push(product);
    }

    return products;
  }

  async getProductParents() {
    for (let parentUid of this.product.parentUids) {
      const parent = await this.productService.getProduct(parentUid);
      this.productParents.push(parent);
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
