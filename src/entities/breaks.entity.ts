import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Work } from "./work.entity";

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

    @ManyToOne(()=>User, (user)=> user.breaks)
    user : User;


}