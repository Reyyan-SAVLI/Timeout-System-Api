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
          })
        }
      }



  // // constructor(private jwtService : JwtService){}

  // // async login(user: any): Promise<any>{
    
  // //   access_token : this.jwtService.sign({
  // //     user: user, sub: 1
  // //   })
  // // }

  // constructor(
  //   private readonly userService : UserService,
  //   private readonly jwtService : JwtService
  // ){}
   
  // generateToken(user: User): string{
  //   const token = this.jwtService.sign(
  //       {id: user.id, email: user.email},
  //       {secret: SECRET, privateKey: PRIVATEKEY}
  //   );
  //   return token;
  // }

  // async login(loginUserDto: LoginUserDto): Promise<ReLoginUserDto>{
  //   const user = await this.userService.findEmail(loginUserDto.email);
  //   if (!user) {
  //       const errors = {email: 'Email not found'};
  //       throw new HttpException({
  //           message: 'Login failed', errors}, HttpStatus.BAD_REQUEST);
  //   }

  //   const hash = await argon2.hash(user.password);
  //   if (await argon2.verify(hash, loginUserDto.password)){
  //       const result = new ReLoginUserDto();
  //       result.id = user.id;
  //       result.email = user.email;
  //       result.token = this.generateToken(user);
  //       return result;
  //   }

  //   const errors = {email: 'Email or Password is wrong'};
  //   throw new HttpException({
  //       message: 'Login Failed', errors}, HttpStatus.BAD_REQUEST);
   
  // }

}
