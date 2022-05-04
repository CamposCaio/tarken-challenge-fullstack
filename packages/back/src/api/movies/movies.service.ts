import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  @InjectRepository(Movie)
  private readonly repository: Repository<Movie>;

  public getAllMovies(): Promise<Movie[]> {
    return this.repository.find();
  }

  public getMovie(imdbID: string): Promise<Movie> {
    return this.repository.findOneBy({ imdbID });
  }

  public createMovie(body: CreateMovieDto): Promise<Movie> {
    let movie: Promise<Movie>;

    this.repository
      .findOneBy({ imdbID: body.imdbID })
      .then((movieInDB: Movie) => {
        if (movieInDB) {
          movieInDB.deleted = false;
          movie = this.repository.save(movieInDB);
        } else {
          const newMovie = {
            imdbID: body.imdbID,
            title: body.title,
            imdbRating: body.imdbRating,
            imageSrc: body.imageSrc,
          };
          movie = this.repository.save(newMovie);
        }
      });
    return movie;
  }

  public async deleteMovie(imdbID: string): Promise<Movie> {
    const movie = await this.repository.findOneBy({ imdbID });
    if (movie) {
      movie.deleted = true;
      return this.repository.save(movie);
    } else {
      return null;
    }
    //   let movie: Promise<Movie>;

    //   this.repository.findOneBy({ imdbID }).then((movieToUpdate: Movie) => {
    //     movieToUpdate.deleted = true;
    //     movie = this.repository.save(movieToUpdate);
    //   });
    //   return movie;
  }
}
