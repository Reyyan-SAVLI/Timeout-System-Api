import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "../user.service";
import { RolesGuard } from "src/auth/roles.guard";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/auth/roles.decorator";
import { User } from "src/entities/user.entity";

@ApiTags('UserBreak')
@Controller('userbreak')
export class UserBreakController {
    constructor(private readonly userService : UserService){}

    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin', 'member')
    @Get('time')
    async getBreakTime(@Request() req){
        const userId = req.user.id;
        return await this.userService.getBreakTime(userId);
    }

    
    @ApiBearerAuth()
    @UseGuards(RolesGuard)
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @Get('allbreaks')
    async getAllBreakTime(){
        return await this.userService.getAllBreakTime();
    }
}