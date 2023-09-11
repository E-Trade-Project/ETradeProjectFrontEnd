import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import{BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { NaviComponent } from './components/navi/navi.component';
import { CategoryComponent } from './components/category/category.component';
import { SearchComponent } from './components/navisupport/searchnavi/search.component';
import { SignnaviComponent } from './components/navisupport/signnavi/signnavi.component';
import { FavoritesnaviComponent } from './components/navisupport/favoritesnavi/favoritesnavi.component';
import { CartnaviComponent } from './components/navisupport/cartnavi/cartnavi.component';
import { CategoriesnaviComponent } from './components/navisupport/categoriesnavi/categoriesnavi.component';
import { MainpageproductsComponent } from './components/mainpageproducts/mainpageproducts.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { AllfavouritesComponent } from './components/allfavourites/allfavourites.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NaviComponent,
    CategoryComponent,
    SearchComponent,
    SignnaviComponent,
    FavoritesnaviComponent,
    CartnaviComponent,
    CategoriesnaviComponent,
    MainpageproductsComponent,
    ProductdetailComponent,
    AllfavouritesComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxImageZoomModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
   // {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
