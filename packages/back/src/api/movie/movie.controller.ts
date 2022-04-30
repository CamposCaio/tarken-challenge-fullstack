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
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  @Inject(MovieService)
  private readonly service: MovieService;

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
