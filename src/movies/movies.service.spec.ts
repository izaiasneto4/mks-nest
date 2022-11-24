import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { movieRepositoryMockFactory } from '../users/test';
import { Movie } from './movie.entity';
import { MovieGenreEnum } from './movie.types';

describe('MoviesService', () => {
  let service: MoviesService;

  const findOneBySpy = jest.fn();
  const saveSpy = jest.fn();
  const deleteSpy = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            ...movieRepositoryMockFactory(),
            findOneBy: findOneBySpy,
            save: saveSpy,
            delete: deleteSpy,
          },
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should get all movies', async () => {
      const expectedMovies = [];

      const movies = await service.getAll();

      expect(movies).toEqual(expectedMovies);
    });
  });

  describe('getOne', () => {
    it('should get single movie', async () => {
      const movieData: Movie = {
        id: '1',
        title: 'Test Movie',
        director: 'Test Movie',
        genre: [MovieGenreEnum.ACTION],
        cast: ['Test Movie'],
        releaseDate: new Date(),
        updatedAt: new Date(),
      };

      findOneBySpy.mockReturnValueOnce(movieData);

      const movie = await service.getOne({ movieId: movieData.id });

      expect(movie.id).toEqual(movieData.id);
      expect(movie.title).toEqual(movieData.title);
      expect(movie.director).toEqual(movieData.director);
      expect(movie.genre).toEqual(movieData.genre);
      expect(movie.cast).toEqual(movieData.cast);
      expect(movie.releaseDate).toBeDefined();
      expect(movie.updatedAt).toBeDefined();
    });

    it('should throw if movie is not found', async () => {
      jest
        .spyOn(movieRepositoryMockFactory(), 'findOneBy')
        .mockReturnValueOnce(null);

      await expect(service.getOne({ movieId: 'test' })).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should create movie just fine', async () => {
      const movieData: Movie = {
        id: '1',
        title: 'Test Movie',
        director: 'Test Movie',
        genre: [MovieGenreEnum.ACTION],
        cast: ['Test Movie'],
        releaseDate: new Date(),
        updatedAt: new Date(),
      };

      saveSpy.mockReturnValueOnce(movieData);

      const movie = await service.create({
        ...movieData,
      });

      expect(movie.id).toEqual(movieData.id);
      expect(movie.title).toEqual(movieData.title);
      expect(movie.cast).toEqual(movieData.cast);
      expect(movie.director).toEqual(movieData.director);
    });
  });

  describe('update', () => {
    it('should update movie just fine', async () => {
      const newMovieData: Movie = {
        id: '1',
        title: 'Test Movie 2',
        director: 'Test Movie 2 Director',
        genre: [MovieGenreEnum.ADVENTURE],
        cast: ['Test Movie 2 Cast'],
        releaseDate: new Date(),
        updatedAt: new Date(),
      };

      saveSpy.mockReturnValueOnce(newMovieData);
      findOneBySpy.mockReturnValueOnce(newMovieData);

      const movie = await service.update(newMovieData.id, {
        ...newMovieData,
      });

      expect(movie.id).toEqual(newMovieData.id);
      expect(movie.title).toEqual(newMovieData.title);
      expect(movie.cast).toEqual(newMovieData.cast);
      expect(movie.director).toEqual(newMovieData.director);
    });

    it('should throw if movie was not found', async () => {
      const newMovieData: Movie = {
        id: '1',
        title: 'Test Movie 2',
        director: 'Test Movie 2 Director',
        genre: [MovieGenreEnum.ADVENTURE],
        cast: ['Test Movie 2 Cast'],
        releaseDate: new Date(),
        updatedAt: new Date(),
      };

      saveSpy.mockReturnValueOnce(null);

      await expect(
        service.update(newMovieData.id, {
          ...newMovieData,
        }),
      ).rejects.toThrow(new NotFoundException('Movie not found'));
    });
  });

  describe('remove', () => {
    it('should remove movie just fine', async () => {
      const newMovieData: Movie = {
        id: '1',
        title: 'Test Movie 2',
        director: 'Test Movie 2 Director',
        genre: [MovieGenreEnum.ADVENTURE],
        cast: ['Test Movie 2 Cast'],
        releaseDate: new Date(),
        updatedAt: new Date(),
      };

      deleteSpy.mockReturnValueOnce({
        affected: 1,
        data: newMovieData,
      });

      const result = await service.remove(newMovieData.id);

      expect(result.affected).toBe(1);
    });
  });
});
