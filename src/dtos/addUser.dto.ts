import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, Matches } from "class-validator";
import { MESSAGES, REGEX } from "src/app.utils";
import { UserDepartment } from "src/enums/user.enum";


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
        example: 'reyyan@gmail.com'
    })
    email : string;

    @ApiProperty({
        example: 'Password@123'
    })
    @IsNotEmpty()
    @Length(8, 24)
    @Matches(REGEX.PASSWORD_RULE, {message: MESSAGES.PASSWORD_RULE_MESSAGE})
    password : string;

    @ApiProperty({
        example: 'Yazılım'
    })
    department : UserDepartment;
}