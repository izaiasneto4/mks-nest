import { IsNotEmpty, IsString } from 'class-validator';

export class GetMovieDto {
  @IsString()
  @IsNotEmpty()
  movieId: string;
}
