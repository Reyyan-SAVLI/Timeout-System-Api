import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Breaks } from 'src/entities/breaks.entity';
import { User } from 'src/entities/user.entity';
import { Work } from 'src/entities/work.entity';
import { BreakType } from 'src/enums/breaks.enum';
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

    
    async userBreakIn(user: User ,type: BreakType){
        const today = new Date();
        const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        const formattedDate = todayUTC.toISOString().split('T')[0];
       
        const hours = String(today.getUTCHours()).padStart(2, '0');
        const minutes = String(today.getUTCMinutes()).padStart(2, '0');
        const seconds = String(today.getUTCSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        const breaks = await this.breaksRepository.findOne({where: {user, date: todayUTC}, order: {breakEntry:'DESC' }});
        const works = await this.workRepository.findOne({where: {user, date: todayUTC}, order: {workEntry:'DESC' }});
        const date = works?.date?.toString() ?? 'Work date is null';
        
        console.log(breaks.breakExit)

        if (works != null) {
           if ( works.workExit == null) {
            if (breaks.breakExit == null && date == formattedDate) {
                return 'Mola çıkışı yapmadığınız için yeni mola girişi yapamazsınız.'; 
            }else{
                const newBreak = new Breaks();
                newBreak.date = new Date(formattedDate);
                newBreak.breakEntry = new Date(`1970-01-01T${formattedTime}Z`);
                newBreak.breakType = type;
                newBreak.user = user;

                return await this.breaksRepository.save(newBreak);
            }
        }else{
            return 'İş girişiniz olmadığı için mola girişi yapamazsınız.';
        } 
        }else{
            return 'İş kaydınız yoktur.'
        }
    }

    async userBreakOut(user: User ): Promise<Breaks>{
        const today = new Date();
        const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        
        const hours = String(today.getUTCHours()).padStart(2, '0');
        const minutes = String(today.getUTCMinutes()).padStart(2, '0');
        const seconds = String(today.getUTCSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;
        
        const entry = await this.breaksRepository.findOne({where: {user, date: todayUTC}, order: {breakEntry:'DESC' }});
        

        if (entry) {
            entry.breakExit = new Date(`1970-01-01T${formattedTime}Z`);
            return await this.breaksRepository.save(entry);
        } else {
            throw new Error('Mola girişi yok');
        }
    }
}
