import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { DoesUserNameExist } from 'src/core/guards/doesUsername.guard';
import { DoesUserNumberExist } from 'src/core/guards/doesPhoneNumber.guard';
import { UserAuthGuard } from './auth.guard';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { type } from 'os';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiTags('Users')
    @ApiOkResponse({
        description: 'Login Successful'
    })
    @ApiBadRequestResponse({
        description:'Login Unsuccessful'
    })
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @ApiTags('Users')
    @ApiOkResponse({
        description: 'Registration Successful',
        type: User
    })
    @ApiBadRequestResponse({
        description:'Registration Unsuccessful'
    })
    @UseGuards(DoesUserNameExist)
    @UseGuards(DoesUserNumberExist)
    @UseGuards(DoesUserExist)
    // @UseGuards(UserAuthGuard)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
    return await this.authService.create(user)
}
}


