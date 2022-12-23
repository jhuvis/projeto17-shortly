import express from 'express';
import { shorten, openShort, deleteShort, idUrl } from '../controllers/urlsControllers.js';
import auth from '../middlewares/authorizationMiddleware.js';
import shortenMiddleware from '../middlewares/shortenMiddleware.js';
import deleteMiddleware from '../middlewares/deleteMiddleware.js';


const urlsRoutes = express.Router();
urlsRoutes.post("/urls/shorten", auth, shortenMiddleware, shorten);
urlsRoutes.get("/urls/open/:shortUrl", openShort);
urlsRoutes.get("/urls/:id", idUrl);
urlsRoutes.delete("/urls/:id", auth, deleteMiddleware, deleteShort);
 

export default urlsRoutes;