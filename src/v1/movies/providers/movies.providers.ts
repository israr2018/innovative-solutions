import { Connection } from 'mongoose';
import { MovieSchema } from '../schemas/movie.schama';
export const MoviesProvider = [
  {
    provide: 'MOVIE_MODEL',
    useFactory: (connection: Connection): any => {
      if (!connection) return;
      return connection.model('movies', MovieSchema, 'movies');
    },
    inject: ['MONGODB_PROVIDER'],
  },
];
