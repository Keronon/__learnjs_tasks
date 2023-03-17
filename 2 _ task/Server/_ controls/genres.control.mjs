import { pool as db } from "../db_control.mjs";

const log = console.log;

class GenresControl
{
    async CreateGenre(req, res)
    {
        const { name } = req.body;
        log(`= create genre : ${name}`);

        const newGenre = await db.query(`
            INSERT INTO genres (g_name) VALUES ($1) RETURNING *;
            `, [ name ]);

        res.json(newGenre.rows[0]);
        log(`- ok`);
    }

    async GetGenres(req, res)
    {
        log(`= get genres`);
        
        const genres = await db.query(`SELECT * FROM genres`);

        res.json(genres.rows);
        log(`- ok`);
    }

    async GetGenre(req, res)
    {
        const id = req.params.id;
        log(`= get genre : ${id}`);

        const genre = await db.query(`SELECT * FROM genres WHERE g_id = $1`, [ id ]);

        res.json(genre.rows[0]);
        log(`- ok`);
    }

    async UpdateGenre(req, res)
    {
        const id = req.params.id;
        const { name } = req.body;
        log(`= update genre : ${id} - set ( ${name} )`);

        const genre = await db.query(`
            UPDATE genres
            SET g_name = $1 WHERE g_id = $2
            RETURNING *;
            `, [ name, id ]);

        res.json(genre.rows[0]);
        log(`- ok`);
    }

    async DeleteGenre(req, res)
    {
        const id = req.params.id;
        log(`= delete genre : ${id}`);

        const genre = await db.query(`DELETE FROM genres WHERE g_id = $1`, [ id ]);

        res.json(genre.rows[0]);
        log(`- ok`);
    }
}

export const genresControl = new GenresControl();
