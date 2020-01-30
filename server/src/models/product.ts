export class Product {
    id!: number;
    name!: string;
    description!: string;
    priceTTC!: number;
    photo! : string;
    promo! : number;
    category! : string;
    isBigPromo! : boolean;
    type! : string
  
    constructor(input: Product) {
      Object.assign(this, input);
  }
  }