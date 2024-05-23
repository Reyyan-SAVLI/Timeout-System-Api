import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { Work } from "src/entities/work.entity";
import { Repository } from "typeorm";

@Injectable()
export class WorkService {
 
    constructor(
        @InjectRepository(Work)
        private readonly workRepository: Repository<Work>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    )
    {}

    async getUserWorkByEmail(email: string): Promise<Work[]>{
        const user = await this.userRepository.findOne({where: {email}, relations: ['work']});
        if (!user) {
            throw new Error('User not Found');
        }
        return user.work;
    }

    async getUserWork(userId: number): Promise<Work[]>{
        return await this.workRepository.find({ where: { user: { id: userId } } });
    }


    async userWorkIn(user: User){
        const today = new Date();
        const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
        const formattedDate = todayUTC.toISOString().split('T')[0];

        const hours = String(today.getUTCHours()).padStart(2, '0');
        const minutes = String(today.getUTCMinutes()).padStart(2, '0');
        const seconds = String(today.getUTCSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}:${seconds}`;

        const works = await this.workRepository.findOne({where: {user}, order: {workEntry:'DESC' }});
        const date = works.date.toString();
        
        if (works.workExit == null && date == formattedDate) {
            return 'İş çıkışınız olmadığı için yeni giriş yapamazsınız.';
        }else {
            const workIn = new Work();
            workIn.date = new Date(formattedDate);
            workIn.workEntry = new Date(`1970-01-01T${formattedTime}Z`);
            workIn.user = user;
    
           return await this.workRepository.save(workIn);
        }
        
    }
    
    async userWorkOut(user: User): Promise<Work>{
            const today = new Date();
            const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
            
            const hours = String(today.getUTCHours()).padStart(2, '0');
            const minutes = String(today.getUTCMinutes()).padStart(2, '0');
            const seconds = String(today.getUTCSeconds()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}:${seconds}`;

            const entry = await this.workRepository.findOne({where: {user, date: todayUTC}, order: {workEntry:'DESC' }});
            if (entry.workExit == null) {
                entry.workExit = new Date(`1970-01-01T${formattedTime}Z`);
                return await this.workRepository.save(entry);
            } else {
                throw new Error('İş girişi yok');
            }
    }
    


}