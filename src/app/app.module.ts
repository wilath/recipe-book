import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
import { NotificationShownPipe } from './header/notifications.pipe';
import { RealTimeDatabaseService } from './shared/real-time-database.service';
import { SharedModule } from './shared/shared.module';
import { StorageService } from './shared/storage.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationShownPipe],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage()),
  ],
  providers:[
    RealTimeDatabaseService,
    StorageService,
    provideAnimationsAsync(),
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
