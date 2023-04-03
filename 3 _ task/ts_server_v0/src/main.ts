
const log = console.log;

import { NestFactory } from "@nestjs/core";
import { AppModule   } from "./app.module";

async function start ()
{
    const PORT = process.env.PORT || 9999;
    const APP  = await NestFactory.create( AppModule );

    await APP.listen( PORT, () => log( `\n= = > server  : running\n= = > on port : ${PORT}\n`) );
};
start();
