import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    JwtModule],
  providers: [UsersResolver, UsersService, JwtStrategy, JwtRefreshStrategy],
  exports: [UsersService]
})
export class UsersModule { }
