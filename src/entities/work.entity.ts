import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breaks } from "./breaks.entity";
import { User } from "./user.entity";

@Entity()
export class Work{
    @PrimaryGeneratedColumn()
    workId : number;

    @Column({ nullable: true })
    workEntry: Date;

    @Column({ nullable: true })
    workExit: Date;

    @OneToMany(()=> Breaks, (breaks) => breaks.work)
    breaks: Breaks[];

    @ManyToOne(()=>User, (user)=> user.work)
    user : User;
}