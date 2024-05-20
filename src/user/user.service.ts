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

    async getBreaksByDate(date: Date){

        const breaks = await this.breaksRepository.find({where:{date: date}, relations: ['user']});
        return breaks;
    }

    async getAllBreakTime(){
      const breaks = await this.breaksRepository.createQueryBuilder('breaks')
      .leftJoinAndSelect('breaks.user', 'user')
      .select([
        'user.name',
        'user.surname',
        'breaks.date',
        'SUM(TIME_TO_SEC(TIMEDIFF(breaks.breakExit, breaks.breakEntry)) / 60) AS totalBreakTime'
      ])
      .groupBy('user.name, user.surname, breaks.date')
      .orderBy('user.name, breaks.date')
      .getRawMany();

    return breaks.map(b => ({
      user: `${b.user_name} ${b.user_surname}`,
      date: new Date(b.breaks_date).toISOString().split('T')[0], // Tarih formatını düzelt
      totalBreakTime: parseFloat(b.totalBreakTime)
    }));

    }

    async getBreakTime(userId: number){

      const breaks = await this.breaksRepository.createQueryBuilder('breaks')
      .select('breaks.date', 'date')
      .addSelect('SUM(TIME_TO_SEC(TIMEDIFF(breaks.breakExit, breaks.breakEntry)) / 60)', 'totalBreakTime')
      .where('breaks.userId = :userId', { userId })
      .groupBy('breaks.date')
      .getRawMany();

    
      return breaks.map(b => ({
        date: new Date(b.date).toISOString().split('T')[0],
        totalBreakTime: parseFloat(b.totalBreakTime)
      }));
    }
}
