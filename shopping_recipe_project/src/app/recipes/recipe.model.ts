import { Ingredient } from "../shared/ingredient.model";

export class Recipe {

    // public name: string;
    // public description: string;
    // public imagePath: string;

    // constructor(name: string, desc: string, imagePath: string) {
    //     this.name=name;
    //     this.description=desc;
    //     this.imagePath=imagePath;
    // }

    // Typescript shortcut for writing the same thing as above
    constructor(
        public name: string, 
        public description: string, 
        public imagePath: string,
        public ingredients: Ingredient[]) {

        this.name=name;
        this.description=description;
        this.imagePath=imagePath;
        this.ingredients=ingredients;
    }
}