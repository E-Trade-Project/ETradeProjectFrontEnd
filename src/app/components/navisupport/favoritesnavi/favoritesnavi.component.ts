import { HttpClient } from '@angular/common/http';
import { Component,OnInit} from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FavouriteService } from 'src/app/service/favourite.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-favoritesnavi',
  templateUrl: './favoritesnavi.component.html',
  styleUrls: ['./favoritesnavi.component.css'],
})
export class FavoritesnaviComponent implements OnInit {

  isTooltipVisible: boolean = false;
  constructor(private toastrService:ToastrService,private favouriteService:FavouriteService,private router:Router) { }
  favouriteCount:string;
  ngOnInit(): void {
    this.getFavourites();
    this.favouriteService.registerFunctionCallback(() => {
      this.getFavourites();
      this.Favourites= this.getFavourites();
    });
    
  } 
  Favourites:any=[];
  getFavourites(){
    this.favouriteService.getAllFavourites().subscribe(response=>{
      this.Favourites=response.data;
      this.Favourites.forEach((product:any) => {
        product.categoryName = product.categoryName.replace(/\s+/g, ''); 
      });
      this.favouriteCount=response.data.length.toString();
      
    })
    return this.Favourites;
  }
  getImageSource(product: any): string {
    return `data:${product.imageContentType};base64,${product.imageData}`;
  }
 
  faHeart=faHeart;
  showFavourite:boolean = false;
  showFavourites(){
    this.showFavourite=true
  }
  hideFavourites(){
    this.showFavourite=false
  }
  faTrash=faTrash;
  getAllFavourites(){
      const url = `/favourites`;
      this.router.navigate([url]);
  }
}
