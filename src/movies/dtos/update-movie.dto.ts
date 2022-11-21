import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { MovieGenreEnum } from '../movie.types';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Movie Title',
    example: 'The Goodfellas',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Movie Director',
    example: 'Martin Scorcese',
  })
  director: string;

  @IsString({ each: true })
  @IsEnum(MovieGenreEnum, { each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Movie genres',
    example: ['Action'],
  })
  genre: MovieGenreEnum[];

  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Movie actors',
    example: ['Robert De Niro', 'Joe Pesci'],
  })
  cast: string[];

  @IsDateString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Movie release date',
    example: '123456',
  })
  releaseDate: Date;
}
