import { Router            } from "express";
import { filmGenresControl } from "../_ controls/film_genres.control.mjs";

export const filmGenresRouter = Router();

filmGenresRouter.post  ( `/film_genres`    , filmGenresControl.AddFilmGenre    );
filmGenresRouter.get   ( `/film_genres`, filmGenresControl.GetFilmGenres   );
filmGenresRouter.delete( `/film_genres`, filmGenresControl.RemoveFilmGenre );
