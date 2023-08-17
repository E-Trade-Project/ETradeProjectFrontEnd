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
  }
  categoryItem:boolean=false;
  inCategory:boolean=false;
  CategoriesNavi:any=[];
  showCategoryItems(){
    this.categoryItem=true;
    this.inCategory=true;
  }
  hideCategoryItems(){
    this.categoryItem=false;
  }
  getCategoriesForNavi(){
    this.categoryService.getCategories().subscribe(response=>{
      this.CategoriesNavi = response.data;
    });
  }
  pushMainCategoryNavi(){
    
  }
}
