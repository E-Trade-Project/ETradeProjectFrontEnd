import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Favourite } from '../models/favourite';
import { FavouriteDetail } from '../models/favouriteDetail';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  control=true;
  myList:any=[];
  apiUrl = "https://localhost:7101/api/favourites/";
  id:string;
  constructor(private httpClient:HttpClient) {
    if (localStorage.getItem('GuestId')) {
      this.id = localStorage.getItem('GuestId');
    }
   }
  getAllFavourites():Observable<ListResponseModel<FavouriteDetail[]>>{
    if (this.id!==""||this.id!==null||this.id!==undefined) {
      let newPath = this.apiUrl + "getall?customerId=" + this.id;
      return this.httpClient.get<ListResponseModel<FavouriteDetail[]>>(newPath);
    }return null;
  }
  IsFavourite(productId:number):Observable<SingleResponseModel<Favourite>>{
    if (this.id!==""||this.id!==null||this.id!==undefined) {
      let newPath = this.apiUrl + "getbyid?productId=" + productId +"&customerId=" + localStorage.getItem('GuestId');
      return this.httpClient.get<SingleResponseModel<Favourite>>(newPath);
    }return null;
    
  }
  DeleteFavouriteInProduct(productId:number):Observable<any>{
    let newPath = this.apiUrl + "deletebyid?productId=" + productId +"&customerId=" + localStorage.getItem('GuestId');
    return this.httpClient.get<SingleResponseModel<Favourite>>(newPath);
  }

  addFavourite(productId:number):Observable<any>{
    let newFavourite = new Favourite();
    newFavourite.customerId=localStorage.getItem('GuestId');
    newFavourite.productId=productId;
    return this.httpClient.post(this.apiUrl + "add",newFavourite );
  }
  deleteFavourite(favourite:Favourite):Observable<any>{
    return this.httpClient.post(this.apiUrl + "delete",favourite );
  }
  }


