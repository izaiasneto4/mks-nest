import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [JwtModule.register({}), UsersModule, PassportModule.register({})],
  providers: [AuthService, LocalStrategy, JwtService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
