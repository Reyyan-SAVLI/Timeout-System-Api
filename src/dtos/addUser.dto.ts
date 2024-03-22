import { ApiProperty } from "@nestjs/swagger";


export class AddUserDto{
    @ApiProperty({
        example: 'Reyyan'
    })
    name : string;

    @ApiProperty({
        example: 'Şavlı'
    })
    surname : string;

    @ApiProperty({
        example: '12345'
    })
    password : string;

    @ApiProperty({
        example: 'Yazılım'
    })
    department : string;
}