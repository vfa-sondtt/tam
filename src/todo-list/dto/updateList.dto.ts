import { CreateTodoListInput } from './create-todo-list.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, Length, Matches, IsNumber } from 'class-validator';

@InputType()
export class update {
    @Field(() => Int)
    id: number;


    @Field()
    Title: string;


    @Field()
    Content: string;

    @Field()
    isComplete: boolean;

    @Field()
    Piority: number;
}
//