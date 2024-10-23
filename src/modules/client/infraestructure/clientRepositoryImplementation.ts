import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import { CategoryEntity } from "../../category/domain/categoryEntity";
import CountryEntity from "../../country/domain/countryEntity";
import { DishEntity } from "../../dish/domain/dishEntity";
import ImageEntity from "../../image/domain/imageEntity";
import MenuEntity from "../../menu/domain/MenuEntity";
import PaletteEntity from "../../palette/domain/paletteEntity";
import { ClientRepository } from "../domain/clientRepository";

export default class ClientRepositoryImplementation implements ClientRepository{
    async getMenu(url: string): Promise<MenuEntity> {
        try{
            const menu = await this.models.Menu.findOne({
                where: {
                    url: '/' + url,
                },
                include: [{
                    model: this.models.Image,
                    as: 'backgroundImage'
                }, {
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
                }, {
                    model: this.models.Palette,
                    as: 'palette'
                }]
            });
            
            const menuEntity = new MenuEntity(
                menu.showDescription, 
                menu.showImages, 
                menu.showNavigation, 
                menu.showIcons, 
                menu.layout, 
                menu.font, 
                menu.url, 
            );

            if(menu.backgroundImage){
                menuEntity.setBackgroundImage(new ImageEntity(menu.backgroundImage.url, menu.backgroundImage.imageId));
            }

            menuEntity.setPalette(new PaletteEntity(
                menu.palette.primaryColor,
                menu.palette.secondaryColor,
                menu.palette.primaryTextColor,
                menu.palette.secondaryTextColor,
                menu.palette.paletteId
            ));

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
    async makeSurvey(score: number, comments: string, restaurantId: number): Promise<void> {
        await this.models.Survey.create({
            score, comments, restaurantId
        });
    }
    models: any = SequelizeSetUp.getModels();

}