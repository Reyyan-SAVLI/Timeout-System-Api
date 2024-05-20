import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { AddUserDto } from 'src/dtos/addUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get()
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    getUsers(){
        return this.userService.getUsers();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get(':date')
    async getBreaksByDate( @Param('date') date: Date){
        return await this.userService.getBreaksByDate(date);
    }

    

    
    @Post()
    addUser(@Body() addUserDto : AddUserDto){
        return this.userService.addUser(addUserDto);
    }
}
