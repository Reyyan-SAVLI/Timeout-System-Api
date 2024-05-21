import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breaks } from "./breaks.entity";
import { User } from "./user.entity";

@Entity()
export class Work{
    @PrimaryGeneratedColumn()
    workId : number;

    @Column('date')
    date: Date;

    @Column({type: 'time', nullable: true })
    workEntry: Date;

    @Column({type: 'time', nullable: true })
    workExit: Date;

    @ManyToOne(()=>User, (user)=> user.work)
    user : User;
}