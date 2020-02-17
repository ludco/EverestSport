import { Category } from './../models/Category';
import { CategoryService } from './../services/category.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Category Controller
 * @param app l'application express
 */
export const CategoryController = (app: Application) => {

    const router: Router = express.Router();
    const categoryService = CategoryService.getInstance();

    /**
     * Return all Categorys in JSON
     */
    router.get('/', (req: Request, res: Response) => {

        categoryService.getAll().then(results => {
            res.send(results);
        })
            .catch(err => {
                console.log(err);
            })
    })



    /**
     * Return only one Category in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        categoryService.getById(id).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.log(err);
            })
    });

    /**
     * Create a new Category from a JSON body and return the created Category in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
        const Category: Category = req.body;

        categoryService.create(Category).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.log(err);
            })
    });

    /**
     * Update a Category relative to its id and return the updated Category in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
        const Category: Category = req.body;

        categoryService.update(Category).then(result => {
            res.send(result);
        })
            .catch(err => {
                console.log(err);
            })
    });

    /**
     * Delete a Category relative to its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        categoryService.delete(id).then(result => {
            res.send();
        })
            .catch(err => {
                console.log(err);
            })
    });

    // route
    app.use('/categories', router);
};
