import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoListService } from './todo-list.service';
import { TodoList } from './entities/todo-list.entity';
import { CreateTodoListInput } from './dto/create-todo-list.input';
import { UpdateTodoListInput } from './dto/update-todo-list.input';
import { UseGuards } from '@nestjs/common';
import { GqlUser } from 'src/users/user.decorator';
import { log } from 'console';
import { JwtAuthGuard } from 'src/users/user.guard';

@Resolver(() => TodoList)
export class TodoListResolver {
  constructor(private readonly todoListService: TodoListService) { }



  @UseGuards(JwtAuthGuard)
  @Mutation(() => TodoList)
  async createList(@GqlUser() user: any, @Args('DtoCreate') DtoCreate: CreateTodoListInput) {
    return this.todoListService.create(DtoCreate, user.id);
  }



  @Query(() => TodoList)
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.todoListService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => TodoList)
  findByIdUser(@GqlUser() user: any) {
    return this.todoListService.findByIdUser(user.id);
  }

  @Query(() => TodoList)
  findByTittle(@Args('Title', { type: () => String }) Title: string) {
    return this.todoListService.findByTittle(Title)
  }


  @Mutation(() => TodoList)
  updateTodoList(@Args('updateTodoListInput') updateTodoListInput: UpdateTodoListInput) {
    return this.todoListService.update(updateTodoListInput.id, updateTodoListInput);
  }

  @Mutation(() => Number)
  removeTodoList(@Args('id', { type: () => Int }) id: number) {
    return this.todoListService.remove(id);
  }
}
