import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-favoritesnavi',
  templateUrl: './favoritesnavi.component.html',
  styleUrls: ['./favoritesnavi.component.css']
})
export class FavoritesnaviComponent {
  faHeart=faHeart;
  showFavourite:boolean = false;
  showFavourites(){
    this.showFavourite=true
  }
  hideFavourites(){
    this.showFavourite=false
  }
}
