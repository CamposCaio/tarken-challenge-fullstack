import { Module } from '@nestjs/common';
import { AudiosModule } from './audios/audios.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [MoviesModule, AudiosModule],
})
export class ApiModule {}
