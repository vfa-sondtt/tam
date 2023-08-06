import { CreateTodoListInput } from './create-todo-list.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, Length, Matches, IsNumber } from 'class-validator';
import { update } from './updateList.dto';

@InputType()
export class UpdateTodoListInput extends PartialType(update) {
  @Field(() => Int)
  id: number;


}
//