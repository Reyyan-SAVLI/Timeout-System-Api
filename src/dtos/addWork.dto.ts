import { ApiProperty } from "@nestjs/swagger";


export class AddWorkInDto{
    @ApiProperty({
        description: 'Work date'
    })
    date: Date;

    @ApiProperty({
        description: 'Work entry time'
    })
    workEntry: Date;
}

export class AddWorkOutDto{
    @ApiProperty({
        description: 'Work exit time'
    })
    workExit: Date;
}