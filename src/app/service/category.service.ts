import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Category } from '../models/category';
import { CategoryForNavi } from '../models/categoryForNavi';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = "https://localhost:7101/api/categories/";

  getCategories():Observable<ListResponseModel<Category>>{
    return this.httpClient.get<ListResponseModel<Category>>(this.apiUrl + "getall");
  }
  getCategoriesForNavi():Observable<ListResponseModel<CategoryForNavi>>{
    return this.httpClient.get<ListResponseModel<CategoryForNavi>>(this.apiUrl + "getallwithalldetails")
  }

}
