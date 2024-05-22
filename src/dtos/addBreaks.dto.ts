import { ApiProperty } from "@nestjs/swagger";
import { BreakType } from "src/enums/breaks.enum";


export class AddBreaksInDto{
    @ApiProperty({
        description: 'Work date'
    })
    date: Date;

    @ApiProperty({
        description: 'Break entry time'
    })
    breakEntry: Date; 
    
    @ApiProperty({
        description: 'Break type'
    })
    breakType: BreakType; 
}

export class AddBreaksOutDto{
    @ApiProperty({
        description: 'Break exit time'
    })
    breakExit: Date; 
}