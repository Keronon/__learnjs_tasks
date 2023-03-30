import { NestFactory } from "@nestjs/core";
import { AppModule   } from "./app.module";

const log = console.log;

async function start ()
{
    const PORT = process.env.PORT || 9999;
    const APP  = await NestFactory.create( AppModule );

    await APP.listen( PORT, () => log( `
= = > server running
= = > on port ${PORT}
`
    ) );
};
start();
