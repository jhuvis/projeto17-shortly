import express from 'express';
import { me, rank } from '../controllers/meControllers.js';
import auth from '../middlewares/authorizationMiddleware.js';

const userRoutes = express.Router();
userRoutes.get("/users/me", auth, me);
userRoutes.get("/ranking", rank);

 

export default userRoutes;