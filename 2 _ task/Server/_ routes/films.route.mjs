import { Router       } from "express";
import { filmsControl } from "../_ controls/films.control.mjs";

export const filmsRouter = Router();

filmsRouter.post  ( `/films`    , filmsControl.CreateFilm );
filmsRouter.get   ( `/films`    , filmsControl.GetFilms   );
filmsRouter.get   ( `/films/:id`, filmsControl.GetFilm    );
filmsRouter.put   ( `/films/:id`, filmsControl.UpdateFilm );
filmsRouter.delete( `/films/:id`, filmsControl.DeleteFilm );
