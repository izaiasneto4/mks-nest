import { Body, Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getOne(@Param() id: string) {
    return await this.moviesRepository.findOneBy({ id });
  }

  async create(@Body() createMovieDto: CreateMovieDto) {}

  async update(@Body() updateeMovieDto: UpdateMovieDto) {}

  async remove(@Param() id: string) {}
}
