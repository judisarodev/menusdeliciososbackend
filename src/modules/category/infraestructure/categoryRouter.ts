import express, { Router } from 'express';
import CategoryRepositoryImplementation from './categoryRepositoryImplementation';
import GetCategoriesUseCase from '../application/getCategoriesUseCase';
import CreateCategoryUseCase from '../application/createCategoryUseCase';
import { CategoryEntity } from '../domain/categoryEntity';
import authenticateRestaurant from '../../../middlewares/authenticateRestaurantMiddleware';
import RestaurantRepositoryImplementation from '../../restaurant/infraestructure/restaurantRepositoryImplementation';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export default class CategoryRouter {
    router: Router;
    categoryRepositoryImplementation: CategoryRepositoryImplementation;
    getCategoriesUseCase: GetCategoriesUseCase;    
    createCategoryUseCase: CreateCategoryUseCase;
    restaurantRepositoryImplementation: RestaurantRepositoryImplementation;
    storage: any;
    uploadMiddleware: any;
        
    constructor(){
        // Configuración para archivos
        this.storage = this.getStorage();
        this.uploadMiddleware = this.getUpdaloadMiddleware(this.storage);

        this.router = express.Router();

        // Category Repository Instance
        this.categoryRepositoryImplementation = new CategoryRepositoryImplementation();
        this.restaurantRepositoryImplementation = new RestaurantRepositoryImplementation();

        // Category Use Cases Instances
        this.getCategoriesUseCase = new GetCategoriesUseCase(this.categoryRepositoryImplementation);
        this.createCategoryUseCase = new CreateCategoryUseCase(this.categoryRepositoryImplementation);
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-all', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;
                const categories = await this.getCategoriesUseCase.execute(restaurantId);
                return res.status(200).json(categories);
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });
        
        this.router.use('/get-image', express.static('images/categories'));

        this.router.post('/upload-image', this.uploadMiddleware.single('image'), async (req: any, res: any) => {
            try {

                res.send({
                    message: 'Imagen cargada correctamente',
                    file: req.file
                });
            } catch (error) {
                res.status(400).send({ error: 'Error al cargar la imagen' });
            }
        });

        this.router.post('/create', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;    
                const { name, image, icon } = req.body;
                const restaurant = await this.restaurantRepositoryImplementation.getById(restaurantId);
                if(restaurant){
                    const categoryEntity = new CategoryEntity(name, image, icon);
                    categoryEntity.setRestaurant(restaurant);
                    await this.createCategoryUseCase.execute(categoryEntity, restaurantId);
                    return res.status(200).json({ message: 'Categoría creada con éxito.' });
                }else {
                    return res.status(200).json({ message: 'No fue posible crear la categoría.' });
                }
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });
    }

    getStorage(){
        return multer.diskStorage({
            destination: (req, file, cb) => {
                // Definir el directorio donde se guardarán las imágenes
                const uploadDir = 'images/categories';
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                // Definir el nombre de los archivos (opcionalmente puedes generar un nombre único)
                const fileName = Date.now() + path.extname(file.originalname);
                cb(null, fileName);
            }
        });
    }

    getUpdaloadMiddleware(storage: any){
        return multer({
            storage: storage,
            limits: { fileSize: 5 * 1024 * 1024 }, // Tamaño máximo del archivo: 5MB
            fileFilter: (req, file, cb) => {
                // Validar el tipo de archivo (solo imágenes)
                const fileTypes = /jpeg|jpg|png|gif/;
                const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
                const mimetype = fileTypes.test(file.mimetype);

                if (mimetype && extname) {
                    return cb(null, true);
                } else {
                    cb(new Error('Solo se permiten imágenes'));
                }
            }
        });
    }

        
    getRouter(): any {
        return this.router;
    }
}