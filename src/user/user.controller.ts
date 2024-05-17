import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
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

    // @Get(':date')
    // async getBreaksByDate( @Param('date') date: string){
    //     return await this.userService.getBreaksByDate(date);
    // }

    @Get('time')
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin', 'member')
    async getBreakTime(@Request() req){
        return await this.userService.getBreakTime(req.user as User);
    }

    @Get('allbreaks')
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    async getAllBreakTime(){
        return await this.userService.getAllBreakTime();
    }

    
    @Post()
    addUser(@Body() addUserDto : AddUserDto){
        return this.userService.addUser(addUserDto);
    }
}
