import { Module } from '@nestjs/common';
import { BreaksController } from './controllers/breaks.controller';
import { BreaksService } from './services/breaks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breaks } from 'src/entities/breaks.entity';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Work } from 'src/entities/work.entity';
import { WorkController } from './controllers/work.controller';
import { WorkService } from './services/work.service';

@Module({
  imports: [TypeOrmModule.forFeature([Breaks, User, Work]), AuthModule],
  controllers: [BreaksController, WorkController],
  providers: [BreaksService, AuthService, UserService, JwtService, WorkService]
})
export class BreaksModule {}
