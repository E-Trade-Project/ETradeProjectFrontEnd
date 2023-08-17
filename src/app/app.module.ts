import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
