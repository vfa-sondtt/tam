import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, Length, Matches } from 'class-validator';


@InputType()
export class LoginDTO {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    @Field()
    email: string;

    // @IsNotEmpty({ message: 'Password is required' })
    // @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    // password: string;

    @IsNotEmpty({ message: 'Password is required' })
    @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message:
            'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
    })
    @Field()
    password: string;
}