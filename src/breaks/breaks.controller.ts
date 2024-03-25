import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BreaksService } from './breaks.service';
import { Breaks } from 'src/entities/breaks.entity';
import { AddBreaksDto } from 'src/dtos/addBreaks.dto';

@Controller('breaks')
@ApiTags('Breaks')
export class BreaksController {
    constructor(private readonly breaksService : BreaksService){}

    @Get(':email')
    async getUserBreak(
        @Param('email') email: string): Promise<Breaks[]>{
            return await this.breaksService.getUserBreak(email);
    }

    @Post(':email')
    async addUserBreak(
        @Param('email') email: string,
        @Body() addBreaksDto: AddBreaksDto){
            return this.breaksService.addUserBreak(email, addBreaksDto);
        }
}
