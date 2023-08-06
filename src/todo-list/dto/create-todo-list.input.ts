import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, Length, Matches, IsNumber } from 'class-validator';

@InputType()
export class CreateTodoListInput {

  @IsNotEmpty({ message: 'Title is required' })
  @Field()
  Title: string;

  @IsNotEmpty({ message: 'Content is required' })
  @Field()
  Content: string;


}
