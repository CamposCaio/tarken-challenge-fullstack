import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
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

  @Get(':id')
  public getMovie(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.service.getMovie(id);
  }

  @Post()
  public createMovie(@Body() body: CreateMovieDto): Promise<Movie> {
    return this.service.createMovie(body);
  }
}
