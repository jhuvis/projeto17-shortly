import express from 'express';
import { signUp, signIn } from '../controllers/authControllers.js';
import signInMiddleware from '../middlewares/signInMiddleware.js';
import signUpMiddleware from '../middlewares/signUpMiddleware.js';

const authRoutes = express.Router();
authRoutes.post("/signup", signUpMiddleware, signUp);
authRoutes.post("/signin", signInMiddleware, signIn); 

export default authRoutes;