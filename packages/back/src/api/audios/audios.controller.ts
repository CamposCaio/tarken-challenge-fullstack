import {
  Controller,
  Delete,
  Get,
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
    res.set({
      'Content-Type': 'audio/mp4',
    });
    return new StreamableFile(file);
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
    await this.service.createAudio(imdbID, file.filename);
  }

  @Delete(':imdbID')
  public async deleteAudio(@Param('imdbID') imdbID: string) {
    return await this.service.deleteAudio(imdbID);
  }
}
