import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBreaksDto } from 'src/dtos/addBreaks.dto';
import { Breaks } from 'src/entities/breaks.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreaksService {
 
    constructor(
        @InjectRepository(Breaks)
        private readonly breaksRepository: Repository<Breaks>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
        ){}

    async getUserBreak(email: string): Promise<Breaks[]>{
        const user = await this.userRepository.findOne({where: {email}, relations: ['breaks']});
        if (!user) {
            throw new Error('User not Found');
        }
        return user.breaks;
    }

    async addUserBreak(email: string, addBreaksDto: AddBreaksDto): Promise<Breaks>{
        const user = await this.userRepository.findOne({where: {email}});
        if (!user) {
            throw new NotFoundException('User not Found');
        }
        const newBreak = new Breaks();
        newBreak.workEntry = addBreaksDto.workEntry;
        newBreak.workExit = addBreaksDto.workExit;
        newBreak.breakEntry = addBreaksDto.breakEntry;
        newBreak.breakExit = addBreaksDto.breakExit;
        newBreak.user = user;

        return await this.breaksRepository.save(newBreak);
    }
}
