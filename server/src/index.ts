import express from 'express';

import loaders from './loaders';
import { ProductsController } from './controller/product.controller';
import { UsersController } from './controller/user.controller';
import { AuthController } from './controller/auth.controller';
import { UploadController } from './controller/upload.controller';


async function startServer() {
    // Récupération de l'application initiale
    const app = express();

    // Chargement des différent loader
    await loaders(app);

    // Ajout des différentes route de votre application
    ProductsController(app);
    UsersController(app);
    AuthController(app);
    UploadController(app)

    // Démarrage du serveur une fois que tout est correctement init
    app.listen(3000, () => console.log('Express server  is running'));
  }

startServer();
