import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MoviesService } from './movies.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<Movie[]> {
    return await this.moviesService.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOne(@Param() id: string): Promise<Movie> {
    return await this.moviesService.getOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<Partial<Movie>> {
    return await this.moviesService.create(createMovieDto);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return await this.moviesService.update(updateMovieDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param() id: string): Promise<any> {
    return await this.moviesService.remove(id);
  }
}
