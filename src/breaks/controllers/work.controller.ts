import { Body, Controller, Post, UseGuards, Request, Get, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { WorkService } from "../services/work.service";
import { AddWorkInDto, AddWorkOutDto } from "src/dtos/addWork.dto";
import { User } from "src/entities/user.entity";
import { Work } from "src/entities/work.entity";

@Controller('work')
@ApiTags('Work')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('jwt'))
export class WorkController {
    constructor(private readonly workService : WorkService){}

    @Get(':email')
    async getUserBreakByEmail(
        @Param('email') email: string): Promise<Work[]>{
        return await this.workService.getUserWorkByEmail(email);
    }

    @Get()
    async getUserBreak( @Request() req){
        const userId = req.user.id;
        return await this.workService.getUserWork(userId);
    }
    
    @Post('in')
    async userWorkIn(
        @Request() req,
        @Body() addWorkDto: AddWorkInDto){
            
        return this.workService.userWorkIn(req.user as User, addWorkDto);
    }

    @Post('out')
    async userWorkOut(
        @Request() req,
        @Body() addWorkDto: AddWorkOutDto){
            
        return this.workService.userWorkOut(req.user as User, addWorkDto);
    }

}