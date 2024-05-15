import { Module } from '@nestjs/common';
import { BreaksController } from './breaks.controller';
import { BreaksService } from './breaks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breaks } from 'src/entities/breaks.entity';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Work } from 'src/entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breaks, User, Work]), AuthModule],
  controllers: [BreaksController],
  providers: [BreaksService, AuthService, UserService, JwtService]
})
export class BreaksModule {}
