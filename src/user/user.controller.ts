import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AddUserDto } from 'src/dtos/addUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(RolesGuard)
    @Roles('admin')
    getUsers(){
        return this.userService.getUsers();
    }

    
    @Post()
    addUser(@Body() addUserDto : AddUserDto){
        return this.userService.addUser(addUserDto);
    }
}
