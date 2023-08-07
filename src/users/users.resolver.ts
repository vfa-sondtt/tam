import { Resolver, Query, Mutation, Args, Int, Context, GraphQLExecutionContext } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { BadRequestException, HttpException, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JwtAuthGuard } from './user.guard';
import { GqlUser } from './user.decorator';
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
  ) { }

  @Mutation(() => User)
  async createUser(@Args('CreateUserInput') CreateUserInput: CreateUserInput) {
    try {


      const { email } = CreateUserInput
      // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
      const existingUser = await this.usersService.findOne({ email });

      if (existingUser) {
        throw new BadRequestException('User isExits');
      }

      CreateUserInput.password = await bcrypt.hash(CreateUserInput.password, 10);
      // Nếu email chưa tồn tại, tiến hành tạo người dùng mới

      const createUser = await this.usersService.create(CreateUserInput);
      return createUser


    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  @Mutation('login')
  async login(@Args('UserInput') UserInput: LoginDTO
    , @Context('res') res: Response) {
    try {
      const { email, password } = UserInput
      const existingUser = await this.usersService.findOne({ email });
      if (!existingUser) {
        throw new HttpException('user not exits', HttpStatus.BAD_REQUEST);
      }

      if (!await bcrypt.compare(password, existingUser.password)) {
        throw new BadRequestException('password encorrect');
      }


      const accessToken = await this.usersService.generateAccessToken(email, existingUser.id);
      const refreshToken = await this.usersService.generateRefreshToken(email, existingUser.id);

      return { accessToken, refreshToken }

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }



  // @Mutation(() => Boolean)
  // async requestPasswordReset(@Args('email') email: string): Promise<boolean> {
  //   const user = this.usersService.findOne((user) => user.email === email);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }

  //   await this.usersService.sendEmail((await user).email, (await user).name);

  //   return true;
  // }


  // @Mutation(String)
  // async forgotPassword(@Args('UserInput') UserInput: LoginDTO) {
  //   try {
  //     const { password } = UserInput
  //     const existingUser = await this.usersService.forgotPassword(UserInput.email, password);
  //     if (!existingUser) {
  //       throw new HttpException('user not exits', HttpStatus.BAD_REQUEST);
  //     }
  //   } catch (error) {

  //   }
  // }
}
