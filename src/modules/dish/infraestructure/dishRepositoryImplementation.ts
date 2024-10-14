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
        try{
            const product = await this.models.Product.findOne({
                where: { productId: dishId },
                attributes: ['name', 'price', 'description', 'image', 'categoryId'],
                include: [{
                    model: this.models.Category,
                    as: 'category',
                    attributes: ['name', 'image','icon']
                }]
            });
            const categoryEntity = new CategoryEntity(product.category.name, product.category.icon, product.categoryId);
            const dishEntity = new DishEntity(product.name, product.price, product.description, product.image, dishId);
            dishEntity.setCategory(categoryEntity);
            return dishEntity;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getAll(categories: CategoryEntity[]): Promise<DishEntity[]> {
        try{
            const categoryIds = categories.map((category: CategoryEntity) => {
                return category.getCategoryId();
            });

            const response = await this.models.Product.findAll({
                categoryId: categoryIds,
                attributes: ['name', 'price', 'description', 'image', 'productId', 'categoryId'],
                include: [{
                    model: this.models.Category,
                    as: 'category',
                    
                }],
            });
    
            
            const dishes: DishEntity[] = [];
            
            for(const dish of response){
                const dishEntity = new DishEntity(dish.name, dish.price, dish.description, dish.image, dish.productId);
                const categoryEntity = categories.find((category) => { 
                    return dish.categoryId == category.getCategoryId();
                });
                if(categoryEntity){
                    dishEntity.setCategory(categoryEntity);
                }
                dishes.push(dishEntity);
            }
            return dishes;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
    
    async create(dish: DishEntity) {
        let categoryId;
        const category = dish.getCategory();
        if(category){
            categoryId = category.getCategoryId() || 1;
        }
        await this.models.Product.create({
            name: dish.getName(),
            price: dish.getPrice(),
            description: dish.getDescription(),
            image: dish.getImage(),
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