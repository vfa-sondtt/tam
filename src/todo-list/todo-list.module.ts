import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListResolver } from './todo-list.resolver';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TodoList]), UsersModule],
  providers: [TodoListResolver, TodoListService]
})
export class TodoListModule { }
