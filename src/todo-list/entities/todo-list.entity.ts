import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Unique, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class TodoList {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  public id: number;

  @Column({ default: 0 })
  @Field()
  public Piority: number;

  @Column({ default: 0 })
  @Field()
  public isComplete: Boolean;

  @Column()
  @Field()
  public Title: string;

  @Column()
  @Field()
  public Content: string;

  @ManyToOne(() => User, (user) => user.lists)
  @Field((type) => User)
  public user: User
}
