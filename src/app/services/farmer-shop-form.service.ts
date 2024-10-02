import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FarmerShopFormService {

  constructor() { }

  getMothForCreditCard(startingMonth:number):Observable<number[]> {
    let data:number[] = [];

    for(let theMonth=startingMonth; theMonth<=12;theMonth++){
      data.push(theMonth);
    }

    return of(data);
  }

  getYearsForCreditCard():Observable<number[]> {
    let data:number[] = [];

    const currentYear:number = new Date().getFullYear();
    const lastYear:number = currentYear+10;

    for(let theYear= currentYear; theYear<=lastYear;theYear++){
      data.push(theYear);
    }

    return of(data);
  }
}
