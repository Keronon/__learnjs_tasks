import { Router       } from "express";
import { genresControl } from "../_ controls/genres.control.mjs";

export const genresRouter = Router();

genresRouter.post  ( `/genres`    , genresControl.CreateGenre );
genresRouter.get   ( `/genres`    , genresControl.GetGenres   );
genresRouter.get   ( `/genres/:id`, genresControl.GetGenre    );
genresRouter.put   ( `/genres/:id`, genresControl.UpdateGenre );
genresRouter.delete( `/genres/:id`, genresControl.DeleteGenre );
