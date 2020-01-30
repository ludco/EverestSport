import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatFormFieldModule
} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LandingComponent } from './pages/landing/landing.component';
import { BigpromoComponent } from './components/bigpromo/bigpromo.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SigninComponent } from './components/signin/signin.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { SoonComponent } from './pages/soon/soon.component';
import { DashbarComponent } from './components/dashbar/dashbar.component';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { AdminProductDetailComponent } from './components/admin-product-detail/admin-product-detail.component';
import { AdminProductCreateComponent } from './components/admin-product-create/admin-product-create.component';
import { SearchingComponent } from './components/searching/searching.component';
import { ProductComponent } from './pages/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    LandingComponent,
    BigpromoComponent,
    ConnexionComponent,
    SignupComponent,
    NavbarComponent,
    SigninComponent,
    SoonComponent,
    DashbarComponent,
    AdminProductsComponent,
    AdminProductDetailComponent,
    AdminProductCreateComponent,
    SearchingComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
