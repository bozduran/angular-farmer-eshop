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
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage:number,
                         thePageSize:number,
                         theCategoryId: number): Observable<GetResponseProduct> {
    //new url for query based on base url
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      +`&page=${thePage}&size=${thePageSize}`;
    //                      make the call to api
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(theKeyword: string | null) {
    //new url for query based on base url
    const searchUrl = `${this.baseUrl}/search/findProductByProductNameContaining?productName=${theKeyword}`;
    //                      make the call to api
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      //maps JSON data to array of Product
      map(response => response._embedded.products)
    );
  }

  searchProductsPaginate(thePage:number,
                         thePageSize:number,
                         theKeyword:string): Observable<GetResponseProduct> {
    //new url for query based on base url
    const searchUrl = `${this.baseUrl}/search/findProductByProductNameContaining?productName=${theKeyword}`
      +`&page=${thePage}&size=${thePageSize}`;
    //                      make the call to api
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProduct(theProductId: number):Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }
}
//helper for the products json to data
interface GetResponseProduct{
  _embedded:{
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
