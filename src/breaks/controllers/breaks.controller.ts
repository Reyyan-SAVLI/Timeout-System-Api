import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Breaks } from 'src/entities/breaks.entity';
import { AddBreaksInDto, AddBreaksOutDto } from 'src/dtos/addBreaks.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { BreaksService } from '../services/breaks.service';

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


    @Post('in')
    async userBreakIn(
        @Request() req,
        @Body() addBreaksDto: AddBreaksInDto){
            
        return this.breaksService.userBreakIn(req.user as User ,addBreaksDto);
    }

    @Post('out')
    async userBreakOut(
        @Request() req,
        @Body() addBreaksDto: AddBreaksOutDto){
            
        return this.breaksService.userBreakOut(req.user as User, addBreaksDto);
    }
}
