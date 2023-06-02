import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LogoComponent } from './layout/logo/logo.component';
import { MessageService } from 'primeng/api';
import { TitleComponent } from './layout/title/title.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ContentLayoutComponent, NavbarComponent, FooterComponent, LogoComponent, TitleComponent],
  imports: [BrowserModule, NgxSpinnerModule, AppRoutingModule, ButtonModule, BrowserAnimationsModule, ToastModule, HttpClientModule],
  exports: [NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule { }
