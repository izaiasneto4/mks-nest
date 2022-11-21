import { Body, Injectable, Param, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { GetMovieDto } from './dtos/get-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async getAll() {
    return await this.moviesRepository.find({});
  }

  async getOne(@Body() { movieId }: GetMovieDto) {
    const result = await this.moviesRepository.findOneBy({ id: movieId });

    if (!result) {
      throw new NotFoundException('Movie not found');
    }

    return result;
  }

  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.moviesRepository.save(createMovieDto);
  }

  async update(@Param() id: string, @Body() updateMovieDto: UpdateMovieDto) {
    const movie = await this.getOne({ movieId: id });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const updatedMovie = Object.assign(movie, updateMovieDto);

    return await this.moviesRepository.save(updatedMovie);
  }

  async remove(@Param() id: string) {
    const result = await this.moviesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Movie not found');
    }

    return result;
  }
}
