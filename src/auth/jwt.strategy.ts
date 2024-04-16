import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            IgnoreExipration: false,
            secretOrKey: 'secret'
        })
    }

    async validate(email: string, password: string): Promise<any>{
        return 'success';
    }
}