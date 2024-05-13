import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginUserDto{
    @ApiProperty({
        example: 'reyyan@gmail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @ApiProperty({
        example: 'Password@123'
    })
    @IsNotEmpty()
    password: string;
}