import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Req() req){
       return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async data(){
       return 'success';
    }
    // @Post()
    // async login(
    //     @Body() loginUserDto : LoginUserDto
    // ){
    //     return await this.authService.login(loginUserDto);
    // }

}
