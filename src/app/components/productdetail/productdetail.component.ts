import { Component,EventEmitter,  Output, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { ProductService } from 'src/app/service/product.service';
import { faHeart as faHeart ,faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FavouriteService } from 'src/app/service/favourite.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements  OnInit {
  faHeart=faHeart;
  faChevronLeft=faChevronLeft;
  faChevronRight=faChevronRight;
  faLightHeart="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z";
  faRegularHeart="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z";
  changeSizesWithClassName:string="needtoChange";
  selectedSize:string;
  currentImageIndex: number = 0;
  changeColor:boolean=true;
  controlButton:boolean;
  favourite:any;
  Products:any=[];
  product:any=[];
  Sizes:any=[];
  mainImageSource:string;
  Images:any=[];
  constructor(private toastr:ToastrService,private route:ActivatedRoute,private productService:ProductService,private favouriteService:FavouriteService) {}
  
  ngOnInit():void{
    this.getProductDetails();
  }

isFavourite(productId:number){
  this.favouriteService.IsFavourite(productId).subscribe(
    response=>{
      if (response.data!=null) {
        this.favourite=response.data;
        this.controlButton=false;
      }else{
        this.controlButton=true;
      }
      
    }
  );

  return false;

  }

  addFavourite(productId:number):void{
    if (this.controlButton) {
     
      this.favouriteService.addFavourite(productId)
      .subscribe(response =>  {
        this.isFavourite(productId);
        this.favouriteService.triggerFunctionCallback();
        this.toastr.info("Added");
        this.controlButton=false;
      } 
      )
    }else if(!this.controlButton){
     this.favouriteService.deleteFavourite(this.favourite)
      .subscribe(response =>  {
        this.favouriteService.triggerFunctionCallback();
        this.toastr.info("Deleted");
        this.controlButton=true;
      } 
      )
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
         this.isFavourite(this.product.productId);
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
    const sizeBox = document.getElementsByClassName(size+ " " +this.changeSizesWithClassName);
    sizeBox[0].classList.add("selected");
    this.selectedSize = size;
    
  }
  scrollToSection(){
    const targetSection = document.getElementsByTagName("section")[0];
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
  addToCart(){}  
  onAddFavourites(){
    const icon = document.getElementById('addFavourites');
    if (this.controlButton) {
      icon.style.fill="#f27a1a";
    }
    
  }leftAddFavourites(){
    const icon = document.getElementById('addFavourites');
    if (this.controlButton) {
      icon.style.fill="#adadad";
    }
    
  }
}