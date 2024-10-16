import { DishEntity } from "../domain/dishEntity";
import { DishRepository } from "../domain/dishRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import { CategoryEntity } from "../../category/domain/categoryEntity";

export class DishRepositoryImplementation implements DishRepository{
    models: any = SequelizeSetUp.getModels();

    async update(dishId: number, data: any): Promise<boolean> {
        const [wasUpdated] = await this.models.Product.update(data, { where: { productId: dishId } });
        return wasUpdated;
    }

    async get(dishId: number){
        try{/*
            const product = await this.models.Product.findOne({
                where: { productId: dishId },
                attributes: ['name', 'price', 'description', 'imageId', 'categoryId'],
                include: [{
                    model: this.models.Category,
                    as: 'category',
                    attributes: ['name','icon']
                }]
            });
            const categoryEntity = new CategoryEntity(product.category.name, product.category.icon, product.categoryId);
            const dishEntity = new DishEntity(product.name, product.price, product.description, product.image, dishId);
            dishEntity.setCategory(categoryEntity);
            return dishEntity;*/
            
            throw new Error('Not implemented');
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    
    async create(dish: DishEntity, categoryId: number, imageId: number) {
        await this.models.Product.create({
            name: dish.getName(),
            price: dish.getPrice(),
            description: dish.getDescription(),
            imageId,
            categoryId
        });
    }

    async delete(dishId: number): Promise<DishEntity> {
        try{
            return await this.models.Product.destroy({ where: { productId: dishId }, force: true });
        }catch(error){
            console.error(error);
            throw error;
        }
    }

}