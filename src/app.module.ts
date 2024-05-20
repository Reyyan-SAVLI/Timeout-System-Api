import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BreaksModule } from './breaks/breaks.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from './config/db.config';

@Module({
  imports: [ 
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    AuthModule,
    BreaksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
