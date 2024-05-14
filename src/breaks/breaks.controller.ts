import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BreaksService } from './breaks.service';
import { Breaks } from 'src/entities/breaks.entity';
import { AddBreaksDto } from 'src/dtos/addBreaks.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';

@Controller('breaks')
@ApiTags('Breaks')
@ApiSecurity('bearer')
@UseGuards(AuthGuard('jwt'))
export class BreaksController {
    constructor(private readonly breaksService : BreaksService){}

    @Get(':email')
    async getUserBreak(
        @Param('email') email: string): Promise<Breaks[]>{
            return await this.breaksService.getUserBreak(email);
    }

    @Post()
    async addUserBreak(
        @Request() req,
        @Body() addBreaksDto: AddBreaksDto){
            return this.breaksService.addUserBreak(req.user as User ,addBreaksDto);
        }
}
