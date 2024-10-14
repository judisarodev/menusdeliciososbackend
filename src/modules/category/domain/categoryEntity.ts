import MenuEntity from "../../menu/domain/MenuEntity";

export class CategoryEntity {
    private categoryId: number | undefined;
    private name: string;
    private icon: string;
    private menu: MenuEntity | undefined;
   
    constructor(name: string, icon: string, categoryId?: number){
        this.categoryId = categoryId;
        this.name = name;
        this.icon = icon; 
    }

    getCategoryId(): number | undefined {
        return this.categoryId;
    }

    getName(): string {
        return this.name; 
    }

    getIcon(): string {
        return this.icon; 
    }

    getMenu(): MenuEntity | undefined {
        return this.menu;
    }

    setMenu(restaurant: MenuEntity): void {
        this.menu = restaurant;
    }
}