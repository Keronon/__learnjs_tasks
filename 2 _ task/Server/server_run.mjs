import   express            from "express";
import { filmsRouter      } from "./_ routes/films.route.mjs";
import { genresRouter     } from "./_ routes/genres.route.mjs";
import { filmGenresRouter } from "./_ routes/film_genres.route.mjs";

const log = console.log;

const app  = express();
const port = process.env.PORT || 9999;

app.use( express.json() );
app.use( `/api`, filmsRouter      );
app.use( `/api`, genresRouter     );
app.use( `/api`, filmGenresRouter );

app.listen( port, () => log(`
||||| ||||| |||||
= = = SERVER
= = = STARTED
- - - port : ${port}
||||| ||||| |||||
` ) );
