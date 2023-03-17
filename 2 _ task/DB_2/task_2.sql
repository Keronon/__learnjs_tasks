
/* / / / / = = = = = = = / / / / */
/* / / / / = DATA BASE = / / / / */
/* / / / / = = = = = = = / / / / */

CREATE DATABASE "DB_2"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE "DB_2"
    IS 'small home-work data base';

/* / / / / = = = = = / / / / */
/* / / / / = FILMS = / / / / */
/* / / / / = = = = = / / / / */

CREATE TABLE public.films
(
    f_id              serial   NOT NULL,
    f_name            text     NOT NULL DEFAULT '- unknown -',
    f_prod_year       integer  NOT NULL,
    PRIMARY KEY (f_id)
);

ALTER TABLE IF EXISTS public.films
    OWNER to postgres;

/* / / / / = = == = = / / / / */
/* / / / / = GENRES = / / / / */
/* / / / / = = == = = / / / / */

CREATE TABLE public.genres
(
    g_id   serial NOT NULL,
    g_name text   NOT NULL,
    PRIMARY KEY (g_id)
);

ALTER TABLE IF EXISTS public.genres
    OWNER to postgres;

/* / / / / = = = = = = = = / / / / */
/* / / / / = FILM_GENRES = / / / / */
/* / / / / = = = = = = = = / / / / */

CREATE TABLE public.film_genres
(
    fg_id       serial  NOT NULL,
    fg_id_film  integer NOT NULL,
    fg_id_genre integer NOT NULL,
    PRIMARY KEY (fg_id)
);

ALTER TABLE IF EXISTS public.film_genres
    OWNER to postgres;

ALTER TABLE IF EXISTS public.film_genres
    ADD CONSTRAINT fg_fk_film FOREIGN KEY (fg_id_film)
    REFERENCES public.films (f_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.film_genres
    ADD CONSTRAINT fg_fk_genre FOREIGN KEY (fg_id_genre)
    REFERENCES public.genres (g_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;
