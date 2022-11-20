import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
