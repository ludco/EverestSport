import { Product } from './../models/product';
import { ProductsService } from './../services/products.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Product Controller
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
    // sorted by category
    else if (category) {
      productsService.getByCategory(category).then(result => {
        res.send(result);
      })
        .catch(err => {
          console.log(err);
        });

    }
    // the big Promo one
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
    const product: Product = req.body; 

    productsService.create(product).then(result => {
      res.send(result);
    })
      .catch(err => {
        console.log(err);
      })
  });

  /**
   * Update a product relative to its id and return the updated product in JSON.
   */
  router.put('/:id', (req: Request, res: Response) => {
    const product: Product = req.body; 

    productsService.update(product).then(result => {
      res.send(result);
    })
      .catch(err => {
        console.log(err);
      })
  });

  /**
   * Delete a product relative to its id.
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

  // route
  app.use('/products', router);
};
