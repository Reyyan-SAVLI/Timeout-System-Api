import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AddUserDto } from 'src/dtos/addUser.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
    getUsers(){
        return this.userService.getUsers();
    }

    @Post()
    addUser(@Body() addUserDto : AddUserDto){
        return this.userService.addUser(addUserDto);
    }
}
