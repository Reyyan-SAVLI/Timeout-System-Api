import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breaks } from "./breaks.entity";

@Entity()
export class User{
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

 @Column()
 surname: string;

 @Column()
 password: string;

 @Column()
 department: string;

 @OneToMany(()=> Breaks, (breaks) => breaks.user)
 breaks: Breaks[];
}

