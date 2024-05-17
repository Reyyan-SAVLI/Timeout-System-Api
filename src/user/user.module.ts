import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Breaks } from 'src/entities/breaks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Breaks])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
