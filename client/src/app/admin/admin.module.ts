import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { DashbarComponent } from './dashbar/dashbar.component';
import { AdminProductDetailComponent } from './admin-product-detail/admin-product-detail.component';
import { AdminProductCreateComponent } from './admin-product-create/admin-product-create.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdminProductsComponent,
    DashbarComponent,
    AdminProductCreateComponent,
    AdminProductDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
