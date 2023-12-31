import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { TodoList } from './todo-list/entities/todo-list.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path'
import { ConfigModule } from '@nestjs/config';

@Module({

  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: '',
      database: process.env.DB_DATABASE,
      entities: [User, TodoList],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, TodoList]),
    PassportModule.register({
      defaultStrategy: 'jwt'

    }),
    JwtModule,

    GraphQLModule.forRoot({
      driver: ApolloDriver,
      typePaths: ['src/common/*.graphql', 'src/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      // autoSchemaFile: 'src/schema.ggl',
      sortSchema: true,
      cors: {
        origin: '',
        credentials: true,
      },
      context: ({ req, res }) => ({ req, res, header: req.headers }),
    })
    , UsersModule, TodoListModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [PassportModule]
})
export class AppModule { }
