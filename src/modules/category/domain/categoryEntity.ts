export class CategoryEntity {
    categoryId: number | undefined;
    name: string;
    image: string;
    icon: string;
   
    constructor(name: string, image: string, icon: string, categoryId?: number){
        this.categoryId = categoryId;
        this.name = name;
        this.image = image;
        this.icon = icon;
    }

    getCategoryId(): number | undefined {
        return this.categoryId;
    }

    getName(): string {
        return this.name; 
    }

    getImage(): string {
        return this.image; 
    }

    getIcon(): string {
        return this.icon; 
    }
}