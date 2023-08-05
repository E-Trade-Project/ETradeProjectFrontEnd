import { Component } from '@angular/core';

@Component({
  selector: 'app-categoriesnavi',
  templateUrl: './categoriesnavi.component.html',
  styleUrls: ['./categoriesnavi.component.css']
})
export class CategoriesnaviComponent {
  categoryItem:boolean=false;
  inCategory:boolean=false
  showCategoryItems(){
    this.categoryItem=true;
    this.inCategory=true;
    console.log("inc" + this.inCategory);
    console.log("c" +this.categoryItem);
  }
  hideCategoryItems(){
    this.categoryItem=false;
    console.log("hc" +this.categoryItem);
  }
  hideCategories(){
    this.categoryItem=false;
    this.inCategory=false;
    console.log("hinc" +this.inCategory);
  }
}
