import { Controller,Post, Body } from '@nestjs/common';
import { AuthSignupDto } from './auth.signup.dto';
import { AuthLoginDto } from './auth.login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto:AuthSignupDto) {        
        return this.authService.signup(dto);
    }

    @Post('login')
    login(@Body() dto:AuthLoginDto) {
        return this.authService.login(dto);
    }
}
