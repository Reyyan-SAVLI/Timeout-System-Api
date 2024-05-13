import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Breaks } from "./breaks.entity";
import * as bcrypt from "bcrypt";
import { UserRoles } from "src/enums/user.enum";

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

 @Column()
 department: string;

 @Column({ type: 'enum', enum: UserRoles, default: UserRoles.MEMBER})
 role: UserRoles;

 @OneToMany(()=> Breaks, (breaks) => breaks.user)
 breaks: Breaks[];

 @BeforeInsert()
    async setPassword(password: string){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }
}

