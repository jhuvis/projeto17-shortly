import { connectionDB } from "../database/db.js";
import isUrl from 'is-url';
import { nanoid } from 'nanoid';

export async function shorten(req, res) {
    try {
        const user = res.locals.user;
        const { url } = req.body
       
        if(!isUrl(url))
        {
            return res.status(409).send('url nao existe'); 
        }

        const shorturl = nanoid(10);

        await connectionDB.query(
            `INSERT INTO "public.urls" ("userId", "shortUrl", url) VALUES ($1, $2, $3)`,
            [user.id, shorturl, url]
          );   
        
        return res.status(201).send({
            shortUrl: shorturl
        }); 

    } catch (error) {
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }  
};

export async function idUrl(req, res) {
    try {
        
        const id = req.params.id;

        const url = await connectionDB.query(
            `SELECT u."userId" AS id, u."shortUrl", u.url FROM "public.urls" u WHERE id = $1`,
            [id]
        );
          
        if(!url.rows[0])
        {
            return res.status(404).send('url nao existe'); 
        }  

        return res.status(200).send(url.rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }  
};

export async function openShort(req, res) {
    try {
        
        const shortUrl = req.params.shortUrl;

        const url = await connectionDB.query(
            `SELECT * FROM "public.urls" WHERE "shortUrl" = $1`,
            [shortUrl]
        );
          
        if(!url.rows[0])
        {
            return res.status(404).send('url nao existe'); 
        }  
        await connectionDB.query(
            `UPDATE "public.urls" SET "visitCount"=$1 WHERE id=$2`,
            [url.rows[0].visitCount + 1, url.rows[0].id]
        );

        res.redirect(url.rows[0].url)

    } catch (error) {
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }  
};

export async function deleteShort(req, res) {
    try {
        
        const id = req.params.id;

        await connectionDB.query(
            `DELETE FROM "public.urls" WHERE id=$1`,
            [id]
        );
          
        return res.status(204).send('Deletado com sucesso');

    } catch (error) {
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }  
};