import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../movies/movie.entity';
import { AudiosController } from './audios.controller';
import { AudiosService } from './audios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  controllers: [AudiosController],
  providers: [AudiosService],
})
export class AudiosModule {}
