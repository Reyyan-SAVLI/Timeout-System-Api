import { ApiProperty } from "@nestjs/swagger";


export class LoginUserDto{
    @ApiProperty({
        example: 'reyyan@gmail.com'
    })
    email: string;

    @ApiProperty({
        example: '12345'
    })
    password: string;
}