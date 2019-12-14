export class Product {
    id!: number;
    name!: string;
    description!: string;
    photo! : string;
    priceTTC!: number;
  
    constructor(input: Product) {
      Object.assign(this, input);
  }
  }