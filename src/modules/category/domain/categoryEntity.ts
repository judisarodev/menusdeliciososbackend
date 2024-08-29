export class CategoryEntity {
    categoryId: number | undefined;
    name: string;
    image: string;
   
    constructor(name: string, image: string, categoryId?: number){
        this.categoryId = categoryId;
        this.name = name;
        this.image = image;
    }
}