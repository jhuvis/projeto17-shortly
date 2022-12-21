import { connectionDB } from "../database/db.js";

export default async function authorizationMiddleware(req, res, next) 
{
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) return res.status(401).send('Login não autorizado!');

      const session = await connectionDB.query(
        `SELECT * FROM "public.sessions" WHERE "token"=$1`,
        [token]
      );    
      if (!session.rows[0]) 
      {
        return res.status(401).send('Login não autorizado!'); 
      }

      const user = await connectionDB.query(
          `SELECT * FROM "public.users" WHERE id=$1`,
          [session.rows[0].userId]
        );

      delete user.rows[0].password;
      res.locals.user = user.rows[0];
    
      next();
    
  }