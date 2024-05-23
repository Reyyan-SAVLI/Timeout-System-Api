import { Controller, Post, UseGuards, Request, Get, Param } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { WorkService } from "../services/work.service";
import { User } from "src/entities/user.entity";
import { Work } from "src/entities/work.entity";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/auth/roles.decorator";

@Controller('work')
@ApiTags('Work')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('jwt'))
export class WorkController {
    constructor(private readonly workService : WorkService){}

    @Get(':email')
    @UseGuards(RolesGuard)
    @Roles('admin')
    async getUserBreakByEmail(
        @Param('email') email: string): Promise<Work[]>{
        return await this.workService.getUserWorkByEmail(email);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin', 'member')
    async getUserBreak( @Request() req){
        const userId = req.user.id;
        return await this.workService.getUserWork(userId);
    }
    
    @Post('in')
    @UseGuards(RolesGuard)
    @Roles('admin', 'member')
    async userWorkIn(
        @Request() req){
            
        return this.workService.userWorkIn(req.user as User);
    }

    @Post('out')
    @UseGuards(RolesGuard)
    @Roles('admin', 'member')
    async userWorkOut(
        @Request() req){
            
        return this.workService.userWorkOut(req.user as User);
    }

}