import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Breaks } from './entities/breaks.entity';
import { AuthModule } from './auth/auth.module';
import { BreaksModule } from './breaks/breaks.module';
import { ConfigModule } from '@nestjs/config';
import { Work } from './entities/work.entity';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'timeout_system',
    entities: [User, Breaks, Work],
    synchronize: true}),
    UserModule,
    AuthModule,
    BreaksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
