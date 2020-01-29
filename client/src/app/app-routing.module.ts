import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { SoonComponent } from './pages/soon/soon.component';


const routes: Routes = [
  {path : '' , component : LandingComponent},
  {path :'cart', component : ProductListComponent},
  {path :'connect', component : ConnexionComponent},
  {path :'soon', component : SoonComponent},
  {path :'category/:category', component : ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
