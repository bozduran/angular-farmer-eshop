import { Component } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber:number=1;
  thePageSize:number=5;
  theTotalElements:number=0;

  previousKeyWord:string="";

  //inject product service
  constructor(private productService: ProductService,
              private route : ActivatedRoute,) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listProducts();
    })
  }

  updatePageSize(pageSize:string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword')!;
    if (this.searchMode){
      this.handleSearchProducts()
    }else{
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyword = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyWord != theKeyword){
      this.thePageNumber = 1;
    }
    this.previousKeyWord = theKeyword;

    this.productService.searchProductsPaginate(this.thePageNumber-1,
      this.thePageSize,
      theKeyword).subscribe(this.processResult());
  }

  handleListProducts(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      this.currentCategoryId=1;
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    //Update category id
    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(this.thePageNumber-1,
      this.thePageSize,
      this.currentCategoryId).subscribe(this.processResult());
  }

  //protected readonly length = length;

  processResult() {
    return (data:any)=>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;// difference of indexing between spring and angular
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
