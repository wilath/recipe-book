import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CommonModule } from '@angular/common';
import { FoodTypeSortPipe } from './showcase/food-type.pipe';
import { FormsModule } from '@angular/forms';
import { ShowcaseItemComponent } from './showcase/showcase-item/showcase-item.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ShowcaseComponent, ShowcaseItemComponent, FoodTypeSortPipe],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
