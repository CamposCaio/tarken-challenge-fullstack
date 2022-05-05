import {
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Response,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { AudiosService } from './audios.service';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger/dist/decorators';

@ApiTags('audios')
@Controller('audios')
export class AudiosController {
  @Inject(AudiosService)
  private readonly service: AudiosService;

  @Get(':imdbID')
  public async getAudio(
    @Param('imdbID') imdbID: string,
    @Response({ passthrough: true }) res
  ): Promise<StreamableFile> {
    const file = await this.service.getAudio(imdbID);
    if (file) {
      res.set({
        'Content-Type': 'audio/mp4',
      });
      return new StreamableFile(file);
    }
    throw new HttpException(
      'No audio with this imdbID were found in the file system',
      HttpStatus.NOT_FOUND
    );
  }

  @Post(':imdbID')
  @UseInterceptors(
    FileInterceptor('audio', {
      dest: join(process.cwd(), 'audios'),
    })
  )
  public async createAudio(
    @Param('imdbID') imdbID: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file)
      throw new HttpException('No file specified', HttpStatus.BAD_REQUEST);
    const res = await this.service.createAudio(imdbID, file.filename);
    if (res) return res;
    throw new HttpException(
      'No movie with this imdbID were found in the database',
      HttpStatus.NOT_FOUND
    );
  }

  @Delete(':imdbID')
  public async deleteAudio(@Param('imdbID') imdbID: string) {
    const res = await this.service.deleteAudio(imdbID);
    throw new HttpException(
      'No movie with this imdbID were found in the database',
      HttpStatus.NOT_FOUND
    );
  }
}
