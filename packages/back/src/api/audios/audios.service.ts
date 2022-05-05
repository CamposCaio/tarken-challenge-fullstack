import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import * as fs from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Injectable()
export class AudiosService {
  @InjectRepository(Movie)
  private readonly repository: Repository<Movie>;

  public async getAudio(imdbID: string): Promise<fs.ReadStream> {
    const movieInDB = await this.repository.findOneBy({ imdbID });
    const audioPath = join(process.cwd(), `audios/${movieInDB.audioSrc}`);
    return fs.existsSync(audioPath) ? fs.createReadStream(audioPath) : null;
  }

  public async createAudio(imdbID: string, filename: string) {
    const movieInDB = await this.repository.findOneBy({ imdbID });
    if (!movieInDB) return;
    movieInDB.audioSrc = filename;
    this.repository.save(movieInDB);
  }

  public async deleteAudio(imdbID: string): Promise<Movie> {
    console.log('deleting audio...');

    const movieInDB = await this.repository.findOneBy({ imdbID });
    if (!movieInDB) return;
    const audioPath = join(process.cwd(), `audios/${movieInDB.audioSrc}`);
    fs.unlinkSync(audioPath);
    movieInDB.audioSrc = null;
    return this.repository.save(movieInDB);
  }
}
