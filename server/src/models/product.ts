export class Product {
    id!: number;
    name!: string;
    description!: string;
    priceTTC!: number;
    photo! : string;
    promo! : number;
    type! : string
  
    constructor(input: Product) {
      Object.assign(this, input);
  }
  }