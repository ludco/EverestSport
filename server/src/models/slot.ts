export class Slot {
    id!: number;
    jour!: number;
    start!: string;
    end!: string;
    places!: number;

  
    constructor(input: Slot) {
      Object.assign(this, input);
  }
  }