import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { LandingComponent } from './pages/landing/landing.component';


const routes: Routes = [
  {path : '' , component : LandingComponent},
  {path :':category', component : ProductListComponent},
  {path :'cart', component : ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
