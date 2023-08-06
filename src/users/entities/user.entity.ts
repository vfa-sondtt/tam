import { ObjectType, Field, Int } from '@nestjs/graphql';
import { TodoList } from 'src/todo-list/entities/todo-list.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, OneToMany } from 'typeorm';


@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Unique("UQ_EMAIL", ["email"])
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: 0 })
  @Field()
  status: number;

  @CreateDateColumn()
  @Field()
  create_at: Date;

  @CreateDateColumn()
  @Field()
  update_at: Date;

  @OneToMany(() => TodoList, (list) => list.user)
  @Field((type) => [TodoList])
  lists: TodoList[]
}
