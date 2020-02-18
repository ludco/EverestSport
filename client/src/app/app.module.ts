import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule, CoreModule } from '@angular/flex-layout';

import { AuthInterceptor } from './shared/auth-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BigpromoComponent } from './components/bigpromo/bigpromo.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { SoonComponent } from './pages/soon/soon.component';


import { SearchingComponent } from './components/searching/searching.component';
import { ProductComponent } from './pages/product/product.component';
import { HomeComponent } from './pages/home/home.component';

import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    LandingComponent,
    BigpromoComponent,
    ConnexionComponent,
    SignupComponent,
    SigninComponent,
    SoonComponent,
    SearchingComponent,
    ProductComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
    CoreModule,
    SharedModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
