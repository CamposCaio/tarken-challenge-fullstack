import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  @InjectRepository(Movie)
  private readonly repository: Repository<Movie>;

  public getAllMovies(): Promise<Movie[]> {
    return this.repository.find();
  }

  public getMovie(id: number): Promise<Movie> {
    return this.repository.findOneBy({ id });
  }

  public createMovie(body: CreateMovieDto): Promise<Movie> {
    const movie: Movie = new Movie();

    movie.title = body.title;
    movie.imdbRating = body.imdbRating;
    movie.imageSrc = body.imageSrc;

    return this.repository.save(movie);
  }
}
