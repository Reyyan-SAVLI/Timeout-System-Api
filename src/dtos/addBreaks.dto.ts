import { ApiProperty } from "@nestjs/swagger";


export class AddBreaksDto{
    @ApiProperty({
        description: 'Break entry time'
    })
    breakEntry: Date;

    @ApiProperty({
        description: 'Break exit time'
    })
    breakExit: Date;  
}