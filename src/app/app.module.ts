import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpfsService } from './data/service/ipfs.service';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LogoComponent } from './layout/logo/logo.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [AppComponent, ContentLayoutComponent, NavbarComponent, FooterComponent, LogoComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonModule, BrowserAnimationsModule, ToastModule],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
