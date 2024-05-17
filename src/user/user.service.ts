import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from 'src/dtos/addUser.dto';
import { Breaks } from 'src/entities/breaks.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Breaks)
        private readonly breaksRepository: Repository<Breaks>
    ){}

    async getUsers(){
        return await this.userRepository.find();
    }

    async addUser(addUserDto: AddUserDto){
        const newUser = await this.userRepository.create();
        newUser.name = addUserDto.name;
        newUser.surname = addUserDto.surname;
        newUser.email = addUserDto.email;
        newUser.password = addUserDto.password;
        newUser.department = addUserDto.department;

        await this.userRepository.save(newUser);
    }

    async findEmail(email: string): Promise<User>{
        return await this.userRepository.findOne({where: {email}});
    }

    async getUserById(id: number): Promise<User | undefined>{
        return await this.userRepository.findOne({ where: {id}});
    }

    // async getBreaksByDate(date: string){

    //     const breaks = await this.breaksRepository.find({where:{date: date}, relations: ['user']});
    //     return breaks;
    // }

    async getAllBreakTime(){
        const breaks = await this.breaksRepository.find({relations: ['user']});

        const userBreakTimes = new Map<string, number>();

      breaks.forEach(b => {
        const breakEntryTimeStr = b.breakEntry as unknown as string;
        const breakExitTimeStr = b.breakExit as unknown as string;

        const breakEntryTime = new Date(`1970-01-01T${breakEntryTimeStr}Z`);
        const breakExitTime = new Date(`1970-01-01T${breakExitTimeStr}Z`);

      if (isNaN(breakEntryTime.getTime()) || isNaN(breakExitTime.getTime())) {
        throw new Error('Invalid Date encountered');
      }

        const breakDuration = (breakExitTime.getTime() - breakEntryTime.getTime()) / (60 * 1000);

        const userName = `${b.user.name} ${b.user.surname}`;
      if (userBreakTimes.has(userName)) {
        userBreakTimes.set(userName, userBreakTimes.get(userName) + breakDuration);
      } else {
        userBreakTimes.set(userName, breakDuration);
      }});

        const result = [];
       for (const [user, totalBreakTime] of userBreakTimes) {
        result.push({ user, totalBreakTime });
       }

     return result;

    }

    async getBreakTime(user: User){
       const breaks = await this.breaksRepository.find({where: {user}});

       let totalBreakTime = 0;

       breaks.forEach(b => {
        // breakEntry ve breakExit değerlerini string olarak al
        const breakEntryTimeStr = b.breakEntry as unknown as string;
        const breakExitTimeStr = b.breakExit as unknown as string;
  
        // breakEntry ve breakExit değerlerini Date nesnesine dönüştür
        const breakEntryTime = new Date(`1970-01-01T${breakEntryTimeStr}Z`);
        const breakExitTime = new Date(`1970-01-01T${breakExitTimeStr}Z`);
  
  
        if (isNaN(breakEntryTime.getTime()) || isNaN(breakExitTime.getTime())) {
          throw new Error('Invalid Date encountered');
        }
  
        const breakDuration = (breakExitTime.getTime() - breakEntryTime.getTime()) / (60 * 1000);
        totalBreakTime += breakDuration;
      });
  
      return `Total Break Time: ${totalBreakTime} minutes`;
    }
}
