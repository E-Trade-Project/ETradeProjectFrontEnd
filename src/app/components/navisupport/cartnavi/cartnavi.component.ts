import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cartnavi',
  templateUrl: './cartnavi.component.html',
  styleUrls: ['./cartnavi.component.css']
})
export class CartnaviComponent {
  faCartShopping=faCartShopping
  showCart:boolean = false;
  showCarts(){
    this.showCart=true
  }
  hideCarts(){
    this.showCart=false
  }
}
