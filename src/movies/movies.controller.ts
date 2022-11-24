import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
import { GetMovieDto } from './dtos/get-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(): Promise<Movie[]> {
    return await this.moviesService.getAll();
  }

  @Get('/view')
  @UseGuards(JwtAuthGuard)
  async getOne(@Body() getMovieDto: GetMovieDto): Promise<Movie> {
    return await this.moviesService.getOne(getMovieDto);
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
  async update(
    @Body() updateMovieDto: UpdateMovieDto,
    @Param() id: string,
  ): Promise<Movie> {
    return await this.moviesService.update(id, updateMovieDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param() id: string): Promise<any> {
    return await this.moviesService.remove(id);
  }
}
