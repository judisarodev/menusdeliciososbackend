import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import { CategoryEntity } from "../../category/domain/categoryEntity";
import { DishEntity } from "../../dish/domain/dishEntity";
import ImageEntity from "../../image/domain/imageEntity";
import MenuEntity from "../domain/MenuEntity";
import MenuRepository from "../domain/menuRepository";

export default class MenuRepositoryImplementation implements MenuRepository{
    private models: any;

    constructor(){
        this.models = SequelizeSetUp.getModels();
    }
    
    async get(menuId: number): Promise<MenuEntity> {
        try{
            const menu = await this.models.Menu.findByPk(menuId, {
                include: [{
                    model: this.models.Category,
                    as: 'categories',
                    include: [{
                        model: this.models.Product,
                        as: 'products',
                        include: [{
                            model: this.models.Image,
                            as: 'image'
                        }]
                    }]
                }]
            });
            
            const menuEntity = new MenuEntity(
                menu.showDescription, 
                menu.showImage, 
                menu.showNavigation, 
                menu.showIcons, 
                menu.layout, 
                menu.font, 
                menu.url, 
                menuId
            );

            if(menu.categories){
                const categories = menu.categories.map((category: any) => {
                    const c = new CategoryEntity(category.name, category.icon, category.categoryId);
                    if(category.products){
                        const dishes = category.products.map((product: any) => {
                            const image = product && product.image ? new ImageEntity(product.image.url, product.image.imageId) : undefined;
                            const d = new DishEntity(product.name, product.price, product.description, product.productId);
                            d.setImage(image);
                            return d;
                        });
                        c.setDishes(dishes);
                    }
                    return c;
                });
                menuEntity.setCategories(categories);
            }

            return menuEntity;
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async create(layout: string, font: string, paletteId: number, url: string){
        
        const menu = await this.models.Menu.create({
            showDescription: true,
            showImages: true,
            showNavigation: true,
            showIcons: true,
            layout,
            url,
            font,
            paletteId,
        });
        return menu.menuId;
    }
    
}