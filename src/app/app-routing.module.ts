import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainpageproductsComponent } from './components/mainpageproducts/mainpageproducts.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: MainpageproductsComponent },
  { path:  'products/:categoryName/product-id/:id', component: ProductdetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
