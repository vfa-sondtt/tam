import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, Length, Matches, IsNumber } from 'class-validator';

@InputType()
export class CreateTodoListInput {

    @Field()
  Title: string;

  @IsNotEmpty({ message: 'Content is required' })
  @Field()
  Content: string;

  @Field()
  isComplete: boolean;

  @Field()
  Piority: number;

}
