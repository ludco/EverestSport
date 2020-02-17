export class Category {
    id!: number;
    name!: string;
    season!: string;

    constructor(input: Category) {
        Object.assign(this, input);
    }
}