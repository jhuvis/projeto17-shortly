import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { connectionDB } from "../database/db.js";

export async function signIn (req, res){
    try {
        const user = req.body;
        const userExist = await connectionDB.query(
            `SELECT * FROM "public.users" WHERE email=$1`,
            [user.email]
          );
    
        if(userExist.rows[0] && bcrypt.compareSync(user.password, userExist.rows[0].password)) 
        {
            const token = uuid();

            await connectionDB.query(
                `INSERT INTO "public.sessions" (token, "userId") VALUES ($1, $2)`,
                [token, userExist.rows[0].id]
              );
          
            return res.status(201).send({token: token});
        } 
        else 
        { 
            return res.status(401).send('Login não autorizado!'); 
        };
    }
    catch (error) 
    {
        console.log(error);
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }
};

export async function signUp(req, res) {
    try {
        const user = req.body;
        const passwordHash = bcrypt.hashSync(user.password, 10);

        await connectionDB.query(
            `INSERT INTO "public.users" (name, email, password) VALUES ($1, $2, $3)`,
            [user.name, user.email, passwordHash]
          );   
        
        return res.status(201).send('Registro completo!'); 

    } catch (error) {
        return res.status(500).send('Não foi possível conectar ao servidor!');
    }  
};