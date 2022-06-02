import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../../../core/repository';
import { LoggerHelper } from '../../../core/helpers';
// import { Movie } from '@/movies/schemas/movie.schema';
import {Movie, MovieDocument} from '../schemas/movie.schama';
@Injectable()
export class MovieRepository extends BaseRepository<Movie>{
constructor(
    @Inject('MOVIE_MODEL') private readonly movieModel:Model<MovieDocument>,
    public readonly logger:LoggerHelper,
    ) {
        super(movieModel,logger)
    }
    // other repository methods


}