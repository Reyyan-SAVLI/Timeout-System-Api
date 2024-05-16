import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddBreaksInDto, AddBreaksOutDto } from 'src/dtos/addBreaks.dto';
import { Breaks } from 'src/entities/breaks.entity';
import { User } from 'src/entities/user.entity';
import { Work } from 'src/entities/work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BreaksService {
 
    constructor(
        @InjectRepository(Breaks)
        private readonly breaksRepository: Repository<Breaks>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Work)
        private readonly workRepository: Repository<Work>)
    {}

    async getUserBreakByEmail(email: string): Promise<Breaks[]>{
        const user = await this.userRepository.findOne({where: {email}, relations: ['breaks']});
        if (!user) {
            throw new Error('User not Found');
        }
        return user.breaks;
    }

    async getUserBreak(userId: number): Promise<Breaks[]>{
        return await this.breaksRepository.find({ where: { user: { id: userId } } });
    }

    
    async userBreakIn(user: User ,addBreaksDto: AddBreaksInDto): Promise<Breaks>{
        const work = await this.workRepository.findOne({ where: {user}, relations: ['breaks']});
        const newBreak = new Breaks();
        newBreak.date = addBreaksDto.date;
        newBreak.breakEntry = addBreaksDto.breakEntry;
        newBreak.user = user;
        newBreak.work = work;

        return await this.breaksRepository.save(newBreak);
    }

    async userBreakOut(user: User, addBreaksDto: AddBreaksOutDto): Promise<Breaks>{
        const { breakExit } = addBreaksDto;
        const today = new Date();
        today.setHours(0,0,0,0);
        const entry = await this.breaksRepository.findOne({where: {user, date: today}, order: {breakEntry:'DESC' }});
        
        if (entry) {
            entry.breakExit = breakExit;
            return await this.breaksRepository.save(entry);
        } else {
            throw new Error('Mola girişi yok');
        }
    }
}
