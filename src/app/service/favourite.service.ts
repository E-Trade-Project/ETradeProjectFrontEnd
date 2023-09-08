import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Favourite } from '../models/favourite';
import { FavouriteDetail } from '../models/favouriteDetail';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  private functionCallback: () => void;
  registerFunctionCallback(callback: () => void) {
    this.functionCallback = callback;
  }
  triggerFunctionCallback() {
    if (this.functionCallback) {
      this.functionCallback();
    }
  }

  apiUrl = "https://localhost:7101/api/favourites/";
  id:string;
  constructor(private httpClient:HttpClient) {
    if (localStorage.getItem('GuestId')) {
      this.id = localStorage.getItem('GuestId');
    }
   }
  getAllFavourites():Observable<ListResponseModel<FavouriteDetail[]>>{
    if (this.id!="") {
      let newPath = this.apiUrl + "getall?customerId=" + this.id;
      return this.httpClient.get<ListResponseModel<FavouriteDetail[]>>(newPath);
    }return null;
  }
  addFavourite(productId:number,size:string):Observable<any>{
    let newFavourite = new Favourite();
    newFavourite.customerId=localStorage.getItem('GuestId');
    newFavourite.productId=productId;
    newFavourite.productSize=size;
    return this.httpClient.post(this.apiUrl + "add",newFavourite );
  }
  
}
