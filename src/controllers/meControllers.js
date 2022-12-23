import { connectionDB } from "../database/db.js";

export async function me(req, res) {
    try {
        const user = res.locals.user;

        const u = await connectionDB.query(
            `SELECT u.id, u.name , SUM(ur."visitCount") "visitCount"
            FROM "public.urls" ur
            JOIN "public.users" u
            ON u.id = ur."userId"
            WHERE u.id = $1
            GROUP BY u.id`,
            [user.id]
          );
          const urls= await connectionDB.query(
            `SELECT u.id, u."shortUrl", u.url, u."visitCount" 
            FROM "public.urls" u 
            WHERE u."userId" = $1;`,
            [user.id]
          );
        const shortenedUrls = urls.rows;
        
        return res.status(201).send(
        {
            id: u.rows[0].id,
            name: u.rows[0].name,
            visitCount: u.rows[0].visitCount,
            shortenedUrls
        }); 

    } catch (error) {
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }  
};

export async function rank(req, res) {
    try {

        const rank = await connectionDB.query(
            `SELECT u.id, u.name , COUNT(ur) "linksCount", SUM(ur."visitCount") "visitCount"
            FROM "public.urls" ur
            JOIN "public.users" u
            ON u.id = ur."userId"
            GROUP BY u.id
            ORDER BY "visitCount" DESC LIMIT 10`
          );
          
        return res.status(201).send(
            rank.rows
        ); 

    } catch (error) {
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }  
};