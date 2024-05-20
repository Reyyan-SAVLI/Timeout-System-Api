import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Request() req, @Body() loginUserDto: LoginUserDto): Promise<any>{
        return await this.authService.generateToken(req.user);
    }

}
