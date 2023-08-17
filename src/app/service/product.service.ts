import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "https://localhost:7101/api/products/";
  constructor(private httpClient:HttpClient) { }
  
  getProducts():Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + "getallwithdetails";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
  getProductsForShowCase():Observable<ListResponseModel<Product>>{
    let newPath = this.apiUrl + "showcaseproducts";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }
}
