
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    email: string;
    name: string;
    password: string;
}

export class DtoCreate {
    Content?: Nullable<string>;
    Title?: Nullable<string>;
}

export class UpdateTodoListInput {
    Content?: Nullable<string>;
    Piority?: Nullable<number>;
    Title?: Nullable<string>;
    id: number;
    isComplete?: Nullable<boolean>;
}

export class UserInput {
    email: string;
    password: string;
}

export class AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export abstract class IMutation {
    abstract createList(DtoCreate: DtoCreate): Nullable<TodoList> | Promise<Nullable<TodoList>>;

    abstract createUser(CreateUserInput: CreateUserInput): Nullable<RegisterResponse> | Promise<Nullable<RegisterResponse>>;

    abstract login(UserInput: UserInput): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;

    abstract removeTodoList(id?: Nullable<number>): Nullable<TodoList> | Promise<Nullable<TodoList>>;

    abstract updateTodoList(updateTodoListInput: UpdateTodoListInput): Nullable<TodoList> | Promise<Nullable<TodoList>>;
}

export abstract class IQuery {
    abstract findById(id?: Nullable<number>): Nullable<TodoList> | Promise<Nullable<TodoList>>;

    abstract findByIdUser(id?: Nullable<number>): Nullable<Nullable<TodoList>[]> | Promise<Nullable<Nullable<TodoList>[]>>;

    abstract findByTittle(Title?: Nullable<string>): Nullable<Nullable<TodoList>[]> | Promise<Nullable<Nullable<TodoList>[]>>;
}

export class RegisterResponse {
    email: string;
    name: string;
    password: string;
}

export class TodoList {
    Content?: Nullable<string>;
    Piority?: Nullable<number>;
    Title?: Nullable<string>;
    id?: Nullable<number>;
    isComplete?: Nullable<boolean>;
    user?: Nullable<User>;
}

export class User {
    email?: Nullable<string>;
    id?: Nullable<number>;
    lists?: Nullable<Nullable<TodoList>[]>;
    password?: Nullable<string>;
    status?: Nullable<number>;
}

type Nullable<T> = T | null;
