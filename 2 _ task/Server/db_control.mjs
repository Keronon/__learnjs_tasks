import pkg from 'pg';
const { Pool } = pkg;

let user     = `postgres`;
let password = `123`;
let ip       = `localhost`; // 192.168.0.104
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
