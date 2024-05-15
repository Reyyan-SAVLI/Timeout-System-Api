import { ApiProperty } from "@nestjs/swagger";


export class AddWorkDto{
    @ApiProperty({
        description: 'Work entry time'
    })
    workEntry: Date;

    @ApiProperty({
        description: 'Work exit time'
    })
    workExit: Date;
}