import { Product } from './../models/product';
import { ProductsService } from './../services/products.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Priduct Controller
 * @param app l'application express
 */
export const ProductsController = (app: Application) => {

  const router: Router = express.Router();
  const productsService = ProductsService.getInstance();

  /**
   * Return all products in JSON
   */
  router.get('/', (req: Request, res: Response) => {
    const category = req.query.category;
    const bigPromo = req.query.bigPromo;

    if (!category && !bigPromo) {
      productsService.getAll().then(results => {
        res.send(results);
      })
        .catch(err => {
          console.log(err);
        })
    }
    else if (category) {
      productsService.getByCategory(category).then(result => {
        res.send(result);
      })
        .catch(err => {
          console.log(err);
        });

    }
    else if (bigPromo) {
      productsService.getBigPromo().then(result => {
        res.send(result);
      })
        .catch(err => {
          console.log(err);
        })
    }

  });

  /**
   * Return only one product in JSON relative to its id
   */
  router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    productsService.getById(id).then(result => {
      res.send(result);
    })
      .catch(err => {
        console.log(err);
      })
  });

  /**
   * Create a new product from a JSON body and return the created post in JSON.
   */
  router.post('/', (req: Request, res: Response) => {
    const product: Product = req.body; // Automatically transform in a Post object

    productsService.create(product).then(result => {
      res.send(result);
    })
      .catch(err => {
        console.log(err);
      })
  });

  /**
   * Update a product relative to its id and return the updated post in JSON.
   */
  router.put('/:id', (req: Request, res: Response) => {
    const product: Product = req.body; // req.params.id is automatically set into the body

    productsService.update(product).then(result => {
      res.send(result);
    })
      .catch(err => {
        console.log(err);
      })
  });

  /**
   * Delete a product relative its id.
   */
  router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    productsService.delete(id).then(result => {
      res.send();
    })
      .catch(err => {
        console.log(err);
      })
  });

  app.use('/products', router);
};
