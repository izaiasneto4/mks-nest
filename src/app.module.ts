import { DatabaseModule } from './database/database.module';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app/app.controller';
import { MoviesModule } from './movies/movies.module';
import { User } from './users/user.entity';
import { Movie } from './movies/movie.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';

import type { ClientOpts } from 'redis';

import * as redisStore from 'cache-manager-redis-store';

const postgresPort = parseInt(process.env.POSTGRES_PORT) || 5432;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: postgresPort,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Movie],
      synchronize: true,
    }),
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
