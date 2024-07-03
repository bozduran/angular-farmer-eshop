import {Component, OnInit} from '@angular/core';
import {ProductCategory} from "../../common/product-category";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit{
  //array for product categories
  productCategories: ProductCategory[]=[];
  //inject product service
  constructor(private productService: ProductService) {

  }
  ngOnInit() {
    this.listProductCategories();
  }

  listProductCategories(){
    this.productService.getProductCategories().subscribe(
      data=> {
        console.log('Product Categories'+JSON.stringify(data))
        this.productCategories=data;
      });

  }
}
