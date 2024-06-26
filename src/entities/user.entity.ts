import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breaks } from "./breaks.entity";
import * as bcrypt from "bcrypt";
import { UserRoles,UserDepartment } from "src/enums/user.enum";
import { Work } from "./work.entity";

@Entity()
export class User{
 @PrimaryGeneratedColumn()
 id: number;

 @Column()
 name: string;

 @Column()
 surname: string;

 @Column()
 email: string;

 @Column()
 password: string;

 @Column({type: 'enum', enum: UserDepartment})
 department: UserDepartment;

 @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MEMBER})
 role: UserRoles;

 @OneToMany(()=> Breaks, (breaks) => breaks.user)
 breaks: Breaks[];

 @OneToMany(()=> Work, (work) => work.user)
 work: Work[];

 @BeforeInsert()
    async setPassword(password: string){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }
}

