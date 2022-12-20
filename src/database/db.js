import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

export const connectionDB = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1999',
    database: "shortly",
});