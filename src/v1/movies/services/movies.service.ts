import { Inject, Injectable } from '@nestjs/common';
import { LoggerHelper } from '../../../core/helpers';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import {MovieRepository} from '../repository/movie.repository'
import {ResponseService} from '../../../core/response/response.service';

@Injectable()
export class MoviesService{
 constructor(
  private readonly movieRepository: MovieRepository,
  private readonly logger: LoggerHelper,
  private responseService: ResponseService,

 ) {
  
   
 }
 async create(createMovieDto: CreateMovieDto):Promise<any> {
      try {
        return  await this.movieRepository.create(createMovieDto)
        //  return this.responseService.makeSuccessResponse()
      } catch (error) {
          // return this.responseService.makeErrorResponse()
      }
  }

  async findAll() {
    // return `This action returns all movies`;
    return this.movieRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }


}