import { Module } from '@nestjs/common';
import { BreaksController } from './breaks.controller';
import { BreaksService } from './breaks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breaks } from 'src/entities/breaks.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Breaks, User])],
  controllers: [BreaksController],
  providers: [BreaksService]
})
export class BreaksModule {}
