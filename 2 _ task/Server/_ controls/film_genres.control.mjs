import { pool as db } from "../db_control.mjs";

const log = console.log;

class FilmGenresControl
{
    async AddFilmGenre(req, res)
    {
        const { film_id, genre_id } = req.body;
        log(`= add genre : ${genre_id} to ${film_id}`);

        const newRecord = await db.query(`
            INSERT INTO film_genres (fg_id_film, fg_id_genre) VALUES ($1, $2) RETURNING *;
            `, [ film_id, genre_id ]);

        res.json(newRecord.rows[0]);
        log(`- ok`);
    }

    async GetFilmGenres(req, res)
    {
        const film_id = req.query.film_id;
        log(`= get film : ${film_id} - genres`);

        const genres = await db.query(`SELECT * FROM film_genres WHERE fg_id_film = $1`, [ film_id ]);

        res.json(genres.rows);
        log(`- ok`);
    }

    async RemoveFilmGenre(req, res)
    {
        const id = req.query.id;
        log(`= delete film genre : ${id}`);

        const genre = await db.query(`DELETE FROM film_genres WHERE fg_id = $1`, [ id ]);

        res.json(genre.rows[0]);
        log(`- ok`);
    }
}

export const filmGenresControl = new FilmGenresControl();
