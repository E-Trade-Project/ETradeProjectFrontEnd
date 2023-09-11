import { Component,OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { FavouriteService } from 'src/app/service/favourite.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-allfavourites',
  templateUrl: './allfavourites.component.html',
  styleUrls: ['./allfavourites.component.css']
})
export class AllfavouritesComponent implements OnInit {
  Favourites:any=[];
  soldControl:boolean;
  showData:boolean;
  isLinkDisabled=true;
  faTrash=faTrash;
  
  constructor(private favouriteService:FavouriteService,private toastr:ToastrService,private router:Router) {
  }
  ngOnInit(): void {
    this.getAllFavourites();
  }
  
  loading:boolean=true;
  getAllFavourites(){
    this.favouriteService.getAllFavourites().subscribe(
      response=>{
        this.Favourites=response.data;
        console.log(this.Favourites.length);
        console.log(this.Favourites);
        if (this.Favourites.length>0) {
          this.Favourites[0].unitsInStock==0?this.soldControl=true:this.soldControl=false;
          this.showData=true
          console.log(this.showData);
          
        }else{
          this.showData=false;
          console.log(this.showData);
        }
        
        this.loading=false;
      }
      
    );
  }
  redirectToProductDetails(categoryName:string,productId:number) {
    if (this.isLinkDisabled) {
      categoryName = categoryName.replace(/\s+/g, '');
      const url = `/products/${categoryName}/product-id/${productId}`;
      this.router.navigate([url]);
    }
  }redirectToPreviousPage() {
    window.history.back();
    
}
  deleteFavourite(productId:number){
    this.favouriteService.DeleteFavouriteInProduct(productId).subscribe(
      value=>{
        this.toastr.info("Deleted");
        this.favouriteService.triggerFunctionCallback();
        this.getAllFavourites();
        
        
      }
    )
  }
  getImageSource(product: any): string {
    if (product.unitsInStock==0) {
      this.soldControl=true;
    }else{
      this.soldControl=false
    }
    return `data:${product.imageContentType};base64,${product.imageData}`;
  } onDeleteFavourite()  {
    this.isLinkDisabled=false;
    const trashIcon = document.getElementById('trashIcon');
    console.log(trashIcon);
    
  }
  leftDeleteFavourite(){
    this.isLinkDisabled=true;
  }
}
