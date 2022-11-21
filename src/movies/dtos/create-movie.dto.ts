import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @IsOptional()
  genre: MovieGenreEnum[];

  @IsString({ each: true })
  @IsOptional()
  cast: string[];

  @IsDateString()
  @IsOptional()
  releaseDate: Date;
}
