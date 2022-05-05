import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { CreateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  @Inject(MoviesService)
  private readonly service: MoviesService;

  @Get()
  public getAllMovies(): Promise<Movie[]> {
    return this.service.getAllMovies();
  }

  @Get(':imdbID')
  public async getMovie(@Param('imdbID') imdbID: string): Promise<Movie> {
    const res = await this.service.getMovie(imdbID);
    if (res) return res;
    throw new HttpException(
      'No movies with this imdbID were found in the database',
      HttpStatus.NOT_FOUND
    );
  }

  @Post(':token')
  public createMovie(
    @Body() body: CreateMovieDto,
    @Param('token') token: string
  ): Promise<Movie> {
    if (token !== 'a-not-very-secret-token')
      throw new HttpException(
        'Sorry, you are not allowed to create a new movie',
        HttpStatus.UNAUTHORIZED
      );
    return this.service.createMovie(body);
  }

  @Delete(':imdbID')
  public async deleteMovie(@Param('imdbID') imdbID: string): Promise<Movie> {
    const res = await this.service.deleteMovie(imdbID);
    if (res) return res;
    throw new HttpException(
      'No movies with this imdbID were found in the database',
      HttpStatus.NOT_FOUND
    );
  }
}
