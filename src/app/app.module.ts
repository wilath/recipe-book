import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { DataStoragaService } from './shared/data-storage.service';


@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
  ],
  providers:[
    DataStoragaService,
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
