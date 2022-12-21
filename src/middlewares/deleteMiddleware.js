import { connectionDB } from "../database/db.js";

export default async function deleteMiddleware(req, res, next) 
{
        const id = req.params.id;
        const url = await connectionDB.query(
            `SELECT * FROM "public.urls" WHERE id = $1`,
            [id]
        );
        if(!url.rows[0])
        {
            return res.status(404).send('url nao existe'); 
        }
        if(url.rows[0].userId !== res.locals.user.id)
        {
            return res.status(401).send('Delete não autorizado!');
        }
        next();
  }