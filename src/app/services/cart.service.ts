import { Injectable } from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    console.log(theCartItem);

    let existingCartItem: CartItem | undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find( tempCartItem => tempCartItem.id === theCartItem.id);
    }
    if (existingCartItem != undefined ){
      existingCartItem.quantity++;
    }else {
      console.log('push')
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue:number =0;
    let totalQuantityValue:number =0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.price * currentCartItem.quantity ;
      totalQuantityValue += currentCartItem.quantity ;
    }
    //update values to subs
    console.log(12);
    console.log(totalQuantityValue);
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

  decreaseQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity == 0) {
      this.remove(theCartItem);
    }else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const cartItemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);
    if (cartItemIndex > -1){
      this.cartItems.splice(cartItemIndex, 1);
      this.computeCartTotals();
    }
  }
}
