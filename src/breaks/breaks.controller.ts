import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BreaksService } from './breaks.service';
import { Breaks } from 'src/entities/breaks.entity';
import { AddBreaksDto } from 'src/dtos/addBreaks.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { AddWorkDto } from 'src/dtos/addWork.dto';

@Controller('breaks')
@ApiTags('Breaks')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('jwt'))
export class BreaksController {
    constructor(private readonly breaksService : BreaksService){}

    @Get(':email')
    async getUserBreakByEmail(
        @Param('email') email: string): Promise<Breaks[]>{
        return await this.breaksService.getUserBreakByEmail(email);
    }

    @Get()
    async getUserBreak( @Request() req){
        const userId = req.user.id;
        return await this.breaksService.getUserBreak(userId);
    }

    @Post('work')
    async addUserWork(
        @Request() req,
        @Body() addWorkDto: AddWorkDto){
            
        return this.breaksService.addUserWork(req.user as User, addWorkDto);
    }

    @Post('break')
    async addUserBreak(
        @Request() req,
        @Body() addBreaksDto: AddBreaksDto){
            
        return this.breaksService.addUserBreak(req.user as User ,addBreaksDto);
    }
}
