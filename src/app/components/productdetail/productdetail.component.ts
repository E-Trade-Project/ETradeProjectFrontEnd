import { Component,EventEmitter,  Output, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { faHeart,faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FavouriteService } from 'src/app/service/favourite.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements  OnInit {
  faChevronLeft=faChevronLeft;
  faChevronRight=faChevronRight;
  faHeart=faHeart;
  changeSizesWithClassName:string="needtoChange";
  selectedSize:string;
  currentImageIndex: number = 0;
  Products:any=[];
  product:any=[];
  Sizes:any=[];
  mainImageSource:string;
  Images:any=[];
  constructor(private toastr:ToastrService,private route:ActivatedRoute,private productService:ProductService,private favouriteService:FavouriteService) {}
  
  ngOnInit():void{
    this.getProductDetails();
  }
  
addFavourite():void{
      this.selectedSize!=undefined? this.route.paramMap.pipe(
        filter(params => params.has('id')),
        map(params => +params.get('id')),
        switchMap(id => this.favouriteService.addFavourite(id,this.selectedSize)),
      )
      .subscribe(response =>  {
        this.favouriteService.triggerFunctionCallback();
          this.toastr.info("Added");
      } 
      ):this.toastr.error("Please Choose Size");
   
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
         this.Sizes=response.data[0].sizes.split(",");
         
      }
      );
  }
  changeImage(product:any){
    this.mainImageSource=this.getImageSource(product);
    this.currentImageIndex = this.Images.indexOf(this.mainImageSource);
    this.ActiveImageForGallery(this.mainImageSource);
  }
  showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.mainImageSource = this.Images[this.currentImageIndex];
    }else if (this.currentImageIndex<=0){
      this.mainImageSource = this.Images[this.Images.length-1];
      this.currentImageIndex=this.Images.length-1;  
    }
    this.ActiveImageForGallery(this.mainImageSource);
  }
  showNextImage() {
    if (this.currentImageIndex < this.Images.length - 1) {
      this.currentImageIndex++;
      this.mainImageSource = this.Images[this.currentImageIndex];

    }else if(this.currentImageIndex >= this.Images.length -1){
      this.mainImageSource = this.Images[0];
      this.currentImageIndex=0; 
    }
    this.ActiveImageForGallery(this.mainImageSource);
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
  ActiveImageForGallery(srcc:any){
    const myDiv = document.getElementById('container');
    const imgElements = myDiv.querySelectorAll('img'); 
    Array.from(imgElements).find((img) => {
      const src = img.getAttribute('src');
      if (src===srcc) {
        img.style.border="2px solid red";
      }else{
        img.style.border="none ";
      }
    });
  }
  changeSizeValue(size:any){
    const findSelecteds=document.getElementsByClassName(this.changeSizesWithClassName);
    for (let index = 0; index < findSelecteds.length; index++) {
      findSelecteds[index].classList.remove("selected");
    }
    this.selectedSize = size;
    const sizeBox = document.getElementsByClassName(size+ " " +this.changeSizesWithClassName);
    sizeBox[0].classList.add("selected");
  }
  scrollToSection(){
    const targetSection = document.getElementsByTagName("section")[0];
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
  addToCart(){}
}