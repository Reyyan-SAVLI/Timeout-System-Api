import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/entities/user.entity";


export class AddBreaksDto{
    @ApiProperty({
        description: 'Work entry time'
    })
    workEntry: Date;

    @ApiProperty({
        description: 'Work exit time'
    })
    workExit: Date;

    @ApiProperty({
        description: 'Break entry time'
    })
    breakEntry: Date;

    @ApiProperty({
        description: 'Break exit time'
    })
    breakExit: Date;

    
}