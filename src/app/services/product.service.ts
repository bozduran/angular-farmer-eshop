import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../common/product";
import {map, Observable} from "rxjs";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //url to api for products
  private baseUrl = "http://localhost:8080/products";
  private categoryUrl = "http://localhost:8080/product-category";

  //This service use HttpCline to make api calls and get responses

  //inject HttpCluient
  constructor(private httpClient: HttpClient) { }
  //get the products
  getProductList(theCategoryId: number): Observable<Product[]> {
    //new url for query based on base url
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    //                      make the call to api
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      //maps JSON data to array of Product
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}
//helper for the products json to data
interface GetResponseProduct{
  _embedded:{
    products: Product[];
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
