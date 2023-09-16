import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

export class UserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe'
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: 'The username of the user',
        example: 'John Dee'
    })
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @ApiProperty({
        description: 'The valid email of the user',
        example: 'JohnDee@gmail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[a-zA-Z0-9._%+-]+@.+\.com$/, {
        message: 'Invalid email format. Must end with .com',
      })
    readonly email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'carson.'
    })
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({
        description: 'The phone number of the user',
        example: '0546738290'
    })
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    readonly phonenumber: string;

    @ApiProperty({
        description: 'The gender of the user',
        example: 'female'
    })
    @IsNotEmpty()
    @IsEnum(Gender, {
        message: 'Gender must be either male or female',
    })
    readonly gender: string;
}