import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from './services/auth.service/auth.service';
import { AuthGuard } from './auth.guard';
import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { SignInComponent } from './component/signin/signin.component';
import { EditComponent } from './component/link/modal/edit/edit.component';
import { LinkComponent } from './component/link/link.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddComponent } from './component/add/add.component';

@NgModule({
  declarations: [AppComponent, SignInComponent, EditComponent, LinkComponent, AddComponent],
  entryComponents: [EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AuthGuard,
    SecureInnerPagesGuard,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
