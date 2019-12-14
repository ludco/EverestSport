export class Reservation {
    id!: number;
    date!: string;
    status! : string;
    giftCode! : string;
    userId! : number;
    productId! : number;
    slotId!: number;

    
  
    constructor(input: Reservation) {
      Object.assign(this, input);
  }
  }