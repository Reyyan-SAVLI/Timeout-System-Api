import { Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Breaks } from 'src/entities/breaks.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { BreaksService } from '../services/breaks.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { BreakType } from 'src/enums/breaks.enum';

@Controller('breaks')
@ApiTags('Breaks')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('jwt'))
export class BreaksController {
    constructor(private readonly breaksService : BreaksService){}

    @Get(':email')
    @UseGuards(RolesGuard)
    @Roles('admin')
    async getUserBreakByEmail(
        @Param('email') email: string): Promise<Breaks[]>{
        return await this.breaksService.getUserBreakByEmail(email);
    }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin', 'member')
    async getUserBreak( @Request() req){
        const userId = req.user.id;
        return await this.breaksService.getUserBreak(userId);
    }


    @Post('in')
    @UseGuards(RolesGuard)
    @Roles('admin', 'member')
    @ApiQuery({name: 'type', enum: BreakType})
    async userBreakIn(
        @Request() req,
        @Query('type') type: BreakType){
            
        return this.breaksService.userBreakIn(req.user as User ,type);
    }

    @Post('out')
    @UseGuards(RolesGuard)
    @Roles('admin', 'member')
    async userBreakOut(
        @Request() req,){
            
        return this.breaksService.userBreakOut(req.user as User);
    }
}
