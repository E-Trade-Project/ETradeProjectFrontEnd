import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categoriesnavi',
  templateUrl: './categoriesnavi.component.html',
  styleUrls: ['./categoriesnavi.component.css']
})
export class CategoriesnaviComponent implements OnInit {

  constructor(private categoryService:CategoryService) {}
  ngOnInit(): void {
    this.getCategoriesForNavi();
    this.getCategories();
  }
  categoryItem:boolean=false;
  inCategory:boolean=false;
  CategoriesNavi:any=[];
  Categories:any=[];
  showCategoryItems(){
    this.categoryItem=true;
    this.inCategory=true;
  }
  hideCategoryItems(){
    this.categoryItem=false;
  }
  hideCategories(){
    this.categoryItem=false;
    this.inCategory=false;
  }
  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.Categories=response.data;
    })
  }
  getCategoriesForNavi(){
    this.categoryService.getCategoriesForNavi().subscribe(response=>{
      this.CategoriesNavi=response.data;
    });
  }
}
