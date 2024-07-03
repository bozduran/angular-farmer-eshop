export class Product {
  constructor(public productName: string,
              public  imageUrl: string,
              public price: number,
              public stockQuantity: number,
              public createdDate: Date,
              public updatedDate: Date
  ) {
  }
}
