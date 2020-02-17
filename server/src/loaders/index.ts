import expressLoader from './express';
import { Application } from 'express';
import dotenv from 'dotenv';

// import * as index from '../index';
const index = require('../index');

export default async (app: Application ) => {
  dotenv.config();
  await expressLoader(app);
  console.log('Express Intialized');

  
};
