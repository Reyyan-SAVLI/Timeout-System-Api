import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Breaks } from 'src/entities/breaks.entity';
import { UserBreakController } from './controllers/user.break.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Breaks])],
  controllers: [UserController, UserBreakController],
  providers: [UserService]
})
export class UserModule {}
