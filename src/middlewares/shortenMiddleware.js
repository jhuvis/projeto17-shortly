import joi from 'joi';

export default async function shortenMiddleware(req, res, next) 
{
    const shortenSchema = joi.object({
        url: joi.string().required(),
    });
    const validation = shortenSchema.validate(req.body, { abortEarly: true });
    if (validation.error) 
    {
        return res.status(422).send('Digite os seus dados corretamente!');
    }
    next();
}