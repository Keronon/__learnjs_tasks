import { ConfigModule } from "@nestjs/config";
import { Pool         } from "pg";

ConfigModule.forRoot( { envFilePath: `.${process.env.NODE_ENV}.env` } )

export const DB = new Pool( {
    host:     process.env.PG_HOST,
    port:     +process.env.PG_PORT,
    user:     process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB
} );
