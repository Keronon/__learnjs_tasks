import http from "http";

import { filmsControl      } from "./_ controls/films.control.mjs";
import { genresControl     } from "./_ controls/genres.control.mjs";
import { filmGenresControl } from "./_ controls/film_genres.control.mjs";

const log = console.log;

const port = process.env.PORT || 9999;

const DEF_HTML = `
    <meta charset="UTF-8">
    <link rel="stylesheet" href="api/def.css">
    <h1> incorrect request </h1>
`;
const DEF_CSS = `
    h1
    {
        padding: 1em;
        text-align: center;
        background: #5f8;
        color: #aea;
        font-family: "Courier New";
    }
`;

const URL_FILMS       = `/api/films`;
const URL_GENRES      = `/api/genres`;
const URL_FILM_GENRES = `/api/film_genres`;

async function Prepare(req, res)
{
    const buffer = [];
    for await (const chunk of req)
        buffer.push(chunk);

    req.body = JSON.parse( buffer.length > 0 ? Buffer.concat(buffer).toString() : `{}` );

    req.query = {};
    req.url.split( `?` )[1]?.split( `&` ).forEach((param) =>
    {
        const [ key, value ] = param.split( `=` );
        req.query[key] = value;
    });

    res.writeHead( 200, { 'Content-Type': 'JSON' } );
    res.json = (obj) => { res.end( obj ? JSON.stringify(obj) : null ); };
}

http.createServer(async (req, res) =>
{
    await Prepare(req, res);
    if ( req.url.startsWith( URL_FILMS ) ) // films routing
    {
        switch( req.method )
        {
            case `POST`   : filmsControl.CreateFilm(req, res); break;
            case `GET`    :
                if ( Object.keys(req.query).length === 0 )
                    filmsControl.GetFilms(req, res);
                else
                    filmsControl.GetFilm(req, res);
                break;
            case `PUT`    : filmsControl.UpdateFilm(req, res); break;
            case `DELETE` : filmsControl.DeleteFilm(req, res); break;

            default    :
                res.writeHead( 200, { 'Content-Type': 'text/html' } );
                res.end( DEF_HTML ); break;
        }
    }

    else if ( req.url.startsWith( URL_GENRES ) ) // genres routing
    {
        switch( req.method )
        {
            case `POST`   : genresControl.CreateGenre(req, res); break;
            case `GET`    :
                if ( Object.keys(req.query).length === 0 )
                    genresControl.GetGenres(req, res);
                else
                    genresControl.GetGenre(req, res);
                break;
            case `PUT`    : genresControl.UpdateGenre(req, res); break;
            case `DELETE` : genresControl.DeleteGenre(req, res); break;

            default    :
                res.writeHead( 200, { 'Content-Type': 'text/html' } );
                res.end( DEF_HTML ); break;
        }
    }

    else if ( req.url.startsWith( URL_FILM_GENRES ) ) // film genres routing
    {
        switch( req.method )
        {
            case `POST`   : filmGenresControl.AddFilmGenre(req, res); break;
            case `GET`    : filmGenresControl.GetFilmGenres(req, res); break;
            case `DELETE` : filmGenresControl.RemoveFilmGenre(req, res); break;

            default    :
                res.writeHead( 200, { 'Content-Type': 'text/html' } );
                res.end( DEF_HTML ); break;
        }
    }

    // = = = = = | | | = = = = =

    else if ( req.url.startsWith(  `/api/def.css` ) )  // for default routing
    {
        res.writeHead( 200, { 'Content-Type': 'text/css' } );
        res.end( DEF_CSS );
    }

    else // default routing
    {
        res.writeHead( 200, { 'Content-Type': 'text/html' } );
        res.end( DEF_HTML );
    }

} )
    .listen( port, () => log(`
        ||||| ||||| |||||
        = = = SERVER
        = = = STARTED
        - - - port : ${port}
        ||||| ||||| |||||
    ` ) ); // [ 2 ] : localhost | 127.0.0.1 | 192.168.0.104
