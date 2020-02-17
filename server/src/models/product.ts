export class Product {
    id!: number;
    name!: string;
    description!: string;
    priceTTC!: number;
    photo! : string;
    promo! : number;
    categoryId! : number;
    bigPromo! : boolean;
    type! : string
  
    constructor(input: Product) {
      Object.assign(this, input);
  }
  }