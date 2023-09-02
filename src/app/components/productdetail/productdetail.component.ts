import { Component,  Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, filter, map, switchMap } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements  OnInit {
  currentImageIndex: number = 0;
  Products:any=[];
  product:any=[];
  mainImageSource:string;
  Images:any=[];
 
  constructor(private route:ActivatedRoute,private productService:ProductService) {}
  ngOnInit():void{
    this.getProductDetails();
    const box = document.getElementById(
      'photoBtn',
    ) as HTMLDivElement | null;
    console.log(box.innerHTML);
  }
  showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.mainImageSource = this.Images[this.currentImageIndex];
    }else if (this.currentImageIndex<=0){
      this.mainImageSource = this.Images[this.Images.length-1];
      this.currentImageIndex=this.Images.length-1;  
    }
  }

  showNextImage() {
    if (this.currentImageIndex < this.Images.length - 1) {
      this.currentImageIndex++;
      this.mainImageSource = this.Images[this.currentImageIndex];
    }else if(this.currentImageIndex >= this.Images.length -1){
      this.mainImageSource = this.Images[0];
      this.currentImageIndex=0; 
    }
  }
 
  getProductDetails() {
    this.route.paramMap
      .pipe(
        filter(params => params.has('id')),
        map(params => +params.get('id')),
        switchMap(id => this.productService.getProductDetail(id)),
      )
      .subscribe(response =>  {
         this.Products = response.data;
         for (let index = 0; index < response.data.length; index++) {
          this.Images.push(`data:${this.Products[index].imageContentType};base64,${this.Products[index].imageData}`);
         }
         this.product=response.data[0];
         this.mainImageSource =this.Images[0];
      }
      );
  }
  changeImage(product:any){
    this.mainImageSource=this.getImageSource(product);
    this.currentImageIndex = this.Images.indexOf(this.mainImageSource);
    console.log(this.Images.indexOf(this.mainImageSource));
    
  }
  getImageSource(product: any): string {
    return `data:${product.imageContentType};base64,${product.imageData}`;
  }
  onCloseImageClick(){
    const myElement=document.getElementById('galleryModal');
    myElement.style.display="none ";
  }
  onOpenGalleryModal(){
    const myElement=document.getElementById('galleryModal');
    myElement.style.display="block ";
  }
}