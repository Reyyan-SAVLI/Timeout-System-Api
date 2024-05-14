import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

      constructor(private userService: UserService,
        private jwtService: JwtService
      ){}

      async validateUserCreds(email: string, password: string): Promise<any>{
        const user = await this.userService.findEmail(email);

        if(!user) throw new BadRequestException();

        if(! await bcrypt.compare(password, user.password))
          throw new UnauthorizedException();

        return user;
      }

      async generateToken(user: any){
        const payload = {name: user.name, sub: user.id,};
        return{
          access_token : this.jwtService.sign(payload,{
            secret: process.env.APP_SECRET
          },)
        }
      }

}
