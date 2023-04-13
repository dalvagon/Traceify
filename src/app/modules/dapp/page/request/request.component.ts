import { AdminService } from 'src/app/data/service/admin.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { WalletService } from 'src/app/data/service/wallet.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  account: any;
  accountSubscription: any;
  accountInputDisabled = false;
  submitted = false;
  loading = false;

  form = this.fb.group({
    account: new FormControl({ value: '', disabled: false }, { validators: [Validators.required], updateOn: 'change' }),
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', [Validators.required]),
    purpose: new FormControl('', [Validators.required]),
  });

  constructor(private fb: FormBuilder, private walletService: WalletService, private adminService: AdminService, private ngZone: NgZone, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    if (this.walletService.canMakeCalls()) {
      this.walletService.connectWallet();

      this.accountSubscription = this.walletService.accountChange$.subscribe(
        async (account: any) => {
          if (account !== null) {
            this.ngZone.run(() => {
              this.account = account;
              this.accountInputDisabled = true;
              this.form.controls['account'].setValue(account);
              this.form.controls['account'].disable();
            });
          }
        }
      );
    }
  }

  /**
   * On destroy, unsubscribe from the account change observable
   */
  ngOnDestroy(): void {
    this.accountSubscription.unsubscribe();
  }

  /**
   * Submit the form
   */
  async submit() {
    this.submitted = true;

    if (this.form.valid) {
      const request = this.form.value;
      this.loading = true;
      this.adminService.requestManagerRole(request).then(
        (tx: any) => {
          console.log(tx);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your request has been submitted. Please wait for the approval.' })
          this.loading = false;
          this.router.navigate(['/']);
        }
      ).catch((error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error while requesting manager role. If you already requested, please wait for the approval.' })
        this.loading = false;
      });
    }
  }
}
