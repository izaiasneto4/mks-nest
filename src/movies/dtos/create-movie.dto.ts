import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MovieGenreEnum } from '../movie.types';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString({ each: true })
  @IsEnum(MovieGenreEnum, { each: true })
  genre: MovieGenreEnum[];

  @IsString({ each: true })
  cast: string[];

  @IsDateString()
  releaseDate: Date;
}
