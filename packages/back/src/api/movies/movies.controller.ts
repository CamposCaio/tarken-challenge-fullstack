import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  @Inject(MoviesService)
  private readonly service: MoviesService;

  @Get()
  public getAllMovies(): Promise<Movie[]> {
    return this.service.getAllMovies();
  }

  @Get(':imdbID')
  public getMovie(@Param('imdbID') imdbID: string): Promise<Movie> {
    return this.service.getMovie(imdbID);
  }

  @Post()
  public createMovie(@Body() body: CreateMovieDto): Promise<Movie> {
    return this.service.createMovie(body);
  }

  @Delete(':imdbID')
  public async deleteMovie(@Param('imdbID') imdbID: string): Promise<Movie> {
    return await this.service.deleteMovie(imdbID);
  }
}
