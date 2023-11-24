import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatedUserDto } from './dtos/createdUser.dto';
import { SignInUserDto } from './dtos/signInUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    signUp(@Body() data: CreatedUserDto) {
        return this.authService.signUp(data);
    }

    @Post('login')
    sigIn(@Body() data: SignInUserDto) {
        return this.authService.signIn(data.email, data.senha);
    }
}
