import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {FarmerShopFormService} from "../../services/farmer-shop-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkOutFormGroup: FormGroup;

  totalPrice:number = 0;
  totalQuantity:number = 0;

  creditCardYears:number[]=[];
  creditCardMonths:number[]=[];

  countries: Country[]=[];

  shippingAddressStates:State[]=[];
  billingAddressStates:State[]=[];



  constructor(private formBuilder: FormBuilder,
              private farmerShopFormService:FarmerShopFormService) {
  }

  ngOnInit(): void {
    //checkout forms

    this.checkOutFormGroup = this.formBuilder.group({
      customer : this.formBuilder.group({
        firstName : [''],
        lastName : [''],
        email : ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    //add months and years to credit card form
    const currentMonth :number = new Date().getMonth()+1;
    this.farmerShopFormService.getMothForCreditCard(currentMonth).subscribe(
      data =>{
        this.creditCardMonths = data;
      }
    )

    this.farmerShopFormService.getCountries().subscribe(
      data=>{
        this.countries = data;
      }
    )

    this.farmerShopFormService.getYearsForCreditCard().subscribe(
      data =>{
        this.creditCardYears = data;
      }
    )


  }



  onSubmit() {
    if (this.checkOutFormGroup!=null){

    }

  }

  copyShippingAddressToBillingAddress(event:any) {

    // @ts-ignore
    if (event.target.checked) {
      this.checkOutFormGroup.controls['billingAddress']
        .setValue(this.checkOutFormGroup.controls['shippingAddress'].value);

      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkOutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }

  }

  handleMonthsAndYears() {
    const currentYear:number = new Date().getFullYear();
    const selectedYear:number = Number(this.checkOutFormGroup.value.expirationYear);
    let startingMonth:number;
    if (currentYear == selectedYear){
      startingMonth = new Date().getMonth()+1;
    }else{
      startingMonth = 1;
    }

    this.farmerShopFormService.getMothForCreditCard(startingMonth).subscribe(
      data =>{
        this.creditCardMonths = data;
      }
    )

  }

  getStates(formGroupName: string) {

    const  formGroup = this.checkOutFormGroup.get(formGroupName);

    // @ts-ignore
    const countryName = formGroup.value.country.name;
    // @ts-ignore
    const countryCode = formGroup.value.country.code;


    this.farmerShopFormService.getStates(countryCode).subscribe(
      data =>{
        if (formGroupName == 'shippingAddress'){
          this.shippingAddressStates = data;
        }else {
          this.billingAddressStates = data;
        }

        // @ts-ignore
        formGroup?.get('state').setValue(data[0]);
      }
    );

  }
}
