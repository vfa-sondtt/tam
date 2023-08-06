import { Injectable } from '@nestjs/common';
import { CreateTodoListInput } from './dto/create-todo-list.input';
import { UpdateTodoListInput } from './dto/update-todo-list.input';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoListService {
  constructor(

    @InjectRepository(TodoList) private readonly toDoListRepository: Repository<TodoList>,
    private readonly userService: UsersService
  ) { }


  async create(createTodoListInput: CreateTodoListInput, id: any) {
    try {

      const users = await this.userService.findOne(id);


      // if user exists
      if (!users) {
        throw new Error('User not exits');
      }


      const newList = this.toDoListRepository.create({
        Title: createTodoListInput.Title,
        Content: createTodoListInput.Content,
        user: users
      });

      return await this.toDoListRepository.save(newList)
    } catch (error) {
      throw new Error('Error finding the user: ' + error.message);
    }
  }

  findAll() {
    try {
      return this.toDoListRepository.find() || null;

    } catch (error) {
      throw new Error('Error finding the user: ' + error.message);
    }
  }


  async update(id: number, updateTodoListInput: UpdateTodoListInput) {
    try {
      await this.toDoListRepository.update(id, updateTodoListInput)
      return this.findById(id);
    } catch (error) {
      throw new Error('Error finding the user: ' + error.message);

    }
  }

  findById(id: number) {
    try {
      return this.toDoListRepository.findOne({ relations: { user: true }, where: { id } }) || null;

    } catch (error) {
      throw new Error('Error finding the user: ' + error.message);
    }
  }

  async findByIdUser(id: number) {
    try {
      const a = await this.toDoListRepository.find({ relations: { user: true } }) || null;
      const infoUser = a.filter(user => user.user.id == id)
      return infoUser

      //return this.toDoListRepository.findOne({ relations: { user: true }, where: { id } }) || null;

    } catch (error) {
      throw new Error('Error finding the user: ' + error.message);
    }
  }

  async remove(id: number) {
    try {
      this.toDoListRepository.delete({ id }) || null;
      return id

    } catch (error) {
      throw new Error('Error finding the user: ' + error.message);
    }
  }
}
