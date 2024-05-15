import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { AddBreaksDto } from 'src/dtos/addBreaks.dto';
import { AddWorkDto } from 'src/dtos/addWork.dto';
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
        private readonly workRepository: Repository<Work>,
        private authService: AuthService){}

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

    async addUserWork(user: User, addWorkDto: AddWorkDto): Promise<Work>{
        const newWork = new Work();
        newWork.workEntry = addWorkDto.workEntry;
        newWork.workExit = addWorkDto.workExit;
        newWork.user = user;

        return await this.workRepository.save(newWork);
    }

    async addUserBreak(user: User ,addBreaksDto: AddBreaksDto): Promise<Breaks>{
        
        const newBreak = new Breaks();
        newBreak.breakEntry = addBreaksDto.breakEntry;
        newBreak.breakExit = addBreaksDto.breakExit;
        newBreak.user = user;

        return await this.breaksRepository.save(newBreak);
    }
}
