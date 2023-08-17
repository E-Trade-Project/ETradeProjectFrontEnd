import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-mainpageproducts',
  templateUrl: './mainpageproducts.component.html',
  styleUrls: ['./mainpageproducts.component.css']
})
export class MainpageproductsComponent implements OnInit {
  constructor(private productService:ProductService,private http:HttpClient) {}
  soldControl:boolean;
  Products:any=[];
  ngOnInit(): void {
    this.getProductsForShowCase();
  }
  getProductsForShowCase(){
    this.productService.getProductsForShowCase().subscribe(response=>{
      this.Products = response.data;
      this.Products[0].unitsInStock=0?this.soldControl=true:this.soldControl=false;
    })
  }
  getImageSource(product: any): string {
    if (product.unitsInStock==0) {
      this.soldControl=true;
    }else{
      this.soldControl=false
    }
    return `data:${product.imageContentType};base64,${product.imageData}`;
  }

}
