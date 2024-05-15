import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Work } from "./work.entity";

@Entity()
export class Breaks{
    @PrimaryGeneratedColumn()
    breakId : number;

    @Column({ nullable: true })
    breakEntry: Date;

    @Column({ nullable: true })
    breakExit: Date;

    @ManyToOne(()=>User, (user)=> user.breaks)
    user : User;

    @ManyToOne(()=>Work, (work)=> work.breaks)
    work : Work;

}