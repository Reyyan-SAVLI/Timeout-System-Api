import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Breaks{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    workEntry: Date;

    @Column()
    workExit: Date;

    @Column()
    breakEntry: Date;

    @Column()
    breakExit: Date;

    @ManyToOne(()=>User, (user)=> user.breaks)
    user : User;

}