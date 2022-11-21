import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { MovieGenreEnum } from '../movie.types';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
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
