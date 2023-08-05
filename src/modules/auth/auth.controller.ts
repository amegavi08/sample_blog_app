import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from 'src/core/guards/doesUserExist.guard';
import { DoesUserNameExist } from 'src/core/guards/doesUsername.guard';
import { DoesUserNumberExist } from 'src/core/guards/doesPhoneNumber.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(DoesUserNameExist)
    @UseGuards(DoesUserNumberExist)
    @UseGuards(DoesUserExist)
    @Post('signup')
    async signUp(@Body() user: UserDto) {
    return await this.authService.create(user)
}
}


