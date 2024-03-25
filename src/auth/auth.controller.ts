import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dtos/loginUser.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post()
    async login(
        @Body() loginUserDto : LoginUserDto
    ){
        return await this.authService.login(loginUserDto);
    }

}
