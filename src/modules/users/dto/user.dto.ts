import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UserDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@.+\.com$/, {
        message: 'Invalid email format. Must end with .com',
      })
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    readonly phonenumber: string;

    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'Gender must be either male or female',
    })
    readonly gender: string;
}