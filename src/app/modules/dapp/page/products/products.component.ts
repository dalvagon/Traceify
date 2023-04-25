import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgxScannerQrcodeComponent, ScannerQRCodeConfig } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
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
  uid: any;
  showVideo = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.action.stop();
  }

  startAction() {
    this.showVideo = true;
    this.action.start();
  }

  submit() {
    this.router.navigate(['/product', this.uid.trim().toLowerCase()]);
  }

  onEvent(event: any) {
    this.uid = event[0].value.trim().toLowerCase();

    this.router.navigate(['/product', this.uid]);
  }
}
