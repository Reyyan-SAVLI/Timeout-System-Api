import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from 'src/dtos/addUser.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
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

    findEmail(email: string): Promise<User>{
        return this.userRepository.findOneBy({email});
    }
}
