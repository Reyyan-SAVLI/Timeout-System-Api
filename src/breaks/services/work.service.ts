import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddWorkInDto, AddWorkOutDto } from "src/dtos/addWork.dto";
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


    async userWorkIn(user: User, addWorkDto: AddWorkInDto): Promise<Work>{
            const workIn = new Work();
            workIn.date = addWorkDto.date;
            workIn.workEntry = addWorkDto.workEntry;
            workIn.user = user;
    
           return await this.workRepository.save(workIn);
    }
    
    async userWorkOut(user: User, addWorkDto: AddWorkOutDto): Promise<Work>{
            const { workExit } = addWorkDto;
            const today = new Date();
            today.setHours(0,0,0,0);
            const entry = await this.workRepository.findOne({where: {user, date: today}});
            if (entry) {
                entry.workExit = workExit;
                return await this.workRepository.save(entry);
            } else {
                throw new Error('İş girişi yok');
            }
    }
    


}