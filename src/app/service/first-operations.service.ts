import { Injectable } from '@angular/core';
import { CustomerModel } from '../models/CustomerModel';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirstOperationsService {
  constructor(private HttpClient:HttpClient,private toastrService:ToastrService) { }

  apiUrl = "https://localhost:7101/api/customers/";
  guestControl(){
    if (!localStorage.getItem('GuestId')) {
      let guest = this.createGuest();
      localStorage.setItem('GuestId',guest.uniqueId);
      localStorage.setItem('UserType',guest.userType);
    }
  }createGuest():CustomerModel{
    let model = new CustomerModel()
    model.uniqueId=uuidv4()+uuidv4()+uuidv4();
    model.userType="Guest";
    this.add(model).subscribe();
    return model;
  }add(customerModel:CustomerModel):Observable<any>{
    return this.HttpClient.post(this.apiUrl+"add",customerModel);
  }
}
