import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './movies.controller';
import { MoviesProvider } from 'src/v1/movies/providers/movies.providers';
import { MovieRepository } from './repository/movie.repository';
import { Movie } from './schemas/movie.schama';
import { ResponseModule } from 'src/core/response/resonse.module';
import { ProvidersModule } from '../mongodb/providers.module';
@Module({
  imports: [ResponseModule,ProvidersModule],
  controllers: [MoviesController],
  providers: [...MoviesProvider,Movie,MovieRepository, MoviesService],
  exports: [...MoviesProvider],
})
export class MoviesModule {}
