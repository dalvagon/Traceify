import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpfsService } from './data/service/ipfs.service';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [AppComponent, ContentLayoutComponent, NavbarComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonModule],
  providers: [IpfsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
