import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description:
      'The imdbID is returned from OMDB API and it needs to be unique.',
  })
  @IsString()
  @IsNotEmpty()
  public imdbID: string;

  @ApiProperty({
    description: 'The movie title is returned from OMDB API.',
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'The imdbRating is returned from OMDB API.',
  })
  @IsString()
  @IsNotEmpty()
  public imdbRating: string;

  @ApiProperty({
    description:
      'The imageSrc is the URL that provides the image (cover) of the movie.',
  })
  @IsString()
  @IsNotEmpty()
  public imageSrc: string;
}
