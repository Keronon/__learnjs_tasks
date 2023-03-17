import { pool as db } from "../db_control.mjs";

const log = console.log;

class FilmsControl
{
    async CreateFilm(req, res)
    {
        const { name, year } = req.body;
        log(`= create film : ${name}, ${year}`);

        const newFilm = await db.query(`
            INSERT INTO films (f_name, f_prod_year) VALUES ($1, $2) RETURNING *;
            `, [ name, year ]);

        res.json(newFilm.rows[0]);
        log(`- ok`);
    }

    async GetFilms(req, res)
    {
        log(`= get films`);

        const films = await db.query(`SELECT * FROM films`);

        res.json(films.rows);
        log(`- ok`);
    }

    async GetFilm(req, res)
    {
        const id = req.query.id;
        log(`= get film : ${id}`);

        const film = await db.query(`SELECT * FROM films WHERE f_id = $1`, [ id ]);

        res.json(film.rows[0]);
        log(`- ok`);
    }

    async UpdateFilm(req, res)
    {
        const id = req.query.id;
        const { name, year } = req.body;
        log(`= update film : ${id} - set ( ${name}, ${year} )`);

        const film = await db.query(`
            UPDATE films
            SET f_name = $1, f_prod_year = $2
            WHERE f_id = $3 RETURNING *;
            `, [ name, year, id ]);

        res.json(film.rows[0]);
        log(`- ok`);
    }

    async DeleteFilm(req, res)
    {
        const id = req.query.id;
        log(`= delete film : ${id}`);

        const film = await db.query(`DELETE FROM films WHERE f_id = $1`, [ id ]);

        res.json(film.rows[0]);
        log(`- ok`);
    }
}

export const filmsControl = new FilmsControl();
