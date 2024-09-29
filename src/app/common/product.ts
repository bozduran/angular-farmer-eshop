export class Product {
  constructor(public id: number,
              public productName: string,
              public  imageUrl: string,
              public price: number,
              public description: string,
              public readonly :string,
              public stockQuantity: number,
              public createdDate: Date,
              public updatedDate: Date
  ) {
  }
}
