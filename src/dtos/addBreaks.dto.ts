import { ApiProperty } from "@nestjs/swagger";


export class AddBreaksInDto{
    @ApiProperty({
        description: 'Work date'
    })
    date: Date;

    @ApiProperty({
        description: 'Break entry time'
    })
    breakEntry: Date; 
}

export class AddBreaksOutDto{
    @ApiProperty({
        description: 'Break exit time'
    })
    breakExit: Date; 
}