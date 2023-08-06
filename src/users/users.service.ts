import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login-user.input';
import nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  save(user: Promise<User>) {
    throw new Error('Method not implemented.');
  }

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserInput): Promise<User> {
    try {
      //  return this.userReponsitory.save(data);
      // createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create(createUserDto);
      return this.userRepository.save(user);

    } catch (error) {
      throw new Error('Error finding the user: ' + error.message);
    }
  }




  //find user
  async findOne(data: any): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy(data);

      return user || null;
    } catch (error) {
      throw new Error('Error finding the user: ' + error.message);
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decodedToken = this.jwtService.verify(token);

      return decodedToken;
    } catch (err) {
      // Token verification failed
      throw new Error('Invalid token');
    }
  }

  async validateUserById(id: any): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  generateAccessToken(email: string, id: number): Promise<string> {
    const secret: string = "accessToken"
    const payload = {
      email,
      id
    };

    let expiresIn = '1d';
    return this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
      secret,
    });
  }
  generateRefreshToken(email: string, id: number): Promise<string> {
    const secret: string = "refreshToken"
    const payload = {
      email,
      id
    };

    let expiresIn = '2h';
    return this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
      secret,
    });
  }




  async sendEmail(email: string, username: string): Promise<void> {

    const transporter = nodemailer.createTransport({
      /* Configure your email service here */
      service: 'gmail',
      auth: {
        user: 'phandinhphong258@gmail.com',
        pass: 'jtkaohjfamxtulbv',
      },
    });

    const mailOptions = {
      from: 'phandinhphong258@gmail.com',
      email,
      subject: `Message from ${email}: Veriy email`,
      text: 'thanks for register',
      html: `<div>
                    <h1>Email Confirmation</h1>
                    <h2>Hello ${username}! Thanks for register on our site </h2>
                    <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
                    <h4>Please verify your email to contine</h4>
                    <a href=http://localhost:5000/auth/resetpassword/${email}> Click here</a>
                </div>` ,
    };
    await transporter.sendMail(mailOptions);
  }



  async forgotPassword(email: string, password): Promise<any> {

    try {
      const existingUser = await this.findOne({ email });

      if (!existingUser) {
        throw new HttpException('user not exits', HttpStatus.BAD_REQUEST);
      }




    } catch (error) {

    }


  }




}
