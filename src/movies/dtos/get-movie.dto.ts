import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The movie ID',
    example: '808032ad-6a72-4ca9-9c14-6211041c320',
  })
  movieId: string;
}
