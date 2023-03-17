import pkg from 'pg';
const { Pool } = pkg;

let user     = `postgres`;
let password = `123`;
let ip       = `localhost`;
let port     = 5432;
let db       = `DB_2`;

export const pool = new Pool(
{
    user:     user,
    password: password,
    host:     ip,
    port:     port,
    database: db
} );
