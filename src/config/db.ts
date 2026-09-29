import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: dbUrl });

export default pool;
