import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { BreakType } from "src/enums/breaks.enum";

@Entity()
export class Breaks{
    @PrimaryGeneratedColumn()
    breakId : number;

    @Column('date')
    date: Date;

    @Column({type: 'time', nullable: true })
    breakEntry: Date;

    @Column({type: 'time',nullable: true })
    breakExit: Date;

    @Column({type: 'enum', enum: BreakType})
    breakType: BreakType;

    @ManyToOne(()=>User, (user)=> user.breaks)
    user : User;


}