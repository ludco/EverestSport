export class User {
    id!: number;
    firstname!: string;
    lastname!: string;
    email!: string;
    password! : string;
    address! : string;
    zip! : number;
    city! : string;
    role! : string;
  
    constructor(input: User) {
      Object.assign(this, input);
  }
  }