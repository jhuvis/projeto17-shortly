import joi from 'joi';
import { connectionDB } from "../database/db.js";

export default async function signUpMiddleware(req, res, next) 
{
    const user = req.body;

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).required(),
        password: joi.string().required(),
        confirmPassword: joi.string().required(),
    });
    
    const validation = userSchema.validate(req.body, { abortEarly: true });
    if (validation.error) 
    {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send({ errors });
    };

    if(user.password !== user.confirmPassword)
    {
        return res.status(422).send('Senhas diferentes');
    }

    const userExist = await connectionDB.query(
        `SELECT * FROM "public.users" WHERE email=$1`,
        [user.email]
      );

    if(userExist.rows[0]) 
    {
        return res.status(409).send('Esse email já está sendo utilizado, tente novamente!');           
    }
    next();
}
