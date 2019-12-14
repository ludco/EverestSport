import { PostsController } from './controller/posts.controller';
import { SlotsController } from './controller/slots.controller';
import { ReservationController } from './controller/reservation.controller';
import express from 'express';

import loaders from './loaders';
import { ProductsController } from './controller/product.controller';


async function startServer() {
    // Récupération de l'application initiale
    const app = express();

    // Chargement des différent loader
    await loaders(app);

    // Ajout des différentes route de votre application
    PostsController(app);
    SlotsController(app);
    ReservationController(app);
    ProductsController(app);

    // Démarrage du serveur une fois que tout est correctement init
    app.listen(3000, () => console.log('Express server  is running'));
  }

startServer();
