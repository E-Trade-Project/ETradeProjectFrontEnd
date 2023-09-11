import { HttpClient } from '@angular/common/http';
import { Component,OnInit,AfterContentInit,AfterViewInit  } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from 'src/app/service/favourite.service';
import { ProductService } from 'src/app/service/product.service';
import { Observable, forkJoin, map } from 'rxjs';
import { Empty } from 'src/app/models/empty';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mainpageproducts',
  templateUrl: './mainpageproducts.component.html',
  styleUrls: ['./mainpageproducts.component.css']
})
export class MainpageproductsComponent implements OnInit,AfterViewInit   {
  constructor(private router: Router,private productService:ProductService,private http:HttpClient,private favouriteService:FavouriteService,private toastr:ToastrService) {}
  ngAfterViewInit(): void {
    
  }
  controlButtonv2:boolean;
  isLinkDisabled:boolean;
  bool:boolean;
  bool2:boolean;
  soldControl:boolean;
  loading:boolean = true;
  Products:any=[];
  product:any;
  fvControl:any=[];
  changeColor:boolean=true;
  controlButton:boolean;
  favourite:any=[];
  favouriteControl:any=[];
  faLightHeart="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z";
  faRegularHeart="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z";

  
  ngOnInit(): void {
    this.getProductsForShowCase();
    this.isLinkDisabled=true;
  }
  isFavourite(productId: number): Observable<Empty> {
    return this.favouriteService.IsFavourite(productId).pipe(
      map((response) => {
        if (response.data != null) {
          this.favourite.push(true);
          return {productId:productId,value:true}
        } else {
          this.favourite.push(false);
          return {productId:productId,value:false}
        }
      })
    );
  }
  itIsFavourite(productId: number):boolean {
    for (const element of this.favouriteControl) {
       if (element.productId === productId) {
         this.bool = element.value;
         return this.bool;
      }
      this.bool2=true
    }return false;
  }
  
   getProductsForShowCase(){
    
     this.productService.getProductsForShowCase().subscribe( response=>{
      this.Products =  response.data;
      this.loading = false;
      this.favouriteControl=[]
      for (let i = 0; i < this.Products.length; i++) {
        const productId = this.Products[i].productId;
        this.isFavourite(productId).subscribe((isFav) => {
          this.favouriteControl.push(isFav);
          this.favouriteControl = this.favouriteControl.filter((eleman: any) => eleman !== null && eleman !== undefined);
         
          
        });
      }
      console.log(this.favouriteControl); 
      this.Products.forEach( (product: Product) => {
        product.categoryName = product.categoryName.replace(/\s+/g, '');
       
        
      });
      this.Products[0].unitsInStock==0?this.soldControl=true:this.soldControl=false;
    });
  }

  redirectToProductDetails(product: Product) {
    if (this.isLinkDisabled) {
      const url = `/products/${product.categoryName}/product-id/${product.productId}`;
      this.router.navigate([url]);
    }
  }
  getImageSource(product: any): string {
    if (product.unitsInStock==0) {
      this.soldControl=true;
    }else{
      this.soldControl=false
    }
    return `data:${product.imageContentType};base64,${product.imageData}`;
  }
  onDeleteFavourites(){
    this.isLinkDisabled=false;console.log(this.isLinkDisabled);
  }
  leftDeleteFavourites(){
    this.isLinkDisabled=true;console.log(this.isLinkDisabled);
  }
  onAddFavourites(){
    this.isLinkDisabled=false;
    console.log(this.isLinkDisabled);
    const icon = document.getElementById('addFavourites');
    if (this.controlButton) {
      icon.style.fill="#f27a1a";
    }
    
  }
  leftAddFavourites(){
  const icon = document.getElementById('addFavourites');
  this.isLinkDisabled=true;
  console.log(this.isLinkDisabled);
  
  if (this.controlButton) {
    icon.style.fill="#adadad";
  }
  
}
addFavourite(productId:number):void{
    this.favouriteService.addFavourite(productId)
    .subscribe(response =>  {
      this.isFavourite(productId);
      this.favouriteService.triggerFunctionCallback();
      this.toastr.info("Added");
      this.controlButton=false;
      this.getProductsForShowCase();
    } 
    )
 
}
deleteFavourite(productId:number){
  this.favouriteService.DeleteFavouriteInProduct(productId)
    .subscribe(response =>  {
      this.favouriteService.triggerFunctionCallback();
      this.toastr.info("Deleted");
      this.controlButton=true;
      this.getProductsForShowCase();
    } 
    )
}

}
