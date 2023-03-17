
/* / / / / = = = = = = = / / / / */
/* / / / / = DATA BASE = / / / / */
/* / / / / = = = = = = = / / / / */

CREATE DATABASE "DB_1"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE "DB_1"
    IS 'large home-work data base';

/* / / / / = = = = = = = / / / / */
/* / / / / = COUNTRIES = / / / / */
/* / / / / = = = = = = = / / / / */

CREATE TABLE public.countries
(
    c_id   serial NOT NULL,
    c_name text   NOT NULL,
    PRIMARY KEY (c_id)
);

ALTER TABLE IF EXISTS public.countries
    OWNER to postgres;

/* / / / / = = = = = = / / / / */
/* / / / / = MEMBERS = / / / / */
/* / / / / = = = = = = / / / / */

CREATE TABLE public.members
(
    m_id          serial  NOT NULL,
    m_name        text    NOT NULL,
    m_name_origin text,
    m_height      integer,
    m_birthday    date    NOT NULL,
    m_id_country  integer NOT NULL,
    m_city        text,
    PRIMARY KEY (m_id)
);

ALTER TABLE IF EXISTS public.members
    OWNER to postgres;

ALTER TABLE IF EXISTS public.members
    ADD CONSTRAINT m_fk_country FOREIGN KEY (m_id_country)
    REFERENCES public.countries (c_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

CREATE INDEX m_i_name
    ON public.members USING hash
    (m_name text_pattern_ops) ;

CREATE INDEX m_i_country
    ON public.members USING btree
    (m_id_country ASC NULLS LAST) ;

/* / / / / = = = = = / / / / */
/* / / / / = FILMS = / / / / */
/* / / / / = = = = = / / / / */

CREATE TABLE public.films
(
    f_id              serial   NOT NULL,
    f_name            text     NOT NULL DEFAULT '- unknown -',
    f_name_origin     text,
    f_prod_year       integer  NOT NULL,
    f_time            integer  NOT NULL,
    f_min_age         smallint NOT NULL DEFAULT 18,
    f_mpaa_ranking    text     NOT NULL DEFAULT 'P18',
    f_id_country      smallint NOT NULL,
    f_id_director     integer  NOT NULL,
    f_id_screenwriter integer,
    f_id_producer     integer  NOT NULL,
    f_id_operator     integer,
    f_id_composer     integer,
    f_id_artist       integer  NOT NULL,
    f_id_editor       integer,
    f_budget          money    NOT NULL,
    f_marketing       money,
    PRIMARY KEY (f_id)
);

ALTER TABLE IF EXISTS public.films
    OWNER to postgres;

ALTER TABLE IF EXISTS public.films
    ADD CONSTRAINT f_fk_country FOREIGN KEY (f_id_country)
    REFERENCES public.countries (c_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.films
    ADD CONSTRAINT f_fk_director FOREIGN KEY (f_id_director)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.films
    ADD CONSTRAINT f_fk_screenwriter FOREIGN KEY (f_id_screenwriter)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.films
    ADD CONSTRAINT f_fk_producer FOREIGN KEY (f_id_producer)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.films
    ADD CONSTRAINT f_fk_operator FOREIGN KEY (f_id_operator)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.films
    ADD CONSTRAINT f_fk_composer FOREIGN KEY (f_id_composer)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.films
    ADD CONSTRAINT f_fk_artist FOREIGN KEY (f_id_artist)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.films
    ADD CONSTRAINT f_fk_editor FOREIGN KEY (f_id_editor)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

CREATE INDEX f_i_name
    ON public.films USING hash
    (f_name text_pattern_ops) ;

CREATE INDEX f_i_min_age
    ON public.films USING btree
    (f_min_age ASC NULLS LAST) ;

CREATE INDEX f_i_country
    ON public.films USING btree
    (f_id_country ASC NULLS LAST) ;

CREATE INDEX f_i_director
    ON public.films USING btree
    (f_id_director ASC NULLS LAST) ;

/* / / / / = = = == = = = / / / / */
/* / / / / = STARRINGES = / / / / */
/* / / / / = = = == = = = / / / / */

CREATE TABLE public.starringes
(
    s_id       serial  NOT NULL,
    s_id_film  integer NOT NULL,
    s_id_actor integer NOT NULL,
    PRIMARY KEY (s_id)
);

ALTER TABLE IF EXISTS public.starringes
    OWNER to postgres;

ALTER TABLE IF EXISTS public.starringes
    ADD CONSTRAINT s_fk_film FOREIGN KEY (s_id_film)
    REFERENCES public.films (f_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.starringes
    ADD CONSTRAINT s_fk_actor FOREIGN KEY (s_id_actor)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

/* / / / / = = = =  = = = = / / / / */
/* / / / / = UNDERSTUDIES = / / / / */
/* / / / / = = = =  = = = = / / / / */

CREATE TABLE public.understudies
(
    u_id           serial  NOT NULL,
    u_id_starringe integer NOT NULL,
    u_id_actor     integer NOT NULL,
    PRIMARY KEY (u_id)
);

ALTER TABLE IF EXISTS public.understudies
    OWNER to postgres;

ALTER TABLE IF EXISTS public.understudies
    ADD CONSTRAINT u_fk_starringe FOREIGN KEY (u_id_starringe)
    REFERENCES public.starringes (s_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.understudies
    ADD CONSTRAINT u_fk_actor FOREIGN KEY (u_id_actor)
    REFERENCES public.members (m_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

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

/* / / / / = = = = == = = = = / / / / */
/* / / / / = VIEW_PLATFORMS = / / / / */
/* / / / / = = = = == = = = = / / / / */

CREATE TABLE public.view_platforms
(
    vp_id   serial NOT NULL,
    vp_name text   NOT NULL,
    vp_link text   NOT NULL,
    PRIMARY KEY (vp_id)
);

ALTER TABLE IF EXISTS public.view_platforms
    OWNER to postgres;

/* / / / / = = = = = = = = = = = = / / / / */
/* / / / / = FILM_VIEW_PLATFORMS = / / / / */
/* / / / / = = = = = = = = = = = = / / / / */

CREATE TABLE public.film_view_platforms
(
    fvp_id               serial  NOT NULL,
    fvp_id_film          integer NOT NULL,
    fvp_id_view_platform integer NOT NULL,
    PRIMARY KEY (fvp_id)
);

ALTER TABLE IF EXISTS public.film_view_platforms
    OWNER to postgres;

ALTER TABLE IF EXISTS public.film_view_platforms
    ADD CONSTRAINT fvp_fk_film FOREIGN KEY (fvp_id_film)
    REFERENCES public.films (f_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.film_view_platforms
    ADD CONSTRAINT fvp_fk_view_platform FOREIGN KEY (fvp_id_view_platform)
    REFERENCES public.view_platforms (vp_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

/* / / / / = = = = = / / / / */
/* / / / / = VIEWS = / / / / */
/* / / / / = = = = = / / / / */

CREATE TABLE public.views
(
    v_id         serial  NOT NULL,
    v_date       date    NOT NULL,
    v_id_film    integer NOT NULL,
    v_id_country integer NOT NULL,
    v_count      integer NOT NULL,
    PRIMARY KEY (v_id)
);

ALTER TABLE IF EXISTS public.views
    OWNER to postgres;

ALTER TABLE IF EXISTS public.views
    ADD CONSTRAINT v_fk_film FOREIGN KEY (v_id_film)
    REFERENCES public.films (f_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;

ALTER TABLE IF EXISTS public.views
    ADD CONSTRAINT v_fk_country FOREIGN KEY (v_id_country)
    REFERENCES public.countries (c_id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
    NOT VALID;
